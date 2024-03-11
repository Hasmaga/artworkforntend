'use client';
import { GetCreator, TypeOfArtwork } from "@/app/component/lib/Interface";
import SelectListCreator from "../SelectListCreator/SelectListCreator";
import { useState } from "react";
import SelectListTypeOfArtwork from "../SelectListTypeOfArtwork/SelectListTypeOfArtwork";

export default function BookingArtwork() {
    const [selectedCreator, setSelectedCreator] = useState<GetCreator>();
    const [selectedListTypeOfArtwork, setSelectedListTypeOfArtwork] = useState<TypeOfArtwork[]>();
    const [artworkDescription, setArtworkDescription] = useState<string>("");
    const [errorSelectCreator, setErrorSelectCreator] = useState<string>("");
    const [errorSelectListTypeOfArtwork, setErrorSelectListTypeOfArtwork] = useState<string>("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCreator || !selectedCreator.creatorId) {
            setErrorSelectCreator("Please select creator");           
        }
        if (!selectedListTypeOfArtwork || selectedListTypeOfArtwork.length === 0) {
            setErrorSelectListTypeOfArtwork("Please select type of artwork");            
        }
        if (setErrorSelectCreator !=null || setErrorSelectListTypeOfArtwork != null) {
            return;
        }
        console.log(selectedCreator);
        console.log(selectedListTypeOfArtwork);
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
            <button type="submit" className="border w-fit p-2 shadow-lg bg-green-500 rounded-md text-white ">Submit</button>            
        </form>
    )
}