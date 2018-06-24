import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

const configUrl = 'assets/illnesses.json';

@Injectable({
  providedIn: 'root',
})
export class IllnessService {
  private illnesses: Promise<Illness[]>;

  constructor(private http: HttpClient) {
    this.refresh();
  }

  async getIllnesses(): Promise<Illness[]> {
    try {
      return await this.illnesses;
    } catch (exception) {
      alert(`Could not load data. Exception: ${exception}`);
    }
  }

  async getSymptoms(): Promise<string[]> {
    try {
      const illnesses = await this.illnesses;
      return _(illnesses).flatMap(il => il.symptoms).uniq().value();
    } catch (exception) {
      alert(`Could not load data. Exception: ${exception}`);
    }
  }

  refresh(): Promise<any> {
    return this.illnesses = this.http.get<Illness[]>(configUrl).toPromise();
  }
}

export interface Illness {
  id: string;

  name: string;

  description: string;

  symptoms: string[];
}
