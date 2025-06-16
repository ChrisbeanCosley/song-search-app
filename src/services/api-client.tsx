const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

export async function getAccessToken() {
  try {
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
    if (!result.ok) {
      throw new Error(
        `Failed to get access token: ${result.status} ${result.statusText}`
      );
    }
    const data = await result.json();
    return data.access_token;
  } catch (error) {
    console.error("Error in getAccessToken:", error);
    throw error;
  }
}

export async function search(accessToken: string, searchInput: string) {
  try {
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
    if (!response.ok) {
      throw new Error(
        `Failed to search artist: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    if (!data.artists.items.length) {
      throw new Error("No artist found for the given search input.");
    }
    return data.artists.items[0].id;
  } catch (error) {
    console.error("Error in search:", error);
    throw error;
  }
}

export async function getAlbums(accessToken: string, artistID: string) {
  try {
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
  } catch (error) {
    console.error("Error in getAlbums:", error);
    throw error;
  }
}

export async function getAlbumTracks(accessToken: string, albumID: string) {
  try {
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
  } catch (error) {
    console.error("Error in getAlbumTracks:", error);
    throw error;
  }
}
