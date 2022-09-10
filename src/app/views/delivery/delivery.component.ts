import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MapDirectionsService } from '@angular/google-maps';
import { Observable, map } from 'rxjs';
import { PackageResponse } from 'src/app/interfaces/package';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  private directionsRenderer: any;
  packages!: Array<PackageResponse>;
  warehouse = { lat: 9.929048216297826, lng: -84.09722946943353 };
  options: google.maps.MapOptions = {
    center: this.warehouse,
    zoom: 18,
  };
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  wayPoints: any = [];
  constructor(
    private mapDirectionsService: MapDirectionsService,
    private packageService: PackageService
  ) {
    const request: google.maps.DirectionsRequest = {
      origin: this.warehouse,
      destination: this.warehouse,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
  }

  ngOnInit(): void {
    this.getPackagesForDelivery();
  }

  getPackagesForDelivery() {
    this.packageService.getPackages(2).subscribe({
      next: (data: any) => {
        this.packages = data.packages;
        this.setWayPoints();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setWayPoints() {
    this.packages.forEach((element) => {
      this.wayPoints.push({
        location: {
          lat: Number(element.delivery_to.split(',')[0]),
          lng: Number(element.delivery_to.split(',')[1]),
        },
        stopover: true,
      });
    });
    this.calculateAndDisplayRoute();
  }
  calculateAndDisplayRoute() {
    if (this.wayPoints.length == 0) {
      this.warehouse = { lat: 0, lng: 0 };
    }
    const request: google.maps.DirectionsRequest = {
      origin: this.warehouse,
      destination: this.warehouse,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
  }
}
