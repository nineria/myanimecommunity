import React from "react";
// Components
import { Group, Paper, Text, ThemeIcon, SimpleGrid } from "@mantine/core";
// Icons
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";
// Tools
import { kFormatter } from "@components/Calculator";

export function StatsGridIcons({ user }) {
  const stats = user.stats.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper p="md" radius="sm" key={stat.label} className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(stat.value)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={stat.diff > 0 ? "teal" : "red"}
            weight={700}
          >
            {stat.diff}%
          </Text>{" "}
          {stat.diff > 0 ? "เพิ่มขึ้น" : "ลดลง"} เทียบกับเดือนที่แล้ว
        </Text>
      </Paper>
    );
  });

  return (
    <SimpleGrid
      cols={3}
      breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      spacing="xs"
    >
      {stats}
    </SimpleGrid>
  );
}
