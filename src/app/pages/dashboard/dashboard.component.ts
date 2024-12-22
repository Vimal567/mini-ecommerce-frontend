import { Component, OnInit } from '@angular/core';
import { Product } from '../../app.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

    productsList: Product[] = [];

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
    ) {

    }

    ngOnInit(): void {
        this.getProducts();
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
}
