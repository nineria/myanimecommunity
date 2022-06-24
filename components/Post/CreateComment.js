import { Avatar, Tabs, Text, Textarea } from "@mantine/core";
import React from "react";
import { AlertTriangle, Markdown } from "tabler-icons-react";

export default function CreateComment({ data }) {
  return (
    <div className="bg-foreground ">
      <div className="flex flex-row">
        <LeftMenu data={data} />
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
                <Text size="xs">รองรับการเขียนด้วย Markdown</Text>
              </div>
              <button className="bg-content px-4 rounded-sm hover:opacity-75">
                โพสต์
              </button>
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
    <div className="m-4">
      <Avatar radius="xl" size="lg" src={data?.photoURL} alt={data?.username} />
    </div>
  );
}
