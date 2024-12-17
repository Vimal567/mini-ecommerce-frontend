import { NgxUiLoaderConfig } from './../../../node_modules/ngx-ui-loader/lib/utils/interfaces.d';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        NgxUiLoaderModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
})
export class ComponentsModule { }
