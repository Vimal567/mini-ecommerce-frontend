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

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        HttpClientModule,
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
