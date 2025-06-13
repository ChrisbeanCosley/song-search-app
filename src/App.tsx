import "@mantine/core/styles.css";
import {
  AppShell,
  Burger,
  Button,
  Card,
  Center,
  CloseButton,
  Grid,
  Group,
  Image,
  Text,
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
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  function handleClose() {
    setSearchInput("");
    setAlbums([]);
  }

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        ClIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    console.log("Searching for:", searchInput);
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "applocattion/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      });
  }

  console.log(albums);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header h={"100px"}>
        <Group justify="center" align="center" h={"100px"}>
          <Input
            w={"50%"}
            placeholder="Search for artist"
            value={searchInput}
            onChange={(event) => setSearchInput(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            rightSectionPointerEvents="all"
            leftSection={<IconSearch size={16} />}
            rightSection={
              <CloseButton
                aria-label="Search for artist"
                onClick={() => handleClose()}
                style={{ display: searchInput ? undefined : "none" }}
              />
            }
          />
          <Button onClick={search}>Search</Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {albums.length > 0 && (
          <Grid bg={"#162733"} mt={"xl"} justify="left">
            {albums.map((album, i) => {
              console.log(album);
              return (
                <Grid.Col span={4}>
                  <Card shadow="sm" radius="md" h={"100%"} key={i}>
                    <Card.Section>
                      <Image src={album.images[0].url} />
                    </Card.Section>
                    <Card.Section>
                      <Title m={"lg"} order={4}>
                        {album.name}
                      </Title>
                    </Card.Section>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        )}
        {albums.length === 0 && (
          <Group justify="center" align="center" h={"100vh"}>
            <Text mt={"lg"} size="xl" color="dimmed">
              Search for an artist to see all of their albums on Spotify
            </Text>
          </Group>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
