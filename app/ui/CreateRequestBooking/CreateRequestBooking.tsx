import { CreateRequestBooking } from "@/app/component/lib/Interface";
import { useState } from "react";
import { CreateRequestBookingArtworkByBookingId } from "@/app/component/api/CreateRequestBookingArtworkByBookingId";

export default function CreateRequestBookingAsync({bookingId}: {bookingId: string}) {    
    const [description, setDescription] = useState<string>("");
    const [errorDescription, setErrorDescription] = useState<string | undefined>();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errorDescription;
        if (!description) {
            errorDescription = "Please provide a description for the request";
            setErrorDescription(errorDescription);
        }
        if (errorDescription) return;
        setShowConfirm(true);
    }

    const handleConfirm = async () => {
        const formData : CreateRequestBooking = {
            bookingId: bookingId,
            contentRequest: description
        }
        const token = localStorage.getItem('token');
        if (!token) {
            alert ('Token not found');
            return;
        }
        const reponse = await CreateRequestBookingArtworkByBookingId(token, formData);
        if (reponse.status === "SUCCESS") {
            alert('Request success');
        } else {
            alert('Request fail');
        }
        setShowConfirm(false);
    }

    return (
        <div>
            {showConfirm ? (
                <div>
                    <h2>Are you sure?</h2>
                    <button onClick={handleConfirm}>Yes</button>
                    <button onClick={() => setShowConfirm(false)}>No</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Ghi mô tả</label>
                    <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                    {errorDescription && <p>{errorDescription}</p>}
                    <button type="submit">Gửi</button>
                </form>
            )}
        </div>
    );
}