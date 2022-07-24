import React from "react";
// Components
import { Group, Paper, Text, ThemeIcon, SimpleGrid } from "@mantine/core";
// Icons
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";
// Tools
import { kFormatter } from "utils/Calculator";
import { useState } from "react";
import { useEffect } from "react";

export function StatsGridIconsAdmin({ statistics }) {
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
              ถูกใจทั้งหมด
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(totalLikes)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                totalLikes > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {totalLikes > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={totalLikes > 0 ? "teal" : "red"}
            weight={700}
          >
            {totalLikes}%
          </Text>{" "}
          {totalLikes > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
      <Paper p="md" radius="sm" className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              ดาวทั้งหมด
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(totalStars)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                totalStars > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {totalStars > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={totalStars > 0 ? "teal" : "red"}
            weight={700}
          >
            {totalStars}%
          </Text>{" "}
          {totalStars > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
      <Paper p="md" radius="sm" className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              โพสต์ทั้งหมด
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(totalPosts)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                totalPosts > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {totalPosts > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={totalPosts > 0 ? "teal" : "red"}
            weight={700}
          >
            {totalPosts}%
          </Text>{" "}
          {totalPosts > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
      <Paper p="md" radius="sm" className="bg-foreground">
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              คอมเมนต์ทั้งหมด
            </Text>
            <Text weight={700} size="xl">
              {kFormatter(totalComments)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                totalComments > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            {/* <DiffIcon size={28} /> */}
            {totalComments > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={totalComments > 0 ? "teal" : "red"}
            weight={700}
          >
            {totalComments}%
          </Text>{" "}
          {totalComments > 0 ? "เพิ่มขึ้น" : "ลดลง"}
        </Text>
      </Paper>
    </SimpleGrid>
  );
}
