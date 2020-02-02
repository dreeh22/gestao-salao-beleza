import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alerta-modal-sucesso',
  templateUrl: './alerta-modal-sucesso.component.html',
  styleUrls: ['./alerta-modal-sucesso.component.css']
})
export class AlertaModalSucessoComponent implements OnInit {

  modalRef: BsModalRef;

  mensagemSucesso: string;

  mensagemErro: string;

  /* Método para chamar um componente que está dentro de um ng-template para poder abrir um modal */
  @ViewChild('modalMensagemSucesso', {static: false}) modalMensagem;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.mensagemSucesso = '';
  }

  /* Método para abrir uma modal */
 abrirModal() {
    this.modalRef = this.modalService.show(this.modalMensagem, {class: 'modal-sm-6'});
  }

    /* Método para fechar a modal */
  confirm() {
    this.modalRef.hide();
  }

  /* Método para setar uma mensagem no componente de modal e abrir uma modal que será inserido em outro componente */
  setMsgSucesso(msgSucesso: string) {
    this.abrirModal();
    this.mensagemSucesso = msgSucesso;
  }

}
