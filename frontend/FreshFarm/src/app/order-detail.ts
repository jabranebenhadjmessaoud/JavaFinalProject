export interface OrderDetail{
    id: number;
    productId: number;
    productTitle: string;
    price: number;
    quantity: number;
    product: {
        id: number;
        product_title: string;
        category: string;
        farming_method: string;
        location: string;
        price: number;
        quantity: number;
        image_url: string;
        description: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    };
    orderedBy: {
        id: number;
        fullName: string;
        email: string;
    };
}