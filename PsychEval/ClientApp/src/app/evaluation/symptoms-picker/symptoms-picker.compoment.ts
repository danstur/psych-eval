import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  templateUrl: './symptoms-picker.component.html',
  selector: 'app-symptoms-picker',
  styleUrls: ['./symptoms-picker.css'],
})
export class SymptomsPickerComponent {
  // Symptoms that can be picked currently. This are all the unpicked symptoms
  // that are not filtered currently.
  public filteredSymptoms: Observable<string[]>;

  // All symptoms that have been selected.
  selectedSymptoms: Set<string> = new Set<string>();

  @Output() symptomsSelected = new EventEmitter<Set<string>>();

  // All symptoms that haven't been picked so far.
  private unselectedSymptoms: string[];

  @ViewChild('symptomsInput') private symptomsInput: ElementRef;
  symptomsControl: FormControl = new FormControl();

  // all availabe symptoms. Input from parent component.
  private availableSymptomsField: string[];

  @Input()
  set availableSymptoms(symptoms: string[]) {
    if (symptoms === undefined) {
      return;
    }
    this.availableSymptomsField = symptoms;
    this.unselectedSymptoms = this.availableSymptomsField;
    this.filteredSymptoms = this.symptomsControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val)),
      map(visibileSymptoms => visibileSymptoms.sort())
    );
  }

  filter(filterString: string): string[] {
    if (!filterString) {
      return this.unselectedSymptoms;
    }
    const normalizedFilter = filterString.toLowerCase();
    return this.unselectedSymptoms.filter(symptom => symptom.toLowerCase().includes(normalizedFilter));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const pickedSymptom = event.option.value;
    this.selectedSymptoms.add(pickedSymptom);
    this.fireSymptomsChangedEvent();
    this.unselectedSymptoms = this.unselectedSymptoms.filter(symptom => symptom !== pickedSymptom);
    this.resetSymptomsControl();
  }

  onDeleteSymptom(symptom: string) {
    this.selectedSymptoms.delete(symptom);
    this.fireSymptomsChangedEvent();
    this.unselectedSymptoms.push(symptom);
    this.resetSymptomsControl();
  }

  private fireSymptomsChangedEvent() {
    // change detection doesn't work if we simply return the same object but with changed
    // content. So always create a copy.
    this.symptomsSelected.emit(new Set(this.selectedSymptoms));
  }

  private resetSymptomsControl() {
    this.symptomsInput.nativeElement.value = '';
    this.symptomsControl.setValue(null);
  }

}

