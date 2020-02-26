import { Component, OnInit, ViewChild } from '@angular/core';
import { Agendamento } from './../../models/agendamento';
import { CompartilhadoService } from './../../services/compartilhado.service';
import { Cliente } from './../../models/cliente';
import { Servico } from 'src/app/models/servico';
import { AgendamentoService } from './../../services/agendamento.service';
import { ModalAlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/modal-alerta-sucesso/modal-alerta-sucesso.component';
import { AlertaErroComponent } from './../../1-alertas-compartilhados/alerta-erro/alerta-erro.component';
import { AlertaSucessoComponent } from './../../1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-novo-agendamento',
  templateUrl: './novo-agendamento.component.html',
  styleUrls: ['./novo-agendamento.component.css']
})
export class NovoAgendamentoComponent implements OnInit {

  agendamento: Agendamento = new Agendamento();
  clientes: Cliente [] = [];
  servicos: Servico [] = [];

  agendamentosRealizados: Agendamento [] = [];

  agendasCadastradas: Agendamento [] = [];


  @ViewChild(ModalAlertaSucessoComponent, {static: false}) msgModalSucesso: ModalAlertaSucessoComponent;
  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;
  @ViewChild(AlertaSucessoComponent, {static: false}) msgSucesso: AlertaSucessoComponent;

  horarioJaAgendado:boolean =false;

  constructor( private agendamentoService: AgendamentoService,
               private compartilhadoService: CompartilhadoService,
               private route: ActivatedRoute,
               private router: Router) { 

               }

  ngOnInit() {

    this.listarClientesEServico();
    this.buscarAgendaPorId();
    //this.agendamentoService.consultarTodasAsAgendas().subscribe(res => this.agendamentosRealizados = res);

  }

  salvarAgenda(){

    if(this.agendamento.id == null){

      this.agendamento.status = 'Pendente';

      this.agendamentoService.salvarAgenda(this.agendamento).subscribe(
          res => {
            this.msgModalSucesso.setMsgSucesso('Agendamento realizado com sucesso!');
          },
          err => {
            this.msgErro.setErro('Ocorreu um erro ao tentar realizar o agendamento.');
          }
      );

  }else {

    this.agendamentoService.editarAgenda(this.agendamento).subscribe(
      res => {
        this.msgModalSucesso.setMsgSucesso('Agenda editada com sucesso!');
        this.router.navigateByUrl('agendas-cadastradas');
      },
      err => {
        this.msgErro.setErro('Ocorreu um erro..');
      }
    );

  }

    
  }

  listarClientesEServico(){

    this.compartilhadoService.listarClientes().subscribe(res => this.clientes = res);

    this.compartilhadoService.listarServicos().subscribe(res => this.servicos = res);

  }

  buscarAgendaPorId(){
    this.route.params.subscribe(params => this.agendamento.id = params['id'])
    this.agendamentoService.buscarAgendaPorId(this.agendamento.id).subscribe(res => this.agendamento = res);
  }

  buscarTodasAsAgendas(){
    this.agendamentoService.consultarTodasAsAgendas().subscribe();
  }

  

}
