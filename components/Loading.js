import { Center, Loader, Stack, Text } from "@mantine/core";
import React from "react";

export default function Loading(props) {
  return (
    <Stack my="xs" align="center">
      <Center>
        <Loader variant="dots" color="red" />
      </Center>
      <Center>
        <Text size="xs" className="text-title">
          {props.children || "กำลังโหลด..."}
        </Text>
      </Center>
    </Stack>
  );
}
