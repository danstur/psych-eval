import { Component, Input, OnInit } from '@angular/core';
import { IllnessService, Illness } from '../../shared/services/illness.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-illness-list',
  templateUrl: './illness-list.component.html',
  styleUrls: ['./illness-list.component.css']
})
export class IllnessListComponent implements OnInit {
  illnesses: Illness[];

  possibleIllnesses: Observable<Illness[]>;

  @Input()
  set selectedSymptoms(selectedSymptoms: string[]) {
    const selectedSymptomsSet = new Set(selectedSymptoms);
    const illnessesByLikelihood = _(this.illnesses)
      .map(il => [il, this.getLikelihood(il, selectedSymptomsSet)])
      .orderBy(x => x[1], 'asc');
  }

  private getLikelihood(illness: Illness, selectedSymptoms: Set<string>): number {
    // For now we simply compute how many of the symptoms of the illness
    // were selected and return the percentage between 0 and 1.
    const matchingSymptoms = _(illness.symptoms).filter(symptom => selectedSymptoms.has(symptom)).length;
    return matchingSymptoms / illness.symptoms.length;
  }

  constructor(private illnessService: IllnessService) { }

  async ngOnInit() {
    this.illnesses = await this.illnessService.getIllnesses();
  }

}
