import { Component, OnInit, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServicoService } from './../../services/servico.service';

@Component({
  selector: 'app-modal-mensagem-sucesso',
  templateUrl: './modal-mensagem-sucesso.component.html',
  styleUrls: ['./modal-mensagem-sucesso.component.css']
})
export class ModalMensagemSucessoComponent implements OnInit {

  modalRef: BsModalRef;

  mensagemSucesso: string;

  mensagemErro: string;

  /* Método para chamar um componente que está dentro de um ng-template para poder abrir um modal */
  @ViewChild('modalMensagemSucesso', {static: false}) modalMensagem;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

  }

  /* Método para abrir uma modal */
 abrirModal() {
    this.modalRef = this.modalService.show(this.modalMensagem, {class: 'modal-sm-6'});
  }

    /* Método para fechar a modal */
  confirm(){
    this.modalRef.hide();
  }

  /* Método para setar uma mensagem no componente de modal e abrir uma modal que será inserido em outro componente */
  setMsgSucesso(msgSucesso: string){
    this.abrirModal();
    this.mensagemSucesso = msgSucesso;
  }


}
