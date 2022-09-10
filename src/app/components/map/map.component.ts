import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Toast } from 'src/app/interfaces/toast';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @Output() saveLocationEvent = new EventEmitter<string>();

  options: google.maps.MapOptions = {
    center: { lat: 9.929292, lng: -84.096876 },
    zoom: 18,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  toastData: Toast = {
    title: '',
    message: '',
  };
  constructor() {}

  ngOnInit(): void {}

  addMarker(event: google.maps.MapMouseEvent): void {
    const { lat, lng } = event.latLng.toJSON();
    this.markerPosition = { lat, lng };
  }

  saveLocation(): void {
    if (this.markerPosition.lat === 0 && this.markerPosition.lng === 0) {
      this.toastData = {
        title: 'Error',
        message: 'You must select a location',
      };
      setTimeout(() => {
        this.clearToast();
      }, 2000);
      return;
    }
    this.saveLocationEvent.emit(
      `${this.markerPosition.lat},${this.markerPosition.lng}`
    );
    const closeModal = document.getElementById('closeMapModal') as HTMLElement;
    closeModal.click();
  }

  clearToast(): void {
    this.toastData = {
      title: '',
      message: '',
    };
  }
}
