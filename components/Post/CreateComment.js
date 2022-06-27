import { Avatar, Button, Tabs, Text, Textarea } from "@mantine/core";
import React from "react";
import { Markdown } from "tabler-icons-react";

export default function CreateComment({ data }) {
  return (
    <div className="bg-foreground ">
      <div className="flex flex-row">
        <LeftMenu data={data} />
        <div className="px-[0.5px] bg-white opacity-50"></div>
        <div className="p-2 text-title w-full">
          <div className="border-[1px] border-white border-opacity-10 rounded-sm p-2">
            <Tabs variant="outline">
              <Tabs.Tab label="เขียน">
                <Textarea
                  minRows={1}
                  autosize
                  placeholder="เขียนความคิดเห็น…"
                />
              </Tabs.Tab>
              <Tabs.Tab label="ตัวอย่าง">
                สั่นพ้องในที่นี้คือการที่ยูจิกินนิ้วของสุคุนะเข้าไป
                จึงทำให้มีเหล่าวิญญาณคำสาปออกมาเพ่นพ่านมากมายค่ะ
                ยูจิไปปลุกราชาคำสาปอย่างสุคุนะขึ้นมา
                จึงทำให้พลังคำสาปตื่นขึ้นมาด้วย
                เมงุมิไม่อยากให้ยูจิรู้เรื่องนี้เพราะอาจจะทำให้ยูจิโทษตัวเองว่าเรื่องทั้งหมดที่มันเกิดขึ้น
                ความตายมั้งหมดที่มันเกิดขึ้น มันเป็นเพราะเค้า
                เมงุมิเลยบอกโนบาระว่าอย่าให้ยูจิรู้เรื่องนี้เด็ดขาดค่ะ
              </Tabs.Tab>
            </Tabs>
            <div className="flex flex-row justify-between mt-2">
              <div className="flex flex-row gap-1 items-center">
                <Markdown size={16} />
                <Text size="xs">
                  รองรับการเขียนด้วย{" "}
                  <span>
                    <a
                      href="https://www.markdownguide.org/basic-syntax/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-content"
                    >
                      Markdown
                    </a>
                  </span>
                </Text>
              </div>
              <Button
                className="bg-content text-accent hover:bg-content hover:opacity-75"
                variant="default"
                size="xs"
              >
                โพสต์
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center mt-2 text-title">
            <Text size="xs">
              โปรดปฏิบัติตาม กฎ กติกา และมารยาท ของเว็บไซต์ MyAnimeCommunity
              อย่างเคร่งครัด เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ
            </Text>
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
