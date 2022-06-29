import { Divider, Group, Text } from "@mantine/core";
import React from "react";
import { Settings } from "tabler-icons-react";
import Themes from "./Themes";

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
      <Themes samplePost={props.samplePost} localTheme={props.localTheme} />
    </div>
  );
}
