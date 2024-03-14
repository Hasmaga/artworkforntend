'use client';
import { GetBookingByCustomerAsync } from "@/app/component/api/GetBookingByCustomer";
import { BookingByCustomer } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CreateRequestBookingAsync from "../CreateRequestBooking/CreateRequestBooking";

export default function HistoryBookingArtworkDetail({ bookingId }: { bookingId: string }) {
    const [booking, setBooking] = useState<BookingByCustomer>();
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const [popupRequestBooking, setPopupRequestBooking] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListBooking = async () => {
                const response = await GetBookingByCustomerAsync(token, bookingId);
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
            router.push("/login");
        }
    }, []);


    return (
        <div className="">
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                booking && (
                    <div>
                        <p className="text-xl font-semibold pt-2">Nội dung đặt tranh</p>
                        <div className="pt-2 pb-5">
                            <div className="font-semibold">Tên creator đặt tranh: <span className="font-normal">{booking.creatorName}</span></div>
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
                                        <p className="font-normal">Hiện chưa có tranh mà bạn yêu cầu</p>
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
                        <button className="bg-blue-500 text-white rounded-md p-2 mt-5" onClick={() => setPopupRequestBooking(true)}>Tạo thêm yêu cầu</button>
                    </div>
                )
            )}

            {popupRequestBooking && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setPopupRequestBooking(false)} // Close the popup when clicking outside
                >
                    <div
                        className="bg-white p-4 rounded-md space-y-4 w-3/5"
                        onClick={(e) => e.stopPropagation()} // Prevent the popup from closing when clicking inside
                    >
                        <button
                            className="absolute top-2 right-2 "
                            onClick={() => setPopupRequestBooking(false)} // Close button
                        >
                            X
                        </button>
                        <CreateRequestBookingAsync bookingId={bookingId} />
                    </div>
                </div>
            )}
        </div>
    );
}