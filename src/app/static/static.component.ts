import { Component, OnInit } from '@angular/core';
import { CovidService } from '../service/covid.service';
import { Brief } from '../model/brief.model';
import { Latest } from '../model/latest.model';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {

  constructor(private _covid : CovidService ) { }
  brief:Brief = {
    confirmed: 0, deaths: 0, recovered: 0,
    active: 0,
    lastUpdate: '',
    country: 0,
    today: 0
  };

  ngOnInit(): void {
    this._covid.getData();
    this._covid.briefResultSubject.subscribe(brief => {
      this.brief = brief;
    });
  }

}
