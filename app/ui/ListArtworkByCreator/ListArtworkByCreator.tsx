'use client';
import { useEffect, useState } from "react";
import { GetArtworkByCreator } from "@/app/component/lib/Interface";
import { GetListArtworkByCreatorAsync } from "@/app/component/api/GetListArtworkByCreatorAsync";
import Image from "next/image";
import ButtonUpdateImageByCreator from "../ButtonUploadImageByCreator/ButtonUpdateImageByCreator";
import Link from "next/link";

export default function ListArtworkByCreator() {
    const [error, setError] = useState<string>("");
    const [listArtwork, setListArtwork] = useState<GetArtworkByCreator[] | undefined>(undefined);

    // Search Artwork
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterListArtwork, setFilterListArtwork] = useState<GetArtworkByCreator[]>([]);
    
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

    useEffect(() => {
        if(listArtwork){
            const filterArtwork = listArtwork.filter(artwork => 
                artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterListArtwork(filterArtwork);
        }
    }, [searchQuery, listArtwork])

    const ClearDataSearch = () => {
        setSearchQuery("");
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <ButtonUpdateImageByCreator />
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mt-4 w-full"
            />
            {
                searchQuery && (
                    <button className="top-0 right-0 mt-2 mr-3 text-gray-500" onClick={ClearDataSearch} style={{marginTop:"-20px"}}>Clear</button>
                )
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                {filterListArtwork?.map((artwork) => (
                    <div key={artwork.artworkId} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <Link href={`/artwork/${artwork.artworkId}`} className="block relative h-64">
                            <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.title} layout="fill" objectFit="cover" />
                        </Link>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{artwork.title}</h2>
                            <p className="text-gray-600">Price: {artwork.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}