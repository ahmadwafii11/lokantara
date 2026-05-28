export interface TransportStop {
    id: number;
    name: string;
    description: string;
    code?: string;

    category?: {
        name: string;
    };

    region?: {
        regionName: string;
        regionType: string;
        province: string;
    };

    images?: {
        imageUrl: string;
        copyright?: string;
    }[];
}