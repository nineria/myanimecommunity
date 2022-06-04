import React, { useState, useEffect } from "react";
import { ChevronUp, Messages, Edit, SquareX } from "tabler-icons-react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import EditPost from "./Edit";
import { Badge, Container } from "@chakra-ui/react";
import { Animate } from "react-simple-animate";
import Content from "./Content";

export default function HomePost({ dummyData, isDisabled = false }) {
  const { user, username } = useContext(UserContext);

  const [toggle, setTogle] = useState(true);

  const [openMenu, setOpenMenu] = useState(false);

  const postData = dummyData;

  const HandleOpenMenu = () => {
    return setOpenMenu(!openMenu);
  };

  const HandlePostDataChange = (data) => {
    console.log(data);
    postData = data;
  };

  return (
    <div className="">
      {/* Edit post overlay */}
      {openMenu === true ? (
        <Animate
          play
          start={{
            opacity: "0",
          }}
          end={{ opacity: "1" }}
        >
          <EditPost
            handleOpenMenu={HandleOpenMenu}
            open={openMenu}
            postData={postData}
            handlePostDataChange={HandlePostDataChange}
          />
        </Animate>
      ) : null}

      <Container maxW="container.xl">
        <div className="rounded-sm bg-[#242629] w-full">
          <div
            className={`flex flex-row justify-between items-center transition-all bg-[#ec5555] py-1 px-3 font-bold md:text-lg text-sm text-white ${
              toggle === true ? "rounded-t-sm" : "rounded-sm"
            }`}
          >
            {/* Title */}
            <Link href={postData.titleLink}>
              <a className="truncate max-w-[600px] cursor-pointer hover:underline">
                {postData.title}
              </a>
            </Link>
            {/* Edit button */}
            <div className="flex flex-row gap-2 ">
              {user && (
                <Edit
                  onClick={
                    isDisabled === true ? null : () => setOpenMenu(!openMenu)
                  }
                  className="hover:translate-y-[1px] hover:opacity-75 cursor-pointer"
                />
              )}
              {/* Show-hide content */}
              <ChevronUp
                size={22}
                onClick={() => setTogle(!toggle)}
                className={`${
                  toggle === false ? "rotate-180" : ""
                } cursor-pointer transition-all hover:translate-y-[1px] hover:opacity-75`}
              />
            </div>
          </div>
          {/* Post */}
          <div className="flex flex-col bg-[#aaa] gap-[1px]">
            {toggle ? (
              <Content
                header={postData.header}
                headerLink={postData.headerLink}
                body={postData.body}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
