import React, { useEffect, useState } from "react";
// Components
import { InputWrapper, Tabs } from "@mantine/core";
import RichTextEditor from "@components/RichText";

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

export default function PostContent({ content, setContent }) {
  return (
    <InputWrapper
      required
      label="เนื้อหา"
      description="รายระเอียดเนื้อหาของโพตส์ เช่น รูปภาพ หรือ วิดีโอ รวมไปถึง Link ต่างๆ"
    >
      <Tabs
        variant="default"
        classNames={{
          tabLabel: "text-title",
        }}
      >
        <Tabs.Tab label="เขียน">
          <RichTextEditor
            sticky={true}
            stickyOffset={-55}
            value={content}
            onChange={setContent}
            placeholder="รายระเอียดเนื้อหาของโพตส์ เช่น รูปภาพ หรือ วิดีโอ รวมไปถึง Link ต่างๆ"
            onImageUpload={handleImageUpload}
            classNames={{
              root: "bg-black/5 text-title border-[#fff] border-opacity-20",
              toolbar: "bg-foreground text-title",
              toolbarControl:
                "bg-foreground border-title border-opacity-20 hover:bg-background",
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab label="ตัวอย่าง">
          <RichTextEditor
            readOnly
            value={content}
            classNames={{
              root: "bg-black/10 text-title border-[#fff] border-opacity-20",
            }}
          />
        </Tabs.Tab>
      </Tabs>
    </InputWrapper>
  );
}
