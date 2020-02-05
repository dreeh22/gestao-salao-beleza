import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './../models/cliente';
import { take } from 'rxjs/Operators';
import { environment } from './../../environments/environment';
import { ServicoRealizado } from './../models/servico-realizado';

@Injectable({
  providedIn: 'root'
})
export class ServicosExecutadosService {

  constructor(private http: HttpClient) { }

  listarClientes(){
    return this.http.get<Cliente[]>(`${environment.API}cliente`);
  }

  salvarServicoRealizado(servicoRealizado: ServicoRealizado){
    console.log('RECEBIDO: ', servicoRealizado); 
    return this.http.post(`${environment.API}servico-realizado`, servicoRealizado).pipe(take(1));
  }


}
