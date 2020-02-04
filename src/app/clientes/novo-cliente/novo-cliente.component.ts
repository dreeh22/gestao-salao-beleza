import { Router, ActivatedRoute } from '@angular/router';
import { AlertaModalSucessoComponent } from './../../alertas-compartilhados/alerta-modal-sucesso/alerta-modal-sucesso.component';
import { ClienteService } from './../../services/cliente.service';
import { Cliente, Contato } from './../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();

  @ViewChild(AlertaModalSucessoComponent, {static: false}) modalMsgSucesso: AlertaModalSucessoComponent;

  constructor(private clienteService: ClienteService,
              private router: Router,
              private route: ActivatedRoute) {
                this.route.params.subscribe(params => this.cliente.id = params['id']);
              }

  ngOnInit() {

    this.cliente.contato = new Contato();
    this.consultarClienteEditar();
  }

  salvarCliente(form) {

    if(this.cliente.id === null){

      this.clienteService.salvarCliente(this.cliente).subscribe(
        res => {
          this.modalMsgSucesso.setMsgSucesso('Cliente adicionado com sucesso!');
        },
        err => {
          console.log('Ocorreu um erro.');
        }
      );

    }else{

      this.clienteService.editarCliente(this.cliente).subscribe(
        res => {
          this.modalMsgSucesso.setMsgSucesso('Cliente editado com sucesso!');
          this.router.navigateByUrl('cliente/lista');
        },

        err => {
          console.log('Ocorreu um erro.');
        }
      );

    }



  }

  redirecionarParaListaCliente() {
    this.router.navigateByUrl('cliente/lista');
  }

  consultarClienteEditar(){
      this.clienteService.consultaClientePorId(this.cliente.id).subscribe(res => this.cliente = res);
  }


}
