export interface Locations {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: {
        name: string;
        url: string
    };
    url: string;
    created: string
}