import { Component, Input } from '@angular/core';
import { Toast } from 'src/app/interfaces/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() toastData!: Toast;
  constructor() {}
}
