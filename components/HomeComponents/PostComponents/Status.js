import React from "react";
import Link from "next/link";
// Components
import Stats from "./Stats";
// Icons
import { Messages } from "tabler-icons-react";

export default function Status({ header, headerLink, body, date }) {
  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:justify-between lg:items-start px-3 py-2 text-content bg-foreground overflow-hidden">
      <div className="flex gap-2">
        <Messages className="min-w-fit h-[40px]" />
        <div
          className={`${
            body ? "flex flex-col" : "flex items-center"
          } overflow-hidden`}
        >
          {/* Header */}
          <Link href={headerLink}>
            <a className="flex items-center md:text-base text-sm text-title ">
              <span className="truncate cursor-pointer hover:underline">
                {header}
              </span>
              <span className="ml-2 px-1 bg-content rounded-sm text-white text-xs">
                ใหม่
              </span>
            </a>
          </Link>
          {/* Body */}
          <p className="text-title truncate opacity-50 md:text-sm text-xs max-w-[700px]">
            {body}
          </p>
        </div>
      </div>
      {/* Stat */}
      <Stats>
        <Stats.Posts>25</Stats.Posts>
        <Stats.Comments>3.6K</Stats.Comments>
        <Stats.EditDate>{date}</Stats.EditDate>
      </Stats>
    </div>
  );
}
