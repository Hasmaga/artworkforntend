'use client';
import { useEffect, useState } from "react";
import { GetArtworkByCreator } from "@/app/component/lib/Interface";
import { GetListArtworkByCreatorAsync } from "@/app/component/api/GetListArtworkByCreatorAsync";
import Image from "next/image";
import ButtonUpdateImageByCreator from "../ButtonUploadImageByCreator/ButtonUpdateImageByCreator";
import Link from "next/link";

export default function ListArtworkByCreator() {
    const [error, setError] = useState<string>("");
    const [listArtwork, setListArtwork] = useState<GetArtworkByCreator[]>();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListArtwork = async () => {
                const response = await GetListArtworkByCreatorAsync(token);
                if (response.status === "SUCCESS") {
                    setListArtwork(response.data);
                } else {
                    setError(response.error ?? "Unknown error");
                }
            };
            fetchListArtwork();
        }
    }, []);

    return (
        <div className="grid grid-row-1 sm:grid-row-2 md:grid-row-3 lg:grid-row-4 xl:grid-row-5 gap-4 ">
            <ButtonUpdateImageByCreator />
            <div className="flex flex-row space-x-2">
            {listArtwork?.map((artwork) => (
                <Link key={artwork.artworkId} className="relative w-64 h-64" href={`/artwork/${artwork.artworkId}`}>
                    <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.title} layout="fill" objectFit="cover" className="absolute top-0 left-0 w-full h-full" />
                </Link>
            ))}
            </div>
            
        </div>
    );
}