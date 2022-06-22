import Link from "next/link";
import React from "react";
import { Animate } from "react-simple-animate";

export default function NavbarMenu({ page, menu }) {
  return (
    <div className="flex flex-row gap-5 ">
      {menu.map((item) => (
        <Animate
          key={item.name}
          play
          start={{ transform: "translateX(2%)", opacity: "0" }}
          end={{ transform: "translateX(0)", opacity: "1" }}
        >
          <Link href={item.path}>
            <div
              className={`border-b-4 text-base border-transparent hover:border-b-4 hover:border-content ${
                item.path === page ? "border-content" : ""
              } `}
            >
              <div className="truncate text-[#ccc] font-bold cursor-pointer hover:text-[#fff]">
                {item.name}
              </div>
            </div>
          </Link>
        </Animate>
      ))}
    </div>
  );
}
