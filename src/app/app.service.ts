import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private apiUrl = environment.apiUrl;  // Use environment variable

    constructor(private http: HttpClient) { }

    login(postObj): Observable<any> {
        return this.http.post(this.apiUrl + '/login', postObj);
    }

    saveUser(postObj): Observable<any> {
        return this.http.post(this.apiUrl + '/register', postObj);
    }

    updatePassword(postObj): Observable<any> {
        return this.http.patch(this.apiUrl + '/updateUser', postObj);
    }

    getProducts(): Observable<any> {
        return this.http.get(this.apiUrl + '/products');
    }

    getProductById(id): Observable<any> {
        return this.http.get(this.apiUrl + '/products/' + id);
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

    setUserData(data: any) {
        window.localStorage.setItem('user', JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email
        }));
    }

    getUserData(key) {
        const data = window.localStorage.getItem(key);
        return JSON.parse(data);
    }

    logout() {
        return window.localStorage.clear();
    }

}
