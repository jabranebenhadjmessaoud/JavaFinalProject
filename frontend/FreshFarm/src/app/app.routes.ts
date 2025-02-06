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
import { ShowpostdetailsComponent } from './showpostdetails/showpostdetails.component';
import { ProfileComponent } from './profile/profile.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundGuard } from './guards/not-found.guard';
import { ReportComponent } from './report/report.component';
import { AdminreportsComponent } from './adminreports/adminreports.component';

export const routes: Routes = [
    { path: "", component: HomepageComponent },
    { path: "authenticate", component: LoginformComponent, canActivate: [NoAuthGuard] },
    { path: "register", component: RegisterformComponent, canActivate: [NoAuthGuard] },
    { path: "admin", component: AdmindashboardComponent, canActivate: [AdminGuard] },
    { path: "admin-users", component: AdminusersComponent, canActivate: [AdminGuard] },
    { path: "admin-products", component: AdminproductsComponent, canActivate: [AdminGuard] },
    { path: "admin-posts", component: AdminpostsComponent, canActivate: [AdminGuard] },
    { path: "admin-reports", component: AdminreportsComponent, canActivate: [AdminGuard] },
    { path: "all-products", component: AllproductsComponent, canActivate: [AuthGuard] },
    { path: "farmer-form", component: FarmerformComponent, canActivate: [AuthGuard] },
    { path: "community-form", component: ComunityformComponent, canActivate: [AuthGuard] },
    { path: "all-posts", component: AllpostsComponent, canActivate: [AuthGuard] },
    { path: "post-details/:id", component: ShowpostdetailsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: "report/:id", component: ReportComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
    { path: '404', component: NotFoundComponent },

];
