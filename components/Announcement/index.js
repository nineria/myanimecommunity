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
          start={{ transform: "translateY(5%)", opacity: "0" }}
          end={{ transform: "translateY(0%)", opacity: "1" }}
        >
          <div
            className={`${
              type === "danger"
                ? "border-red-500 bg-red-500"
                : type === "warning"
                ? "border-orange-500 bg-orange-500"
                : "border-green-500 bg-green-500"
            } border-2 rounded-sm flex flex-row items-center`}
          >
            <div>
              <AlertCircle size={25} className="text-white opacity-75 m-1" />
            </div>
            <div className="flex flex-row px-2 text-title  w-full py-2 bg-foreground rounded-r-sm">
              <div className="w-full">
                <h1 className="font-bold md:text-base text-sm opacity-80">
                  {title}
                </h1>
                <p className="text-xs md:text-sm opacity-80">{content}</p>
              </div>
              <div
                className="cursor-pointer bg-foreground"
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
