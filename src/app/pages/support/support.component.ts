import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupportEntry } from '../../app.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrl: './support.component.scss'
})
export class SupportComponent {

    supportEntry: SupportEntry = {};

    constructor(
        private toastrService: ToastrService,
        private router: Router
    ) {

    }

    submitForm(form: NgForm) {
        form.resetForm();
        this.toastrService.success('Submitted Successfully');
        this.router.navigate(['home']);
    }
}
