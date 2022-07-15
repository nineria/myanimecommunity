import Announcement from "@components/Announcement";
import { firestore, postToJSON } from "@lib/firebase";
import { Card, Input, InputWrapper, Stack, Text, Title } from "@mantine/core";
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

  // {names.filter(name => name.includes('J')).map(filteredName => (
  //   <li>
  //     {filteredName}
  //   </li>
  // ))}
  // .map((item, index) => <Announcement key={index} {...item} />);

  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Stack>
        <Title order={3}>ควบคุมประกาศของเว็บไซต์</Title>
        <Text>ประกาศที่กำลังเปิดใช้</Text>
        {publicAnnouncement &&
          publicAnnouncement.map((item, index) => (
            <Announcement key={index} {...item} />
          ))}
        <Text>ประกาศที่ยกเลิกไปแล้ว</Text>
        {privateAnnouncement &&
          privateAnnouncement.map((item, index) => (
            <Announcement key={index} {...item} />
          ))}
      </Stack>
    </Card>
  );
}
