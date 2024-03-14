'use client';
import { CreateBooking, GetCreator, TypeOfArtwork } from "@/app/component/lib/Interface";
import SelectListCreator from "../SelectListCreator/SelectListCreator";
import { useRef, useState } from "react";
import SelectListTypeOfArtwork from "../SelectListTypeOfArtwork/SelectListTypeOfArtwork";
import { CreateBookingAsync } from "@/app/component/api/CreateBookingAsync";
import { useRouter } from "next/navigation";

export default function BookingArtwork() {
    const router = useRouter();
    const [selectedCreator, setSelectedCreator] = useState<GetCreator>();
    const [selectedListTypeOfArtwork, setSelectedListTypeOfArtwork] = useState<TypeOfArtwork[]>();
    const [artworkDescription, setArtworkDescription] = useState<string>("");
    const [errorSelectCreator, setErrorSelectCreator] = useState<string | undefined>();
    const [price, setPrice] = useState<number>(0);
    const [errorSelectListTypeOfArtwork, setErrorSelectListTypeOfArtwork] = useState<string | undefined>();
    const [showBookingStatus, setShowBookingStatus] = useState(false);
    const priceInputRef = useRef<HTMLInputElement>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [bookingStatus, setBookingStatus] = useState<string | null>(null);
    const [errorPrice, setErrorPrice] = useState<string | undefined>();
    const [errorArtworkDescription, setErrorArtworkDescription] = useState<string | undefined>();

    const handlePriceInput = (e: React.FormEvent<HTMLInputElement>) => {
        // Remove all non-digit characters and parse as integer
        const value = parseInt(e.currentTarget.value.replace(/\D/g, ''));
        // Handle NaN case if the input field is cleared
        setPrice(isNaN(value) ? 0 : value);
    };
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errorCreator;
        let errorArtwork;
        let errorPrice;
        let errorDescription;
        if (!selectedCreator || !selectedCreator.creatorId) {
            errorCreator = "Please select creator";
            setErrorSelectCreator(errorCreator);
        }
        if (!selectedListTypeOfArtwork || selectedListTypeOfArtwork.length === 0) {
            errorArtwork = "Please select type of artwork";
            setErrorSelectListTypeOfArtwork(errorArtwork);
        }
        if (!artworkDescription) {
            errorDescription = "Please provide a description for the artwork";
            setErrorArtworkDescription(errorDescription);
        }
        if (!price || price <= 0) {
            errorPrice = "Please provide a valid price for the artwork";
            setErrorPrice(errorPrice);
        }

        // If either errorCreator or errorArtwork is truthy, return early
        if (errorCreator || errorArtwork) return;

        if (!selectedCreator || !selectedListTypeOfArtwork) {
            return;
        }
        setShowConfirm(true);
    }

    const handleConfirm = async () => {
        if (!selectedCreator || !selectedListTypeOfArtwork) {
            setBookingStatus("Please select creator and type of artwork");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            setBookingStatus("Please login to create booking");
            return;
        }
        const booking: CreateBooking = {
            creatorId: selectedCreator.creatorId,
            contentBooking: artworkDescription,
            listTypeOfArtwork: selectedListTypeOfArtwork.map(type => type.id),
            price: price
        }
        const reponse = await CreateBookingAsync(booking, token);
        if (reponse.status === "SUCCESS") {
            setBookingStatus("Booking success");
        } else {
            setBookingStatus("Booking fail");
        }
        setShowBookingStatus(true);
    }

    const handleCancel = () => {
        // Reset isBookingConfirmed when the user cancels the booking        
        setShowConfirm(false);
    }

    const handleContinue = () => {
        // Only reset the form and hide the confirmation dialog if the booking was successful
        if (bookingStatus === "Booking success") {
            window.location.reload();
        }
        // Hide the confirmation dialog here
        setShowConfirm(false);
        setShowBookingStatus(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <p>Chọn Creator</p>
            <SelectListCreator onSelectionChange={setSelectedCreator} />
            {errorSelectCreator && <div>{errorSelectCreator}</div>}
            <p>Chọn những thể loại tranh bạn muốn</p>
            <SelectListTypeOfArtwork onSelectionChange={setSelectedListTypeOfArtwork} />
            {errorSelectListTypeOfArtwork && <div>{errorSelectListTypeOfArtwork}</div>}
            <p>Mô tả thêm</p>
            <textarea className="rounded-lg border p-2" value={artworkDescription} onChange={e => setArtworkDescription(e.target.value)} />
            {errorArtworkDescription && <div>{errorArtworkDescription}</div>}
            <p>Giá bạn muốn trả</p>
            <div className="flex items-center">
                <input
                    type="text"
                    className="rounded-lg border p-2"
                    value={formattedPrice}
                    onInput={handlePriceInput}
                    ref={priceInputRef}
                />
                <p className="ml-2">VNĐ</p>
            </div>
            {errorPrice && <div>{errorPrice}</div>}
            <button type="submit" className="border w-fit p-2 shadow-lg bg-green-500 rounded-md text-white ">Submit</button>
            {showConfirm && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md space-y-4">
                        {showBookingStatus ? (
                            <>
                                <p className="text-lg font-semibold">Status Booking</p>
                                <p>{bookingStatus}</p>
                                <button
                                    onClick={handleContinue}
                                    className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                                >
                                    Continue
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-lg font-semibold">Confirm Booking</p>
                                <p>Are you sure you want to create this booking?</p>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </form>
    )
}