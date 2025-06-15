import "@mantine/core/styles.css";
import {
  AppShell,
  Button,
  Card,
  CloseButton,
  Grid,
  Group,
  Image,
  List,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import "./global.css";
import { Input } from "@mantine/core";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";

const CLIENT_ID = "0982dc44ffdf4b95a3df245151f16360";
const ClIENT_SECRET = "d39b260f1bad4a0496062d67f6f99a2a";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [clickedAlbum, setClickedAlbum] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  function handleClose() {
    setSearchInput("");
    setAlbums([]);
  }

  const handleAlbumClick = async (albumID: string) => {
    await getAlbumTracks(albumID);
    open();
  };

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
    // console.log("Searching for:", searchInput);
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        console.log(data.items);
        setAlbums(data.items);
      });
  }

  async function getAlbumTracks(albumID: string) {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var albumTracks = await fetch(
      "https://api.spotify.com/v1/albums/" + albumID + "/tracks",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setAlbumTracks(data.items);
      });

    setClickedAlbum(albumID);
  }

  // console.log(albums);

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
              // console.log(album);
              return (
                <Grid.Col key={album.id} span={4}>
                  <Card shadow="sm" radius="md" h={"100%"} key={i}>
                    <Card.Section bg={"none"}>
                      <Image src={album.images[0].url} />
                    </Card.Section>
                    <Card.Section>
                      <Title m={"lg"} order={4}>
                        {album.name}
                      </Title>
                      <Button
                        m={"lg"}
                        onClick={() => {
                          handleAlbumClick(album.id);
                        }}
                      >
                        Show Album Tracks
                      </Button>
                      {albumTracks.length > 0 && clickedAlbum === album.id && (
                        <Modal
                          opened={opened}
                          onClose={close}
                          title={`${album.name} Tracks`}
                        >
                          <List m={"lg"}>
                            {albumTracks.map((track) => {
                              return (
                                <List.Item key={track.id}>
                                  {track.name}
                                </List.Item>
                              );
                            })}
                          </List>
                        </Modal>
                      )}
                    </Card.Section>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        )}
        {albums.length === 0 && (
          <Group justify="center" align="center" h={"60vh"}>
            <Text mt={"lg"} size="xl" color="dimmed">
              Search for an artist to see their albums on Spotify
            </Text>
          </Group>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
