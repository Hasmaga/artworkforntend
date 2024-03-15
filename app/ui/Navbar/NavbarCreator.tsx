import Link from "next/link";
import Image from "next/image";
import CreatePost from "@/public/create-note-svgrepo-com.svg";

export default function NavbarCreator() {
    return (
        <div>
            <Link href="/createPost">
                <Image src={CreatePost} alt="create post" width={40} height={40} />
            </Link>
            <Link href="/creator">
                Nhiều chức năng khác
            </Link>
        </div>
    )
}