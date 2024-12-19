import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from '../../app.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    productsList: Product[] = [];
    filteredProducts: Product[] = [];
    timer: any  //debounce

    showOptions: boolean = false;
    showLoginButton: boolean = false;
    showRegisterButton: boolean = false;

    @ViewChild('sidebar', { static: true }) sidebar: ElementRef;
    @ViewChild('toggleButton', { static: true }) toggleButton: ElementRef;

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.router.events.pipe().subscribe(() => {
            const currentUrl = this.router.url;
            if (currentUrl.includes('register')) {
                this.showLoginButton = true;
                this.showRegisterButton = false;
                this.showOptions = false;
            } else if (currentUrl.includes('login')) {
                this.showRegisterButton = true;
                this.showLoginButton = false;
                this.showOptions = false;
            } else if (currentUrl.includes('home')) {
                this.showRegisterButton = true;
                this.showLoginButton = true;
                this.showOptions = false;
            } else {
                this.showRegisterButton = false;
                this.showLoginButton = false;
                this.showOptions = true;
            }
        });
        this.getProducts();
    }

    getProducts() {
        this.loaderService.start();
        this.appService.getProducts().subscribe({
            next: (res: any) => {
                if (res) {
                    this.productsList = this.appService.parseProductsList(res.products);
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

    // This method is called when a click happens outside the sidebar
    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {
        // If the click is on the sidebar or toggle button, do nothing
        if (this.sidebar && this.toggleButton &&
            (this.sidebar.nativeElement.contains(event.target) || this.toggleButton.nativeElement.contains(event.target))) {
            return;
        }

        // If the click is outside the sidebar, close the sidebar
        this.closeSidebar();
    }

    // Method to toggle the sidebar visibility
    toggleSidebar() {
        if (this.sidebar.nativeElement.style.display === 'block') {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    // Method to close the sidebar
    closeSidebar() {
        this.sidebar.nativeElement.style.display = 'none';
    }

    // Method to open the sidebar
    openSidebar() {
        this.sidebar.nativeElement.style.display = 'block';
    }

    onTyping(event) {
        const value = event.target.value;
        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (!value) {
            this.filteredProducts = [];
            return;
        }

        this.timer = setTimeout(() => {
            this.searchProducts(value);
        }, 5);
    }

    searchProducts(value) {
        this.filteredProducts = this.productsList.filter(data => data.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    }

    onSelectProduct(product: Product) {
        console.log(product)
    }

    navigateTo(page: string) {
        switch(page) {
            case 'LOGIN':
                this.router.navigate(['login']);
                break;
            case 'REGISTER':
                this.router.navigate(['register']);
                break;
        }
    }
}
