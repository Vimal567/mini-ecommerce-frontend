import { Component } from '@angular/core';
import { User } from '../../app.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {

    user: User = {};
    passwordMatching: boolean = false;
    showPasswordMatchingIndication: boolean = false;

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private toastrService: ToastrService,
        private router: Router
    ) {

    }

    matchPassword() {
        this.showPasswordMatchingIndication = true;
        if (this.user.password === this.user.confirmPassword) {
            this.passwordMatching = true;
        } else {
            this.passwordMatching = false;
        }
    }

    updatePassword(form: NgForm) {
        this.loaderService.start();
        let payload = {};
        if (this.user.name) {
            payload['name'] = this.user.name;
        }
        if (this.user.password) {
            payload['old_password'] = this.user.oldPassword;
            payload['password'] = this.user.password;
        }
        if (!Object.keys(payload).length) return;
        const user = this.appService.getUserData('user');
        this.user.id = user.id;
        this.appService.updatePassword(this.user).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    form.resetForm();
                    this.toastrService.success('Updated Successfully!');
                    this.router.navigate(['home']);
                } else {
                    form.resetForm();
                    this.showPasswordMatchingIndication = false;
                    this.passwordMatching = false;
                    this.toastrService.warning(res.message);
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
}
