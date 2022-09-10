import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  options: google.maps.MapOptions = {
    center: { lat: 9.929292, lng: -84.096876 },
    zoom: 18,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  constructor() {}

  ngOnInit(): void {}

  addMarker(event: google.maps.MapMouseEvent) {
    const { lat, lng } = event.latLng.toJSON();
    this.markerPosition = { lat, lng };
  }
}
