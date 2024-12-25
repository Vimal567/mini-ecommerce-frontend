import { Component, OnInit } from '@angular/core';
import { Cart, Product, User } from '../../app.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

    user: User = {};
    productsList: Product[] = [];
    cart: Cart[] = [];
    isLoggedIn: boolean = false;

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private toastrService: ToastrService
    ) {

    }

    ngOnInit(): void {
        this.verifyUserLogin();
    }

    verifyUserLogin() {
        this.user = this.appService.getUserData('user') || {};
        if (this.user && this.user.id) {
            this.isLoggedIn = true;
        }
        this.getProducts();
        this.getCart();
    }

    getProducts() {
        this.loaderService.start();
        this.appService.getProducts().subscribe({
            next: (res: any) => {
                if (res) {
                    this.productsList = this.appService.parseProductsList(res.data);
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

    getCart() {
        this.loaderService.start();
        const payload = {
            account_id : this.user.id
        };
        this.appService.getCart(payload).subscribe({
            next: (res: any) => {
                if (res) {
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

    addToCart(product: Product, event: Event): void {
        event.stopPropagation();
        this.loaderService.start();
        const payload = {
            account_id: this.user.id,
            cart_items: [
                {
                    product: product,
                    qty: 1
                }
            ]
        };
        this.appService.addToCart(payload).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    this.toastrService.success("Added to the cart sucessfully!");
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
}
