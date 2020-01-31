import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem-erro',
  templateUrl: './mensagem-erro.component.html',
  styleUrls: ['./mensagem-erro.component.css']
})
export class MensagemErroComponent implements OnInit {

  msgErro: string;

  constructor() { }

  ngOnInit() {
  }
  /* Método para setar uma mensagem no componente de alerta que será inserido em outro componente */
  setErro(msgErro: string, tempo: number = 5000){
    this.msgErro = msgErro;
    setTimeout(()=> {this.msgErro = null}, tempo);
  }

}
