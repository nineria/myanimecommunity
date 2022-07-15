import React, { useEffect, useState } from "react";
// Context
import { useThemeContext } from "@lib/useTheme";
// Icons
import { Animate } from "react-simple-animate";
import { AlertCircle, X } from "tabler-icons-react";
import { Group } from "@mantine/core";
import EditAnnouncement from "./Edit";
import { getUserWithUsername } from "@lib/firebase";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import AdminCheck from "@components/AdminCheck";

export default function Announcement(props) {
  const [onClose, setOnClose] = useState(true);

  const { user } = useContext(UserContext);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");

    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }

    setTheme(localData);
  }, [setTheme]);

  return (
    <div className="shadow-md">
      {onClose ? (
        <Animate
          play
          start={{ transform: "translateY(5%)", opacity: "0" }}
          end={{ transform: "translateY(0%)", opacity: "1" }}
        >
          <div
            className={`${
              props.type === "danger"
                ? "border-red-500 bg-red-500"
                : props.type === "warning"
                ? "border-orange-500 bg-orange-500"
                : "border-green-500 bg-green-500"
            } border-2 rounded-sm flex flex-row items-center`}
          >
            <div>
              <AlertCircle size={25} className="text-white m-1" />
            </div>
            <div className="flex flex-row px-2 text-title  w-full py-2 bg-foreground rounded-r-sm">
              <div className="w-full">
                <h1 className="font-bold md:text-base text-sm ">
                  {props.title}
                </h1>
                <p className="text-xs md:text-sm ">{props.content}</p>
              </div>
              <Group grow spacing="xs" className="absolute top-2 right-2">
                {user && (
                  <AdminCheck>
                    <div className="cursor-pointer bg-foreground">
                      {props.disabled === false && (
                        <EditAnnouncement {...props} />
                      )}
                    </div>
                  </AdminCheck>
                )}
                {props.disabled === false && (
                  <div
                    className="cursor-pointer bg-foreground"
                    onClick={() => setOnClose(!onClose)}
                  >
                    <X size={18} color="#aaa" />
                  </div>
                )}
              </Group>
            </div>
          </div>
        </Animate>
      ) : null}
    </div>
  );
}
