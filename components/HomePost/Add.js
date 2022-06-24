import {
  Button,
  Divider,
  Grid,
  Group,
  Input,
  InputWrapper,
  Stack,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React from "react";

export default function AddPost(props) {
  const data = props.postData;

  const HandleChange = (values) => {
    data = values;
    props.handlePostDataChange(values);
    props.setOpened(false);
  };

  const form = useForm({
    initialValues: {
      title: data.title,
      titleLink: data.titleLink,
      header: data.header,
      headerLink: data.headerLink,
      body: data.body,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <Stack>
        {/* หัวข้อโพสต์ */}
        <InputWrapper
          label="หัวข้อโพสต์"
          description="เชื่อมโยงไปยังหน้าที่ต้องการ และใส่หัวข้อโพสต์หลัก"
        >
          <Grid grow>
            <Grid.Col sm={2}>
              <Input
                placeholder="/review"
                {...form.getInputProps("titleLink")}
              />
            </Grid.Col>
            <Grid.Col sm={10}>
              <Input
                placeholder="หัวข้อโพสต์"
                {...form.getInputProps("title")}
              />
            </Grid.Col>
          </Grid>
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

function TermAndService() {
  return (
    <div className="flex flex-row items-center gap-2 text-xs">
      <span className="w-4/5">
        ผู้ดูแลระบบขอสงวนสิทธิ์ในการลบโพสต์ของผู้ที่ไม่ปฏิบัติตาม{" "}
        <span className="text-content underline cursor-pointer">
          กฎ กติกา และมารยาท
        </span>{" "}
        ของเว็บไซต์ MyAnimeCommu
        <p>เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ</p>
      </span>
    </div>
  );
}
