'use client';
import { useEffect, useState } from "react";
import { GetArtworkByCreator } from "@/app/component/lib/Interface";
import Image from "next/image";
import ButtonUpdateImageByCreator from "../ButtonUploadImageByCreator/ButtonUpdateImageByCreator";
import Link from "next/link";
import { GetListArtworkByCreatorAsync } from "@/app/component/api/GetListArtworkByCreatorAsync";

export default function ListAllArtworkByOwnCreator() {
    const [error, setError] = useState<string>("");
    const [listArtwork, setListArtwork] = useState<GetArtworkByCreator[] | undefined>(undefined);

    console.log("list artwork is: " + listArtwork);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            alert("You are not login")
            window.location.href = "/login";
        }
        const fetchListArtwork = async () => {
            const response = await GetListArtworkByCreatorAsync(token ?? "");
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto py-8 px-10">
                {listArtwork?.map((artwork) => (
                    <div key={artwork.artworkId} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                        <Link href={`/artwork/${artwork.artworkId}`} className="block h-full">
                            <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.artworkId} className="w-full h-full object-cover" width={100} height={100} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}