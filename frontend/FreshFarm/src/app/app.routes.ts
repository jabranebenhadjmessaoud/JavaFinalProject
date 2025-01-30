import { Routes, RouterModule } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FarmerformComponent } from './farmerform/farmerform.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: "homepage", component: HomepageComponent, canActivate: [AuthGuard] },
    { path: "authenticate", component: LoginformComponent },
    { path: "register", component: RegisterformComponent },
    { path: "farmer-form", component: FarmerformComponent },
];
