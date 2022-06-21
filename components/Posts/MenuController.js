import React from "react";
import { LayoutGrid, ListDetails } from "tabler-icons-react";

export default function PostsMenuController({ layout, setLayout }) {
  return (
    <div className="flex flex-row justify-between w-full bg-foreground rounded-sm mt-2 p-1">
      <div className="flex items-center px-1 bg-content w-fit rounded-sm font-bold text-sm hover:opacity-75 cursor-pointer">
        สร้างโพสต์ +
      </div>
      <div className="flex flex-row gap-2">
        <div
          onClick={() => setLayout("grid")}
          className={`p-1 ${
            layout === "grid" ? "bg-background" : "bg-foreground"
          }  w-fit rounded-sm font-bold text-sm hover:opacity-75 cursor-pointer`}
        >
          <LayoutGrid size={17} />
        </div>
        <div
          onClick={() => setLayout("list")}
          className={`p-1 ${
            layout === "list" ? "bg-background" : "bg-foreground"
          }  w-fit rounded-sm font-bold text-sm hover:opacity-75 cursor-pointer`}
        >
          <ListDetails size={17} />
        </div>
      </div>
    </div>
  );
}
