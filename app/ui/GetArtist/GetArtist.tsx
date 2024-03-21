import { GetArtistByCustomerAsync } from "@/app/component/api/GetArtistByCustomerAsync"
import { GetArtistByCustomer } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";

export default function GetArtist(artistId: string) {
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
        <div>
            <div>
                <p>Artist Frist Name</p>
                <p>{artist?.artistFristName}</p>
            </div>
            <div>
                <p>Artist Last Name</p>
                <p>{artist?.artistLastName}</p>
            </div>
            <div>
                <p>Artist Email</p>
                <p>{artist?.artistEmail}</p>
            </div>
        </div>
    )
}