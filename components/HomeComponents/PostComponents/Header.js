import React from "react";
// Components
import { Grid, Input, InputWrapper } from "@mantine/core";

export default function Header(props) {
  return (
    <InputWrapper
      label="หัวข้อย่อย"
      description="เชื่อมโยงไปยังหน้าที่ต้องการ และใส่หัวข้อย่อย"
    >
      <Grid grow>
        <Grid.Col sm={2}>
          <Input
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
            placeholder="/post"
            {...props.headerLink}
          />
        </Grid.Col>
        <Grid.Col sm={10}>
          <Input
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
            placeholder="หัวข้อโพสต์"
            {...props.header}
          />
        </Grid.Col>
      </Grid>
    </InputWrapper>
  );
}
