import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appFormValidator]'
})
export class CustomValidationDirective {

    @Input() appFormValidator: any;

    constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) { }

    @HostListener('blur') onBlur() {
        this.checkValidation();
    }

    private checkValidation() {
        if (this.control && this.control.control) {
            const control = this.control.control;
            if (control.invalid && (control.dirty || control.touched)) {
                this.showErrorMessage();
            } else {
                this.removeErrorMessage();
            }
        }
    }

    private showErrorMessage() {
        const errorMessages = this.getErrorMessages();
        const errorContainer = this.el.nativeElement.parentElement.querySelector('.error-messages');
        if (errorMessages.length > 0 && !errorContainer) {
            const errorDiv = this.renderer.createElement('div');
            this.renderer.addClass(errorDiv, 'error-messages');
            errorMessages.forEach((msg: string) => {
                const errorText = this.renderer.createText(msg);
                this.renderer.appendChild(errorDiv, errorText);
            });
            this.renderer.appendChild(this.el.nativeElement.parentElement, errorDiv);
        }
    }

    private removeErrorMessage() {
        const errorContainer = this.el.nativeElement.parentElement.querySelector('.error-messages');
        if (errorContainer) {
            this.renderer.removeChild(this.el.nativeElement.parentElement, errorContainer);
        }
    }

    private getErrorMessages(): string[] {
        const control = this.control.control;
        const errorMessages: string[] = [];

        if (control.errors) {
            if (control.errors['required']) {
                errorMessages.push('This field is required.');
            }
            if (control.errors['minlength']) {
                errorMessages.push(`Minimum length is ${control.errors['minlength'].requiredLength} characters.`);
            }
            if (control.errors['email']) {
                errorMessages.push('Invalid email address.');
            }
            // Add more error cases as necessary
        }
        return errorMessages;
    }

}
