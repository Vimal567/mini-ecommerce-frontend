import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from '../../app.model';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    user: User = {};

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private toastrService: ToastrService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.checkUserLogin()
    }

    login(form: NgForm) {
        this.loaderService.start();
        this.appService.login(this.user).subscribe({
            next: (res: any) => {
                if (res && res.sucess) {
                    form.resetForm();
                    this.toastrService.success('Logged in Successfully!');
                    this.appService.setUserData(res.data);
                    this.router.navigate(['home']);
                } else {
                    this.user.password = '';
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

    checkUserLogin() {
        const user = this.appService.getUserData('user') || '{}';
        this.user = JSON.parse(user);
        if (this.user && this.user.id) {
            this.router.navigate(['home']);
        }
    }
}
