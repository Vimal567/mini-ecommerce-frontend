import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    getCart(payload): Observable<any> {
        return this.http.get(this.apiUrl + '/order?' + this.buildQueryParams(payload));
    }

    addToCart(postObj): Observable<any> {
        return this.http.post(this.apiUrl + '/order', postObj);
    }

    parseProductsList(products: any) {
        return products.map(product => {
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                description: product.description ? product.description.map(item => item) : [],
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

    parseCart(cartData: any) {
        return cartData.map(cart => {
            return {
                accountId: cart.accountId,
                cartItems: cart.cartItems ? cart.cartItems.map(item => {
                    return {
                        product: this.parseProductsList([item.product]),
                        quantity: item.qty
                    };
                }) : [],
                amount: parseFloat(cart.amount),
                status: cart.status
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

/**
 * Converts an object into HttpParams (query parameters).
 * @param paramsObj - The object to be converted into query params.
 * @returns {HttpParams} - The HttpParams object.
 */
    buildQueryParams(paramsObj: any): HttpParams {
        let params = new HttpParams();
        for (const key in paramsObj) {
            if (paramsObj.hasOwnProperty(key)) {
                params = params.append(key, paramsObj[key]);
            }
        }
        return params;
    }

}
