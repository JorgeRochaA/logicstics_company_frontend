import { Component, OnInit, ViewChild } from '@angular/core';
import { PackageResponse, UpdatePackage } from './../../interfaces/package';
import { PackageService } from './../../services/package.service';
import { Toast } from 'src/app/interfaces/toast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  packages!: Array<PackageResponse>;
  toastData: Toast = {
    title: '',
    message: '',
  };
  constructor(private packageService: PackageService) {}
  ngOnInit(): void {
    this.getPackages();
  }

  getPackages(): void {
    this.packageService.getPackages(1).subscribe({
      next: (data: any) => {
        this.packages = data.packages;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  putOnRoute(id: number): void {
    const data: UpdatePackage = {
      id: id,
      fk_id_status: 2,
    };
    this.packageService.updatePackage(data).subscribe({
      next: (data: any) => {
        this.getPackages();
        this.toastData = {
          title: 'Success',
          message: data.message,
        };
        setTimeout(() => {
          this.clearToast();
        }, 2000);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  clearToast(): void {
    this.toastData = {
      title: '',
      message: '',
    };
  }
}
