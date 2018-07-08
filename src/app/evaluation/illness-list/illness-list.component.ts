import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IllnessService, Illness } from '../../shared/services/illness.service';
import * as _ from 'lodash';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { IllnessDetailComponent } from '../../illness-detail/illness-detail.component';

@Component({
  selector: 'app-illness-list',
  templateUrl: './illness-list.component.html',
  styleUrls: ['./illness-list.component.css']
})
export class IllnessListComponent implements OnInit {
  illnesses: Illness[];

  displayedColumns = ['id', 'name', 'conformance', 'moreDetails'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<IllnessDescriptor>;

  private selectedSymptomsSet: Set<string>;

  @Input()
  set selectedSymptoms(selectedSymptoms: Set<string>) {
    this.selectedSymptomsSet = selectedSymptoms;
    this.updateDataSource();
  }

  private updateDataSource() {
    const illnessDescriptors = _(this.illnesses)
      .map(il => this.getDescriptor(il, this.selectedSymptomsSet))
      .orderBy(x => x.likelihood, 'desc')
      .value();
    this.dataSource = new MatTableDataSource(illnessDescriptors);
    this.dataSource.paginator = this.paginator;
  }

  private getDescriptor(illness: Illness, selectedSymptoms: Set<string>): IllnessDescriptor {
    // For now we simply compute how many of the symptoms of the illness
    // were selected and return the percentage between 0 and 1.
    const matchingSymptoms = _(illness.symptoms).filter(symptom => selectedSymptoms.has(symptom)).size();
    return new IllnessDescriptor(illness, matchingSymptoms / illness.symptoms.length);
  }

  constructor(private illnessService: IllnessService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.illnesses = await this.illnessService.getIllnesses();
    this.updateDataSource();
  }

  openDialog(element: Illness) {
    const dialogRef = this.dialog.open(IllnessDetailComponent, {
      width: '80%',
      data: { illness: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

class IllnessDescriptor {
  constructor(public illness: Illness, public likelihood: number) {
  }
}
