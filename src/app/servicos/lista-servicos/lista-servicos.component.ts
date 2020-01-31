import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServicoService } from './../../services/servico.service';
import { Servico } from './../../models/servico';
import { RouterModule, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MensagemSucessoComponent } from './../../mensagens/mensagem-sucesso/mensagem-sucesso.component';
import { MensagemErroComponent } from 'src/app/mensagens/mensagem-erro/mensagem-erro.component';
import { ModalMensagemSucessoComponent } from 'src/app/mensagens/modal-mensagem-sucesso/modal-mensagem-sucesso.component';



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

  /* Códido para encontrar o componente de modal do tipo ng-template que está na VIEW */
  @ViewChild('modalDelete', {static: false}) componentModal;

  /* Código para poder ter acesso ao componente de mensagens e seus métodos */
  @ViewChild(MensagemSucessoComponent, {static: false}) msgSucesso: MensagemSucessoComponent;

  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  /* Código para poder ter acesso ao componente modal de mensagem de sucesso e seus métodos */
  @ViewChild(ModalMensagemSucessoComponent, {static: false}) modalMsgErro: ModalMensagemSucessoComponent;

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

  /* Método para capturar id e abrir a modal para confirmação da exclusão de um serviço */
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

    /* Código para fechar a modal de Confirmação*/
    this.metodosModal.hide();
  
  }

/* Código para fechar a modal de deleção*/
  decline(){
    this.metodosModal.hide();
  }

  /* Método que retorna todos os serviços cadastrados */
  getServicos(){
    this.servicoService.getServicos().subscribe(dados => this.listaRecebida = dados);
  }


}
