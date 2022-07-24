import React from "react";
// Components
import { Progress, Box, Text, Group, Paper, SimpleGrid } from "@mantine/core";
// Icons
import { ArrowUpRight, DeviceAnalytics } from "tabler-icons-react";
// Tools
import { kFormatter } from "utils/Calculator";
import {
  commentColor,
  likeColor,
  postColor,
  starColor,
} from "constants/StatsSegmentsColor";

export default function StatsSegments({ statistics }) {
  const total =
    statistics.likes +
    statistics.stars +
    statistics.posts +
    statistics.comments;
  const segments = [
    {
      value: (statistics.likes * 100) / total,
      color: likeColor,
      label: `${statistics.likes}%`,
    },
    {
      value: (statistics.stars * 100) / total,
      color: starColor,
      label: `${statistics.stars}%`,
    },
    {
      value: (statistics.posts * 100) / total,
      color: postColor,
      label: `${statistics.posts}%`,
    },
    {
      value: (statistics.comments * 100) / total,
      color: commentColor,
      label: `${statistics.comments}%`,
    },
  ];

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
        จำนวน ถูกใจ, ดาว, โพสต์, คอมเมนต์
      </Text>

      <Progress
        sections={segments}
        size={34}
        classNames={{ label: "text-sm leading-none" }}
        mt={40}
      />
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        <Box
          sx={{ borderBottomColor: likeColor }}
          className="pb-[5px] border-b-[3px]"
        >
          <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
            ถูกใจ
          </Text>

          <Group position="apart" align="flex-end" spacing={0}>
            <Text weight={700}>{kFormatter(statistics.likes)}</Text>
            <Text
              color={likeColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {statistics.likes}%
            </Text>
          </Group>
        </Box>
        <Box
          sx={{ borderBottomColor: starColor }}
          className="pb-[5px] border-b-[3px]"
        >
          <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
            ดาว
          </Text>

          <Group position="apart" align="flex-end" spacing={0}>
            <Text weight={700}>{kFormatter(statistics.stars)}</Text>
            <Text
              color={starColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {statistics.stars}%
            </Text>
          </Group>
        </Box>
        <Box
          sx={{ borderBottomColor: postColor }}
          className="pb-[5px] border-b-[3px]"
        >
          <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
            โพสต์
          </Text>

          <Group position="apart" align="flex-end" spacing={0}>
            <Text weight={700}>{kFormatter(statistics.posts)}</Text>
            <Text
              color={postColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {statistics.posts}%
            </Text>
          </Group>
        </Box>
        <Box
          sx={{ borderBottomColor: commentColor }}
          className="pb-[5px] border-b-[3px]"
        >
          <Text transform="uppercase" size="sm" color="dimmed" weight={700}>
            คอมเมนต์
          </Text>

          <Group position="apart" align="flex-end" spacing={0}>
            <Text weight={700}>{kFormatter(statistics.comments)}</Text>
            <Text
              color={commentColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {statistics.comments}%
            </Text>
          </Group>
        </Box>
      </SimpleGrid>
    </Paper>
  );
}
