import React, { useContext, useState } from "react";
// Components
import Add from "components/PostComponents/Add";
import {
  Box,
  Button,
  Center,
  Divider,
  Group,
  Modal,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
// Icons
import { Edit, LayoutGrid, ListDetails } from "tabler-icons-react";
import AuthCheck from "hooks/AuthCheck";
import { UserContext } from "lib/context";
import AdminCheck from "hooks/AdminCheck";
import AddAnnouncement from "components/Announcement/Add";
import Link from "next/link";
import Verify from "components/Verify";

export default function PostsMenuController({ layout, setLayout }) {
  const { user, userData, username } = useContext(UserContext);

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
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title="สร้างโพสต์"
      >
        <Add setOpened={setOpened} />
      </Modal>
      <Group spacing="xs">
        <AuthCheck fallback={<></>}>
          {userData && userData.email === "" ? (
            <Verify>สร้างโพสต์ +</Verify>
          ) : (
            <Button
              onClick={() => setOpened(true)}
              className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
              variant="default"
              size="xs"
            >
              สร้างโพสต์ +
            </Button>
          )}

          {/* Create New Announcement */}
          {user && (
            <AdminCheck>
              <Divider orientation="vertical" mx="none" />
              <AddAnnouncement />
              <Link href={`/${username}#announcementControl`}>
                <Button
                  leftIcon={<Edit size={14} />}
                  className="md:block hidden z-10 bg-foreground text-title hover:bg-foreground hover:opacity-75"
                  variant="default"
                  size="xs"
                >
                  จัดการประกาศ
                </Button>
              </Link>
              <Tooltip
                className="md:hidden block "
                label="จัดการประกาศ"
                placement="start"
                withArrow
              >
                <Link href={`/${username}#announcementControl`}>
                  <Button
                    className="z-10 bg-foreground text-title hover:bg-foreground hover:opacity-75"
                    variant="default"
                    size="xs"
                  >
                    <Edit size={14} />
                  </Button>
                </Link>
              </Tooltip>
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
                  <Box ml={5} className="md:block hidden">
                    GRID
                  </Box>
                </Center>
              ),
            },
            {
              value: "list",
              label: (
                <Center>
                  <ListDetails size={16} />
                  <Box ml={5} className="md:block hidden">
                    LIST
                  </Box>
                </Center>
              ),
            },
          ]}
        />
      </Group>
    </div>
  );
}
