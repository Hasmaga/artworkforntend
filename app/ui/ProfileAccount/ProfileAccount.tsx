"use client"
import React from 'react';
import styles from './profileAccount.module.css';
import Image from "next/image";
import { AsyncResponse, User } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import { GetInformationUserAsync } from "@/app/component/api/GetInformationUserAsync";

const ProfileAccountPage = () => {
    const [userInformation, setListBooking] = useState<User>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListBooking = async () => {
                const response = await GetInformationUserAsync(token);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setListBooking(response.data);
                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            fetchListBooking();
        }
    }, []);
    console.log(userInformation);
    return (
        <>
            <div className={styles.container}>

                <div className={styles.infoContainer}>
                    <div className={styles.imgContainer} >
                        <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg'} alt="logo" fill />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.infoTitle}>Your Information</div>
                    <form action="" className={styles.form}>
                        <label>Full Name</label>
                        <input type="text" name="username" placeholder={`${userInformation?.firstName} ${userInformation?.lastName}`} />
                        <label>Email</label>
                        <input type="text" name="email" placeholder={userInformation?.email} />
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder={userInformation?.phoneNumber || "None"} />

                        <button>Update</button>
                    </form>
                </div>
            </div>

            <div className={styles.containerChild}>
                <div className={styles.formContainer}>

                    <form action="" className={styles.form}>
                        {/* <label>Email</label>
                        <input type="text" name="username" placeholder="Your Email" /> */}
                        <label>Password</label>
                        <input type="password" name="passsword" placeholder="*******" />
                        <label>New Password</label>
                        <input type="password" name="password" placeholder="*******" />
                        <label>Confirm Password</label>
                        <input type="password" name="password" placeholder="*******" />
                        <button>Change Password</button>
                    </form>

                </div>
            </div>
        </>
    );
}
export default ProfileAccountPage;