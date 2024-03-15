'use client';
import { useState, useEffect } from 'react';

export default function useCheckToken() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading;
}