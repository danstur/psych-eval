import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IllnessService } from '../shared/services/illness/illness.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

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
