import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Accordion,
  createStyles,
  Card,
  Stack,
} from "@mantine/core";
import Navbar from "@components/Navbar";
import { useThemeContext } from "@lib/useTheme";
import { Footer } from "@components/Footer";
import Metatags from "@components/Metatags";

const useStyles = createStyles((theme, _params, getRef) => ({
  icon: { ref: getRef("icon") },

  control: {
    ref: getRef("control"),
    border: 0,
    opacity: 0.6,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    "&:hover": {
      backgroundColor: "transparent",
      opacity: 1,
    },
  },

  item: {
    borderBottom: 0,
    overflow: "hidden",
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    border: "1px solid transparent",
    borderRadius: theme.radius.sm,
  },

  itemOpened: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],

    [`& .${getRef("control")}`]: {
      opacity: 1,
    },

    [`& .${getRef("icon")}`]: {
      transform: "rotate(45deg)",
    },
  },

  content: {
    paddingLeft: 0,
  },
}));

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await [
    {
      title: "ปัญหาการเข้าสู่ระบบและการลงทะเบียน",
      description: [
        {
          label: "ทำไมฉันต้องลงทะเบียน",
          content:
            "คุณไม่จำเป็นต้องทำสิ่งนี้ แต่จะขึ้นอยู่กับผู้ดูแลระบบเว็บไซตว่าคุณสามารถเห็นโพสต์หรือข้อความอะไรได้บ้างแต่การลงทะเบียนจะทำให้คุณสามารถเข้าถึงคุณสมบัติเพิ่มเติม ที่ไม่มีให้สำหรับผู้เยี่ยมชม เช่น รูปประจำตัวที่กำหนดดเองได้ การแสดงความคิดเห็น การสมัครสมาชิกเพื่อเข้าสู่กลุ่มผู้ใช้ ฯลฯ การลงทะเบียนจะใช้เวลาเพียงครู่เดียว เราขอแนะนำให้คุณสมัครสมาชิกเพื่อให้สามารถใช้งานเว็บไซต์ได้อย่างเต็มที่",
        },
        {
          label: "เหตุใดฉันจึงลงทะเบียนไม่ได้",
          content:
            "เป็นไปได้ว่าในขณะนี้ทางผู้ดูแลได้ปิดการลงทะเบียนเพื่อป้องกันไม่ให้ผู้เยี่ยมชมใหม่ลงทะเบียน หรือผู้ดูแลบอร์ดอาจแบนที่อยู่ IP ของคุณ หรือชื่อผู้ใช้ของคุณไม่ได้รับอนุญาตให้ใช้ คุณสามารถติดต่อผู้ดูแลระบบเพื่อขอความช่วยเหลือ ติดต่อ : MyAniCommu@gmail.com",
        },
        {
          label: "ฉันลงทะเบียนแล้ว แต่ไม่สามารถเข้าสู่ระบบได้",
          content:
            "ก่อนอื่นตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณให้แน่ใจว่าถูกต้อง และคุณจำเป็นต้องมีอายุมากกว่า 13 ปีขึ้นไปเพื่อให้สามารถเข้าใช้งานเว็บไซต์ของเราได้",
        },
        {
          label: "ทำไมฉันเข้าสู่ระบบไม่ได้",
          content:
            "มีสาเหตุหลายประการที่อาจเกิดขึ้นได้ ขั้นแรก ตรวจสอบให้แน่ใจว่าชื่อผู้ใช้และรหัสผ่านของคุณถูกต้อง หากเป็นเช่นนั้น โปรดติดต่อผู้ดูแลระบบเพื่อให้แน่ใจว่าคุณไม่ได้ถูกแบน อาจเป็นไปได้ว่ามีข้อผิดพลาดเกิดขึ้นบนเว็บไซต์ โปรดติดต่อผู้ดูแลระบบ",
        },
        {
          label: "ฉันเคยลงทะเบียนแล้ว แต่ไม่สามารถเข้าสู่ระบบได้อีกต่อไป",
          content:
            "เป็นไปได้ว่าผู้ดูแลระบบอาจระงับการใช้งานของคุณหรือลบบัญชีของคุณด้วยเหตุผลบางประการ นอกจากนี้ ทางเว็บไซต์จะทำการลบผู้ใช้ที่ไม่ได้โพสต์เป็นเวลานานออกเป็นระยะๆ เพื่อลดขนาดของฐานข้อมูล หากเกิดเหตุการณ์นี้ขึ้น ให้ลองลงทะเบียนใหม่อีกครั้ง",
        },
        {
          label: "ฉันลืมรหัสผ่าน",
          content:
            "ไม่ต้องตกใจ! แม้ว่าจะไม่สามารถเรียกคืนรหัสผ่านของคุณได้ แต่คุณสามารถรีเซ็ตได้อย่างง่ายดาย ไปที่หน้าเข้าสู่ระบบและคลิก ฉันลืมรหัสผ่าน ทำตามคำแนะนำและคุณจะสามารถเข้าสู่ระบบได้อีกครั้งในไม่ช้า อย่างไรก็ตาม หากคุณไม่สามารถรีเซ็ตรหัสผ่านได้ โปรดติดต่อผู้ดูแลระบบ",
        },
        {
          label: "ทำไมฉันถึงออกจากระบบโดยอัตโนมัติ",
          content:
            "หากคุณไม่ทำเครื่องหมาย ที่ช่องจดจำฉันเมื่อคุณเข้าสู่ระบบ เว็บไซต์จะให้คุณเข้าสู่ระบบเป็นเวลาที่กำหนดไว้ล่วงหน้าเท่านั้น หากต้องการอยู่ในระบบต่อไป ให้เลือกช่องจดจำฉันขณะเข้าสู่ระบบ เราไม่แนะนำให้คุณเข้าสู่ระบบจากคอมพิวเตอร์ที่ใช้ร่วมกัน เช่น ห้องสมุด อินเทอร์เน็ตคาเฟ่ ห้องปฏิบัติการคอมพิวเตอร์ของมหาวิทยาลัย ฯลฯ หากคุณไม่เห็นช่องทำเครื่องหมายนี้ แสดงว่าผู้ดูแลระบบได้ปิดใช้งานคุณลักษณะนี้ไปแล้ว หรือชั่วคราว",
        },
      ],
    },
  ];
  // Pass data to the page via props
  return { props: { data } };
}

