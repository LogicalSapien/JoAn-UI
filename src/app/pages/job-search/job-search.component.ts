import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobSearch } from 'src/app/models/job/job-search';
import { Pagination } from 'src/app/models/pagination';
import { DataService } from 'src/app/services/data.service';
import { JobSearchService } from 'src/app/services/job-search.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {

  jobSearch: JobSearch = new JobSearch();
  countryList: any[] = [];
  country: string;
  jobResponse = {jobDetails:[]};

  constructor(private jobSearchService: JobSearchService, private spinner: NgxSpinnerService, private dataService: DataService) { }

  ngOnInit() {
    // fetch countries
    this.dataService.getCountries().subscribe(response => {
      this.countryList = response;
      this.jobSearch.country = this.countryList[0].code;
      console.log(response);
    }, error => {
      console.log(error);
    });

    // set default pagination
    this.jobSearch.pagination = new Pagination();
    this.jobSearch.pagination.page = 1;
    this.jobSearch.pagination.size = 10;
  }

  searchJob() {
    this.spinner.show();
    this.jobSearchService.searchJob(this.jobSearch).subscribe(response => {
      console.log(response);
      this.jobResponse = response;
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

}
