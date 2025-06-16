import { createContext, useContext, useState } from "react";
import type { Album } from "../types/album";
import type { AlbumTracks } from "../types/albumTracks";

type GlobalStateType = {
  searchInput: string;
  setSearchInput: (input: string) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
  albumTracks: AlbumTracks[];
  setAlbumTracks: (tracks: AlbumTracks[]) => void;
  clickedAlbum: string | null;
  setClickedAlbum: (albumID: string | null) => void;
};

const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined
);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumTracks, setAlbumTracks] = useState<AlbumTracks[]>([]);
  const [clickedAlbum, setClickedAlbum] = useState<string | null>(null);

  return (
    <GlobalStateContext.Provider
      value={{
        searchInput,
        setSearchInput,
        accessToken,
        setAccessToken,
        albums,
        setAlbums,
        albumTracks,
        setAlbumTracks,
        clickedAlbum,
        setClickedAlbum,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context)
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  return context;
};
