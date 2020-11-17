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
  totalJobList = [];

  constructor(private jobSearchService: JobSearchService, private spinner: NgxSpinnerService, private dataService: DataService) { }

  ngOnInit() {
    // fetch countries
    this.dataService.getCountries().subscribe(response => {
      this.countryList = response;
      this.jobSearch.country = this.countryList[0].code;
    }, error => {
      console.log(error);
    });

    // set default pagination
    this.jobSearch.pagination = new Pagination();
    this.jobSearch.pagination.page = 1;
    this.jobSearch.pagination.size = 10;
  }

  searchJob() {
    if (this.jobSearch.paginatedView) {
      this.spinner.show('paginationload');
      this.jobSearchService.searchJob(this.jobSearch).subscribe(response => {
        this.jobResponse = response;
        this.jobSearch.pagination = response.pagination;
        this.spinner.hide('paginationload');
      }, error => {
        console.log(error);
        this.spinner.hide('paginationload');
      });
    } else {
      this.totalJobList = [];
      this.jobSearch.pagination.page = 0;
      this.jobSearch.pagination.size = 10;
      this.onScrollDown(null);
    }
    
  }

  pageChange($event){
    this.jobSearch.pagination.page = +$event;
    this.searchJob();
  }

  
  sum = 20;
  throttle = 100;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;


  onScrollDown (ev) {
    this.jobSearch.pagination.page = this.jobSearch.pagination.page + 1;

    this.spinner.show('scrollload');
    this.jobSearchService.searchJob(this.jobSearch).subscribe(response => {
      for (const jobD of response.jobDetails) {
        this.totalJobList.push(jobD);
      }
      this.spinner.hide('scrollload');
    }, error => {
      console.log(error);
      this.spinner.hide('scrollload');
    });
    
    this.direction = 'down'
  }

}
