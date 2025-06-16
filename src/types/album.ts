export interface Album {
    id: string;
    name: string;
    images: {
        url: string;
        height: number;
        width: number;
    }[];
}

