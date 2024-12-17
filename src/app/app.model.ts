export class Image {
    id?: string;
    image?: string;
}

export class Product {
    id?: string;
    name?: string;
    price?: string;
    description?: string;
    ratings?: string;
    images?: Image[];
    category?: string;
    seller?: string;
    stock?: number;
}