'use client';
import useCheckToken from "../component/helper/useCheckToken";
import LeftNavbarCreator from "../ui/LeftNavbar/LeftNavbarCreator";
import Navbar from "../ui/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    useCheckToken();
    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <div className="w-2/12">
                    <LeftNavbarCreator />
                </div>
                <div className="bg-gray-100 w-10/12 flex items-center justify-center">
                    {children}                    
                </div>
            </div>
        </div>
    )
}