import { Menu } from "@mantine/core";
import React from "react";
import { LoginPopUp } from "../LoginRegister";

export default function LoginRegisterSmallScreen() {
  return (
    <Menu withArrow placement="end" size="xl" p="sm">
      <LoginPopUp />
    </Menu>
  );
}
