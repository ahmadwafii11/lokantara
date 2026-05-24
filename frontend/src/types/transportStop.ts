export interface TransportStop {
    id: number;
    name: string;
    description: string;
    code?: string;

    category?: {
        name: string;
    };

    region?: {
        name: string;
    };

    images?: {
        imageUrl: string;
        copyright?: string;
    }[];
}