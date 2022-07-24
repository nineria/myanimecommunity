import React from "react";
// Components
import { Group, Paper, Text, ThemeIcon, SimpleGrid } from "@mantine/core";
// Icons
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";
// Tools
import { kFormatter } from "utils/Calculator";

export function StatsGridIcons({ statistics }) {
  return (
    <SimpleGrid
      cols={4}
      breakpoints={[{ maxWidth: "sm", cols: 2 }]}
      spacing="xs"
    >
      <Paper p="md" radius="sm" className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              ถูกใจ
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(statistics.likes)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                statistics.likes > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {statistics.likes > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={statistics.likes > 0 ? "teal" : "red"}
            weight={700}
          >
            {statistics.likes}%
          </Text>{" "}
          {statistics.likes > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
      <Paper p="md" radius="sm" className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              ดาว
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(statistics.stars)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                statistics.stars > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {statistics.stars > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={statistics.stars > 0 ? "teal" : "red"}
            weight={700}
          >
            {statistics.stars}%
          </Text>{" "}
          {statistics.stars > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
      <Paper p="md" radius="sm" className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              โพสต์
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(statistics.posts)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                statistics.posts > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {statistics.posts > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={statistics.posts > 0 ? "teal" : "red"}
            weight={700}
          >
            {statistics.posts}%
          </Text>{" "}
          {statistics.posts > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
      <Paper p="md" radius="sm" className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              คอมเมนต์
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(statistics.comments)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                statistics.comments > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {statistics.posts > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={statistics.comments > 0 ? "teal" : "red"}
            weight={700}
          >
            {statistics.comments}%
          </Text>{" "}
          {statistics.comments > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
    </SimpleGrid>
  );
}
