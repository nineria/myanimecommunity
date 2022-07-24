import React, { useEffect, useState } from "react";
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
} from "@constants/StatsSegmentsColor";

export default function StatsSegmentsAdmin({ statistics }) {
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const paperGrid = () => {
      let _likes = [];
      let _stars = [];
      let _posts = [];
      let _comments = [];

      statistics.map((statistic) => {
        _likes.push(statistic.likes);
        _stars.push(statistic.stars);
        _posts.push(statistic.posts);
        _comments.push(statistic.comments);
      });

      setTotalLikes(_likes.reduce((a, b) => a + b));
      setTotalStars(_stars.reduce((a, b) => a + b));
      setTotalPosts(_posts.reduce((a, b) => a + b));
      setTotalComments(_comments.reduce((a, b) => a + b));
    };

    paperGrid();
  }, [statistics]);

  const total = totalLikes + totalStars + totalPosts + totalComments;
  const segments = [
    {
      value: (totalLikes * 100) / total,
      color: likeColor,
      label: `${totalLikes}%`,
    },
    {
      value: (totalStars * 100) / total,
      color: starColor,
      label: `${totalStars}%`,
    },
    {
      value: (totalPosts * 100) / total,
      color: postColor,
      label: `${totalPosts}%`,
    },
    {
      value: (totalComments * 100) / total,
      color: commentColor,
      label: `${totalComments}%`,
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
            <Text weight={700}>{kFormatter(totalLikes)}</Text>
            <Text
              color={likeColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {totalLikes}%
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
            <Text weight={700}>{kFormatter(totalStars)}</Text>
            <Text
              color={starColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {totalStars}%
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
            <Text weight={700}>{kFormatter(totalPosts)}</Text>
            <Text
              color={postColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {totalPosts}%
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
            <Text weight={700}>{kFormatter(totalComments)}</Text>
            <Text
              color={commentColor}
              weight={700}
              size="sm"
              className="leading-4"
            >
              {totalComments}%
            </Text>
          </Group>
        </Box>
      </SimpleGrid>
    </Paper>
  );
}
