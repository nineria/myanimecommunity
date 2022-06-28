import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Input,
  InputWrapper,
  Stack,
  Text,
} from "@mantine/core";
import React, { useRef } from "react";
import { Plus, Tag, X } from "tabler-icons-react";
import { useModals } from "@mantine/modals";

export default function TagGenre({ data, setData }) {
  const modals = useModals();

  const inputRef = useRef(null);

  const handleTag = (type, tag, item, index) => {
    switch (type) {
      case "delete":
        switch (tag) {
          case "tag":
            data.tag.splice(index, 1);
            setData(data);
            console.log(data.tag);
            break;
          case "genre":
            data.genre.splice(index, 1);
            setData(data);
            console.log(data.genre);
            break;
        }
        break;
      case "add":
        switch (tag) {
          case "tag":
            data.tag.push(item);
            setData(data);
            console.log(data.tag);
            break;
          case "genre":
            data.genre.push(item);
            setData(data);
            console.log(data.genre);
            break;
        }
        break;
    }
  };

  const openDeleteModal = (item, index, tag) => {
    const handleOnClick = () => {
      handleTag("delete", tag, item, index);
      modals.closeModal(id);
    };
    const id = modals.openModal({
      title: "ลบ Tag",
      zIndex: "999",
      centered: true,
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      children: (
        <Stack size="xs">
          <Text size="sm">{`คุณต้องการลบ Tag \"{item}\" หรือไม่?`}</Text>
          <Group position="right">
            <Button
              className="bg-background text-title hover:bg-background hover:opacity-75"
              onClick={() => modals.closeModal(id)}
            >
              ยกเลิก
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
              onClick={() => handleOnClick()}
            >
              ลบ
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  const openAddTagModal = (tag) => {
    const handleOnClick = () => {
      handleTag("add", tag, inputRef.current.value);
      modals.closeModal(id);
    };
    const id = modals.openModal({
      title: "เพิ่ม Tag",
      zIndex: "999",
      centered: true,
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      children: (
        <Stack size="xs">
          <Input
            ref={inputRef}
            icon={<Tag size={20} />}
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
            placeholder="ชื่อ Tag"
          />
          <Group position="right">
            <Button
              className="bg-accent text-title hover:bg-accent hover:opacity-50"
              onClick={() => modals.closeModal(id)}
            >
              ยกเลิก
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
              onClick={() => handleOnClick()}
            >
              เพิ่ม
            </Button>
          </Group>
        </Stack>
      ),
    });
  };
  const removeButton = (item, index, tag) => {
    return (
      <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
        <X size={10} onClick={() => openDeleteModal(item, index, tag)} />
      </ActionIcon>
    );
  };

  const genres = data.genre.map((item, index) => (
    <Badge
      key={index}
      variant="outline"
      sx={{ paddingRight: 3 }}
      rightSection={removeButton(item, index, "genre")}
    >
      {item}
    </Badge>
  ));

  return (
    <InputWrapper
      label="Tag ประเภทของเนื้อหา"
      description="เช่น Action, Comedy, Romance, Drama"
    >
      <Group spacing="xs">
        {genres}
        <Badge variant="outline" sx={{ padding: 0 }}>
          <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
            <Plus size={10} onClick={() => openAddTagModal("genre")} />
          </ActionIcon>
        </Badge>
      </Group>
    </InputWrapper>
  );
}
