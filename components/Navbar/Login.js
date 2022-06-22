import Link from "next/link";
import React from "react";

export default function Login({ login, register }) {
  return (
    <div className="flex flex-row justify-end w-full gap-2">
      <Link href={login}>
        <a className="flex items-center px-2 py-1 rounded-sm bg-content text-accent md:text-base text-sm hover:opacity-75">
          เข้าสู่ระบบ
        </a>
      </Link>
      <Link href={register}>
        <a className="flex items-center px-2 py-1 rounded-sm bg-background text-accent md:text-base text-sm hover:opacity-75">
          ลงทะเบียน
        </a>
      </Link>
    </div>
  );
}
