import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';
import { Orders, ProductItem, User } from '../../app.model';
import moment from 'moment';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

    user: User = {};
    orders: Orders = {};

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService
    ) {

    }

    ngOnInit(): void {
        this.verifyUserLogin();
    }

    verifyUserLogin() {
        this.user = this.appService.getUserData('user') || {};
        if (this.user && this.user.id) {
            this.getOrders();
        }
    }

    getOrders() {
        this.loaderService.start();
        const filter = {account_id: this.user.id};
        this.appService.getOrders(filter).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    const data = res.data;
                    this.orders = {
                        accountId: data.accountId,
                        orderItems: data.orderItems ? data.orderItems.map(item => {
                            return {
                                product: this.appService.parseProductsList([item.product])[0],
                                quantity: item.qty,
                                date: moment(item.createdAt).format('DD MMM YYYY'),
                                time: moment(item.createdAt).format('h:mm a')
                            } as ProductItem;
                        }) : []
                    }
                    console.log(this.orders)
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