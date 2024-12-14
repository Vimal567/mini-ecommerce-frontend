import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    @ViewChild('sidebar', { static: true }) sidebar: ElementRef;
    @ViewChild('toggleButton', { static: true }) toggleButton: ElementRef;

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
}
