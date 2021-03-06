import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatAutocompleteModule, MatButtonModule, MatTableModule, MatDialogModule } from '@angular/material';
import { MatIconRegistry, MatIconModule, MatPaginatorModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { SymptomsPickerComponent } from './evaluation/symptoms-picker/symptoms-picker.compoment';
import { IllnessListComponent } from './evaluation/illness-list/illness-list.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { IllnessDetailComponent } from './evaluation/illness-detail/illness-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    EvaluationComponent,
    SymptomsPickerComponent,
    IllnessListComponent,
    IllnessDetailComponent
  ],
  entryComponents: [
    IllnessDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: EvaluationComponent, pathMatch: 'full' },
    ]),
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}

