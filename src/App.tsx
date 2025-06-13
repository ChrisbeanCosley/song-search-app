import "@mantine/core/styles.css";
import { AppShell, Burger, CloseButton, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./global.css";
import { Input } from "@mantine/core";
import { useState } from "react";

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const [value, setValue] = useState("Clear me");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header h={"100px"}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="center" align="center" h={"100px"}>
          <Input
            w={"50%"}
            placeholder="Search for artist"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Search for artist"
                onClick={() => setValue("")}
                style={{ display: value ? undefined : "none" }}
              />
            }
          />
        </Group>
      </AppShell.Header>

      <AppShell.Main></AppShell.Main>
    </AppShell>
  );
}
