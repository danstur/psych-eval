import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ConfiguredHttpClient } from './configuredHttpClient';

const configUrl = 'assets/illnesses.json';

@Injectable({
  providedIn: 'root',
})
export class IllnessService {
  private illnesses: Promise<Illness[]>;

  constructor(private http: ConfiguredHttpClient) {
    this.refresh();
  }

  async getIllnesses(): Promise<Illness[]> {
    return await this.illnesses;
  }

  async getSymptoms(): Promise<string[]> {
    const illnesses = await this.illnesses;
    return _(illnesses).flatMap(il => il.symptoms).uniq().value();
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
