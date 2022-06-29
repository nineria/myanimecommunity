import { Grid, Input, InputWrapper } from "@mantine/core";
import React from "react";

export default function Header(props) {
  return (
    <InputWrapper
      label="หัวข้อย่อย"
      description="เชื่อมโยงไปยังหน้าที่ต้องการ และใส่หัวข้อย่อย"
    >
      <Grid grow>
        <Grid.Col sm={2}>
          <Input placeholder="/post" {...props.headerLink} />
        </Grid.Col>
        <Grid.Col sm={10}>
          <Input placeholder="หัวข้อโพสต์" {...props.header} />
        </Grid.Col>
      </Grid>
    </InputWrapper>
  );
}
