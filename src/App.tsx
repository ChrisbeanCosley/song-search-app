import "@mantine/core/styles.css";
import { useGlobalState } from "./global-state/GlobalStateContext";
import { AppShell, Image, Stack, Text } from "@mantine/core";
import "./global.css";
import SearchBar from "./components/SearchBar";
import AlbumCard from "./components/AlbumCard";

export default function App() {
  const { albums } = useGlobalState();
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header h={"100px"}>
        <SearchBar />
      </AppShell.Header>

      <AppShell.Main>
        <AlbumCard />
        {albums.length === 0 && (
          <Stack align="center" h={"60vh"} mt={"200px"}>
            <Image
              src="/song-search-app/assets/spotify-logo.svg"
              alt="Spotify Logo"
              w={"30%"}
            />
            <Text mt={"lg"} size="xl" color="dimmed">
              Search for an artist to see their albums on Spotify
            </Text>
          </Stack>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
