import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicosExecutadosService } from 'src/app/services/servicos-executados.service';
import { ServicoRealizado, ConsultarPorData } from 'src/app/models/servico-realizado';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MensagemSucessoComponent } from 'src/app/mensagens/mensagem-sucesso/mensagem-sucesso.component';
import { MensagemErroComponent } from './../../mensagens/mensagem-erro/mensagem-erro.component';

@Component({
  selector: 'app-lista-servicos-realizados',
  templateUrl: './lista-servicos-realizados.component.html',
  styleUrls: ['./lista-servicos-realizados.component.css']
})
export class ListaServicosRealizadosComponent implements OnInit {

  servicoRealizados: ServicoRealizado [] = [];
  consultarPorData: ConsultarPorData = new ConsultarPorData();
  servicoRealizado: ServicoRealizado = new ServicoRealizado();

  @ViewChild('modalDelete', {static: false}) templateModalDelete;

  @ViewChild(MensagemSucessoComponent, {static: false}) msgSucesso: MensagemSucessoComponent;

  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  metodosModal: BsModalRef;

  constructor(private servicoRealizadoService: ServicosExecutadosService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit() {

    this.listarServicosRealizados();

  }

  consultarServicosPorData(){
     this.servicoRealizadoService.retornarPorData(this.consultarPorData.dataInicio, this.consultarPorData.dataFim)
     .subscribe(res => this.servicoRealizados = res);
  }

  capiturarIdServico(id){
    this.router.navigate(['servico-realizado/editar/', id]);
  }

  abrirModalDelete(id) {
    this.servicoRealizado.id = id;
    this.metodosModal = this.modalService.show(this.templateModalDelete, {class: 'modal-sm-6'});
  }

  confirm(){
    this.servicoRealizadoService.deletarServicoRealizado(this.servicoRealizado.id).subscribe(
      res => {
          this.msgSucesso.setMsgSucesso('Serviço realizado deletado com sucesso!');
          this.metodosModal.hide();
          this.listarServicosRealizados();
      }, 
      err => {
          this.msgErro.setErro('Ocorreu um erro ao tentar deletar o serviço realizado!');
      }
    );
  }

  decline(){
    this.metodosModal.hide();
  }

  listarServicosRealizados(){

    this.servicoRealizadoService.listarServicosRealizados().subscribe(
      res => this.servicoRealizados = res
    );

  }


}
