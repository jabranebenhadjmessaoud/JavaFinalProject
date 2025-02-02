import { Routes, RouterModule } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FarmerformComponent } from './farmerform/farmerform.component';
import { AuthGuard } from './auth.guard';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { ComunityformComponent } from './comunityform/comunityform.component';
import { AllpostsComponent } from './allposts/allposts.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { AdminpostsComponent } from './adminposts/adminposts.component';

export const routes: Routes = [
    { path: "homepage", component: HomepageComponent },
    { path: "authenticate", component: LoginformComponent },
    { path: "register", component: RegisterformComponent },
    { path: "admin", component: AdmindashboardComponent, canActivate: [AdminGuard] },
    { path: "admin-users", component: AdminusersComponent, canActivate: [AdminGuard] },
    { path: "admin-products", component: AdminproductsComponent, canActivate: [AdminGuard] },
    { path: "admin-posts", component: AdminpostsComponent, canActivate: [AdminGuard] },
    { path: "all-products", component: AllproductsComponent, canActivate: [AuthGuard] },
    { path: "farmer-form", component: FarmerformComponent, canActivate: [AuthGuard] },
    { path: "community-form", component: ComunityformComponent, canActivate: [AuthGuard] },
    { path: "all-posts", component: AllpostsComponent, canActivate: [AuthGuard] },
];
