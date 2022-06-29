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
import React, { useState } from "react";
import { Tag, X } from "tabler-icons-react";
import { useModals } from "@mantine/modals";

export default function TagHeader({ data, setData }) {
  const modals = useModals();

  const [tmpTags, setTmpTags] = useState([]);

  const openDeleteModal = (item, index) => {
    const handleOnClick = () => {
      data.tag.splice(index, 1);
      setData(data);
      console.log(data.tag);
      modals.closeModal(id);
    };
    const id = modals.openModal({
      title: (
        <Text size="sm">
          คุณต้องการลบ
          <Badge key={index} variant="outline" mx="xs">
            {item}
          </Badge>
          หรือไม่?
        </Text>
      ),
      zIndex: "999",
      centered: true,
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      size: "sm",
      children: (
        <Stack size="xs">
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

  const removeButton = (item, index) => {
    return (
      <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
        <X size={10} onClick={() => openDeleteModal(item, index)} />
      </ActionIcon>
    );
  };

  const tags = data.tag.map((item, index) => {
    return (
      <Badge
        key={index}
        variant="outline"
        sx={{ paddingRight: 3 }}
        rightSection={removeButton(item, index)}
      >
        {item}
      </Badge>
    );
  });

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;

    if (!value.trim()) return;

    data.tag.push(value);

    setData(data);
    setTmpTags([...tmpTags, value]);

    e.target.value = "";
    e.preventDefault();
  };

  return (
    <InputWrapper
      label={
        <Group spacing="xs">
          <Tag size={14} /> ประเภทของโพสต์
        </Group>
      }
      description="เช่น คำถาม, สปอย, รีวิว"
    >
      <Group
        spacing="4px"
        className="bg-accent bg-opacity-50 border-title border-opacity-20 border-[1px] rounded-md p-1"
      >
        {tags}
        <Input
          icon={<Tag size={14} />}
          placeholder="เพิ่ม"
          onKeyDown={handleKeyDown}
          className=""
          classNames={{
            input: "bg-transparent bg-opacity-50 max-w-[100px]  border-none",
          }}
          size="xs"
        />
      </Group>
    </InputWrapper>
  );
}
