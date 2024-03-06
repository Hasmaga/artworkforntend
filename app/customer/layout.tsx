import LeftNavbar from "../ui/LeftNavbar/LeftNavbar";
import Navbar from "../ui/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <div className="w-2/12">
                    <LeftNavbar />
                </div>
                <div className="bg-gray-100 w-10/12 flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}