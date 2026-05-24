export interface Transport {
    id: number;
    name: string;
    description: string;

    category?: {
        name: string;
    }[];
}