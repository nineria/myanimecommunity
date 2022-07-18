import React, { useState } from "react";
// Components
import { ActionIcon, Badge, Group, Input, InputWrapper } from "@mantine/core";
// Icons
import { Tag, X } from "tabler-icons-react";

export default function TagGenre({ data, setData }) {
  const [tags, setTags] = useState([]); // Used to update page

  const handleRemoveTag = (item, index) => {
    data.splice(index, 1);
    setData(data);
    setTags([...tags, item]);
  };

  const removeButton = (item, index) => {
    return (
      <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
        <X size={10} onClick={() => handleRemoveTag(item, index)} />
      </ActionIcon>
    );
  };

  const genres = data.map((item, index) => (
    <Badge
      key={index}
      variant="outline"
      sx={{ paddingRight: 3 }}
      rightSection={removeButton(item, index)}
    >
      {item}
    </Badge>
  ));

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;

    if (!value.trim()) return;

    data.push(value);

    setData(data);
    setTags([...tags, value]);

    e.target.value = "";
    e.preventDefault();
  };

  return (
    <InputWrapper
      label={
        <Group spacing="xs">
          <Tag size={14} /> ประเภทของเนื้อหา
        </Group>
      }
      description="เช่น Action, Comedy, Romance, Drama - กด Enter เพื่อเพิ่มประเภทของเนื้อหา"
    >
      <Group
        spacing="4px"
        className="bg-accent bg-opacity-50 border-title border-opacity-20 border-[1px] rounded-md p-1"
      >
        {genres}
        <Input
          icon={<Tag size={14} />}
          placeholder="เพิ่ม"
          onKeyDown={handleKeyDown}
          className=""
          classNames={{
            input: "bg-transparent bg-opacity-50 max-w-[100px] border-none",
          }}
          size="xs"
        />
      </Group>
    </InputWrapper>
  );
}
