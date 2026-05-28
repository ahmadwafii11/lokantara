export interface RouteStopDetail {
    id: number;
    name: string;
    code?: string;
    slug: string;
    address?: string;
}

export interface TransportService {
    id: number;
    name: string;
    description: string;

    category?: {
        name: string;
    };
    type?: {
        name: string;
    };
    operator?: {
        name: string;
    };
    route?: {
        id: number;
        route_name: string;
        originStop: RouteStopDetail;
        destinationStop: RouteStopDetail;
    }[];
}