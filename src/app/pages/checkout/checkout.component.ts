import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { User, Product, Cart, OrderEntry } from '../../app.model';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

    id: string;
    user: User = {};
    product: Product = {};
    cart: Cart = {};
    orderEntry: OrderEntry = {};

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private _location: Location
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.user = this.appService.getUserData('user') || {};
        if (this.id === 'cart') {
            this.getCart();
        } else {
            this.getProduct();
        }
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

    getProduct() {
        this.loaderService.start();
        this.appService.getProductById(this.id).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    this.product = this.appService.parseProductsList(res.data)[0];
                } else {
                    this.toastrService.error("Unable to fetch the product");
                    this.router.navigate([""]);
                }
            },
            error: (error) => {
                this.toastrService.error("Unable to fetch the product");
                this.router.navigate(['']);
                this.loaderService.stop();
            },
            complete: () => {
                this.loaderService.stop();
            }
        });
    }

    placeOrder(form: NgForm) {
        this.loaderService.start();
        const payload = {
            account_id: this.user.id
        };
        if (this.id === 'cart') {
            payload["orderItems"] = this.cart.cartItems;
        } else {
            payload["orderItems"] = [
                {
                    product: this.product,
                    qty: 1
                }
            ];
        }
        this.appService.placeOrder(payload).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    form.resetForm();
                    this.router.navigate(['/orders']);
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

    navigateBack(form: NgForm) {
        form.resetForm();
        this._location.back();
    }
}