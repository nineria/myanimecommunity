import React from "react";
// Components
import { Progress, Box, Text, Group, Paper, SimpleGrid } from "@mantine/core";
// Icons
import { ArrowUpRight, DeviceAnalytics } from "tabler-icons-react";
// Tools
import { kFormatter } from "@components/Calculator";

export default function StatsSegments({ total, diff, data }) {
  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : null,
  }));

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.color }}
      className="pb-[5px] border-b-[3px]"
    >
      <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{kFormatter(stat.count)}</Text>
        <Text color={stat.color} weight={700} size="sm" className="leading-4">
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper p="md" radius="sm" className="bg-foreground">
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text size="xl" weight={700}>
            ทั้งหมด {kFormatter(total)}
          </Text>
          <Text
            color="teal"
            className="flex items-center"
            size="sm"
            weight={700}
          >
            <span>{diff}%</span>
            <ArrowUpRight size={16} style={{ marginBottom: 4 }} />
          </Text>
        </Group>
        <DeviceAnalytics size={20} color="gray" />
      </Group>

      <Text color="dimmed" size="sm">
        จำนวน โพสต์, คอมเมนต์, รีวิว เมื่อเทียบกับเดือนก่อน
      </Text>

      <Progress
        sections={segments}
        size={34}
        classNames={{ label: "text-sm leading-none" }}
        mt={40}
      />
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}
