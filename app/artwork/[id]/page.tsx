'use client';
import Navbar from "@/app/ui/Navbar/Navbar";
import { Artwork } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
export default function Page() {
    const [artwork, setArtwork] = useState<Artwork>();
    const artworkMock: Artwork = {
        artworkId: '1',
        artworkName: 'Lorem ipsum dolor sit amet',
        createDateTime: '8:50 Ngày 05/03/2024',
        creatorName: 'Bùi Phạm An Khang',
        image: 'https://source.unsplash.com/random',
        likeCount: 10000,
        typeOfArtwork: [
            {
                id: '1',
                type: 'Lorem ipsum dolor sit amet',
                typeDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        ]
    };

    useEffect(() => {
        setArtwork(artworkMock);
    }, []);

    if (!artwork) {
        return <div>Loading...</div>;
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard');
    };

    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            <Navbar />
            <div className="w-full flex flex-row" style={{ height: 'calc(100vh - 5rem)' }}>
                <div className="w-3/4 bg-black overflow-hidden relative">
                    <div className="relative h-full w-full">
                        <img src={artwork.image} alt={artwork.artworkName} className="h-full w-full object-cover" />
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
                            {artwork.typeOfArtwork.map((type) => (
                                <p key={type.id} className="bg-gray-200 p-2 rounded-lg">{type.type}</p>
                            ))}
                        </div>
                        <div className="flex flex-row justify-between mb-2 pb-2 border-b">
                            <p>Thích: {artwork.likeCount}</p>
                            <div className="flex flex-row space-x-5">
                                <p>400 bình luận</p>
                                <p>1.8K lượt chia sẻ</p>
                            </div>
                        </div>
                        <div className="flex flex-row border-b-2">
                            <button className="w-full py-2 rounded-md">Thích</button>
                            <button onClick={handleShare} className="w-full py-2 rounded-md">Chia sẻ</button>
                            <button className="w-full py-2 rounded-md">Mua</button>
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