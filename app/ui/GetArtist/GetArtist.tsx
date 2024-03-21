'use client';
import { GetArtistByCustomerAsync } from "@/app/component/api/GetArtistByCustomerAsync"
import { GetArtistByCustomer } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";

export default function GetArtist({ artistId }: { artistId: string }) {
    const [artist, setArtist] = useState<GetArtistByCustomer>();

    const fetchArtist = async () => {
        const response = await GetArtistByCustomerAsync(artistId);
        if (response.status === "SUCCESS" && response.data != undefined) {
            setArtist(response.data);
        } else {
            alert(response.error);
        }
    }

    useEffect(() => {
        fetchArtist();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row space-x-2">
                <p className="text-gray-900">Frist Name:</p>
                <p>{artist?.artistFirstName}</p>
            </div>
            <div className="flex flex-row space-x-2">
                <p className="text-gray-900">Artist Last Name:</p>
                <p>{artist?.artistLastName}</p>
            </div>
            <div className="flex flex-row space-x-2">
                <p className="text-gray-900">Artist Email</p>
                <p>{artist?.artistEmail}</p>
            </div>
        </div>
    )
}