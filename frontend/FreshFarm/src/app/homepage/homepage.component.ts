import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt, faEnvelopeOpen, faPhone } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, FontAwesomeModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  faCoffee = faCoffee;
  faMapMarkerAlt = faMapMarkerAlt;
  faEnvelopeOpen = faEnvelopeOpen;
  faPhone = faPhone;

}
