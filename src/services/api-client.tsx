const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

export async function getAccessToken() {
  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret,
  };
  const result = await fetch(
    "https://accounts.spotify.com/api/token",
    authParameters
  );
  const data = await result.json();
  return data.access_token;
}

export async function search(accessToken: string, searchInput: string) {
  const searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  const response = await fetch(
    "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
    searchParameters
  );
  const data = await response.json();
  return data.artists.items[0].id;
}

export async function getAlbums(accessToken: string, artistID: string) {
  const searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  const response = await fetch(
    "https://api.spotify.com/v1/artists/" +
      artistID +
      "/albums" +
      "?include_groups=album&market=US&limit=50",
    searchParameters
  );

  const data = await response.json();
  return data.items;
}

export async function getAlbumTracks(accessToken: string, albumID: string) {
  var searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  const response = await fetch(
    "https://api.spotify.com/v1/albums/" + albumID + "/tracks",
    searchParameters
  );
  const data = await response.json();
  return data.items;
}
