import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobSearch } from '../models/job/job-search';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  constructor(private commonService: CommonService) { }

  searchJob(jobSearch: JobSearch): Observable<any> {
    return this.commonService.post(`/jobsearch`, jobSearch);
  }

  getAverageSalary(jobName, country): Observable<any> {
    return this.commonService.get(`/jobsearch/averagesalary?jobName=${jobName}&country=${country}`);
  }
}
