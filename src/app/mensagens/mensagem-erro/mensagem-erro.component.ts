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

  setErro(msgErro: string, tempo: number = 5000){
    this.msgErro = msgErro;
    setTimeout(()=> {this.msgErro = null}, tempo);
  }

}
