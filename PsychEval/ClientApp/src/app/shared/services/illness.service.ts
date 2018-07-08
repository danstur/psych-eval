import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';
import { ConfiguredHttpClient } from './configuredHttpClient';

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
    return this.illnesses = this.http.get<Illness[]>('illness').toPromise();
  }
}

export interface Illness {
  id: string;

  name: string;

  description: string;

  symptoms: string[];
}
