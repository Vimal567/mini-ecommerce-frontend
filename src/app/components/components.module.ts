import { NgxUiLoaderConfig } from './../../../node_modules/ngx-ui-loader/lib/utils/interfaces.d';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        NgxUiLoaderModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class ComponentsModule { }
