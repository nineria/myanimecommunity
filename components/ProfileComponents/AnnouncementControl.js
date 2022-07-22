import Announcement from "@components/Announcement";
import AddAnnouncement from "@components/Announcement/Add";
import { firestore, postToJSON } from "@lib/firebase";
import { Card, InputWrapper, Stack, Title } from "@mantine/core";
import React, { useState } from "react";
import { useEffect } from "react";

export default function AnnouncementControl() {
  const [announcements, setAnnouncement] = useState();

  useEffect(() => {
    const getAnnouncement = async () => {
      const announcementsQuery = firestore.collectionGroup("announcements");
      const announcements = (await announcementsQuery.get()).docs.map(
        postToJSON
      );

      setAnnouncement(announcements);
    };
    getAnnouncement();
  }, []);

  const publicAnnouncement =
    announcements &&
    announcements.filter((item) => {
      return item.published === true;
    });

  const privateAnnouncement =
    announcements &&
    announcements.filter((item) => {
      return item.published === false;
    });

  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Stack>
        <Title order={3}>จัดการประกาศ</Title>
        <AddAnnouncement />
        <InputWrapper
          label="ประกาศที่กำลังเปิดใช้"
          description="ประกาศทั้งหมดที่กำลังเปิดใช้จะถูกแสดงอยู่ที่นี่ - PUBLISHED"
        >
          <div className="bg-background px-4 py-2 ">
            <Stack spacing="xs">
              {publicAnnouncement &&
                publicAnnouncement.map((item, index) => (
                  <Announcement key={index} {...item} />
                ))}
            </Stack>
          </div>
        </InputWrapper>
        <InputWrapper
          label="ประกาศที่ยังไม่เปิดใช้"
          description="ประกาศที่ยังไม่เปิดใช้จะถูกแสดงอยู่ที่นี่ - ON HOLD"
        >
          <div className="bg-background px-4 py-2">
            <Stack spacing="xs">
              {privateAnnouncement &&
                privateAnnouncement.map((item, index) => (
                  <Announcement key={index} {...item} />
                ))}
            </Stack>
          </div>
        </InputWrapper>
      </Stack>
    </Card>
  );
}
