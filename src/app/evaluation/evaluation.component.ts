import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IllnessService } from '../illnesses/illness.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  templateUrl: './evaluation.component.html',
})
export class EvaluationComponent implements OnInit {
  symptoms: string[];

  @ViewChild('symptomsInput') symptomsInput: ElementRef;
  unpickedSymptoms: string[];
  filteredSymptoms: Observable<string[]>;
  selectedSymptoms: string[] = [];
  symptomsControl: FormControl = new FormControl();

  constructor(private illnessService: IllnessService) {
  }

  async ngOnInit() {
    this.symptoms = await this.illnessService.getSymptoms();
    this.unpickedSymptoms = this.symptoms;
    this.filteredSymptoms = this.symptomsControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(filterString: string): string[] {
    if (!filterString) {
      return this.unpickedSymptoms;
    }
    const normalizedFilter = filterString.toLowerCase();
    return this.unpickedSymptoms.filter(symptom => symptom.toLowerCase().includes(normalizedFilter));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const pickedSymptom = event.option.value;
    this.selectedSymptoms.push(pickedSymptom);
    this.unpickedSymptoms = this.unpickedSymptoms.filter(symptom => symptom !== pickedSymptom);
    this.symptomsInput.nativeElement.value = '';
    this.symptomsControl.setValue(null);
  }
}

