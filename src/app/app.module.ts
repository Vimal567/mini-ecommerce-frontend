import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { CustomValidationDirective } from './directives/custom-validation.directive';
import { ToastrModule } from 'ngx-toastr';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SupportComponent } from './pages/support/support.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        CustomValidationDirective,
        SettingsComponent,
        DashboardComponent,
        DetailComponent,
        SupportComponent,
        CartComponent,
        OrdersComponent,
        CheckoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        HttpClientModule,
        ToastrModule.forRoot(
            {
                timeOut: 1000,
                positionClass: 'toast-top-center',
                preventDuplicates: true,
            }
        ),
        NgxUiLoaderModule.forRoot({
            bgsColor: 'red',      // Background color of the loader
            bgsOpacity: 0.8,      // Opacity of the background
            fgsColor: 'blue',     // Color of the spinner
            fgsSize: 100,         // Size of the spinner
            pbColor: 'green',     // Progress bar color
            pbDirection: 'ltr',   // Progress bar direction (ltr or rtl)
            overlayColor: 'rgba(0, 0, 0, 0.8)', // Overlay background color
            logoPosition: 'center-center', // Position of the logo
            logoSize: 60          // Size of the logo (if you are using a logo)
          })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
