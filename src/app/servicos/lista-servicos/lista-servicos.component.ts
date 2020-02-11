import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServicoService } from './../../services/servico.service';
import { Servico } from './../../models/servico';
import { RouterModule, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from 'src/app/1-alertas-compartilhados/alerta-erro/alerta-erro.component';



@Component({
  selector: 'app-lista-servicos',
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css']
})
export class ListaServicosComponent implements OnInit {

  public paginaAtual=1;

  servicos: Servico[] = [];

  @Input() listaRecebida: Servico[] = [];

  metodosModal: BsModalRef;

  servicoSelecionado: Servico = new Servico();

  @ViewChild('modalDelete', {static: false}) componentModal;

  
  @ViewChild(AlertaSucessoComponent, {static: false}) msgSucesso: AlertaSucessoComponent;

  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;

  //@ViewChild(ModalAlertaSucessoComponent, {static: false}) modalMsgErro: ModalAlertaSucessoComponent;

  constructor(private servicoService: ServicoService, 
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.servicoService.getServicos().subscribe(dados => this.listaRecebida = dados);
  }

  /* Método para capturar o id do serviço e enviar para a rota informada */
  obterId(id) {
    this.router.navigate(['servico/editar', id]);
  }

  obterIdDeletar(id) {
    this.servicoSelecionado.id = id;
    this.metodosModal = this.modalService.show(this.componentModal, {class: 'modal-sm-6'})
  }

  /* Método que realiza a deleção do serviço ao confirmar através da modal e apresenta o componente de mensagem.*/
  confirm(){

    this.servicoService.deletarServico(this.servicoSelecionado.id).subscribe(
      res => {
        this.msgSucesso.setMsgSucesso('Serviço deletado com sucesso.');
        this.paginaAtual =0;
        this.getServicos();
      },
      err => {
        this.msgErro.setErro('Ocorreu um erro ao tentar deletar o serviço.'); 
      }
    );

    this.metodosModal.hide();
  
  }

  decline(){
    this.metodosModal.hide();
  }

  getServicos(){
    this.servicoService.getServicos().subscribe(dados => this.listaRecebida = dados);
  }


}
