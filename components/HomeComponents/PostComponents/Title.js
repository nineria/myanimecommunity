import React from "react";
// Components
import { Grid, Input, InputWrapper } from "@mantine/core";

export default function Title(props) {
  return (
    <InputWrapper
      label="หัวข้อโพสต์"
      description="เชื่อมโยงไปยังหน้าที่ต้องการ และใส่หัวข้อโพสต์หลัก"
    >
      <Grid grow>
        <Grid.Col sm={2}>
          <Input
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
            placeholder="/review"
            {...props.titleLink}
          />
        </Grid.Col>
        <Grid.Col sm={10}>
          <Input
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
            placeholder="หัวข้อโพสต์"
            {...props.title}
          />
        </Grid.Col>
      </Grid>
    </InputWrapper>
  );
}
