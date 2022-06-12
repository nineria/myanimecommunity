import React from "react";
import { Animate } from "react-simple-animate";
import { AlertCircle } from "tabler-icons-react";

export default function Announcement({ type, content }) {
  return (
    <Animate
      play
      start={{ transform: "translateY(10%)", opacity: "0" }}
      end={{ transform: "translateY(0%)", opacity: "1" }}
    >
      <div
        className={`mt-2 ${
          type === "danger"
            ? "border-red-500 bg-red-500"
            : type === "warning"
            ? "border-orange-500 bg-orange-500"
            : "border-green-500 bg-green-500"
        } border-2 rounded-md flex flex-row items-center`}
      >
        <div
        // className={`${
        //   props.type === "danger"
        //     ? "bg-red-500"
        //     : props.type === "warning"
        //     ? "bg-orange-500"
        //     : "bg-green-500"
        // } h-full`}
        >
          <AlertCircle size={25} className="text-white opacity-75 m-1" />
        </div>
        <div className="px-2 text-[#eee] w-full text-xs md:text-sm py-2 bg-[#242629] rounded-r-md">
          {content}
        </div>
      </div>
    </Animate>
  );
}
