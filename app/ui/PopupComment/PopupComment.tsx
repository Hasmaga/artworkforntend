'use client';
import Image from 'next/image'
import Close from '@/public/close-square-svgrepo-com.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PostetArtwork } from '@/app/component/lib/Interface';
import { GetPostByIdAsync } from '@/app/component/api/GetPostByIdAsync';

export default function PopupComment({ setShowCommentPopup, postId }: { setShowCommentPopup: (show: boolean) => void, postId: string | undefined }) {
    const [post, setPost] = useState<PostetArtwork>();
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        if (postId === undefined) {
            setShowCommentPopup(false);
        } else {
            const fetchPost = async () => {
                const response = await GetPostByIdAsync(postId);
                if (response.status === "SUCCESS") {
                    setPost(response.data);
                } else {
                    console.error(response.error ?? "Unknown error");
                }
            }
            fetchPost();
            const tokenFromStorage = localStorage.getItem('token');
            if (tokenFromStorage) {
                setToken(tokenFromStorage);
            }
        }
    }, [postId, setShowCommentPopup]);
    if (post === undefined) {
        return <div>Loading...</div>
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded ml-32 mr-32 max-w-3xl min-w-96 overflow-x-auto overflow-y-auto min-h-32 max-h-screen h-[80vh] space-y-3">
                <div className='p-4'>
                    <div className='flex flex-row justify-between items-center mb-2 pb-2 border-b'>
                        <div></div>
                        <p className='font-semibold text-xl'>Bài viết của {post.creatorName}</p>
                        <button onClick={() => setShowCommentPopup(false)}>
                            <Image src={Close} alt='close' width={40} height={40} />
                        </button>
                    </div>
                    <div className="flex flex-col mb-2 pb-2 border-b">
                        <p className="font-semibold text-lg">{post.creatorName}</p>
                        <p className="font-light text-sm text-gray-700">{post.createDateTime}</p>
                    </div>
                    <div>
                        <p>{post.contentPost}</p>
                    </div>
                    <div className="flex space-x-3 overflow-x-auto overflow-y-auto">
                        {post.listArtwork.map((artwork) => (
                            <Link key={artwork.artworkId} href={`/artwork/${artwork.artworkId}`}>
                                <div style={{ position: 'relative', width: '400px', height: '200px' }}>
                                    <Image
                                        src={`data:image/jpeg;base64,${artwork.image}`}
                                        alt='poster'
                                        layout='fill'
                                        objectFit='cover'
                                        objectPosition='center'
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-row pb-2 border-b">
                        {token && <button className="w-full py-2 rounded-md">Thích</button>}
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className='flex flex-col space-y-1 border-b pb-2'>
                            <p className='font-medium text-sm'>Bùi Phạm An Khang</p>
                            <p className='text-xs font-light'>8:50 Ngày 05/03/2024</p>
                            <p className="bg-gray-100 p-2 rounded-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                    </div>
                </div>
                <form className="sticky bottom-0 bg-white pt-3 pl-3 pr-3">
                    <input type="text" placeholder="Viết bình luận" className="w-full p-2 rounded-md shadow-lg bg-slate-100" />
                    <button className="w-full py-2 rounded-md">Gửi</button>
                </form>
            </div>
        </div>
    )
}