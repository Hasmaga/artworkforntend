'use client';
import { useEffect, useState } from "react";
import { PaymentResponse } from "@/app/component/lib/Interface";
import { URL } from "@/app/component/api/Url";

export default function TopUp() {
    const [token, setToken] = useState<string | null>();
    const [amount, setAmount] = useState<number>();
    const [paymentResponse, setPaymentResponse] = useState<PaymentResponse>();

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (!tokenFromStorage) {
            window.location.href = '/login';
        }
        setToken(tokenFromStorage);
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        TopUp();
    }

    async function TopUp() {
        const myHeaders = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(`https://${URL}/payment?amount=${amount}`, {
                method: 'POST',
                headers: myHeaders
            });

            if (response.ok) {
                const data = await response.json();
                setPaymentResponse(data);
                // redirect to payment gateway
                window.location.href = data.order_url;
            }
        } catch (error) {
            alert('Nạp tiền thất bại');
        }
    }

    return (
        <div className="container">
            <h1>Nạp tiền</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Nhập số tiền bạn muốn nạp:
                    <input
                        type="number"
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </label>
                <button type="submit">Nạp tiền</button>
            </form>
        </div>
    )
}