import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Product } from '../../app.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

    id: string;
    user: User = {};
    product: Product = {};
    isLoggedIn: boolean = false;

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
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
                if (res) {
                    this.product = this.appService.parseProductsList(res.data)[0];
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
