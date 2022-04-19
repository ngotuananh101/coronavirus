import { Component, OnInit } from '@angular/core';
import { CovidService } from '../service/covid.service';
import { Chart } from '../model/char.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  data: any[] = [];
  view!: [number, number];
  below: string = 'below';

  constructor(private _covid: CovidService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this._covid.timeSeriesSubject.subscribe(data => {
      if (undefined !== data) {
        this.data = [];
        let datac: Chart = { name: "Confirmed", series: [] };
        let datad: Chart = { name: "Deaths", series: [] };
        let datar: Chart = { name: "Recovered", series: [] };
        data.timeseries.forEach(element => {
          datac.series.push({ name: element.date, value: element.value.confirmed });
          datad.series.push({ name: element.date, value: element.value.deaths });
          datar.series.push({ name: element.date, value: element.value.recovered });
        });
        this.data.push(datac);
        this.data.push(datad);
        this.data.push(datar);
        this.data = [...this.data];
      }
    }
    );
  }
}
