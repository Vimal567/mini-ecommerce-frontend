import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './app.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private apiUrl = environment.apiUrl;  // Use environment variable

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get(`${this.apiUrl}/products`);
    }

    parseProductsList(products: any) {
        return products.map(product => {
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                ratings: product.ratings,
                images: product.images ? product.images.map(image => ({
                    id: image._id,
                    image: image.image
                })) : [],
                category: product.category,
                seller: product.seller,
                stock: product.stock
            };
        });
    }

}