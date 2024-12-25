import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SupportComponent } from './pages/support/support.component';

const routes: Routes = [
    {
        path: 'home',
        component: DashboardComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'detail/:id',
        component: DetailComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'support',
        component: SupportComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
