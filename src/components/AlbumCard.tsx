import { Grid, Card, Image, Title, Button, Modal, List } from "@mantine/core";
import { useGlobalState } from "../global-state/GlobalStateContext";
import { getAccessToken, getAlbumTracks } from "../services/api-client";
import { useDisclosure } from "@mantine/hooks";

const AlbumCard = () => {
  const {
    albums,
    setAccessToken,
    accessToken,
    setAlbumTracks,
    albumTracks,
    setClickedAlbum,
    clickedAlbum,
  } = useGlobalState();

  const [opened, { open, close }] = useDisclosure(false);

  async function fetchAndStoreAccessToken() {
    const token = await getAccessToken();
    setAccessToken(token);
  }
  const handleAlbumClick = async (albumID: string) => {
    const tracks = await getAlbumTracks(accessToken, albumID);
    setAlbumTracks(tracks);
    setClickedAlbum(albumID);
    open();
  };

  return (
    <>
      {albums.length > 0 && (
        <Grid bg={"#090F14"} mt={"xl"} justify="left">
          {albums.map((album, i) => {
            return (
              <Grid.Col key={album.id} span={{ xl: 3, lg: 4, md: 6, sm: 12 }}>
                <Card
                  shadow="sm"
                  radius="md"
                  h={"100%"}
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Section bg={"none"}>
                    <Image src={album.images[0].url} />
                  </Card.Section>

                  <Card.Section>
                    <Title m={"lg"} order={4}>
                      {album.name}
                    </Title>
                  </Card.Section>

                  <Card.Section>
                    <Button
                      variant="outline"
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
                        size={"xl"}
                      >
                        <List>
                          {albumTracks.map((track) => {
                            return (
                              <List.Item key={track.id}>{track.name}</List.Item>
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
    </>
  );
};

export default AlbumCard;
