import { LoginPopUp } from "@components/LoginRegister/LoginPopUp";
import { Menu } from "@mantine/core";

export default function LoginRegisterSmallScreen() {
  return (
    <Menu withArrow placement="end" size="xl" p="sm">
      <LoginPopUp />
    </Menu>
  );
}