export default function FaqPage({ data }) {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(true);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

  const FaqListData = [
    {
      title: "ค่าเริ่มต้นและการตั้งค่าของผู้ใช้",
      description: [
        {
          label: "ฉันจะเปลี่ยนการตั้งค่าของฉันได้อย่างไร",
          content:
            "หากคุณเป็นผู้ใช้ที่ลงทะเบียนแล้ว การตั้งค่าทั้งหมดของคุณจะถูกเก็บไว้ในฐานข้อมูล หากต้องการแก้ไข ให้ไปที่ “โปรไฟล์” ในหน้าผู้ใช้ของคุณ โดยคลิกที่ชื่อผู้ใช้ของคุณที่ด้านบนของเว็บไซต์ คุณจะสามารถเปลี่ยนการตั้งค่าและกำหนดค่าทั้งหมดของคุณได้",
        },
        {
          label: "เวลาไม่ถูกต้อง",
          content:
            "เป็นไปได้ว่าเวลาที่แสดงจากเขตเวลาของคุณแตกต่างจากทที่ที่คุณอยู่ ในกรณีนี้ ให้ไปทีการตั้งค่าผู้ใช้และเปลี่ยนเขตเวลาของคุณให้ตรงกับพื้นที่ที่คุณอยู่ เช่น ลอนดอน ปารีส นิวยอร์ก ซิดนีย์ ฯลฯ โปรดทราบว่าการเปลี่ยนเขตเวลา เช่นเดียวกับการตั้งค่าส่วนใหญ่ สามารถทำได้โดยผู้ใช้ที่ลงทะเบียนแล้วเท่านั้น หากคุณไม่ได้ลงทะเบียน เป็นเวลาที่ดีที่จะทำเช่นนั้น",
        },
        {
          label: "ฉันเปลี่ยนเขตเวลาแล้ว แต่เขตเวลายังผิดอยู่",
          content:
            "หากคุณแน่ใจว่าคุณตั้งค่าเขตเวลาถูกต้อง และเวลายังคงไม่ถูกต้อง แสดงว่าเวลาที่จัดเก็บไว้บนเซิร์ฟเวอร์ไม่ถูกต้อง โปรดแจ้งผู้ดูแลระบบเพื่อแก้ไขปัญหาทันที",
        },
        {
          label: "ภาษาที่ฉันใช้ไม่ได้อยู่ในรายการ",
          content:
            "ผู้ดูแลระบบไม่ได้ติดตั้งภาษาของคุณหรือไม่มีใครแปลเว็บไซต์นี้เป็นภาษาของคุณ ลองถามผู้ดูแลระบบว่าสามารถติดตั้งชุดภาษาที่คุณต้องการได้หรือไม่ หากไม่มีชุดภาษา โปรดสร้างการแปลใหม่ และลองติดต่อผู้ดูแลระบบ",
        },
        {
          label: "รูปภาพถัดจากชื่อผู้ใช้ของฉันคืออะไร",
          content:
            "มีสองภาพที่อาจปรากฏพร้อมกับชื่อผู้ใช้เมื่อดูโพสต์ หนึ่งในนั้นอาจเป็นรูปภาพที่เกี่ยวข้องกับอันดับของคุณ โดยทั่วไปจะอยู่ในรูปของดาว บล็อก หรือจุด ซึ่งระบุจำนวนโพสต์ที่คุณโพสต์หรือสถานะต่างๆของคุณ อีกภาพหนึ่งซึ่งมักจะใหญ่กว่านั้นเรียกว่าอวาตาร์ และโดยทั่วไปแล้วจะมีลักษณะเฉพาะหรือเฉพาะตัวสำหรับผู้ใช้แต่ละคน",
        },
        {
          label: "ฉันจะแสดงอวาตาร์ได้อย่างไร",
          content: `ภายในการตั้งค่าผู้ใช้ของคุณ ภายใต้ "โปรไฟล์" คุณสามารถเพิ่มอวาตาร์ของคุณได้ หากคุณไม่สามารถใช้อวาตาร์ได้ โปรดติดต่อผู้ดูแลบอร์ด โปรดระวังหากอวาตาร์ของคุณเป็น ภาพลามกอนาจาร, ภาพบุคคลที่เกี่ยวข้องกับการเมื่อ หรือการนำภาพบุคคลอื่นมาใช้โดยไม่ได้รับอนุญาติ คุณอาจโดนแบนได้`,
        },
        {
          label: "อันดับของฉันคืออะไรและจะเปลี่ยนได้อย่างไร",
          content:
            "อันดับซึ่งปรากฏใต้ชื่อผู้ใช้ของคุณ จะระบุจำนวนโพสต์ที่คุณสร้าง โดยทั่วไป คุณไม่สามารถเปลี่ยนถ้อยคำของอันดับได้โดยตรง เนื่องจากผู้ดูแลระบบกำหนดไว้ โปรดอย่าใช้งานเว็บไซต์ในทางที่ผิดโดยการโพสต์โดยไม่จำเป็นเพียงเพื่อต้องการเพิ่มอันดับของคุณ",
        },
      ],
    },
    {
      title: "ปัญหาการโพสต์",
      description: [
        {
          label: "ฉันจะสร้างหัวข้อใหม่หรือโพสต์ตอบกลับได้อย่างไร",
          content: `หากต้องการโพสต์หัวข้อใหม่ ให้คลิก "หัวข้อใหม่" หากต้องการโพสต์ตอบกลับหัวข้อ ให้คลิก "ตอบกลับ" ที่โพสต์นั้นๆ คุณอาจต้องลงทะเบียนก่อนจึงจะสามารถโพสต์ข้อความได้`,
        },
        {
          label: "ฉันจะแก้ไขหรือลบโพสต์ได้อย่างไร",
          content: `คุณจะต้องเป็นเจ้าของโพสต์หรือผู้ดูแลระบบ จึงจะสามารถแก้ไขหรือลบข้อความได้ เว้นแต่ว่าโพสต์หรือข้อความนั้นเป็นของคุณเอง คุณสามารถ "แก้ไขโพสต์" หรือ "ลบโพสต์"`,
        },
        {
          label: "เหตุใดฉันจึงเพิ่มไฟล์แนบไม่ได้",
          content:
            "สิทธิ์ในการแนบไฟล์ต่อโพสต์ ต่อกลุ่ม หรือต่อผู้ใช้ ผู้ดูแลโพสต์อาจไม่ได้รับอนุญาตให้เพิ่มไฟล์แนบสำหรับฟอรัมเฉพาะนั้นๆที่คุณกำลังโพสต์ หรือบางทีอาจมีเฉพาะบางฟอรัมเท่านั้นที่สามารถโพสต์ไฟล์แนบได้ ติดต่อผู้ดูแลระบบหากคุณไม่แน่ใจว่าเหตุใดคุณจึงไม่สามารถเพิ่มไฟล์แนบได้",
        },
        {
          label: "ทำไมฉันจึงได้รับคำเตือน",
          content:
            "ผู้ดูแลโพสต์แต่ละคนมีกฎเกณฑ์สำหรับพื้นที่ของตนเอง หากคุณทำผิดกฎ คุณอาจได้รับคำเตือน โปรดทราบว่านี่เป็นการตัดสินใจของผู้ดูแลระบบ ติดต่อผู้ดูแลระบบหากคุณไม่แน่ใจว่าเหตุใดคุณจึงได้รับคำเตือน",
        },
        {
          label: "ฉันจะรายงานโพสต์ไปยังผู้ดูแลได้อย่างไร",
          content:
            "คุณจะเห็นปุ่มสำหรับรายงานโพสต์ถัดจากโพสต์ที่คุณต้องการรายงาน การคลิกที่ปุ่มเพื่อไปที่ขั้นตอนในการรายงานโพสต์",
        },
        {
          label: `ปุ่ม "บันทึก" สำหรับการโพสต์หัวข้อคืออะไร`,
          content:
            "ปุ่มนี้จะช่วยให้คุณสามารถบันทึกหน้าโพสต์นั้นๆ ที่คุณต้องการบันทึก",
        },
      ],
    },
    {
      title: "การจัดรูปแบบและประเภทหัวข้อ",
      description: [
        {
          label: "ฉันสามารถใช้ MARKDOWN ได้หรือไม่",
          content: (
            <div>
              การจัดรูปแบบส่วนใหญจะสามารถทำได้โดยใช้ Markdown
              ศึกษาเพิ่มเติ่มเกี่ยวกับ{" "}
              <span className="text-content hover:underline">
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                  rel="noreferrer"
                >
                  วิธีการเขียน Markdown
                </a>
              </span>
            </div>
          ),
        },
        {
          label: "สัญลักษณ์รอยยิ้ม 😀 คืออะไร",
          content: (
            <div>
              สไมลี่หรืออีโมจิคือภาพเล็กๆ ที่สามารถใช้แสดงความรู้สึก เช่น 😀
              หมายถึงมีความสุข ในขณะที่ 😭 หมายถึงเศร้า{" "}
              <span className="text-content hover:underline">
                <a
                  href="https://support.microsoft.com/en-us/windows/windows-keyboard-tips-and-tricks-588e0b72-0fff-6d3f-aeee-6e5116097942"
                  target="_blank"
                  rel="noreferrer"
                >
                  รายการอีโมติคอนทั้งหมดสามารถดูได้ที่นี่
                </a>
              </span>{" "}
              อย่างไรก็ตาม พยายามอย่าใช้สไมลี่มากเกินไป
              เนื่องจากอาจทำให้โพสต์อ่านไม่รู้เรื่อง
              และผู้ดูแลอาจลบโพสต์นั้นออกได้
            </div>
          ),
        },
        {
          label: "ฉันสามารถโพสต์ภาพได้หรือไม่",
          content: `คุณสามารถโพสต์ภาพในโพสต์ของคุณได้ โดยใช้แท็ก <img src=”http://picture.com” alt=”picture”/>`,
        },
        {
          label: "ประกาศคืออะไร",
          content:
            "ประกาศมักจะมีข้อมูลสำคัญสำหรับฟอรัมที่คุณกำลังอ่านอยู่ และคุณควรอ่าน ประกาศจะปรากฏที่ด้านบนของทุกหน้าในฟอรัมที่โพสต์",
        },
      ],
    },
    {
      title: "ระดับผู้ใช้และกลุ่ม",
      description: [
        {
          label: "ผู้ดูแลระบบคืออะไร",
          content:
            "ผู้ดูแลระบบคือสมาชิกที่ได้รับมอบหมายให้มีอำนาจสูงสุดในการควบคุมทั้งเว็บไซต์ สมาชิกเหล่านี้สามารถควบคุมการทำงานของเว็บไซต์ได้ทุกด้าน รวมถึงการตั้งค่าการอนุญาต การแบนผู้ใช้ การสร้างกลุ่มผู้ใช้หรือผู้ดูแล ฯลฯ",
        },
        {
          label: `"สมาชิกใหม่" คืออะไร`,
          content:
            "หากคุณเป็นสมาชิกของเว็บไซต์มากกว่า 1 ปีสถานะนี้จะหายไป หากคุณอยู่ในสถานะนี้โปรดระวังอย่าทำผิดกฎต่างๆ เพราะคุณจะโดนแบนอย่างง่ายดายกว่าสมาชิกคนอื่นๆ",
        },
      ],
    },
    {
      title: "การค้นหาโพสต์",
      description: [
        {
          label: "ฉันจะค้นหาโพสต์ได้อย่างไร",
          content:
            "ป้อนข้อความเพื่อค้นหาในช่องค้นหาที่อยู่ใน ฟอรัม หรือหน้าโพสต์นั้น ซึ่งมีอยู่ในทุกหน้าในฟอรัม",
        },
        {
          label: `"เหตุใดการค้นหาของฉันจึงไม่แสดงผลลัพธ์`,
          content:
            "การค้นหาของคุณอาจคลุมเครือเกินไปและมีคำทั่วหลายคำเกินไป เจาะจงให้มากขึ้นและใช้ตัวเลือกที่มีอยู่ในการค้นหา",
        },
        {
          label: "ทำไมการค้นหาของฉันถึงเป็นหน้าว่าง",
          content: `การค้นหาของคุณแสดงผลลัพธ์มากเกินไปสำหรับเว็บเซิร์ฟเวอร์ที่จะจัดการ ใช้ "การค้นหาขั้นสูง" และเจาะจงมากขึ้นในคำที่ใช้และฟอรัมที่จะค้นหา`,
        },
        {
          label: `"ฉันจะค้นหาโพสต์และหัวข้อของตัวเองได้อย่างไร`,
          content: `คุณสามารถดึงโพสต์ของคุณเองได้โดยคลิกที่ "โปรไฟล์" ด้านล่างของเว็บไซต์`,
        },
      ],
    },
    {
      title: "เอกสารแนบ",
      description: [
        {
          label: `สามารถแนบไฟล์อะไรได้บ้างในเว็บไซต์นี้`,
          content:
            "เว็บไซต์นี้มีลิงค์ไปยังเว็บไซต์/บริการอื่นๆ แต่จะไม่มีการเก็บไฟล์บนเว็บไซต์ ผู้ใช้ไม่สามารถอัพโหลดไฟล์ใดๆลงบนเว็บไชต์ได้",
        },
      ],
    },
  ];

  setTimeout(function () {
    setLoading(false);
  }, 500);

  const FirstFaqLists = data.map((data, index) => (
    <div key={index}>
      <Title order={4} mt="lg" mb="xs">
        {data.title}
      </Title>
      <Accordion iconPosition="left" classNames={classes}>
        {data.description.map((item, index) => (
          <Accordion.Item key={index} label={item.label}>
            {item.content}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ));

  const FaqLists = FaqListData.map((data, index) => (
    <div key={index}>
      <Title order={4} mt="lg" mb="xs">
        {data.title}
      </Title>
      <Accordion iconPosition="left" classNames={classes}>
        {data.description.map((item, index) => (
          <Accordion.Item key={index} label={item.label}>
            {item.content}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ));

  return (
    <div className="bg-background text-accent min-h-[1024px] mb-[235px] pb-10">
      <Navbar isBusy />
      <Metatags />

      <Container size="lg">
        <Stack spacing="xs">
          <Card className="bg-foreground">
            <Title order={2} align="center">
              คำถามที่พบบ่อย
            </Title>
            {FirstFaqLists}
          </Card>
          <Card className="bg-foreground">{FaqLists}</Card>
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}
