import { GetListArtworkByCreatorIdAsync } from "@/app/component/api/GetListArtworkByCreatorIdAsync";
import { Artwork } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function GetListArtworkByCreatorId(creatorId: string) {
    const [artwork, setArtwork] = useState<Artwork[]>();

    const fetchArtwork = async () => {
        const response = await GetListArtworkByCreatorIdAsync(creatorId);
        if (response.status === "SUCCESS" && response.data != undefined) {
            setArtwork(response.data);
        } else {
            alert(response.error);
        }
    }

    useEffect(() => {
        fetchArtwork();
    }, []);

    return(
        <div>
            {/* Show only image of artwork */}
            {artwork?.map((artwork, index) => {
                return (
                    <div key={index}>
                        <Image src={artwork.image} alt="artwork" />
                    </div>
                )
            })}
        </div>
    )



}