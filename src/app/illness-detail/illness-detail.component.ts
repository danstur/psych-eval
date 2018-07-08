import { Component, Inject } from '@angular/core';
import { Illness } from '../shared/services/illness.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-illness-component',
  templateUrl: './illness-detail.component.html',
  styleUrls: ['./illness-detail.component.css']
})
export class IllnessDetailComponent {
  illness: Illness;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.illness = data.illness;
   }

}
