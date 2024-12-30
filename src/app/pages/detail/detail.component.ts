import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Product, Cart } from '../../app.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

    id: string;
    user: User = {};
    product: Product = {};
    cart: Cart = {};
    isLoggedIn: boolean = false;

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.verifyUserLogin();
    }

    verifyUserLogin() {
        this.user = this.appService.getUserData('user') || {};
        if (this.user && this.user.id) {
            this.isLoggedIn = true;
        }
        this.getProducts();
    }

    getProducts() {
        this.loaderService.start();
        this.appService.getProductById(this.id).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    this.product = this.appService.parseProductsList(res.data)[0];
                } else {
                    this.toastrService.error("Unable to fetch the product");
                    this.router.navigate(["dashboard"]);
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

    addToCart(product: Product) {
        if (!this.user || !this.user.id) {
            this.router.navigate(['login']);
            return;
        }
        this.loaderService.start();
        const payload = {
            account_id: this.user.id,
            cart_item: {
                product: product,
                qty: 1
            }
        };
        this.appService.addToCart(payload).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    this.toastrService.success("Added to the cart successfully!");
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
