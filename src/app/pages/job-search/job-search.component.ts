import { Component, OnInit } from '@angular/core';
import { JobSearchService } from 'src/app/services/job-search.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {

  jobName: string;
  country: string;
  jobResponse = {jobDetails:[]};

  constructor(private jobSearchService: JobSearchService) { }

  ngOnInit() {
  }

  getAverageSalary() {
    this.jobSearchService.getAverageSalary(this.jobName, this.country).subscribe(response => {
      console.log(response);
      this.jobResponse = response;
    }, error => {
      console.log(error);
    });
  }

}
