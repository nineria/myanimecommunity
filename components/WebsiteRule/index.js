import React, { useEffect } from "react";
// Components
import { useThemeContext } from "@lib/useTheme";
import { Button, Card, Group, List, Stack, Title } from "@mantine/core";
import { useModals } from "@mantine/modals";

export default function WebsiteRule() {
  const { setTheme } = useThemeContext();

  const modals = useModals();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

  const openModals = () => {
    const id = modals.openModal({
      zIndex: "999",
      centered: true,
      withCloseButton: false,
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      size: "1000px",
      children: (
        <Stack size="xs">
          <Card className="bg-foreground text-title">
            <Stack spacing="lg">
              <Title order={2} mb="xs" align="center">
                กฎ กติกา และมารยาท
              </Title>

              <Stack spacing="xs">
                <Title order={4} mb="xs">
                  การร่วมกิจกรรมแสดงความเห็นในเว็บไซต์
                  ผู้เข้าร่วมพึงต้องปฏิบัติดังต่อไปนี้
                </Title>

                <List
                  type="ordered"
                  withPadding
                  className="list-decimal list-outside"
                  spacing="xs"
                >
                  <List.Item>
                    ห้ามเสนอข้อความหรือเนื้อหาที่ส่อไปในทางหยาบคาย ก้าวร้าว
                    เกินกว่าที่บรรทัดฐานของสังคมจะยอมรับได้
                  </List.Item>
                  <List.Item>
                    ห้ามเสนอข้อความหรือเนื้อหาที่ส่อไปในทาง ลามก อนาจาร รุนแรง
                    อุจาด
                  </List.Item>
                  <List.Item>
                    ห้ามเสนอข้อความอันมีเจตนาใส่ความบุคคลอื่น
                    ให้ได้รับการดูหมิ่นเกลียดชังจากบุคคลอื่น
                  </List.Item>
                  <List.Item>
                    ห้ามเสนอข้อความอันเป็นการท้าทาย ชักชวน
                    โดยมีเจตนาก่อให้เกิดการทะเลาะวิวาท
                    หรือก่อให้เกิดความวุ่นวายขึ้น
                  </List.Item>
                  <List.Item>
                    ห้ามใช้นามแฝงอันเป็นชื่อจริงของผู้อื่น
                    โดยมีเจตนาทำให้สาธารณชนเข้าใจผิด
                    และเจ้าของชื่อผู้นั้นได้รับความเสียหาย
                    หรือเสื่อมเสียชื่อเสียง
                  </List.Item>
                  <List.Item>
                    ห้ามเสนอข้อความอันอาจเป็นเหตุให้เกิดความขัดแย้งขึ้นในระหว่างสังคมใดๆ
                  </List.Item>
                  <List.Item>
                    ห้ามเสนอข้อมูลส่วนตัวของผู้อื่น เช่น
                    อีเมลหรือหมายเลขโทรศัพท์
                    โดยมีเจตนากลั่นแกล้งให้ผู้อื่นได้รับความเดือดร้อนรำคาญ
                  </List.Item>
                  <List.Item>
                    ห้ามเสนอข้อความหรือเนื้อหาอันเป็นสิ่งที่เกี่ยวข้องกับสิ่งผิดกฎหมายหรือศีลธรรมอันดีของสังคม
                  </List.Item>
                  <List.Item>
                    เพื่อความสะดวกในการให้บริการ และปรับปรุงคุณภาพในการให้บริการ
                    สำรวจความนิยม และปฏิบัติตามกฎหมาย MyAnimeCommu
                    จำเป็นต้องจัดเก็บข้อมูลของท่านบางประการ เช่น หมายเลขไอพี (IP
                    Address) ชนิดของโปรแกรมค้นหา (Web Browser) บันทึกหน้าเว็บ
                    (Web Page) เวลาเข้าเยี่ยมชม (Access Times)
                    โดยทั้งนี้ข้อมูลที่ทาง MyAnimeCommu
                    จัดเก็บนั้นจะไม่ถูกนำไปเผยแพร่ต่อบุคคลที่สามในลักษณะที่จะสามารถระบตัวบุคคลผู้เข้าใช้งานได้
                    แต่จัดเก็บเป็นข้อมูลผู้เข้าใช้งานโดยรวมไปเพื่อนำไปประกอบการวิเคราะห์สำรวจความนิยม
                    เว้นแต่เป็นไปเพื่อการปฏิบัติตามกฎหมายเท่านั้น
                  </List.Item>
                </List>
              </Stack>
              <Stack spacing="xs">
                <Title order={4} mb="xs">
                  เว็บไซต์ MyAnimeCommunity ขอสงวนสิทธิดังต่อไปนี้
                </Title>
                <List
                  type="ordered"
                  withPadding
                  className="list-decimal list-outside"
                  spacing="xs"
                >
                  <List.Item>
                    ขอสงวนสิทธิยกเลิกการให้บริการแก่สมาชิกซึ่งไม่ให้ความร่วมมือในการรักษากฎ
                    กติกาและมารยาทของเว็บไซต์ เพื่อรักษาบรรยากาศชุมชนคนรักอนิเมะ
                  </List.Item>
                  <List.Item>
                    ขอสงวนสิทธิในการลบโพสต์ กระทู้
                    หรือข้อความของผู้ใช้ที่ไม่ให้ความร่วมมือในการรักษากฎ
                    กติกาและมารยาทของเว็บไซต์ โดยไม่แจ้งให้ทราบ
                  </List.Item>
                </List>
              </Stack>
            </Stack>
          </Card>
          <Group position="center">
            <Button
              className="bg-background text-title hover:bg-background hover:opacity-75"
              onClick={() => modals.closeModal(id)}
            >
              เข้าใจแล้ว
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <div className="flex flex-row items-center gap-2 text-xs my-2">
      <span className="w-full">
        โปรดปฏิบัติตาม{" "}
        <span
          className="text-content underline cursor-pointer"
          onClick={openModals}
        >
          กฎ กติกา และ มารยาท
        </span>{" "}
        ของเว็บไซต์ MyAnimeCommunity
        <p>เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ</p>
      </span>
    </div>
  );
}
