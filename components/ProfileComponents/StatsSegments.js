import React from "react";
// Components
import { Progress, Box, Text, Group, Paper, SimpleGrid } from "@mantine/core";
// Icons
import { ArrowUpRight, DeviceAnalytics } from "tabler-icons-react";
// Tools
import { kFormatter } from "@components/Calculator";

export default function StatsSegments({ user, statistics }) {
  console.log(statistics);
  const total = statistics.likes + statistics.posts + statistics.comments;
  const segments = user.stats.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : null,
  }));

  const stat = {
    color: "#fff",
  };

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
            <span>{total}%</span>
            <ArrowUpRight size={16} style={{ marginBottom: 4 }} />
          </Text>
        </Group>
        <DeviceAnalytics size={20} color="gray" />
      </Group>

      <Text color="dimmed" size="sm">
        จำนวน ถูกใจ, โพสต์, คอมเมนต์, เมื่อเทียบกับเดือนก่อน
      </Text>

      <Progress
        sections={segments}
        size={34}
        classNames={{ label: "text-sm leading-none" }}
        mt={40}
      />
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        <Box
          sx={{ borderBottomColor: "#47d6ab" }}
          className="pb-[5px] border-b-[3px]"
        >
          <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
            ถูกใจ
          </Text>

          <Group position="apart" align="flex-end" spacing={0}>
            <Text weight={700}>{kFormatter(statistics.likes)}</Text>
            <Text color="#47d6ab" weight={700} size="sm" className="leading-4">
              {statistics.likes}%
            </Text>
          </Group>
        </Box>
        <Box
          sx={{ borderBottomColor: "#7952B3" }}
          className="pb-[5px] border-b-[3px]"
        >
          <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
            โพสต์
          </Text>

          <Group position="apart" align="flex-end" spacing={0}>
            <Text weight={700}>{kFormatter(statistics.posts)}</Text>
            <Text color="#7952B3" weight={700} size="sm" className="leading-4">
              {statistics.posts}%
            </Text>
          </Group>
        </Box>
        <Box
          sx={{ borderBottomColor: "#4fcdf7" }}
          className="pb-[5px] border-b-[3px]"
        >
          <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
            คอมเมนต์
          </Text>

          <Group position="apart" align="flex-end" spacing={0}>
            <Text weight={700}>{kFormatter(statistics.comments)}</Text>
            <Text color="#4fcdf7" weight={700} size="sm" className="leading-4">
              {statistics.comments}%
            </Text>
          </Group>
        </Box>
      </SimpleGrid>
    </Paper>
  );
}
