import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServicoService } from './../../services/servico.service';
import { Servico } from './../../models/servico';
import { RouterModule, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


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
    this.servicoService.deletarServico(this.servicoSelecionado.id).subscribe();
    this.metodosModal.hide();
  }

  decline(){
    this.metodosModal.hide();
  }


}
