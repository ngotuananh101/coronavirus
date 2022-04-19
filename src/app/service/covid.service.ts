import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, max, Observable } from 'rxjs';
import { Brief } from '../model/brief.model';
import { Latest } from '../model/latest.model';
import { Timeseries } from '../model/timeseries.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private _http: HttpClient) { }

  data!: Latest[];
  dataResultSubject: BehaviorSubject<Latest[]> = new BehaviorSubject<Latest[]>(this.data);
  dataResult$: Observable<Latest[]> = this.dataResultSubject.asObservable();

  timeseries!: Timeseries;
  timeSeriesSubject: BehaviorSubject<Timeseries> = new BehaviorSubject<Timeseries>(this.timeseries);
  timeSeries$: Observable<Timeseries> = this.timeSeriesSubject.asObservable();

  active!: Latest;
  activeSubject: BehaviorSubject<Latest> = new BehaviorSubject<Latest>(this.active);
  active$: Observable<Latest> = this.activeSubject.asObservable();

  brief!: Brief;
  briefResultSubject: BehaviorSubject<Brief> = new BehaviorSubject<Brief>(this.brief);
  briefResult$: Observable<Brief> = this.briefResultSubject.asObservable();

  private BaseUrl = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true';

  getData() {
    this._http.get(this.BaseUrl).subscribe((data: any) => {
      this.data = data;
      this.dataResultSubject.next(this.data);
      this.setBrief();
    });
  };

  getTimeSeries(country: string) {
    let url = `https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso3=${country}&onlyCountries=true`;
    this._http.get(url).subscribe((data: any) => {
      this.timeseries = data[0];
      let value= Object.values(this.timeseries.timeseries);
      let date = Object.keys(this.timeseries.timeseries);
      this.timeseries.timeseries = [];
      for (let index = 0; index < value.length; index++) {
        this.timeseries.timeseries.push({
          date: date[index],
          value: value[index],
        })
      }
      this.timeSeriesSubject.next(this.timeseries);
    })
  };

  setBrief() {
    let confirmed: number = 0;
    let deaths: number = 0;
    let recovered: number = 0;
    let active: number = 0;
    let lastUpdate = '';
    let country: number = this.data.length;
    let today: number = 0;
    this.data.forEach(element => {
      confirmed += element.confirmed > 0 ? element.confirmed : 0;
      deaths += element.deaths > 0 ? element.deaths : 0;
      recovered += element.recovered > 0 ? element.recovered : 0;
    });
    lastUpdate = this.data[0].lastupdate;
    this.brief = { confirmed, deaths, recovered, active, lastUpdate, country, today };
    this.briefResultSubject.next(this.brief);
  }
}