import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import  flatpickr  from 'flatpickr';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink,RouterModule, RouterOutlet, NavbarComponent, NgFor, NgIf, DatePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  providers: [DatePipe]
})
export class SummaryComponent implements AfterViewInit, OnDestroy {
  private dateRangePicker: flatpickr.Instance | null = null; // Initialize with null
    filteredAnnualReport: any[] = [];
    filteredEventReport: any[] = [];
    showMoreItems = false;
    annualReport: any = {};
    eventReport: any = {}

    constructor(private http: HttpClient, private datePipe: DatePipe) {
      this.annualReport = [];
      this.eventReport = [];

      this.retrieveAnnualReport();
      this.retrieveEventReport();
    }

    retrieveAnnualReport(){
      this.http.get('http://localhost/arco2/arco/api/annualreportall/2').subscribe(
        (resp: any) => {
          console.log(resp);
          this.annualReport = resp.data;
        }, (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

    retrieveEventReport(){
      this.http.get('http://localhost/arco2/arco/api/eventreportall/2').subscribe(
        (resp: any) => {
          console.log(resp);
          this.eventReport = resp.data;
        }
      )
    }


    toggleMoreItems() {
      this.showMoreItems = !this.showMoreItems; // Toggle the visibility
    }

    formatDate(date: string): string | null {
      const transformedDate = this.datePipe.transform(date, 'EEEE'); // Output like "Sunday, May 17, 2023"
      return transformedDate !== null ? transformedDate : null;
    }

    formatDate1(date: string): string | null {
      const transformedDate = this.datePipe.transform(date, 'd');  // Output like "Sunday, May 17, 2023"
      return transformedDate !== null ? transformedDate : null;
    }

    formatDate2(date: string): string | null {
      const transformedDate = this.datePipe.transform(date, 'MMMM d');  // Output like "Sunday, May 17, 2023"
      return transformedDate !== null ? transformedDate : null;
    }

    ngAfterViewInit() {
      const pickerInstance = flatpickr('#date-range-icon', {
        mode: 'range',
        dateFormat: 'F j, Y',
        onChange: (selectedDates: Date[]) => {
          this.updateSelectedRangeText(selectedDates);
        },
      });
      this.dateRangePicker = Array.isArray(pickerInstance) ? pickerInstance[0] : pickerInstance;
    }

    ngOnDestroy() {
      if (this.dateRangePicker) {
        this.dateRangePicker.destroy();
        this.dateRangePicker = null; // Ensures cleanup
      }
    }

    
  
    private updateSelectedRangeText(selectedDates: Date[]) {
      const selectedRange = selectedDates
        .map((date) =>
          date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        )
        .join(' to ');
    
      const selectedRangeElement = document.getElementById('selected-range');
      if (selectedRangeElement) {
        selectedRangeElement.textContent = ` ${selectedRange}`;
      }
    
      if (selectedDates.length === 2) {
        const [start, end] = selectedDates;
    
        // Filter annualReport

      this.filteredAnnualReport = this.annualReport.filter((report: any) => {
        const reportDate = new Date(report.created_at);
        return reportDate >= start && reportDate <= end;
      });
    
        // Filter eventReport
        this.filteredEventReport = this.eventReport.filter((event: any) => {
          const eventDate = new Date(event.event_date); // Adjust the property name as needed
          return eventDate >= start && eventDate <= end;
        });
      }
    }
  
    setDayRange() {
      if (this.dateRangePicker) {
        const today = new Date();
        this.dateRangePicker.setDate([today, today]);
        this.updateSelectedRangeText([today]);
      }
    }
  
    setWeekRange() {
      if (this.dateRangePicker) {
        const start = new Date();
        const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
        this.dateRangePicker.setDate([start, end]);
        this.updateSelectedRangeText([start, end]);
      }
    }
  
    setMonthRange() {
      if (this.dateRangePicker) {
        const start = new Date();
        const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        this.dateRangePicker.setDate([start, end]);
        this.updateSelectedRangeText([start, end]);
      }
    }
  
    setYearRange() {
      if (this.dateRangePicker) {
        const start = new Date();
        const end = new Date(start.getFullYear() + 1, 0, 0);
        this.dateRangePicker.setDate([start, end]);
        this.updateSelectedRangeText([start, end]);
      }
    }
  }

