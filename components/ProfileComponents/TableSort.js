import React, { useState } from "react";
// Components
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Card,
  Anchor,
  Progress,
} from "@mantine/core";
// Icons
import { Selector, ChevronDown, ChevronUp, Search } from "tabler-icons-react";

const useStyles = createStyles(() => ({
  th: {
    padding: "0 !important",
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className="w-full p-2 hover:bg-black/10">
        <Group position="apart">
          <Text weight={500} size="sm" className="text-title">
            {children}
          </Text>
          <Center className="w-[21px] h-[21px]">
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const keys = Object.keys(data[0]);
  const query = search.toLocaleLowerCase().trim();

  return data.filter((item) =>
    keys.some((key) => item[key].toString().toLocaleLowerCase().includes(query))
  );
}

function sortData(data, payload) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].toString().localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].toString().localeCompare(b[payload.sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data }) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const { classes, theme } = useStyles();

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => {
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
        <td>{Intl.NumberFormat().format(row.view)}</td>
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
                    ? theme.colors.teal[8]
                    : theme.colors.teal[6],
              },
              {
                value: negativeReviews,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.red[8]
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
      <ScrollArea>
        <Text size="xl" weight={700} mb="sm">
          การจัดการโพสต์
        </Text>
        <TextInput
          placeholder="ค้นหา"
          mb="md"
          icon={<Search size={14} />}
          value={search}
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
          onChange={handleSearchChange}
        />
        <Table
          highlightOnHover
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ minWidth: 800 }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === "title"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("title")}
              >
                ชื่อ
              </Th>
              <Th
                sorted={sortBy === "date"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("date")}
              >
                วันที่
              </Th>
              <Th
                sorted={sortBy === "author"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("author")}
              >
                ผู้เขียน
              </Th>
              <Th
                sorted={sortBy === "view"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("view")}
              >
                เข้าชม
              </Th>
              <th>
                <Text weight={500} size="sm" className="text-title">
                  ความนิยม
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
