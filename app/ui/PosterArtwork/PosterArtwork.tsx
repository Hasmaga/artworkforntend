'use client';
import { PostetArtwork } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PosterArtworkProps {
    onCommentButtonClick: (postId: string) => void;
}
export default function PosterArtwork({ onCommentButtonClick }: PosterArtworkProps) {
    const [listPosterArtwork, setListPosterArtwork] = useState<PostetArtwork[]>([]);
    const listPosterArtworkMock: PostetArtwork[] = [
        {
            postId: '1',
            contentPost: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            createDateTime: '8:50 Ngày 05/03/2024',
            creatorName: 'Bùi Phạm An Khang',
            likeCount: 10000,
            listArtwork: [
                {
                    artworkId: '1',
                    artworkName: 'Lorem ipsum dolor sit amet',
                    createDateTime: '8:50 Ngày 05/03/2024',
                    creatorName: 'Bùi Phạm An Khang',
                    image: 'https://source.unsplash.com/random',
                    likeCount: 10000,
                    typeOfArtwork: [
                        {
                            id: '1',
                            type: 'Lorem ipsum dolor sit amet',
                            typeDescription: 'Lorem ipsum dolor sit amet'
                        }
                    ]
                }
            ]
        },
    ];
    useEffect(() => {
        setListPosterArtwork(listPosterArtworkMock);
    }, []);
    return (
        <div className="flex flex-col p-5 m-5 rounded-xl shadow-lg space-y-3 bg-white max-w-4xl min-w-96">
            {listPosterArtwork.map((posterArtwork) => (
                <div key={posterArtwork.postId}>
                    <div className="flex flex-col">
                        <p className="font-semibold text-lg">{posterArtwork.creatorName}</p>
                        <p className="font-light text-sm text-gray-700">{posterArtwork.createDateTime}</p>
                    </div>
                    <div>
                        <p>{posterArtwork.contentPost}</p>
                    </div>
                    <div className="flex space-x-3 overflow-x-auto overflow-y-auto">
                        {posterArtwork.listArtwork.map((artwork) => (
                            <Link key={artwork.artworkId} href={`/artwork/${artwork.artworkId}`}>
                                <img src={artwork.image} alt='poster' width={200} height={200} />
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-row justify-between mb-2 pb-2 border-b">
                        <p>Thích: {posterArtwork.likeCount}</p>
                        <div className="flex flex-row space-x-5">
                            <p>400 bình luận</p>
                            <p>1.8K lượt chia sẻ</p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <button className="w-full py-2 rounded-md">Thích</button>
                        <button className="w-full py-2 rounded-md" onClick={() => onCommentButtonClick(posterArtwork.postId)}>Bình luận</button>
                        <button className="w-full py-2 rounded-md">Chia sẻ</button>
                    </div>
                </div>
            ))}
        </div>
    )
}