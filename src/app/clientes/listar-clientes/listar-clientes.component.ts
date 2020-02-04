import { ClienteService } from './../../services/cliente.service';
import { Cliente, Contato } from './../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MensagemSucessoComponent } from './../../mensagens/mensagem-sucesso/mensagem-sucesso.component';
import { MensagemErroComponent } from 'src/app/mensagens/mensagem-erro/mensagem-erro.component';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Cliente [] = [];

  cliente: Cliente = new Cliente();

  tamanhoGridClientes = 12;
  paddindGrid = 4;
  infoComplementaresHabilitado = false;

  metodosModalRef: BsModalRef;

  @ViewChild('modalDeletar', {static: false}) templateModalDeletar;
  @ViewChild(MensagemSucessoComponent, {static: false}) msgSucesso: MensagemSucessoComponent;
  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  constructor(private clienteService: ClienteService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit() {
      this.listarClientes();
      this.cliente.contato = new Contato();
  }

  listarClientes() {
    this.clienteService.listarClientes().subscribe(
      resultado => this.clientes = resultado,

      err => {
          console.log('Ocorreu um erro ao tentar listar os clientes');
      }
    );
  }

  habilitarBlocoInformacoes(id) {

    

    if (this.infoComplementaresHabilitado === false) {
      this.infoComplementaresHabilitado = true;
      this.tamanhoGridClientes = 9;
      this.paddindGrid = 1;
    } else {
      this.infoComplementaresHabilitado = false;
      this.tamanhoGridClientes = 12;
      this.paddindGrid = 4;
    }

    this.clienteService.consultaClientePorId(id).subscribe(res => this.cliente = res);

  }

  abrirModal(id) {
    this.cliente.id = id;
    this.metodosModalRef = this.modalService.show(this.templateModalDeletar, {class: 'modal-sm-6'});
  }

  redirecionarClienteEdicao(cliente){
      this.router.navigateByUrl('cliente/editar/' + cliente.id);
  }

  confirmarcao(id){

    this.clienteService.deletarCliente(this.cliente.id).subscribe(
      res => {
        this.msgSucesso.setMsgSucesso('Cliente deletado com sucesso!');
        this.metodosModalRef.hide();
        this.listarClientes();
      }, 

      err => {
        this.msgErro.setErro('Ocorreu um erro ao tentar deletar o cliente');
      }

    );
  }

  fecharModalDeletar(){
    this.metodosModalRef.hide();
  }

  


}
