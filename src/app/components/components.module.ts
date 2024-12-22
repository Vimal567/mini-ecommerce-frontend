import { NgxUiLoaderConfig } from './../../../node_modules/ngx-ui-loader/lib/utils/interfaces.d';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RatingComponent } from './rating/rating.component';


@NgModule({
    declarations: [
        HeaderComponent,
        RatingComponent
    ],
    imports: [
        CommonModule,
        NgxUiLoaderModule
    ],
    exports: [
        HeaderComponent,
        RatingComponent
    ]
})
export class ComponentsModule { }
