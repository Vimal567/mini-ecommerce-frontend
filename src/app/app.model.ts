export class User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    oldPassword?: string;
}

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