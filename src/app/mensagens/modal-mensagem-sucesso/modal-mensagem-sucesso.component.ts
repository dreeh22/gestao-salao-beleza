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

  @ViewChild('modalMensagemSucesso', {static: false}) modalMensagem;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

  }

 abrirModal() {
    this.modalRef = this.modalService.show(this.modalMensagem, {class: 'modal-sm-6'});
  }

  confirm(){
    this.modalRef.hide();
  }

  setMsgSucesso(msgSucesso: string){
    this.abrirModal();
    this.mensagemSucesso = msgSucesso;
  }


}
