import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Login({ login, register }) {
  return (
    <div className="flex flex-row justify-end w-full gap-2">
      <Link href={login}>
        <Button colorScheme="red" size="sm">
          เข้าสู่ระบบ
        </Button>
      </Link>
      <a>
        <Button colorScheme="whiteAlpha" size="sm">
          ลงทะเบียน
        </Button>
      </a>
    </div>
  );
}
