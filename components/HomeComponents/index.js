import { useContext, useEffect, useState } from "react";
// Context
import { UserContext } from "@lib/context";
// Components
import Post from "./Post";
import Add from "@components/HomeComponents/Add";
import { Button, Container, Modal } from "@mantine/core";
// Icons
import { Animate } from "react-simple-animate";
import AdminCheck from "@components/AdminCheck";
import { firestore } from "@lib/firebase";

export const admin = "ผู้ดูแลระบบ";

export default function HomeComponents({ homePosts }) {
  const { user } = useContext(UserContext);

  const [opened, setOpened] = useState(false);

  const [newPostToday, setNewPostToDay] = useState();

  useEffect(() => {
    const getToDayPost = async () => {
      const query = firestore
        .collectionGroup("posts")
        .orderBy("createdAt", "desc")
        .limit(3);
      const newPosts = (await query.get()).docs.map((doc) => doc.data());
      setNewPostToDay(newPosts);
    };
    getToDayPost();
  }, []);

  return (
    <Container size="lg">
      <div className={` mt-2 text-white w-full`}>
        <Animate
          play
          start={{
            transform: "translateY(1%)",
            opacity: "0",
          }}
          end={{ transform: "translateY(0%)", opacity: "1" }}
        >
          <div className="flex flex-col gap-2">
            {/* Add home post */}
            {user && (
              <AdminCheck>
                <div className="flex flex-row justify-between w-full ">
                  <Modal
                    size="lg"
                    opened={opened}
                    onClose={() => setOpened(false)}
                    closeOnClickOutside={false}
                    title="สร้างโพสต์ - หน้าหลัก"
                    centered
                    classNames={{
                      modal: "bg-foreground",
                      overlay: "bg-background",
                      title: "text-title",
                    }}
                  >
                    <Add setOpened={setOpened} />
                  </Modal>
                  <Button
                    onClick={() => setOpened(true)}
                    className="bg-content text-[#fff] hover:bg-content hover:opacity-75 "
                    variant="default"
                    size="xs"
                  >
                    สร้างโพสต์ +
                  </Button>
                </div>
              </AdminCheck>
            )}

            {newPostToday && <Post today homePosts={newPostToday} />}

            {/* Display home post */}
            <div className="flex flex-col gap-2">
              {homePosts &&
                homePosts.map((post, index) => (
                  <Post key={index} homePosts={post} />
                ))}
            </div>
          </div>
        </Animate>
      </div>
    </Container>
  );
}
