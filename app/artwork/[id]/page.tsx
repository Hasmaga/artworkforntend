'use client';
import Navbar from "@/app/ui/Navbar/Navbar";
import { GetArtworkByGuest } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import { GetArtworkByGuestAsync } from "@/app/component/api/GetArtworkByGuestAsync";
import Image from "next/image";
import { UnlikeArtworkAsync } from "@/app/component/api/UnlikeArtworkAsync";
import { LikeArtworkAsync } from "@/app/component/api/LikeArtworkAsync";
import { CreatePreOrderByCustomerAsync } from "@/app/component/api/CreatePreOrderByCustomerAsync";

export default function Page({ params } : { params : { id : string }}) {
    const [artwork, setArtwork] = useState<GetArtworkByGuest>();
    const [error, setError] = useState<string>("");

    useEffect(() => {        
        fetchArtwork();
    }, []);

    const fetchArtwork = async () => {
        const response = await GetArtworkByGuestAsync(params.id, localStorage.getItem("token") ?? "");
        if (response.status === "SUCCESS") {
            setArtwork(response.data);
        } else {
            setError(response.error ?? "Unknown error");
            alert(error);
            window.location.href = "/";
        }
    };

    if (!artwork) {
        return <div>Loading...</div>;
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard');
    };

    const handleLike = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to like an artwork");
            return;
        }
        if (artwork) {
            // Determine the API endpoint and method based on whether the post is already liked
            const apiFunction = artwork.isLike ? UnlikeArtworkAsync : LikeArtworkAsync;

            // Send a request to the server
            const response = await apiFunction(params.id, token);

            if (response.status === "SUCCESS") {                
                fetchArtwork();
            } else {
                alert(response.error ?? "Unknown error");
            }
        }
    };

    const handlePreOrder = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to pre-order an artwork");
            return;
        }
        if (artwork) {
            const response = await CreatePreOrderByCustomerAsync(params.id, token);
            if (response.status === "SUCCESS") {
                alert("Pre-order created successfully");
            } else {
                alert(response.error ?? "Unknown error");
            }
        }
    }

    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            <Navbar />
            <div className="w-full flex flex-row" style={{ height: 'calc(100vh - 5rem)' }}>
                <div className="w-3/4 bg-black overflow-hidden relative">
                    <div className="relative h-full w-full">
                        <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.artworkName} className="h-full w-full object-contain" width={200} height={100} />
                        <div className="absolute bottom-0 left-0 bg-black opacity-50 p-2">
                            <p className="text-white text-lg">© Copyright by {artwork.creatorName}</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 overflow-auto">
                    <div className="p-3">
                        <div>
                            <p className="font-semibold text-lg">{artwork.creatorName}</p>
                            <p className="font-light text-sm text-gray-700">{artwork.createDateTime}</p>
                        </div>
                        <div className="border-b-2 pb-2">
                            <p>Tên bức ảnh: </p>
                            <p className="bg-gray-200 p-2 rounded-lg">{artwork.artworkName}</p>
                        </div>
                        <div className="flex flex-col space-x-3 overflow-x-auto overflow-y-auto pb-2 border-b">
                            <p>Thể loại: </p>
                            {artwork.artworkTypeList.map((type) => (
                                <p key={type.id} className="bg-gray-200 p-2 rounded-lg">{type.type}</p>
                            ))}
                        </div>
                        <div className="flex flex-row justify-between mb-2 pb-2 border-b">
                            <p>Thích: {artwork.likeCount}</p>                            
                        </div>
                        <div className="flex flex-row border-b-2">
                        <button onClick={handleLike} className={`w-full py-2 rounded-md ${artwork.isLike ? 'text-red-500' : ''}`}>Thích</button>
                            <button onClick={handleShare} className="w-full py-2 rounded-md">Chia sẻ</button>
                            {artwork.isSold ? <p className="w-full py-2 rounded-md bg-red-500 text-white">Đã bán</p> : <button onClick={handlePreOrder} className="w-full py-2 rounded-md">Mua</button>}                            
                        </div>
                        <div className="flex flex-col pt-3">
                            <div>
                                <div>
                                    <p className="font-semibold text-base">Bùi Phạm An Khang</p>
                                    <p className="font-light text-xs text-gray-700">8:50 Ngày 05/03/2024</p>
                                </div>
                                <div>
                                    <p className="bg-gray-200 p-2 rounded-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className="font-semibold text-base">Bùi Phạm An Khang</p>
                                    <p className="font-light text-xs text-gray-700">8:50 Ngày 05/03/2024</p>
                                </div>
                                <div>
                                    <p className="bg-gray-200 p-2 rounded-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="sticky bottom-0 bg-white pt-3 pr-3 pl-3">
                        <input type="text" placeholder="Viết bình luận" className="w-full p-2 rounded-md shadow-lg bg-slate-200" />
                        <button className="w-full py-2 rounded-md">Gửi</button>
                    </form>
                </div>
            </div>
        </div>
    );
}