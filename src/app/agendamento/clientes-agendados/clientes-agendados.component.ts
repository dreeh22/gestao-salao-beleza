import { Component, OnInit } from '@angular/core';
//import { Moment } from "moment";

import * as moment from 'moment';

@Component({
  selector: 'app-clientes-agendados',
  templateUrl: './clientes-agendados.component.html',
  styleUrls: ['./clientes-agendados.component.css']
})
export class ClientesAgendadosComponent implements OnInit {


  datas: any;

  constructor() { }

  ngOnInit() {

    this.datas = moment(new Date()).locale('pt-br').format('dddd, MMMM / YYYY');
    

  }

}
