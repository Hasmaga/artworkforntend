'use client';
import { useEffect, useState } from "react";
import { GetArtworkByCreator } from "@/app/component/lib/Interface";
import { GetPublicArtwork } from "@/app/component/api/GetPublicArtwork";
import Image from "next/image";
import ButtonUpdateImageByCreator from "../ButtonUploadImageByCreator/ButtonUpdateImageByCreator";
import Link from "next/link";

export default function ListArtworkByCreator() {
    const [error, setError] = useState<string>("");
    const [listArtwork, setListArtwork] = useState<GetArtworkByCreator[]>([]);

    // Search Artwork
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterListArtwork, setFilterListArtwork] = useState<GetArtworkByCreator[]>([]);

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

    useEffect(() => {
        if (listArtwork) {
            // const filterArtwork = listArtwork.filter((artwork: GetArtworkByCreator) => {
            //     const findByTitle = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) 
            //     const findByTypeOfArtWorkTitle = artwork.typeOfArtworks.some(typeOfArtworks => typeOfArtworks.type.toLowerCase().includes(searchQuery.toLowerCase())) 
            //     return findByTitle || findByTypeOfArtWorkTitle;
            // });
            // setFilterListArtwork(filterArtwork);
        }
    }, [searchQuery, listArtwork])

    const ClearDataSearch = () => {
        setSearchQuery("");
    }

    return (
      <div className="container mx-auto">
            <ButtonUpdateImageByCreator />
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mt-4 w-full"
            />
            
            {searchQuery && (
                <button className="top-0 right-0 mt-2 mr-3 text-gray-500" onClick={ClearDataSearch} style={{marginTop:"5px", marginBottom:"5px"}}>Clear</button>
            )}

            <div className="grid grid-cols-6 gap-4 mx-auto py-8 px-10">
                {filterListArtwork?.map((artwork) => (
                    <div key={artwork.artworkId} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <Link href={`/artwork/${artwork.artworkId}`} className="block relative h-64">
                            <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.title} layout="fill" objectFit="cover" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
}