import React, { useRef, useState } from "react";
// Components
import {
  Button,
  Collapse,
  Divider,
  Grid,
  Image,
  Input,
  InputWrapper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

export default function PostImage(props) {
  const inputImageRef = useRef(null);

  const [openedImage, setOpenedImage] = useState(false);

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <InputWrapper
        required
        label="รูปภาพ"
        description="รูปภาพจะแสดงอยู่ด้านบนสุดของโพสต์ สามารถเพิ่มได้แค่ภาพเดียวเท่านั้น (Link URL)"
      >
        <Grid gutter="xs">
          <Grid.Col sm={10}>
            <TextInput
              ref={inputImageRef}
              classNames={{
                input: "bg-accent bg-opacity-50",
              }}
              placeholder="Link URL ของรูปภาพ (รูปเดียวเท่านั้น)"
              {...props}
            />
          </Grid.Col>
          <Grid.Col sm={2}>
            <Button
              fullWidth
              className="bg-background hover:bg-background hover:opacity-75 "
              onClick={() => {
                setOpenedImage((e) => !e);
              }}
            >
              {openedImage === false ? "แสดง" : "ซ่อน"}
            </Button>
          </Grid.Col>
        </Grid>
      </InputWrapper>
      <Collapse in={openedImage}>
        {inputImageRef.current?.value ? (
          <Stack spacing="xs">
            <Image
              src={inputImageRef.current?.value}
              alt={inputImageRef.current?.value}
            />
            <InputWrapper description="หากรูปภาพไม่แสดงให้ลองเปลี่ยน Link" />
          </Stack>
        ) : (
          <Text color="red" size="xs">
            เกิดข้อผิดพลาด ในการโหลดรูปภาพกรุณาลองใหม่อีกครั้ง
          </Text>
        )}
      </Collapse>
    </>
  );
}
