import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IllnessService } from '../shared/services/illness.service';

@Component({
  templateUrl: './evaluation.component.html',
})
export class EvaluationComponent implements OnInit {
  symptoms: string[];

  selectedSymptoms: string[] = [];

  constructor(private illnessService: IllnessService) {
  }

  async ngOnInit() {
    this.symptoms = await this.illnessService.getSymptoms();
  }

  onSymptomsSelected(selectedSymptoms: string[]) {
    this.selectedSymptoms = selectedSymptoms;
  }
}
