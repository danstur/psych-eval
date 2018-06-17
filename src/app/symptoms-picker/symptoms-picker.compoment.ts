import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  templateUrl: './symptoms-picker.component.html',
  selector: 'app-symptoms-picker',
})
export class SymptomsPickerComponent {
  // Symptoms that can be picked currently. This are all the unpicked symptoms
  // that are not filtered currently.
  public filteredSymptoms: Observable<string[]>;

  // all availabe symptoms. Input from parent component.
  private availableSymptomsField: string[];

  // All symptoms that haven't been picked so far.
  private unpickedSymptoms: string[];

  // All symptoms that have been selected.
  private selectedSymptoms: string[] = [];

  @ViewChild('symptomsInput') private symptomsInput: ElementRef;
  private symptomsControl: FormControl = new FormControl();

  @Input()
  set availableSymptoms(symptoms: string[]) {
    this.availableSymptomsField = symptoms;
    this.unpickedSymptoms = this.availableSymptomsField;
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
