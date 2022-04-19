import { Component, OnInit } from '@angular/core';
import { Weather } from '../model/weather.model';
import { CovidService } from '../service/covid.service';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private _weather: WeatherService) { }

  currentWeather!: Weather;

  ngOnInit(): void {
    this._weather.weatherSubject.subscribe(data => {
      if (undefined !== data) {
        this.currentWeather = data;
      }
    });
  }
}
