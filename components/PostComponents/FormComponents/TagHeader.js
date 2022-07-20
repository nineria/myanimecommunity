import React, { useState } from "react";
// Components
import {
  ActionIcon,
  Badge,
  Group,
  Input,
  InputWrapper,
  MultiSelect,
  Select,
  Stack,
} from "@mantine/core";
// Icons
import { Tag, X } from "tabler-icons-react";

const tagsData = [
  {
    label: "คำถาม",
    value: {
      label: "คำถาม",
      color: {
        from: "indigo",
        to: "cyan",
      },
    },
  },
  {
    label: "สปอย",
    value: {
      label: "สปอย",
      color: {
        from: "red",
        to: "red",
      },
    },
  },
  {
    label: "รีวิว",
    value: {
      label: "รีวิว",
      color: {
        from: "teal",
        to: "lime",
      },
    },
  },
  {
    label: "ข่าวสาร",
    value: {
      label: "ข่าวสาร",
      color: {
        from: "orange",
        to: "red",
      },
    },
  },
];

export default function TagHeader({ data, setData }) {
  const handleDeleteTag = (label) => {
    data.pop(label);
    setData(data);
  };

  const tag =
    data &&
    data.map((item, index) => {
      return (
        <Badge
          key={index}
          variant="gradient"
          gradient={{ from: item.color?.from, to: item.color?.to, deg: 30 }}
          className="text-[#fff]"
          rightSection={
            <X size={10} onClick={() => handleDeleteTag(item.label)} />
          }
        >
          {item.label}
        </Badge>
      );
    });

  return (
    <InputWrapper
      label={
        <Group spacing="xs">
          <Tag size={14} /> ประเภทของโพสต์
        </Group>
      }
      description="เลือกประเภทของโพสต์ มากกว่า หรืออย่างใดอย่างหนึ่ง"
    >
      <Group spacing="xs" mb="xs">
        {tag}
      </Group>
      <MultiSelect
        required
        data={tagsData}
        onChange={(value) => setData(value)}
        placeholder="เลือกประเภทของโพสต์"
      />

      {/* <Group
        spacing="4px"
        className="bg-accent bg-opacity-50 border-title border-opacity-20 border-[1px] rounded-md p-1"
      >
        {tags}

        <Input
          icon={<Tag size={14} />}
          placeholder="เพิ่ม"
          onKeyDown={handleKeyDown}
          classNames={{
            input: "bg-transparent bg-opacity-50 max-w-[100px]  border-none",
          }}
          size="xs"
        />
      </Group> */}
    </InputWrapper>
  );
}
