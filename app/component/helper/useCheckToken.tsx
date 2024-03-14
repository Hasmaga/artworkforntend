'use client';
import { useEffect } from 'react';

export default function useCheckToken() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);
}