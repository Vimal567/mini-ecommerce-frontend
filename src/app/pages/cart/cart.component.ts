import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User, Cart, CartItem } from '../../app.model';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {

    user: User = {};
    cart: Cart = {};

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService
    ) {

    }

    ngOnInit(): void {
        this.getyUserLogin();
    }

    getyUserLogin() {
        this.user = this.appService.getUserData('user') || {};
        this.getCart();
    }

    getCart() {
        this.loaderService.start();
        const payload = {
            account_id: this.user.id
        };
        this.appService.getCart(payload).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    this.cart = this.appService.parseCart(res.data);
                }
            },
            error: (error) => {
                this.loaderService.stop();
            },
            complete: () => {
                this.loaderService.stop();
            }
        });
    }

    updateCartItem(action: string, cartItem: CartItem) {
        this.loaderService.start();
        const payload = {
            account_id: this.user.id,
            cart_item: {
                product: cartItem.product,
                qty: action === 'ADD' ? cartItem.quantity + 1 : cartItem.quantity - 1
            }
        };
        this.appService.addToCart(payload).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    this.getCart();
                }
            },
            error: (error) => {
                this.loaderService.stop();
            },
            complete: () => {
                this.loaderService.stop();
            }
        });
    }

    getTotalPrice(): number {
        return this.cart.cartItems.reduce((acc, curr: any) => {
            return acc + (curr.product.price * curr.quantity);
        }, 0);
    }
}
