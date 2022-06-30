// import MarkdownPreview from "@components/MarkdownPreview";
import React, { useMemo, useState } from "react";
// Components
import { Avatar, Button, Tabs, Text } from "@mantine/core";
import RichTextEditor from "@components/RichText";

const people = [
  { id: 1, value: "Bill Horsefighter" },
  { id: 2, value: "Amanda Hijacker" },
  { id: 3, value: "Leo Summerhalter" },
  { id: 4, value: "Jane Sinkspitter" },
];

const tags = [
  { id: 1, value: "Action" },
  { id: 2, value: "Adventure" },
  { id: 3, value: "Comedy" },
  { id: 4, value: "Drama" },
  { id: 5, value: "Fantasy" },
  { id: 6, value: "Girls Love" },
  { id: 7, value: "Gourmet" },
  { id: 8, value: "Horror" },
  { id: 9, value: "Mystery" },
  { id: 10, value: "Romance" },
  { id: 11, value: "Sci-Fi" },
  { id: 12, value: "Slice of Life" },
  { id: 13, value: "Sports" },
  { id: 14, value: "Supernatural" },
  { id: 15, value: "Suspense" },
  { id: 16, value: "Boys Love" },
];

const handleImageUpload = (image) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      "https://api.imgbb.com/1/upload?key=c87f45db6d1d5ccc1b31d0f69d380463",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => resolve(result.data.url))
      .catch(() => reject(new Error("Upload failed")));
  });

export default function CreateComment({ data }) {
  // const [markdown, setMarkdown] = useState(``);
  const [value, onChange] = useState("");

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        const list = mentionChar === "@" ? people : tags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm);
      },
    }),
    []
  );

  return (
    <div className="bg-foreground">
      <div className="flex flex-row">
        <LeftMenu data={data} />
        <div className="px-[0.5px] bg-white opacity-50"></div>
        <div className="p-2 text-title w-full">
          <div className="border-[1px] border-white border-opacity-10 rounded-sm p-2">
            <Tabs
              variant="default"
              classNames={{
                tabLabel: "text-title",
              }}
            >
              <Tabs.Tab label="เขียน">
                <RichTextEditor
                  sticky={true}
                  stickyOffset={55}
                  value={value}
                  onChange={onChange}
                  placeholder="พิมพ์ @ หรือ # เพื่อแท็กผู้คน และ แนวอนิเมะที่ชอบ"
                  mentions={mentions}
                  onImageUpload={handleImageUpload}
                  classNames={{
                    root: "bg-black/10 text-title border-[#fff] border-opacity-20",
                    toolbar: "bg-foreground text-title",
                    toolbarControl:
                      "bg-foreground border-title border-opacity-20 hover:bg-background",
                  }}
                />
              </Tabs.Tab>
              <Tabs.Tab label="ตัวอย่าง">
                <RichTextEditor
                  readOnly
                  value={value}
                  classNames={{
                    root: "bg-black/10 text-title border-[#fff] border-opacity-20",
                  }}
                />
                {/* <MarkdownPreview markdown={value} /> */}
              </Tabs.Tab>
            </Tabs>
            <div className="flex flex-row justify-between mt-2">
              <div className="flex flex-row gap-1 items-center mt-2 text-title">
                <Text size="xs">
                  โปรดปฏิบัติตาม{" "}
                  <span className="text-content">กฎ กติกา และมารยาท</span>{" "}
                  ของเว็บไซต์ MyAnimeCommunity อย่างเคร่งครัด
                  เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ
                </Text>
              </div>
              <Button
                className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
                variant="default"
                onClick={() => console.log(value)}
              >
                คอมเมนต์
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftMenu({ data }) {
  return (
    <div className="px-2 py-4 mt-2">
      <div className="flex flex-col gap-2 items-center w-[100px]">
        <Avatar radius="xl" size="lg" src={data.photoURL} alt={data.username} />
        <div className="block text-center">
          <Text color="red">{data.username}</Text>
          <p className="text-title text-xs">Admin</p>
        </div>
      </div>
    </div>
  );
}
