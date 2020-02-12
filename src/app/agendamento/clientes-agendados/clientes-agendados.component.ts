import { Component, OnInit } from '@angular/core';
//import { Moment } from "moment";

import * as moment from 'moment';
import { AgendamentoService } from './../../services/agendamento.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Agendamento } from 'src/app/models/agendamento';

@Component({
  selector: 'app-clientes-agendados',
  templateUrl: './clientes-agendados.component.html',
  styleUrls: ['./clientes-agendados.component.css']
})
export class ClientesAgendadosComponent implements OnInit {


  dataAtual: string;

  corStatus: string;

  dataCard: any;

  agendasCadastradas: Agendamento [] = [];

  agendamento: Agendamento = new Agendamento();

  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit() {

    this.dataCard = moment(new Date()).locale('pt-br').format('dddd, MMMM / YYYY');
    this.dataAtual = moment(new Date).format('YYYY-MM-DD');
    this.listarAgendasPorDataAtual();
  }

  // Lista as agendas para o dia atual ao entrar na tela de agendamentos
  listarAgendasPorDataAtual(){

    this.agendamentoService.listarAgendaPorDataAtual(this.dataAtual).subscribe(res => this.agendasCadastradas = res);

    if(this.agendamento.status == 'Pendente'){
      this.corStatus = 'warning';
    }else if (this.agendamento.status == 'Cancelado'){
      this.corStatus = 'danger';
    }else if (this.agendamento.status == "Realizado") {
      this.corStatus = 'success';
    }
    
  }

  consultarAgendasPorData(form){
  this.agendamentoService.consultarAgendaPorData(this.agendamento.dataAgendamento).subscribe(
     res => this.agendasCadastradas = res

     //this.dataAtual = this.agendamento.dataAgendamento.toString();
     //this.agendamento.dataAgendamento.toString();

  )}


}
