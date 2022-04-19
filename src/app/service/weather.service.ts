import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  weather!: Weather;
  weatherSubject: BehaviorSubject<Weather> = new BehaviorSubject<Weather>(this.weather);
  weather$: Observable<Weather> = this.weatherSubject.asObservable();

  private BaseUrl = 'https://api.weatherapi.com/v1/current.json?key=813e869219fb434586295406221904';

  getWeather(lat: number, lon: number) {
    let currentWeather!: Weather;
    this.weatherSubject.next(currentWeather);
    this._http.get(`${this.BaseUrl}&q=${lat},${lon}&aqi=yes`).subscribe((data: any) => {
      this.weather = data;
      this.weatherSubject.next(this.weather);
    })
  };
}
