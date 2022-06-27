import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Input,
  InputWrapper,
  Modal,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";

import React, { useCallback, useEffect, useState } from "react";
import { X } from "tabler-icons-react";

export default function EditPost({ postData }) {
  const [data, setData] = useState(postData);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setData(postData); // This is be executed when `loading` state changes
  }, [postData]);

  const HandleChange = (values) => {
    setData(values);
    // props.handlePostDataChange(values);
    // props.setOpened(false);
  };

  const form = useForm({
    initialValues: {
      tag: data.tag,
      title: data.title,
      image: data.image,
      content: data.content,
      credit: data.credit,
      username: data.username,
      photoURL: data.photoURL,
      rank: data.rank,
      genres: data.genres,
    },
  });

  const handleRemoveTag = (index, tag) => {
    switch (tag) {
      case "tag":
        data.tag.splice(index, 1);
        setData(data);
        setOpened(false);
        console.log(data.tag);
        break;
      case "genre":
        data.genres.splice(index, 1);
        setData(data);
        setOpened(false);
        console.log(data.genres);
        break;
    }
  };

  const openModal = (item, index) => (
    <Modal
      centered
      size="xs"
      withCloseButton={false}
      opened={opened}
      overlayColor="#333"
      onClose={() => setOpened(false)}
    >
      <Stack>
        <Text align="center">{`ลบแท็ก \"${item}\" หรือไม่?`}</Text>
        <Group grow>
          <Button
            className="bg-content hover:bg-content hover:opacity-75"
            onClick={() => handleRemoveTag(index, tag)}
          >
            ยืนยัน
          </Button>
          <Button
            className="bg-gray-400 hover:bg-gray-400 hover:opacity-75"
            onClick={() => setOpened(false)}
          >
            ยกเลิก
          </Button>
        </Group>
      </Stack>
    </Modal>
  );

  const removeButton = (item, index) => (
    <>
      {openModal(item, index)}
      <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
        <X
          size={10}
          onClick={() => {
            setOpened(true);
          }}
        />
      </ActionIcon>
    </>
  );

  const tags = data.tag.map((item, index) => (
    <Badge
      key={index}
      variant="outline"
      sx={{ paddingRight: 3 }}
      rightSection={removeButton(item, index)}
    >
      {item}
    </Badge>
  ));

  //   const genres = data.genres.map((item, index) => (
  //     <Badge
  //       key={index}
  //       variant="outline"
  //       sx={{ paddingRight: 3 }}
  //       rightSection={removeButton(item, index, "genre")}
  //     >
  //       {item}
  //     </Badge>
  //   ));

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <Stack>
        <InputWrapper label="แท็ก" description="---">
          <Group spacing="xs">{tags}</Group>
        </InputWrapper>
        {/* <InputWrapper label="ประเภท" description="---">
          <Group spacing="xs">{genres}</Group>
        </InputWrapper> */}

        {/* Tags */}
        <InputWrapper
          label="หัวข้อโพสต์"
          description="เชื่อมโยงไปยังหน้าที่ต้องการ และใส่หัวข้อโพสต์หลัก"
        >
          <Input placeholder="/review" {...form.getInputProps("title")} />
        </InputWrapper>
        <Divider />

        {/* หัวข้อโพสต์ */}
        <InputWrapper
          label="หัวข้อโพสต์"
          description="เชื่อมโยงไปยังหน้าที่ต้องการ และใส่หัวข้อโพสต์หลัก"
        >
          <Input placeholder="/review" {...form.getInputProps("title")} />
        </InputWrapper>
        <Divider />

        {/* หัวข้อย่อย */}
        <InputWrapper
          label="หัวข้อย่อย"
          description="เชื่อมโยงไปยังหน้าที่ต้องการ และใส่หัวข้อย่อย"
        >
          <Grid grow>
            <Grid.Col sm={2}>
              <Input
                placeholder="/review"
                {...form.getInputProps("headerLink")}
              />
            </Grid.Col>
            <Grid.Col sm={10}>
              <Input
                placeholder="หัวข้อโพสต์"
                {...form.getInputProps("header")}
              />
            </Grid.Col>
          </Grid>
        </InputWrapper>
        <Divider />

        {/* เนื้อหา */}
        <InputWrapper label="เนื้อหา" description="รายละเอียดเนื้อหาของโพสต์">
          <Textarea
            placeholder="เขียนรายละเอียด"
            autosize
            minRows={3}
            {...form.getInputProps("body")}
          />
        </InputWrapper>
        <TermAndService />

        <Group mt="md" position="apart">
          <Group spacing="xs" position="left">
            <Button
              size="xs"
              onClick={() => props.setOpened(false)}
              className="bg-gray-500 hover:bg-gray-500 hover:opacity-75"
            >
              ยกเลิก
            </Button>
            <Button
              size="xs"
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
            >
              ลบโพสต์
            </Button>
          </Group>
          <Button
            type="submit"
            size="xs"
            className="bg-green-500 hover:bg-green-500 hover:opacity-75"
          >
            ยืนยัน
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

// function PostExample({ reload, setReload, data }) {
//   return (
//     <div>
//       <div className="flex flex-row items-center gap-3 mb-2 md:text-base text-sm font-bold">
//         <h1 className="py-2 pl-3">ตัวอย่างโพสต์</h1>
//         <Tooltip hasArrow label="กดเพื่อรีโหลดตัวอย่าง" bg="gray">
//           <div
//             onClick={() => setReload(!reload)}
//             className="bg-neutral-500 p-1 rounded-sm flex hover:translate-y-[1px] hover:opacity-75 cursor-pointer group"
//           >
//             <RepeatIcon className="group-hover:rotate-180 transition-all" />
//           </div>
//         </Tooltip>
//       </div>
//       <div className="pb-4">
//         <HomePost dummyData={data} isDisabled={true} />
//       </div>
//     </div>
//   );
// }

function TermAndService() {
  return (
    <div className="flex flex-row items-center gap-2 text-xs">
      <span className="w-4/5">
        ผู้ดูแลระบบขอสงวนสิทธิ์ในการลบโพสต์ของผู้ที่ไม่ปฏิบัติตาม{" "}
        <span className="text-content underline cursor-pointer">
          กฎ กติกา และมารยาท
        </span>{" "}
        ของเว็บไซต์ MyAnimeCommunity
        <p>เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ</p>
      </span>
    </div>
  );
}
