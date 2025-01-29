import { Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    { path: "homepage", component: HomepageComponent },
    { path: "authenticate", component: LoginformComponent },
    { path: "register", component: RegisterformComponent }
];
