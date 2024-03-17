'use client';
import { GetListPostArtworkAsync } from "@/app/component/api/GetListPostArtworkAsync";
import { PostetArtwork } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PosterArtworkProps {
    onCommentButtonClick: (postId: string) => void;
}
export default function PosterArtwork({ onCommentButtonClick }: PosterArtworkProps) {
    const [listPosterArtwork, setListPosterArtwork] = useState<PostetArtwork[]>([]);

    useEffect(() => {
        const fetchListArtwork = async () => {
            const response = await GetListPostArtworkAsync();
            if (response.status === "SUCCESS" && response.data !== undefined) {
                setListPosterArtwork(response.data);
            } else {
                console.error(response.error ?? "Unknown error");
            }
        }
        fetchListArtwork();
    }, []);
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
                                <div style={{ position: 'relative', width: '200px', height: '100px' }}>
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
                        <button className="w-full py-2 rounded-md">Thích</button>
                        <button className="w-full py-2 rounded-md" onClick={() => onCommentButtonClick(posterArtwork.postId)}>Bình luận</button>
                        <button className="w-full py-2 rounded-md">Chia sẻ</button>
                    </div>
                </div>
            ))}
        </div>
    )
}