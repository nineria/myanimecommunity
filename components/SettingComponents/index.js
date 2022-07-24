// Components
import { Divider, Group, Text } from "@mantine/core";
import Themes from "./Theme";
// Icons
import { Settings } from "tabler-icons-react";

export default function SettingComponents(props) {
  return (
    <div className="bg-foreground my-2 w-full rounded-sm shadow-md">
      <Group className="py-2 px-4 font-bold w-full text-title">
        <Settings size={18} />
        <Text size="lg" className="font-bold ">
          การตั้งค่า
        </Text>
      </Group>
      <Divider className="opacity-50" />
      <Themes posts={props.posts} localTheme={props.localTheme} />
    </div>
  );
}
