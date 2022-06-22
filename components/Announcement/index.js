import { useThemeContext } from "@lib/useTheme";
import React, { useEffect, useState } from "react";
import { Animate } from "react-simple-animate";
import { AlertCircle, X } from "tabler-icons-react";

export default function Announcement({ type, title, content }) {
  const [onClose, setOnClose] = useState(true);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, []);

  return (
    <div>
      {onClose ? (
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
            } border-2 rounded-sm flex flex-row items-center`}
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
            <div className="flex flex-row px-2 text-[#eee] w-full text-xs md:text-sm py-2 bg-background rounded-r-sm">
              <div className="w-full">
                <h1 className="font-bold">{title}</h1>
                <p>{content}</p>
              </div>
              <div
                className="cursor-pointer bg-background"
                onClick={() => setOnClose(!onClose)}
              >
                <X size={18} color="#aaa" />
              </div>
            </div>
          </div>
        </Animate>
      ) : null}
    </div>
  );
}
