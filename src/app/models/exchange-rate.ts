export interface ExchangeRatesRequest {
  effectiveDate: string;
  no: string;
  rates: ExchangeRate[];
  table: string;
}

export interface ExchangeRate {
  code: string;
  currency: string;
  mid: number;
}
