import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  constructor(private commonService: CommonService) { }

  getAverageSalary(jobName, country): Observable<any> {
    return this.commonService.get(`/jobsearch/averagesalary?jobName=${jobName}&country=${country}`);
  }
}
