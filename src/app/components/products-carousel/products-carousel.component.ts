import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../app.model';

@Component({
    selector: 'app-products-carousel',
    templateUrl: './products-carousel.component.html',
    styleUrl: './products-carousel.component.scss'
})
export class ProductsCarouselComponent implements OnInit {

    images: any[] = [];
    current: number = 0;

    @Input('product') product: Product = {};

    constructor() {

    }

    ngOnInit(): void {
        if (this.product) {
            this.getImages();
        }
    }

    getImages() {
        this.images = this.product.images.map(item => item.image);
    }

    onClickLeft() {
        this.current = this.current - 1;
    }

    onClickRightt() {
        this.current = this.current + 1;
    }
}
