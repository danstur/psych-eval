import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Illness } from './illness';
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

  getIllnesses(): Promise<Illness[]> {
    return this.illnesses;
  }

  async getSymptoms(): Promise<string[]> {
    const illnesses = await this.illnesses;
    return _(illnesses).flatMap(il => il.symptoms).uniq().value();
  }

  refresh(): Promise<any> {
    return this.illnesses = this.http.get<Illness[]>(configUrl).toPromise();
  }
}
