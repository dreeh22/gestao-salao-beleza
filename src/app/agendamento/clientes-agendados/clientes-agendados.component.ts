import { Component, OnInit, ViewChild } from '@angular/core';
//import { Moment } from "moment";

import * as moment from 'moment';
import { AgendamentoService } from './../../services/agendamento.service';
import { Agendamento } from 'src/app/models/agendamento';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from 'src/app/1-alertas-compartilhados/alerta-erro/alerta-erro.component';
import { ModalAlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/modal-alerta-sucesso/modal-alerta-sucesso.component';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

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

  metodosModal: BsModalRef;

  //Array para popular os status existente no componente de select.
  listaStatus = [
    {nomeStatus: 'Pendente'},
    {nomeStatus: 'Realizado'},
    {nomeStatus: 'Cancelado'}
  ];

  @ViewChild('modalStatus', {static: false}) templateModalStatus;
  @ViewChild('modalDeletar', {static: false}) templateModalDeletar;
  
  @ViewChild(ModalAlertaSucessoComponent, {static: false}) modalMsgSucesso: ModalAlertaSucessoComponent;
  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;
  @ViewChild(AlertaSucessoComponent, {static: false}) msgSucesso: AlertaSucessoComponent;

  constructor(private agendamentoService: AgendamentoService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit() {


    this.dataCard = moment(new Date()).locale('pt-br').format('dddd, MMMM / YYYY');
    this.dataAtual = moment(new Date).format('YYYY-MM-DD');
    this.listarAgendasPorDataAtual();

  }

  // Lista as agendas para o dia atual ao entrar na tela de agendamentos
  listarAgendasPorDataAtual(){

    this.agendamentoService.listarAgendaPorDataAtual(this.dataAtual)
    .subscribe(res =>  this.agendasCadastradas = res);
  }

  consultarAgendasPorData(){
    this.agendamentoService.consultarAgendaPorData(this.agendamento.dataAgendamento).subscribe(res => this.agendasCadastradas = res);

    this.dataCard = moment(this.agendamento.dataAgendamento).locale('pt-br').format('dddd, MMMM / YYYY');

}

  //consultarAgendaPorId(id){
    //this.agendamentoService.buscarAgendaPorId(id).subscribe(res => this.agendamento = res);
  //}

  editarStatusAgenda(){
    this.agendamentoService.editarStatusAgenda(this.agendamento).subscribe(
      res =>{
          this.modalMsgSucesso.setMsgSucesso('Status editado com sucesso!');
      },
      err => {
        this.msgErro.setErro('Ocorreu um erro...');
      }
    );
  }

  abrirModalStatus(id) {
    this.agendamento.id = id;
    this.metodosModal = this.modalService.show(this.templateModalStatus, {class: 'modal-sm-6'});
  }

  abrirModalDeletar(id) {
    this.agendamento.id = id;
    this.metodosModal = this.modalService.show(this.templateModalDeletar, {class: 'modal-sm-6'});

  }

  confirmar(){

    this.agendamentoService.editarStatusAgenda(this.agendamento).subscribe(
      res =>{
          this.modalMsgSucesso.setMsgSucesso('Status editado com sucesso!');
          this.listarAgendasPorDataAtual();
      },
      err => {
        this.msgErro.setErro('Ocorreu um erro...');
      }
    );

    this.metodosModal.hide();
  }

  confirmarExclusao(){
    this.agendamentoService.deletarAgenda(this.agendamento.id).subscribe(
      res => {
         this.msgSucesso.setMsgSucesso('Agenda deletada com sucesso.');
         this.metodosModal.hide();
         this.consultarAgendasPorData();
      }, 
      err => {
        this.msgErro.setErro('Ocorreu um erro ao tentar deletar essa agenda.');
      }
    );
  }

  fechar(){
    this.metodosModal.hide();
  }

  capturarId(id){
    this.router.navigate(['agendamento/editar/', id]);
  }



}
