import { Button, ThemeIcon } from "@mantine/core";
import React from "react";
import { LayoutGrid, ListDetails } from "tabler-icons-react";

export default function PostsMenuController({ layout, setLayout }) {
  return (
    <div className="flex flex-row justify-between w-full bg-foreground rounded-sm p-1">
      <Button
        className="bg-content text-accent hover:bg-content hover:opacity-75"
        variant="default"
        size="xs"
      >
        สร้างโพสต์ +
      </Button>
      <div className="flex flex-row gap-2">
        <ThemeIcon
          variant={layout === "grid" ? "dark" : "light"}
          className="cursor-pointer"
          color="gray"
          onClick={() => setLayout("grid")}
        >
          <LayoutGrid
            size={14}
            className={layout === "grid" ? "text-accent" : "text-title"}
          />
        </ThemeIcon>
        <ThemeIcon
          variant={`${layout === "grid" ? "light" : "dark"}`}
          className="cursor-pointer"
          color="gray"
          onClick={() => setLayout("list")}
        >
          <ListDetails
            size={14}
            className={layout === "grid" ? "text-title" : "text-accent"}
          />
        </ThemeIcon>
      </div>
    </div>
  );
}
