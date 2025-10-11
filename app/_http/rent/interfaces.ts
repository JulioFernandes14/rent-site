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

export interface Rent {
    id: string;
    createdAt: string;
    items: RentItem[];
    totalValue: number;
}