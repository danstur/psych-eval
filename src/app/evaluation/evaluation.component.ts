import { Component, OnInit } from '@angular/core';
import { IllnessService } from '../illnesses/illness.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  templateUrl: './evaluation.component.html',
})
export class EvaluationComponent implements OnInit {
  symptoms: string[];
  filteredSymptoms: Observable<string[]>;

  myControl: FormControl = new FormControl();

  constructor(private illnessService: IllnessService) {
  }

  async ngOnInit() {
    this.symptoms = await this.illnessService.getSymptoms();
    this.filteredSymptoms = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(filterString: string): string[] {
    const normalizedFilter = filterString.toLocaleLowerCase();
    return this.symptoms.filter(symptom => symptom.toLowerCase().includes(normalizedFilter));
  }
}

