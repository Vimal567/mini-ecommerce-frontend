import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Product, User } from '../../app.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    user: User = {};
    productsList: Product[] = [];
    filteredProducts: Product[] = [];
    timer: any  //debounce

    showOptions: boolean = false;
    showLoginButton: boolean = false;
    showRegisterButton: boolean = false;

    @ViewChild('sidebar', { static: true }) sidebar: ElementRef;
    @ViewChild('toggleButton', { static: true }) toggleButton: ElementRef;
    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.router.events.pipe().subscribe(() => {
            this.verifyUserLogin();
            this.getUserData();
        });
        if (this.productsList.length === 0) {
            this.getProducts();
        }
    }

    verifyUserLogin() {
        this.user = this.appService.getUserData('user') || {};
        if (this.user && this.user.id) {
            this.showRegisterButton = false;
            this.showLoginButton = false;
            this.showOptions = true;
        } else {
            this.showRegisterButton = true;
            this.showLoginButton = true;
            this.showOptions = false;
        }
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

    getUserData() {
        this.user = this.appService.getUserData('user') || {};
        if (this.user && this.user.id) {
            this.showRegisterButton = false;
            this.showLoginButton = false;
            this.showOptions = true;
        }
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
        this.searchInput.nativeElement.value = null;
        this.filteredProducts = [];
        this.router.navigate(['detail/' + product.id]);
    }

    navigateTo(page: string) {
        switch(page) {
            case 'HOME':
                this.router.navigate(['home']);
                this.closeSidebar();
                break;
            case 'LOGIN':
                this.router.navigate(['login']);
                this.closeSidebar();
                break;
            case 'REGISTER':
                this.router.navigate(['register']);
                this.closeSidebar();
                break;
            case 'ORDERS':
                this.router.navigate(['orders']);
                this.closeSidebar();
                break;
            case 'SETTINGS':
                this.router.navigate(['settings']);
                this.closeSidebar();
                break;
            case 'SUPPORT':
                this.router.navigate(['support']);
                this.closeSidebar();
                break;
        }
    }

    logout() {
        this.appService.logout();
        this.navigateTo('LOGIN');
    }
}
