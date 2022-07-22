import React, { useContext, useState } from "react";
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
} from "@mantine/core";
// Icons
import { Selector, ChevronDown, ChevronUp, Search } from "tabler-icons-react";
import Link from "next/link";

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
    keys.some((key) =>
      item[key]?.toString()?.toLocaleLowerCase()?.includes(query)
    )
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

export default function UserManagement({ users }) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(users);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(users, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(users, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData.map((row) => {
    const createdAtTimestamp =
      typeof row?.createdAt === "number"
        ? new Date(row.createdAt)
        : row.createdAt?.toDate();

    const createdAt = createdAtTimestamp?.toLocaleDateString("th-th", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <tr key={row.username}>
        <td>
          <Anchor size="sm">
            <Link href={`/${row.username}`}>
              <a target="_blank" rel="noreferrer">
                {row.username}
              </a>
            </Link>
          </Anchor>
        </td>
        <td>
          {row.firstName} {row.lastName}
        </td>
        <td>
          {row.email || (
            <span className="text-red-500">ยังไม่ได้ยืนยัน Email</span>
          )}
        </td>
        {/* <td>{row.rule}</td> */}
        <td>{createdAt || "-"}</td>
      </tr>
    );
  });

  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <ScrollArea>
        <Text size="xl" weight={700} mb="sm">
          จัดการผู้ใช้
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
                sorted={sortBy === "username"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("username")}
              >
                ชื่อผู้ใช้
              </Th>
              <Th
                sorted={sortBy === "firstName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("firstName")}
              >
                ชื่อ-นามสกุล
              </Th>
              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                อีเมล
              </Th>

              {/* <Th
                sorted={sortBy === "rule"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("rule")}
              >
                สถานะ
              </Th> */}
              <Th
                sorted={sortBy === "createdAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("createdAt")}
              >
                เข้าร่วมเมื่อ
              </Th>
              {/* <Th
                sorted={sortBy === "createdAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("createdAt")}
              >
                สร้าง
              </Th>
              <Th
                sorted={sortBy === "updatedAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("updatedAt")}
              >
                แก้ไขล่าสุด
              </Th>
              <Th
                sorted={sortBy === "username"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("username")}
              >
                ผู้เขียน
              </Th> */}
              {/* <th>
                <Text weight={500} size="sm" className="text-title">
                  ความนิยม
                </Text>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(users[0]).length}>
                  <Text weight={500} align="center" size="sm">
                    ไม่พบรายการที่ค้นหา
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
