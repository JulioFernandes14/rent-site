export interface TotalRentsResponse {
    total: number
}

export interface TotalRentsValueResponse {
    totalValue: number;
}

export interface RentItem {
    id: string;
    name: string;
    quantity: number;
    value: number;
    valueAdjusted: number;
}

export interface RentItemRequest {
    name: string;
    quantity: number;
    value: number;
}

export interface Rent {
    id: string;
    createdAt: string;
    items: RentItem[];
    totalValue: number;
}

export interface RentItemCreateResponse {
    id: string;
    name: string;
    quantity: number;
    value: number;
}

export interface RentCreateResponse {
    id: string;
    createdAt: string;
    items: RentItemCreateResponse[]
}
