'use client';
import { GetListPostArtworkAsync } from "@/app/component/api/GetListPostArtworkAsync";
import { PostetArtwork } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UnlikePostAsync } from "@/app/component/api/UnlikePostAsync";
import { LikePostAsync } from "@/app/component/api/LikePostAsync";

interface PosterArtworkProps {
    onCommentButtonClick: (postId: string) => void;
}
export default function PosterArtwork({ onCommentButtonClick }: PosterArtworkProps) {
    const [listPosterArtwork, setListPosterArtwork] = useState<PostetArtwork[]>([]);
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {         
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
        fetchListArtwork();
    }, []);

    const fetchListArtwork = async () => {
        const token = localStorage.getItem('token');
        const response = await GetListPostArtworkAsync(token ?? '');
        if (response.status === "SUCCESS" && response.data !== undefined) {
            setListPosterArtwork(response.data);
        } else {
            console.error(response.error ?? "Unknown error");
        }
    }

    const handleLikeUnlike = async (postId: string, isLiked: boolean) => {
        if (isLiked) {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await UnlikePostAsync(postId, token);
                if (response.status === 'SUCCESS') {
                    fetchListArtwork();
                } else {
                    alert('Something went wrong, please try again');
                }
            } else {
                alert('You must be logged in to like a post');
            }
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await LikePostAsync(postId, token);
                if (response.status === 'SUCCESS') {
                    fetchListArtwork();
                } else {
                    alert('Something went wrong, please try again');
                }
            } else {
                alert('You must be logged in to like a post');
            }
        }
    };

    return (
        <div className="flex flex-col p-5 m-5 space-y-3 max-w-4xl min-w-96">
            {listPosterArtwork.map((posterArtwork) => (
                <div key={posterArtwork.postId} className="bg-white rounded-xl shadow-lg p-5">
                    <div className="flex flex-col ">
                        <p className="font-semibold text-lg">{posterArtwork.creatorName}</p>
                        <p className="font-light text-sm text-gray-700">{posterArtwork.createDateTime}</p>
                    </div>
                    <div>
                        <p>{posterArtwork.contentPost}</p>
                    </div>
                    <div className="flex space-x-3 overflow-x-auto overflow-y-auto">
                        {posterArtwork.listArtwork.map((artwork) => (
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
                    <div className="flex flex-row justify-between mb-2 pb-2 border-b">
                        <p>Thích: {posterArtwork.likeCount}</p>
                    </div>
                    <div className="flex flex-row">
                        {token && <button
                            onClick={() => handleLikeUnlike(posterArtwork.postId, posterArtwork.isLike)}
                            className={`w-full py-2 rounded-md ${posterArtwork.isLike ? 'text-red-500' : ''}`}
                        >
                            {posterArtwork.isLike ? 'Bỏ thích' : 'Thích'}
                        </button>}
                        <button className="w-full py-2 rounded-md" onClick={() => onCommentButtonClick(posterArtwork.postId)}>Bình luận</button>
                    </div>
                </div>
            ))}
        </div>
    )
}