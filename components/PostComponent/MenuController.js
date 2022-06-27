import { Box, Button, Center, Group, SegmentedControl } from "@mantine/core";
import React from "react";
import { LayoutGrid, ListDetails } from "tabler-icons-react";

export default function PostsMenuController({ layout, setLayout }) {
  return (
    <div className="flex flex-row justify-between w-full bg-foreground rounded-sm p-1 shadow-md">
      <Button
        className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
        variant="default"
        size="xs"
      >
        สร้างโพสต์ +
      </Button>
      <Group position="center">
        <SegmentedControl
          size="xs"
          value={layout}
          onChange={(e) => setLayout(e)}
          classNames={{
            root: "bg-background",
            label: "text-title",
            active: "bg-foreground",
          }}
          data={[
            {
              value: "grid",
              label: (
                <Center>
                  <LayoutGrid size={16} />
                  <Box ml={5}>GRID</Box>
                </Center>
              ),
            },
            {
              value: "list",
              label: (
                <Center>
                  <ListDetails size={16} />
                  <Box ml={5}>LIST</Box>
                </Center>
              ),
            },
          ]}
        />
      </Group>
    </div>
  );
}
