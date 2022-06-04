import Link from "next/link";
import React from "react";

export default function MyAniLogo({ link }) {
  return (
    <Link href={link}>
      <a>
        <div className="md:flex md:visible hidden ">
          <span className="text-[#4C6EF5]">My</span>
          <span className="text-[#FA5252]">A</span>
          <span className="text-white">nimeCommunity</span>
        </div>
        <div className="md:hidden visible">
          <span className="text-[#4C6EF5]">My</span>
          <span className="text-[#FA5252]">A</span>
          <span className="text-white">niCommu</span>
        </div>
      </a>
    </Link>
  );
}
