import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';
import { Brief } from '../model/brief.model';
import { Latest } from '../model/latest.model';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {

  constructor(private _covid : CovidService ) { }

  data!: Latest[];
  brief!:Brief;

  ngOnInit(): void {
    this._covid.getData();
    this._covid.dataResultSubject.subscribe(data => {
      this.data = data;
    });
    this._covid.briefResultSubject.subscribe(brief => {
      this.brief = brief;
    });
  }

}
