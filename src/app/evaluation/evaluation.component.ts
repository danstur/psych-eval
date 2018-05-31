import { Component, OnInit } from '@angular/core';
import { IllnessService } from '../illnesses/illness.service';

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

