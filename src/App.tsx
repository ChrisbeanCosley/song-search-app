import "@mantine/core/styles.css";
import {
  AppShell,
  Burger,
  Button,
  Card,
  CloseButton,
  Grid,
  Group,
  Image,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./global.css";
import { Input } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";

const CLIENT_ID = "0982dc44ffdf4b95a3df245151f16360";
const ClIENT_SECRET = "d39b260f1bad4a0496062d67f6f99a2a";

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const [searchInput, setSearchInput] = useState("");

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header h={"100px"}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="center" align="center" h={"100px"}>
          <Input
            w={"50%"}
            placeholder="Search for artist"
            value={searchInput}
            onChange={(event) => setSearchInput(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("Search for:", searchInput);
              }
            }}
            rightSectionPointerEvents="all"
            leftSection={<IconSearch size={16} />}
            rightSection={
              <CloseButton
                aria-label="Search for artist"
                onClick={() => setSearchInput("")}
                style={{ display: searchInput ? undefined : "none" }}
              />
            }
          />
          <Button
            onClick={() => {
              console.log("clicked button");
            }}
          >
            Search
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Grid bg={"#162733"} mt={"xl"} justify="left">
          <Grid.Col span={4}>
            <Card shadow="sm" radius="md">
              <Card.Section>
                <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" />
              </Card.Section>
              <Card.Section>
                <Title>Album Name Here</Title>
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
