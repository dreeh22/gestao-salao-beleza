import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-alerta-sucesso',
  templateUrl: './modal-alerta-sucesso.component.html',
  styleUrls: ['./modal-alerta-sucesso.component.css']
})
export class ModalAlertaSucessoComponent implements OnInit {

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
