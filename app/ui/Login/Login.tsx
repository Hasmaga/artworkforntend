'use client';
import React, { useState, useRef } from 'react';
import { Login as LoginProps } from "@/app/component/lib/Interface";
import { z } from "zod";

export default function Login() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const schema = z.object({
        email: z
            .string()
            .email()
            .min(1, "Email cannot be empty"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .min(1, "Password cannot be empty")
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const result = schema.safeParse({ email, password });

        if (result.success) {
            const user: LoginProps = result.data;
            console.log(user);
            setEmailError('');
            setPasswordError('');
        } else {
            for (const error of result.error.errors) {
                if (error.path[0] === 'email') {
                    setEmailError(error.message);
                } else if (error.path[0] === 'password') {
                    setPasswordError(error.message);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
            <input
                ref={emailRef}
                type="text"
                name="email"
                placeholder="Email"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {emailError && <p className='text-red-500'>{emailError}</p>}

            <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Password"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {passwordError && <p className='text-red-500'>{passwordError}</p>}

            <button type="submit" className='p-2 bg-green-500 text-white text-lg rounded-md shadow-lg'>Login</button>
        </form>
    );
}