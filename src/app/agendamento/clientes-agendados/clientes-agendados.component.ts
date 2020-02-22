import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { AgendamentoService } from './../../services/agendamento.service';
import { Agendamento } from 'src/app/models/agendamento';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from 'src/app/1-alertas-compartilhados/alerta-erro/alerta-erro.component';
import { ModalAlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/modal-alerta-sucesso/modal-alerta-sucesso.component';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

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

  todasAsAgendas: Agendamento [] = [];

  outrasAgendas: Agendamento [] = [];

  dataInicial;

  dataFinal;

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

    this.dataCard = moment(this.agendamento.dataAgendamento).locale('pt-br').format('DD / MM / YYYY');

}

  abrirModalStatus(agenda) {
    this.agendamento = agenda;
    
    this.metodosModal = this.modalService.show(this.templateModalStatus, {class: 'modal-sm-6'});
  }

  editarStatusAgenda(){

    this.agendamentoService.editarStatusAgenda(this.agendamento).subscribe(
      res =>{
          this.modalMsgSucesso.setMsgSucesso('Status editado com sucesso!');
          this.metodosModal.hide();
          this.agendamentoService.consultarAgendaPorData(this.agendamento.dataAgendamento).subscribe(res => this.agendasCadastradas = res);
      },
      err => {
        this.metodosModal.hide();
        this.msgErro.setErro('Ocorreu um erro...');
      }
    );

  }

  abrirModalDeletar(agenda) {
    this.agendamento = agenda;
    this.metodosModal = this.modalService.show(this.templateModalDeletar, {class: 'modal-sm-6'});

  }


  confirmarExclusao(){
    this.agendamentoService.deletarAgenda(this.agendamento.id).subscribe(
      res => {
         this.metodosModal.hide();
         this.msgSucesso.setMsgSucesso('Agenda deletada com sucesso.');
         this.agendamentoService.consultarAgendaPorData(this.agendamento.dataAgendamento).subscribe(res => this.agendasCadastradas = res);
         this.dataCard = moment(this.agendamento.dataAgendamento).locale('pt-br').format('DD-MM-YYYY');
      }, 
      err => {
        this.msgErro.setErro('Ocorreu um erro ao tentar deletar essa agenda.');
      }
    );
  }

  fechar(){
    this.metodosModal.hide();
    //this.agendamentoService.consultarAgendaPorData(this.agendamento.dataAgendamento).subscribe(res => this.agendasCadastradas = res);
  }

  fecharModalStatus(){
    this.metodosModal.hide();
    this.agendamentoService.consultarAgendaPorData(this.agendamento.dataAgendamento).subscribe(res => this.agendasCadastradas = res);
  }

  capturarId(id){
    this.router.navigate(['agendamento/editar/', id]);
  }



}
