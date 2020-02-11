import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicosExecutadosService } from 'src/app/services/servicos-executados.service';
import { ServicoRealizado, ConsultarPorData } from 'src/app/models/servico-realizado';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Servico } from 'src/app/models/servico';
import { Cliente } from './../../models/cliente';
import { AlertaSucessoComponent } from './../../1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from './../../1-alertas-compartilhados/alerta-erro/alerta-erro.component';

@Component({
  selector: 'app-lista-servicos-realizados',
  templateUrl: './lista-servicos-realizados.component.html',
  styleUrls: ['./lista-servicos-realizados.component.css']
})
export class ListaServicosRealizadosComponent implements OnInit {

  servicoRealizados: ServicoRealizado [] = [];

  listaDeServicos: Servico [] = [];

  servicoRealizado: ServicoRealizado = new ServicoRealizado();

  clientes: Cliente [] = [];

  @ViewChild('modalDelete', {static: false}) templateModalDelete;

  @ViewChild(AlertaSucessoComponent, {static: false}) msgSucesso: AlertaSucessoComponent;

  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;

  metodosModal: BsModalRef;

  constructor(private servicoRealizadoService: ServicosExecutadosService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit() {

    this.listarServicosRealizados();
    this.servicosRealizados();
    this.clientesCadastrados();
    this.servicoRealizado = new ServicoRealizado();

  }

  consultarServicosRealizados(form){

    if(this.servicoRealizado.nomeCliente != null){
        this.servicoRealizadoService.consultarPorCliente(this.servicoRealizado)
        .subscribe(res => this.servicoRealizados = res);
    }else 
    
    if(this.servicoRealizado.dataServico != null){
        this.servicoRealizadoService.consultarPorData(this.servicoRealizado)
        .subscribe(res => this.servicoRealizados = res);
    }else 
    
    if(this.servicoRealizado.nomeServico != null){
        this.servicoRealizadoService.consultarPorServico(this.servicoRealizado)
        .subscribe(res => this.servicoRealizados = res);
    }else 
    
    if(this.servicoRealizado.nomeCliente && this.servicoRealizado.dataServico != null){
        this.servicoRealizadoService.consultarPorNomeData(this.servicoRealizado)
        .subscribe(res => this.servicoRealizados = res); 
      }else 
      
      if(this.servicoRealizado.nomeCliente && this.servicoRealizado.nomeServico != null){
      this.servicoRealizadoService.consultarPorNomeData(this.servicoRealizado)
        .subscribe(res => this.servicoRealizados = res); 
    }else 
    
    if(this.servicoRealizado.dataServico && this.servicoRealizado.nomeServico != null){
      this.servicoRealizadoService.consultarPorNomeDataServico(this.servicoRealizado)
      .subscribe(res => this.servicoRealizados = res);
    }else 
    
    if(this.servicoRealizado != null){
      this.servicoRealizadoService.consultarPorNomeDataServico(this.servicoRealizado)
     .subscribe(res => this.servicoRealizados = res);

    }
 
     
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

  servicosRealizados(){
      this.servicoRealizadoService.consultarServicos().subscribe(
        res => this.listaDeServicos = res
      );
  };

  clientesCadastrados(){
    this.servicoRealizadoService.listarClientes().subscribe(res => this.clientes = res);
  }


}
