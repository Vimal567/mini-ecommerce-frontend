import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../app.service';
import { User } from '../../app.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

    user: User = {};

    constructor(
        private appService: AppService,
        private loaderService: NgxUiLoaderService,
        private router: Router
    ) {

    }

    ngOnInit(): void {

    }

    saveUser() {
        this.loaderService.start();
        const payload = {

        };
        this.appService.saveUser(payload).subscribe({
            next: (res: any) => {
                if (res) {
                    console.log(res)
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
