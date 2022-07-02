import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className=" font-bold cursor-pointer text-3xl">
        <span className="text-[#4C6EF5]">My</span>
        <span className="text-content">A</span>
        <span className="text-title">nimeCommunity</span>
      </div>
    </Link>
  );
}
