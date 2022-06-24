import { Button, Menu, Modal } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { DeviceGamepad, Login, Settings, UserPlus } from "tabler-icons-react";
import { LoginPopUp, RegisterPopUp } from "./Login";

export default function DropdownLoginRegisterMenu({ login, register, toggle }) {
  const [openedLogin, setOpenedLogin] = useState(false);
  const [openedRegister, setOpenedRegister] = useState(false);

  return (
    <Menu withArrow placement="end" size="xl" p="sm">
      {/* Pages */}
      <LoginPopUp />
    </Menu>
  );
}
