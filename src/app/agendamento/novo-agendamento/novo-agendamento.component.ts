import { Component, OnInit, ViewChild } from '@angular/core';
import { Agendamento } from './../../models/agendamento';
import { CompartilhadoService } from './../../services/compartilhado.service';
import { Cliente } from './../../models/cliente';
import { Servico } from 'src/app/models/servico';
import { AgendamentoService } from './../../services/agendamento.service';
import { ModalAlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/modal-alerta-sucesso/modal-alerta-sucesso.component';
import { AlertaErroComponent } from './../../1-alertas-compartilhados/alerta-erro/alerta-erro.component';
import { AlertaSucessoComponent } from './../../1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';

@Component({
  selector: 'app-novo-agendamento',
  templateUrl: './novo-agendamento.component.html',
  styleUrls: ['./novo-agendamento.component.css']
})
export class NovoAgendamentoComponent implements OnInit {

  agendamento: Agendamento = new Agendamento();
  clientes: Cliente [] = [];
  servicos: Servico [] = [];

  @ViewChild(ModalAlertaSucessoComponent, {static: false}) msgModalSucesso: ModalAlertaSucessoComponent;
  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;
  @ViewChild(AlertaSucessoComponent, {static: false}) msgSucesso: AlertaSucessoComponent;

  constructor( private agendamentoService: AgendamentoService,
               private compartilhadoService: CompartilhadoService) { }

  ngOnInit() {

    this.listarClientesEServico();

  }

  salvarAgenda(){
    this.agendamento.status = 'Pendente';
    this.agendamentoService.salvarAgenda(this.agendamento).subscribe(
      res => {
        this.msgModalSucesso.setMsgSucesso('Agendamento realizado com sucesso!');
      },
      err => {
        this.msgErro.setErro('Ocorreu um erro ao tentar realizar o agendamento.');
      }
    );
  }

  listarClientesEServico(){

    this.compartilhadoService.listarClientes().subscribe(res => this.clientes = res);

    this.compartilhadoService.listarServicos().subscribe(res => this.servicos = res);

  }

  

}
