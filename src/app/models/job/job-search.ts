import { Pagination } from "../pagination";

export class JobSearch {
  
  /**
   * Country.
   */
  country: String;

  /**
   * Search Query.
   */
  query: String;

  /**
   * Exclude Result Query.
   */
  exclude: String;

  /**
   * Location.
   */
  location: String;

  /**
   * Min Salary search.
   */
  minSalary: number;

  /**
   * Full time filter. possible values 0-1.
   */
  fullTime: number;

  /**
   * Permanenent filter. possible values 0-1.
   */
  permanent: number;

  /**
   * Search Query.
   */
  pagination: Pagination;
}
