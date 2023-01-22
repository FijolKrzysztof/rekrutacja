import {Component, Inject} from '@angular/core';
import {ExchangeratesService} from "./services/exchangerates.service";
import {ExchangeRate} from "./models/exchange-rate";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import * as moment from "moment";
import {DOCUMENT} from "@angular/common";
import {ThemeEnum} from "./models/theme-enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  readonly THEMES = ThemeEnum;

  dateControl = new FormControl();
  exchangeRates$: Observable<ExchangeRate[]>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private exchangeratesService: ExchangeratesService,
  ) {
    this.dateControl.valueChanges.subscribe((date) => {
      if (date) {
        this.exchangeRates$ = this.exchangeratesService.getRatesByDate(this.convertDate(date));
      } else {
        this.exchangeRates$ = this.exchangeratesService.getRates();
      }
    });

    this.exchangeRates$ = exchangeratesService.getRates();
  }

  changeTheme(theme: ThemeEnum): void {
    (this.document.getElementById('app-theme') as HTMLLinkElement).href = theme;
  }

  convertDate(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
