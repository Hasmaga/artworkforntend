'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Logo from '@/public/next.svg'
import Link from 'next/link'
import Home from '@/public/home.svg'
import Create from '@/public/create-note-svgrepo-com.svg'
import { GetRoleAsync } from '@/app/component/api/GetRoleAsync';

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | undefined>(undefined);
  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      setToken(token);
      if (token) {
        const role = await GetRoleAsync(token);
        console.log(role);
        if (role.status === 'SUCCESS') {
          setRole(role.data);
        }
      }
    };
    fetchRole();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <nav className="flex items-center w-full justify-between h-20 shadow-lg pl-20 pr-20 bg-white">
      <div>
        <Link href="/">
          <Image src={Logo} alt="logo" width={80} height={75} />
        </Link>
      </div>
      <div className="flex flex-row space-x-5 pr-20 justify-items-center ">
        <Link href="/" className="p-1">
          <Image src={Home} alt="home" width={50} height={50} />
        </Link>
        <Link href="/create" className="p-1">
          <Image src={Create} alt="create" width={50} height={50} />
        </Link>
      </div>


      <div className='flex flex-row space-x-5'>
        {role === "CREATOR" ? (
           <Link href="/login" className="p-3 shadow-xl bg-green-500 text-white rounded-md">Tạo tranh bán</Link>
        ) : (
          <div></div>
        )}
      </div>

      <div className='flex flex-row space-x-5'>
        {token ? (
          <button onClick={handleLogout} className="p-3">Đăng xuất</button>
        ) : (
          <Link href="/login" className="p-3 shadow-xl bg-green-500 text-white rounded-md">Đăng nhập</Link>
        )}        
      </div>
    </nav>
  )
}