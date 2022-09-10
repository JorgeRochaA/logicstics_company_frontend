import { Package } from './../interfaces/package';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PackageResponse, UpdatePackage } from '../interfaces/package';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient) {}

  addPackage(data: FormData) {
    return this.http.post<Package>(
      `${environment.apiUrl}/package/create`,
      data
    );
  }
  getPackages(status: number) {
    return this.http.get<Array<PackageResponse>>(
      `${environment.apiUrl}/package/get/${status}`
    );
  }
  updatePackage(data: UpdatePackage) {
    const url = `${environment.apiUrl}/package/update`;
    return this.http.request('put', url, {
      body: data,
    });
  }
}
