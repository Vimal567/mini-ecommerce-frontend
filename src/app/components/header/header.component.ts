import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from '../../app.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    productsList: Product[] = [];
    filteredProducts: Product[] = [];
    timer: any

    @ViewChild('sidebar', { static: true }) sidebar: ElementRef;
    @ViewChild('toggleButton', { static: true }) toggleButton: ElementRef;

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService
    ) {

    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.loaderService.start();
        this.appService.getProducts().subscribe({
            next: (res: any) => {
                if (res) {
                    this.productsList = this.appService.parseProductsList(res.products);
                    console.log(this.productsList);
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
}
