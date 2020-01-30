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

  servicos: Servico[] = [];

  @Input() listaRecebida: Servico[] = [];

  metodosModal: BsModalRef;

  servicoSelecionado: Servico = new Servico();

  @ViewChild('modalDelete', {static: false}) componentModal;

  @ViewChild(MensagemSucessoComponent, {static: false}) msgSucesso: MensagemSucessoComponent;

  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  @ViewChild(ModalMensagemSucessoComponent, {static: false}) modalMsgErro: ModalMensagemSucessoComponent;

  constructor(private servicoService: ServicoService, 
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.servicoService.getServicos().subscribe(dados => this.listaRecebida = dados);
  }

  obterId(id) {
    this.router.navigate(['servico/editar', id]);
  }

  obterIdDeletar(id) {
    this.servicoSelecionado.id = id;
    this.metodosModal = this.modalService.show(this.componentModal, {class: 'modal-sm-6'})
  }

  confirm(){

    this.servicoService.deletarServico(this.servicoSelecionado.id).subscribe(
      res => {
        this.msgSucesso.setMsgSucesso('Serviço deletado com sucesso.');
        this.getServicos();
      },
      err => {
        this.msgErro.setErro('Ocorreu um erro ao tentar editar o serviço.'); 
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
