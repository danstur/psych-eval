import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IllnessService } from '../shared/services/illness/illness.service';

@Component({
  templateUrl: './evaluation.component.html',
})
export class EvaluationComponent implements OnInit {
  symptoms: string[];

  constructor(private illnessService: IllnessService) {
  }

  async ngOnInit() {
    this.symptoms = await this.illnessService.getSymptoms();
  }
}
