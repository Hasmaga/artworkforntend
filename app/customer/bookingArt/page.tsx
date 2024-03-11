import BookingArtwork from "@/app/ui/BookingArtwork/BookingArtwork";

export default function Page() {
    return (
        <div className="bg-white ml-10 mr-10 mt-10 pl-5 pr-5 pt-5 pb-5 rounded-lg w-full flex flex-col space-y-4 shadow-lg">
            <p className="font-semibold text-2xl">Tạo yêu cầu tranh</p>
            <BookingArtwork />
        </div>
    )
}