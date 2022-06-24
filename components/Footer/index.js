import React from "react";
import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  Divider,
} from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";
import MyAniLogo from "@components/Navbar/MyAniLogo";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  const data = [
    {
      title: "ชุมชนคนรักอนิเมะ",
      links: [
        {
          label: "โพสต์ใหม่",
          link: "/posts",
        },
        {
          label: "ข่าวสาร",
          link: "/news",
        },
        {
          label: "รีวิว",
          link: "/review",
        },
        {
          label: "Q&A ถามตอบ",
          link: "/qanda",
        },
      ],
    },
    {
      title: "จัดการข้อมูล",
      links: [
        {
          label: "โปรไฟล์",
          link: "/profile",
        },
        {
          label: "ตั้งค่า",
          link: "/setting",
        },
        {
          label: "-",
          link: "#",
        },
        {
          label: "ออกจากระบบ",
          link: "#",
        },
      ],
    },
    {
      title: "ข้อมูลเว็บไซต์",
      links: [
        {
          label: "จำนวนโพสต์ : " + "145K",
          link: "/posts",
        },
        {
          label: "จำนวนสมาชิก : " + "1M",
          link: "/news",
        },
        {
          label: "-",
          link: "#",
        },
        {
          label: "-",
          link: "#",
        },
      ],
    },
  ];

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={`flex mt-1 flex-col text-sm text-title opacity-50 text-right`}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        <Link href={link.link}>
          <a className="hover:underline">{link.label}</a>
        </Link>
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text
          className={`text-base font-bold text-title opacity-80 text-right`}
        >
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer className=" pt-8 ">
      <Container size="lg" className="flex md:justify-between justify-center">
        <div className="w-[250px] md:text-left text-center">
          <div className="text-3xl font-bold">
            <MyAniLogo link="/" />
          </div>
          <Text
            size="sm"
            className={`mt-2 md:text-left text-center text-title opacity-80`}
          >
            ศูนย์กลางในการพูดคุย รีวิว และโพสต์ถามตอบคำถามต่างๆ
            ที่เกี่ยวกับอนิเมะ โปรโมทอนิเมะ
            และแนะนำเนื้อหาของอนิเมะเพื่อส่งเสริมให้ผู้คนดูอนิเมะมากขึ้น
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container size="lg">
        <Divider mt="lg" />
      </Container>
      <Container
        size="lg"
        className="flex flex-col md:flex-row md:justify-between items-center "
      >
        <Text className="text-title opacity-80" size="sm">
          © 2022 MyAnimeCommunity. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} className="text-title" />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} className="text-title" />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} className="text-title" />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
