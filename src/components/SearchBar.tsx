import { Button, CloseButton, Group, Image, Input } from "@mantine/core";
import { useGlobalState } from "../global-state/GlobalStateContext";
import { getAccessToken, getAlbums, search } from "../services/api-client";

const SearchBar = () => {
  const {
    setAccessToken,
    setAlbums,
    accessToken,
    searchInput,
    setSearchInput,
  } = useGlobalState();

  async function fetchAndStoreAccessToken() {
    const token = await getAccessToken();
    setAccessToken(token);
  }

  function handleClose() {
    setSearchInput("");
    setAlbums([]);
  }

  async function searchAndFetchAlbums() {
    if (!accessToken) {
      await fetchAndStoreAccessToken();
    }
    var artistID = await search(accessToken, searchInput);
    var albumList = await getAlbums(accessToken, artistID);
    setAlbums(albumList);
  }

  return (
    <Group justify="center" align="center" h={"100px"}>
      <Input
        w={"50%"}
        placeholder="Search for artist"
        value={searchInput}
        onChange={(event) => setSearchInput(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            searchAndFetchAlbums();
          }
        }}
        rightSectionPointerEvents="all"
        leftSection={
          <Image w="20px" src="/song-search-app/assets/search-icon.webp" />
        }
        rightSection={
          <CloseButton
            onClick={() => handleClose()}
            style={{ display: searchInput ? undefined : "none" }}
          />
        }
      />
      <Button variant="outline" onClick={() => searchAndFetchAlbums()}>
        Search
      </Button>
    </Group>
  );
};

export default SearchBar;
