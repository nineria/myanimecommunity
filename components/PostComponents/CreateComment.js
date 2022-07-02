// import MarkdownPreview from "@components/MarkdownPreview";
import React, { useContext, useEffect, useMemo, useState } from "react";
// Components
import { Avatar, Button, Tabs, Text } from "@mantine/core";
import RichTextEditor from "@components/RichText";
import { UserContext } from "@lib/context";
import { auth, firestore, serverTimestamp } from "@lib/firebase";
import kebabCase from "lodash.kebabcase";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

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

export default function CreateComment({ post }) {
  const { userData } = useContext(UserContext);
  const [value, onChange] = useState("");

  const HandleSubmit = async () => {
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(post.uid)
      .collection("posts")
      .doc(kebabCase(post.title))
      .collection("comments")
      .doc();

    const data = {
      uid: uid,
      slug: ref.id,
      content: value,
      username: userData.username,
      avatar: userData.avatar,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      likes: 0,
    };

    await ref.set(data);

    showNotification({
      color: "teal",
      title: `${userData?.username} ได้เขียนคอมเมต์แล้ว`,
      icon: <Check size={18} />,
      classNames: {
        root: "bg-foreground border-teal-400",
      },
    });
  };

  return (
    <div className="bg-foreground">
      <div className="flex flex-row">
        <LeftMenu data={userData} />
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
                  controls={[
                    ["bold", "italic", "underline", "link"],
                    ["h3", "h4"],
                    ["image", "video"],
                  ]}
                  sticky={true}
                  stickyOffset={55}
                  value={value}
                  onChange={onChange}
                  placeholder="คุณกำลังคิดอะไรอยู่"
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
                onClick={() => HandleSubmit()}
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
        <Avatar radius="xl" size="lg" src={data.avatar} alt={data.username} />
        <div className="block text-center">
          <Text color="red">{data.username}</Text>
          <p className="text-title text-xs">{data.rule}</p>
        </div>
      </div>
    </div>
  );
}
