import Link from "next/link";
import Image from "next/image";
import CreatePost from "@/public/create-note-svgrepo-com.svg";

export default function NavbarCustomer() {
    return (
        <div>
            <Link href="/customer">
                Nhiều chức năng khác
            </Link>
        </div>
    )
}