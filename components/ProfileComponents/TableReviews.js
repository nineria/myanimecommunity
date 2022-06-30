import React from "react";
// Components
import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Card,
  ColorSwatch,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function TableReviews({ data }) {
  const { classes, theme } = useStyles();

  const rows = data.map((row) => {
    const totalReviews = row.reviews.negative + row.reviews.positive;
    const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <tr key={row.title}>
        <td>
          <Anchor size="sm" onClick={(event) => event.preventDefault()}>
            {row.title}
          </Anchor>
        </td>
        <td>{row.date}</td>
        <td>
          <Anchor size="sm" onClick={(event) => event.preventDefault()}>
            {row.author}
          </Anchor>
        </td>
        <td>{Intl.NumberFormat().format(totalReviews)}</td>
        <td>
          <Group position="apart">
            <Text size="xs" color="teal" weight={700}>
              {positiveReviews.toFixed(0)}%
            </Text>
            <Text size="xs" color="red" weight={700}>
              {negativeReviews.toFixed(0)}%
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            sections={[
              {
                value: positiveReviews,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.teal[9]
                    : theme.colors.teal[6],
              },
              {
                value: negativeReviews,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.red[9]
                    : theme.colors.red[6],
              },
            ]}
          />
        </td>
      </tr>
    );
  });

  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Group position="apart" spacing="xs">
        <Text size="xl" weight={700}>
          การจัดการโพสต์
        </Text>
        <Group>
          <ColorSwatch
            size={14}
            color={
              theme.colorScheme === "dark"
                ? theme.colors.teal[9]
                : theme.colors.teal[6]
            }
          />
          <Text>ชอบ</Text>
          <ColorSwatch
            size={14}
            color={
              theme.colorScheme === "dark"
                ? theme.colors.red[9]
                : theme.colors.red[6]
            }
          />
          <Text>ไม่ชอบ</Text>
        </Group>
      </Group>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>วันที่</th>
              <th>ผู้เขียน</th>
              <th>เข้าชม</th>
              <th>ความนิยม</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
