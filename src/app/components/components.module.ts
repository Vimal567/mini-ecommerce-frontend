import { NgxUiLoaderConfig } from './../../../node_modules/ngx-ui-loader/lib/utils/interfaces.d';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RatingComponent } from './rating/rating.component';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';


@NgModule({
    declarations: [
        HeaderComponent,
        RatingComponent,
        ProductsCarouselComponent
    ],
    imports: [
        CommonModule,
        NgxUiLoaderModule
    ],
    exports: [
        HeaderComponent,
        RatingComponent,
        ProductsCarouselComponent
    ]
})
export class ComponentsModule { }
