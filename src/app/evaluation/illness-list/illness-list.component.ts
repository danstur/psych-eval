import { Component, Input, OnInit } from '@angular/core';
import { IllnessService, Illness } from '../../shared/services/illness.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-illness-list',
  templateUrl: './illness-list.component.html',
  styleUrls: ['./illness-list.component.css']
})
export class IllnessListComponent implements OnInit {
  private illnesses: Illness[];

  displayedColumns = ['id'];

  dataSource: MatTableDataSource<IllnessDescriptor>;

  @Input()
  set selectedSymptoms(selectedSymptoms: string[]) {
    const selectedSymptomsSet = new Set(selectedSymptoms);
    const illnessDescriptors = _(this.illnesses)
      .map(il => [il, this.getDescriptor(il, selectedSymptomsSet)])
      .orderBy(x => x.likeliHood, 'desc');
    this.dataSource = new MatTableDataSource(illnessDescriptors);
  }

  private getDescriptor(illness: Illness, selectedSymptoms: Set<string>): IllnessDescriptor {
    // For now we simply compute how many of the symptoms of the illness
    // were selected and return the percentage between 0 and 1.
    const matchingSymptoms = _(illness.symptoms).filter(symptom => selectedSymptoms.has(symptom)).length;
    return new IllnessDescriptor(illness, matchingSymptoms / illness.symptoms.length);
  }

  constructor(private illnessService: IllnessService) { }

  async ngOnInit() {
    this.illnesses = await this.illnessService.getIllnesses();
    this.dataSource = new MatTableDataSource(new Array<IllnessDescriptor>());
  }

}

class IllnessDescriptor {
  constructor(illness: Illness, likelihood: number){}
}
