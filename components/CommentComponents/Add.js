import React, { useContext, useState } from "react";
import { Button, Modal, Stack, Text } from "@mantine/core";
import WebsiteRulePage from "@components/WebsiteRule";
import RichTextEditor from "utils/RichText";
import { UserContext } from "lib/context";
import { auth, firestore, serverTimestamp } from "lib/firebase";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import Logo from "@components/Logo";
import WebsiteRule from "@components/WebsiteRule";
import { useRouter } from "next/router";
import { useModals } from "@mantine/modals";
import Verify from "@components/Verify";
import LeftMenuAdd from "./Elements/LeftMenuAdd";

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

export default function Add({ post }) {
  const modals = useModals();
  const { userData } = useContext(UserContext);
  const [value, onChange] = useState("");

  const router = useRouter();

  const [openedWebsiteRule, setOpenedWebsiteRule] = useState(false);

  const HandleSubmit = async () => {
    if (value === "<p><br></p>") {
      const id = modals.openModal({
        title: (
          <Stack>
            <Text size="sm">ข้อความของคุณว่างเปล่า?</Text>
            <Text size="xs">กรุณาใส่ข้อความที่ต้องการตอบกลับ</Text>
          </Stack>
        ),
        zIndex: "999",
        centered: true,
        classNames: {
          modal: "bg-foreground",
          overlay: "bg-background",
        },
        withCloseButton: false,
        size: "sm",
        children: (
          <Button
            fullWidth
            size="xs"
            type="submit"
            className="bg-green-500 hover:bg-green-500 hover:opacity-75"
            onClick={() => modals.closeModal(id)}
          >
            เข้าใจแล้ว
          </Button>
        ),
      });
      return;
    }

    const uid = auth.currentUser.uid;

    const userStatistics = firestore.collection("statistics").doc(uid);
    const userStatisticsPosts = (await userStatistics.get()).data();
    await userStatistics.update({
      comments: userStatisticsPosts.comments + 1,
    });

    const ref = firestore
      .collection("users")
      .doc(post.uid)
      .collection("posts")
      .doc(post.slug)
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
    router.reload();
  };

  return (
    <div className="bg-foreground rounded-sm">
      <div className="flex md:flex-row flex-col">
        <LeftMenuAdd data={userData} />
        <div className="md:block hidden px-[0.5px] bg-white opacity-50"></div>
        <div className="p-2 text-title w-full">
          <div className="border-[1px] border-white border-opacity-10 rounded-sm p-2">
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

            <div className="flex flex-row justify-between mt-2">
              <Modal
                size="1000px"
                mx="sm"
                overlayColor="#333"
                opened={openedWebsiteRule}
                onClose={() => setOpenedWebsiteRule(false)}
                title={<Logo />}
                classNames={{
                  modal: "bg-foreground",
                  overlay: "bg-background",
                  title: "text-title",
                }}
              >
                {openedWebsiteRule && <WebsiteRulePage />}
              </Modal>
              <WebsiteRule />
              {userData && userData.email === "" ? (
                <Verify>ตอบกลับ</Verify>
              ) : (
                <Button
                  size="xs"
                  className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
                  variant="default"
                  onClick={() => HandleSubmit()}
                >
                  ตอบกลับ
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
