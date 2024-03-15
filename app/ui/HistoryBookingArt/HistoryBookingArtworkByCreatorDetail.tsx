'use client';
import { BookingByCreator } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetBookingByCreatorAsync } from "@/app/component/api/GetBookingByCreatorAsync";

export default function HistoryBookingArtworkByCreatorDetail({ bookingId }: { bookingId: string }) {
    const [booking, setBooking] = useState<BookingByCreator>();
    const [error, setError] = useState<string>("");    
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [errorNameImage, setErrorNameImage] = useState<string>();
    const [errorDescriptionImage, setErrorDescriptionImage] = useState<string>();
    const [errorImage, setErrorImage] = useState<string>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListBooking = async () => {
                const response = await GetBookingByCreatorAsync(token, bookingId);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setBooking(response.data);
                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            fetchListBooking();
        } else {
            alert("You are not login")
            window.location.href = "/login";
        }
    }, []);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isValid = true;
        if (!name) {
            setErrorNameImage("Name is required.");
            isValid = false;
        }
        if (!description) {
            setErrorDescriptionImage("Description is required.");
            isValid = false;
        }
        if (!image) {
            setErrorImage("Image is required.");
            isValid = false;
        }
        if (!isValid) {
            return;
        } else {
            setErrorNameImage("");
            setErrorDescriptionImage("");
            setErrorImage("");
            alert("Submit success");
        }     
    };

    return (
        <div className="">
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                booking && (
                    <div>
                        <p className="text-xl font-semibold pt-2">Nội dung đặt tranh</p>
                        <div className="pt-2 pb-5">
                            <div className="font-semibold">Tên user đặt tranh: <span className="font-normal">{booking.userName}</span></div>
                            <div className="font-semibold">Thể loại tranh đặt: <span className="font-normal">{booking.listTypeOfArtwork.map(artwork => artwork.type).join(', ')}</span></div>
                            <div className="font-semibold">Tình trạng đặt: <span className="font-normal">{booking.statusName}</span></div>
                            <div className="font-semibold">Mô tả đặt tranh: <span className="font-normal">{booking.description}</span></div>
                            <div className="font-semibold">Giá: <span className="font-normal">{booking.price}</span></div>
                            <div className="font-semibold">Thời gian đặt tranh: <span className="font-normal">{booking.createDateTime}</span></div>
                            <div className="font-semibold">Tranh:
                                {booking.image ?
                                    (
                                        <Image src={booking.image} alt="" className="w-1/4 h-1/4" />
                                    ) : (
                                        <div>
                                            <p className="font-normal">Hiện chưa có tranh</p>
                                            <form className="mt-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
                                                <p className="font-semibold text-xl mb-4">Upload tranh</p>

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">Tên bức tranh</label>
                                                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setName(e.target.value)} />
                                                    {errorNameImage && <p className="text-red-500 text-xs italic">{errorNameImage}</p>}
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả bức tranh</label>
                                                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20" onChange={e => setDescription(e.target.value)} />
                                                    {errorDescriptionImage && <p className="text-red-500 text-xs italic">{errorDescriptionImage}</p>}
                                                </div>
                                                <div className="mb-4">
                                                    <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded inline-block">
                                                        Upload Image
                                                        <input type="file" className="hidden" onChange={handleImageUpload} />                                                        
                                                    </label>
                                                    {errorImage && <p className="text-red-500 text-xs italic">{errorImage}</p>}
                                                </div>
                                                {image && (
                                                    <div className="mt-4 border-2 border-blue-500 rounded overflow-hidden mb-4">
                                                        <Image src={image} alt="Uploaded" width={200} height={200} objectFit="cover" />
                                                    </div>
                                                )}
                                                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {booking.requestBooking.map(artwork => (
                            <div>
                                <p className="text-xl font-semibold">Nội dung yêu cầu thêm</p>
                                <div key={artwork.createDateTime} className="mt-2">
                                    <div className="font-semibold">Thời gian tạo: <span className="font-normal">{artwork.createDateTime}</span></div>
                                    <div className="font-semibold">Mô tả thêm: <span className="font-normal">{artwork.description}</span></div>
                                    <div className="font-semibold">Tình trạng: <span className="font-normal">{artwork.statusName}</span></div>
                                    <div className="font-semibold">Tranh:
                                        {artwork.image ?
                                            (
                                                <Image src={booking.image} alt="" className="w-1/4 h-1/4" />
                                            ) : (
                                                <p className="font-normal">Hiện chưa có tranh mà bạn yêu cầu</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}