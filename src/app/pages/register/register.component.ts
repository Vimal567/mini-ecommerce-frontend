import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';
import { User } from '../../app.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

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

    ngOnInit(): void {
        this.verifyUserLogin();
    }

    matchPassword() {
        this.showPasswordMatchingIndication = true;
        if (this.user.password === this.user.confirmPassword) {
            this.passwordMatching = true;
        } else {
            this.passwordMatching = false;
        }
    }

    saveUser(form: NgForm) {
        this.loaderService.start();
        const payload = {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
        }
        this.appService.saveUser(payload).subscribe({
            next: (res: any) => {
                if (res && res.success) {
                    form.resetForm();
                    this.toastrService.success('User registered Successfully!');
                    this.appService.setUserData(res.data);
                    this.router.navigate(['home']);
                } else {
                    this.user.password = '';
                    this.user.confirmPassword = '';
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

    verifyUserLogin() {
        this.user = this.appService.getUserData('user') || {};
        if (this.user && this.user.id) {
            this.router.navigate(['home']);
        }
    }
}
