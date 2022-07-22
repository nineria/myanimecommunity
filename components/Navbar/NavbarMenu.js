import Link from "next/link";
// Animate
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
              className={`border-b-4 text-base hover:border-b-4 hover:border-content ${
                item.path === page ? "border-content" : "border-transparent"
              }`}
            >
              <div className="truncate text-title font-bold cursor-pointer hover:text-title hover:opacity-75">
                {item.name}
              </div>
            </div>
          </Link>
        </Animate>
      ))}
    </div>
  );
}
