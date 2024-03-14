'use client';
import { GetBookingByCustomerAsync } from "@/app/component/api/GetBookingByCustomer";
import { BookingByCustomer } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HistoryBookingArtworkDetail({ bookingId }: { bookingId: string }) {
    const [booking, setBooking] = useState<BookingByCustomer>();
    const [error, setError] = useState<string>("");
    const router = useRouter();

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
                                    <p className="font-normal">Hiện chưa có tranh yêu cầu</p>
                                )
                            }
                        </div>
                        {booking.requestBooking.map(artwork => (
                            <div key={artwork.createDateTime} className="mt-5">
                                <p>Yêu cầu thêm</p>
                                <div className="font-semibold">Tên tranh: <span className="font-normal">{artwork.createDateTime}</span></div>
                                <div className="font-semibold">Thể loại tranh: <span className="font-normal">{artwork.description}</span></div>
                                <div className="font-semibold">Giá: <span className="font-normal">{artwork.statusName}</span></div>
                                <div className="font-semibold">Mô tả tranh:
                                    {artwork.image ?
                                        (
                                            <Image src={booking.image} alt="" className="w-1/4 h-1/4" />
                                        ) : (
                                            <p className="font-normal">Hiện chưa có tranh yêu cầu</p>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}