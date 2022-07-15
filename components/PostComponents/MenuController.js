import React, { useContext, useState } from "react";
// Components
import Add from "@components/PostComponents/Add";
import {
  Box,
  Button,
  Center,
  Divider,
  Group,
  Modal,
  SegmentedControl,
} from "@mantine/core";
// Icons
import { Edit, LayoutGrid, ListDetails } from "tabler-icons-react";
import AuthCheck from "@components/AuthCheck";
import Loading from "@components/Loading";
import { UserContext } from "@lib/context";
import AdminCheck from "@components/AdminCheck";

export default function PostsMenuController({ layout, setLayout }) {
  const { user } = useContext(UserContext);

  const [opened, setOpened] = useState(false);
  return (
    <div className="flex flex-row justify-between w-full bg-foreground rounded-sm p-1 shadow-md">
      <Modal
        size="xl"
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
        opened={opened}
        onClose={() => setOpened(false)}
        title="สร้างโพสต์"
      >
        <Add setOpened={setOpened} />
      </Modal>
      <Group spacing="xs">
        <AuthCheck fallback={<div />}>
          <Button
            onClick={() => setOpened(true)}
            className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
            variant="default"
            size="xs"
          >
            สร้างโพสต์ +
          </Button>
          {/* Create New Announcement */}
          {user && (
            <AdminCheck>
              <Divider orientation="vertical" mx="xs" />
              <Group grow spacing="xs">
                <Button
                  className="z-10 bg-content text-[#fff] hover:bg-content hover:opacity-75 max-w-fit"
                  variant="default"
                  size="xs"
                >
                  สร้างประกาศ +
                </Button>
                <div className="bg-background max-w-fit p-[1px] rounded-md">
                  <Button
                    leftIcon={<Edit size={14} />}
                    className="z-10 bg-foreground text-title hover:bg-foreground hover:opacity-75 "
                    variant="default"
                    size="xs"
                  >
                    จัดการประกาศ
                  </Button>
                </div>
              </Group>
            </AdminCheck>
          )}
        </AuthCheck>
      </Group>
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
