import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from './../../models/cliente';
import { ServicosExecutadosService } from 'src/app/services/servicos-executados.service';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from 'src/app/services/servico.service';
import { ServicoRealizado } from 'src/app/models/servico-realizado';
import { ModalMensagemSucessoComponent } from './../../mensagens/modal-mensagem-sucesso/modal-mensagem-sucesso.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MensagemErroComponent } from 'src/app/mensagens/mensagem-erro/mensagem-erro.component';
import { AlertaModalSucessoComponent } from './../../alertas-compartilhados/alerta-modal-sucesso/alerta-modal-sucesso.component';

@Component({
  selector: 'app-servicos-realizados',
  templateUrl: './servicos-realizados.component.html',
  styleUrls: ['./servicos-realizados.component.css']
})
export class ServicosRealizadosComponent implements OnInit {

  clientes: Cliente [] = [];

  servicos: Servico [] = [];

  servicoRealizado: ServicoRealizado = new ServicoRealizado();

  @ViewChild(AlertaModalSucessoComponent, {static: false}) modalMsgSucesso: AlertaModalSucessoComponent;
  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  constructor(private serviceServicosRealizados: ServicosExecutadosService,
              private servicoService: ServicoService) { }

  ngOnInit() {

      this.serviceServicosRealizados.listarClientes().subscribe(res => this.clientes = res);

      this.servicoService.getServicos().subscribe(res => this.servicos = res);

  }


  salvarServicoRealizado(form){
      this.serviceServicosRealizados.salvarServicoRealizado(this.servicoRealizado).subscribe(
        res => {
          this.modalMsgSucesso.setMsgSucesso('Serviço realizado cadastrado com sucesso! ');
        },

        err => {
          this.msgErro.setErro('Ocorreu um erro ao tentar cadastrar um serviço realizado.');
        }
      );
  }

}
