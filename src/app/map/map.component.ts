import { Component } from '@angular/core';
import { latLng, Map, tileLayer, circle, circleMarker,point, polygon, marker } from 'leaflet';
import { CovidService } from '../covid.service';
import { Latest } from '../model/latest.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  map!: Map;

  data!: Latest[];

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      })
    ],
    zoom: 3,
    center: latLng([14, 108])
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {

    }
  };

  constructor(private _covid: CovidService) {
  }

  ngOnInit(): void {
    this._covid.dataResultSubject.subscribe(data => {
      this.data = data;
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    let min = 5;
    this._covid.dataResultSubject.subscribe(data => {
      data.forEach(element => {
        circleMarker([element.location.lat, element.location.lng], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.7,
          radius: (element.confirmed / 100000) > min ? (element.confirmed / 1000000) : (element.confirmed / 10000)
        }).addTo(map).bindPopup(`<p>Country: ${element.countryregion}
                                <br>Last Update: ${element.lastupdate}
                                <br>Location: lat=${element.location.lat}, long=${element.location.lng}
                                <br>Confirmed: ${element.confirmed}
                                <br>Deaths: ${element.deaths}
                                <br>Recovered: ${element.recovered}</p>`);
      })});
  }

}
