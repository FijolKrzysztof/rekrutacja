import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExchangeRate, ExchangeRatesRequest} from "../models/exchange-rate";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExchangeratesService {

  constructor(private http: HttpClient) { }

  getRates(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRatesRequest[]>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')
      .pipe(
        map((data: ExchangeRatesRequest[]) => data[0].rates)
      );
  }

  getRatesByDate(date: string): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRatesRequest[]>(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`)
      .pipe(
        map((data: ExchangeRatesRequest[]) => data[0].rates)
      );
  }
}
