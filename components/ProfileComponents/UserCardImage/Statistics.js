import { kFormatter } from "utils/Calculator";
import { Group, Text } from "@mantine/core";
import React from "react";

export default function Statistics({ statistics }) {
  return (
    <Group mt="md" position="center" spacing={50}>
      <div>
        <Text align="center" size="lg" weight={500}>
          {kFormatter(statistics.likes)}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          ถูกใจ
        </Text>
      </div>
      <div>
        <Text align="center" size="lg" weight={500}>
          {kFormatter(statistics.stars)}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          ดาว
        </Text>
      </div>
      <div>
        <Text align="center" size="lg" weight={500}>
          {kFormatter(statistics.posts)}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          โพสต์
        </Text>
      </div>
      <div>
        <Text align="center" size="lg" weight={500}>
          {kFormatter(statistics.comments)}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          คอมเมนต์
        </Text>
      </div>
    </Group>
  );
}
