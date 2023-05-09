export interface Episodes {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: {
        name: string;
        url: string
    };
    url: string;
    created: string
}