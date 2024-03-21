'use client';
import { useEffect, useState } from "react";
import { GetPublicArtworkResDto } from "@/app/component/lib/Interface";import { GetPublicArtwork } from "@/app/component/api/GetPublicArtwork";
import Image from "next/image";
import ButtonUpdateImageByCreator from "../ButtonUploadImageByCreator/ButtonUpdateImageByCreator";
import Link from "next/link";

export default function ListAllArtwork() {
    const [error, setError] = useState<string>("");
    const [listArtwork, setListArtwork] = useState<GetPublicArtworkResDto[] | undefined>(undefined);

    useEffect(() => {
        const fetchListArtwork = async () => {
            const response = await GetPublicArtwork();
            if (response.status === "SUCCESS") {
                setListArtwork(response.data);
            } else {
                setError(response.error ?? "Unknown error");
            }
        };
        fetchListArtwork();
    }, []);

    return (
        <div className="container mx-auto">
        <ButtonUpdateImageByCreator />
       
        <div className="grid grid-cols-6 gap-4 mx-auto py-8 px-10">
            {listArtwork?.map((artwork) => (
                <div key={artwork.artworkId} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Link href={`/artwork/${artwork.artworkId}`} className="block relative h-64">
                        <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.artworkId} layout="fill" objectFit="cover" />
                    </Link>
                </div>
            ))}
        </div>
    </div>
    

    );
}