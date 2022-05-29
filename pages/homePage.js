import React from "react";
import HomePost, { Body, Title, Header, Content } from "@components/HomePost";
import { Container } from "@chakra-ui/react";
import { Animate } from "react-simple-animate";

export default function HomePage() {
  return (
    <div>
      <div className="bg-img h-full">
        <Container maxW="container.xl">
          <Animate
            play
            start={{
              transform: "translateY(1%)",
              opacity: "0",
            }}
            end={{ transform: "translateY(0%)", opacity: "1" }}
          >
            <div className="flex flex-col gap-2">
              <HomePost>
                <Title link="/news">อัพเดทข่าวสาร</Title>
                <Body linkHeading="/">
                  <Header link="/news">
                    ข่าวสารอนิเมะอนิเมะ & ประกาศจากเว็บไซต์
                  </Header>
                  <Content>
                    โพสต์รวบรวมอนิเมะเปิดตัวใหม่ และข่าวสารต่างๆ เกี่ยวกับอนิเมะ
                  </Content>
                </Body>
              </HomePost>

              <HomePost>
                <Title link="/review">รีวิว อนิเมะ มังงะ สปอย</Title>
                <Body linkHeading="/">
                  <Header link="/review">
                    รีวิวอนิเมะเปิดตัวใหม่ และข้อมูลที่เกี่ยวข้อง
                  </Header>
                  <Content>
                    โพสต์รวบรวมรีวิวอนิเมะก่อนไปรับชม และเรื่องย่อต่างๆ
                    พร้อมข้อมูลจำเพราะของตัวละคร ฯลฯ
                  </Content>
                </Body>
              </HomePost>

              <HomePost>
                <Title link="/review">Q&A ถาม-ตอบ ข้อสงสัยต่างๆ</Title>
                <Body linkHeading="/">
                  <Header link="/review">
                    โพสต์ ถาม-ตอบ ข้อสงสัยเกี่ยวกับ อนิเมะ มังงะ{" "}
                  </Header>
                  <Content>
                    โพสต์รวบรวมรีวิวอนิเมะก่อนไปรับชม และเรื่องย่อต่างๆ
                    พร้อมข้อมูลจำเพราะของตัวละคร ฯลฯ
                  </Content>
                </Body>
              </HomePost>

              <HomePost>
                <Title link="/news">โพสต์ใหม่วันนี้</Title>
                <Body linkHeading="/">
                  <Header link="/news">
                    สงสัยเกี่ยวกับตอนจบอนิเมะ Jujutsu Kaisen ครับ
                  </Header>
                  <Content>
                    ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้
                    คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิ...
                  </Content>
                </Body>
                <Body linkHeading="/">
                  <Header link="/news">
                    ”ดาบพิฆาตอสูร” สุดยอดอนิเมะที่ต้องดูให้ได้สักครั้งใน NETFLIX
                  </Header>
                  <Content>
                    คามาโดะ ทันจิโร่ หนุ่มธรรมดาที่มีดีด้านประสาทรับรู้กลิ่น
                    (จมูกดีนั่นแหละ) กับหัวที่แข็งยังกับหิน ระหว่างที่เค้า...
                  </Content>
                </Body>
                <Body linkHeading="/">
                  <Header link="/news">
                    Violet Evergarden: The Movie
                    จดหมายฉบับสุดท้าย...แด่เธอผู้เป็นที่รัก
                  </Header>
                  <Content>
                    ผมให้ 9.5/10 เลยใครเป็นแฟนอนิเมะเรื่องนี้อย่าลืมไปดูกันนะ
                    เข้าฉายในโรงรอบพิเศษ 16 - 17 มกราคม และรอบปกติ...
                  </Content>
                </Body>
              </HomePost>

              <HomePost>
                <Title link="/news">นายทุน</Title>
                <Body linkHeading="/">
                  <Header link="/news">บริจาคเพื่อเว็บไซต์</Header>
                  <Content>
                    บริจาคให้กับเราเพื่อสนับสนุนชุมชนคนรักอนิเมะให้สามารถสร้างสรรค์ชุมชนอนิเมะที่น่าอยู่ต่อไปได้
                  </Content>
                </Body>
                <Body linkHeading="/">
                  <Header link="/news">”ดาบพิแนวทางในการพัฒนาเว็บไซต์</Header>
                  <Content>
                    สามารถแนะนำเราได้
                    เราพร้อมปรับปรุ่งแก้ไขเสมอเพื่อชุมชนคนรักอนิเมะ
                  </Content>
                </Body>
              </HomePost>

              <HomePost>
                <Title link="/news">ฟีดแบค & รายงาน</Title>
                <Body linkHeading="/">
                  <Header link="/news">แจ้งปัญหาเว็บไซต์</Header>
                  <Content>
                    คุณสามารถรายงานปัญหาเว็บไซต์ทั้งหมดที่พบได้ที่นี่
                  </Content>
                </Body>
                <Body linkHeading="/">
                  <Header link="/news">ปัญหาที่ได้รับการแก้ไขแล้ว</Header>
                  <Content>ปัญหาเว็บไซต์ทั้งหมดที่ได้รับการแก้ไขแล้ว</Content>
                </Body>
              </HomePost>

              <HomePost>
                <Title link="/news">คำถามที่พบบ่อย</Title>
                <Body linkHeading="/">
                  <Header link="/news">
                    ปัญหาการเข้าสู่ระบบและการลงทะเบียน
                  </Header>
                  <Content>ทำไมฉันต้องลงทะเบียน?</Content>
                </Body>
                <Body linkHeading="/">
                  <Header link="/news">ปัญหาการโพสต์</Header>
                  <Content>
                    ฉันจะสร้างหัวข้อใหม่หรือโพสต์ตอบกลับได้อย่างไร?
                  </Content>
                </Body>
              </HomePost>
            </div>
            <div className="h-[400px]"></div>
          </Animate>
        </Container>
      </div>
    </div>
  );
}
