import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-adminreports',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './adminreports.component.html',
  styleUrl: './adminreports.component.css'
})
export class AdminreportsComponent {

  reports: any[] = [];
  filteredReports: any[] = [];
  reportSearchQuery: string = '';

  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.getAllReports().subscribe((data) => {
      this.reports = data;
      this.filteredReports = data; // Initially display all reports
      console.log(this.reports);
    });
  }

  filterReports() {
    const query = this.reportSearchQuery.toLowerCase().trim();
    this.filteredReports = this.reports.filter(report =>
      report.id.toString().includes(query) ||
      report.reportContent.toLowerCase().includes(query) ||
      report.productReportedBy.fullName.toLowerCase().includes(query) ||
      report.productsReports.product_title.toLowerCase().includes(query)
    );
  }
}
