import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brief } from './model/brief.model';
import { Latest } from './model/latest.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private _http: HttpClient) { }

  data!: Latest[];
  dataResultSubject: BehaviorSubject<Latest[]> = new BehaviorSubject<Latest[]>(this.data);
  dataResult$: Observable<Latest[]> = this.dataResultSubject.asObservable();

  private BaseUrl = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest';

  brief!:Brief;
  briefResultSubject: BehaviorSubject<Brief> = new BehaviorSubject<Brief>(this.brief);
  briefResult$: Observable<Brief> = this.briefResultSubject.asObservable();

  getData() {
    this._http.get(this.BaseUrl).subscribe((data: any) => {
      this.data = data;
      this.dataResultSubject.next(this.data);
      this.setBrief();
    })
  };

  setBrief(){
    let confirmed : number = 0;
    let deaths : number = 0;
    let recovered : number = 0;
    let active : number = 0;
    let lastUpdate = '';
    let country : number = 0;
    let today : number = 0;
    this.data.forEach(element => {
      confirmed += element.confirmed > 0 ? element.confirmed : 0;
      deaths += element.deaths > 0 ? element.deaths : 0;
      recovered += element.recovered > 0 ? element.recovered : 0;
      country += 1;
    });
    lastUpdate = this.data[0].lastupdate;
    this.brief = { confirmed, deaths, recovered, active, lastUpdate, country , today };
    this.briefResultSubject.next(this.brief);
  }
}
