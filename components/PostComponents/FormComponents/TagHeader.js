import React, { useState } from "react";
// Components
import { ActionIcon, Badge, Group, Input, InputWrapper } from "@mantine/core";
// Icons
import { Tag, X } from "tabler-icons-react";

export default function TagHeader({ data, setData }) {
  const [tmpTags, setTmpTags] = useState([]);

  const handleRemoveTag = (item, index) => {
    data.tag.splice(index, 1);
    setData(data);
    setTmpTags([...tmpTags, item]);
    console.log(data.tag);
  };

  const removeButton = (item, index) => {
    return (
      <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
        <X size={10} onClick={() => handleRemoveTag(item, index)} />
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
