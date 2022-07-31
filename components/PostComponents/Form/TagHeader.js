// Components
import { Badge, Group, InputWrapper, MultiSelect } from "@mantine/core";
// Icons
import { Tag } from "tabler-icons-react";

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
  {
    label: "ปัญหา",
    value: {
      label: "ปัญหา",
      color: {
        from: "#000000",
        to: "#434343",
      },
    },
  },
];

export default function TagHeader({ data, setData }) {
  const tag =
    data &&
    data.map((item, index) => {
      return (
        <Badge
          key={index}
          variant="gradient"
          gradient={{ from: item.color?.from, to: item.color?.to, deg: 30 }}
          className="text-[#fff]"
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
    </InputWrapper>
  );
}
