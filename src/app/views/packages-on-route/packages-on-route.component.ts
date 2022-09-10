import { PackageService } from './../../services/package.service';
import { Component, OnInit } from '@angular/core';
import { PackageResponse, UpdatePackage } from 'src/app/interfaces/package';
import { Toast } from 'src/app/interfaces/toast';

@Component({
  selector: 'app-packages-on-route',
  templateUrl: './packages-on-route.component.html',
  styleUrls: ['./packages-on-route.component.scss'],
})
export class PackagesOnRouteComponent implements OnInit {
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
    this.packageService.getPackages(2).subscribe({
      next: (data: any) => {
        this.packages = data.packages;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  returnToWarehouse(id: number): void {
    this.changeStatus(id, 1);
  }

  markAsDelivered(id: number): void {
    this.changeStatus(id, 3);
  }

  changeStatus(id: number, status: number): void {
    const data: UpdatePackage = {
      id: id,
      fk_id_status: status,
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
