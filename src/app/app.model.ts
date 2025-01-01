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
    description?: string[];
    ratings?: string;
    images?: Image[];
    category?: string;
    seller?: string;
    stock?: number;
}

export class Cart {
    accountId?: string;
    cartItems?: ProductItem[];
    amount?: number;
}

export class ProductItem {
    product?: Product;
    quantity?: number;
    date?: string;
    time?: string;
}

export class Orders {
    accountId?: string;
    orderItems?: ProductItem[];
    createdAt?: string;
}

export class SupportEntry {
    title?: string;
    description?: string;
}

export class OrderEntry {
    name?: string;
    email?: string;
    phone?: number;
    address?: string;
}