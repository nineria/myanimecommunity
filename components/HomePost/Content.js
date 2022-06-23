import Link from "next/link";
import React from "react";
import { Messages } from "tabler-icons-react";
import ContentStat from "./ContentStat";

const Content = ({ header, headerLink, body }) => {
  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:justify-between lg:items-center px-3 py-2 text-content bg-foreground overflow-hidden">
      <div className="flex gap-2">
        <Messages size={40} className="min-w-fit" />
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
          <p className="text-title opacity-50 md:text-sm text-xs">{body}</p>
        </div>
      </div>
      {/* Stat */}
      <ContentStat>
        <ContentStat.Posts>25</ContentStat.Posts>
        <ContentStat.Comments>3.6K</ContentStat.Comments>
        <ContentStat.EditDate>28/5/2565</ContentStat.EditDate>
      </ContentStat>
    </div>
  );
};

export default Content;
