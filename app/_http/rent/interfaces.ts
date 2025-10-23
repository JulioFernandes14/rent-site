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

// {
//   "id": "246e8dd9-f075-49a2-83b8-b9d5f1a99e6a",
//   "createdAt": "2025-08-31T21:24:50.906Z",
//   "items": [
//     {
//       "id": "1bf4b98b-0b25-41ae-835a-0a2c77ec44bf",
//       "name": "Kit louça 1",
//       "quantity": 5,
//       "value": 25
//     }
//   ]
// }