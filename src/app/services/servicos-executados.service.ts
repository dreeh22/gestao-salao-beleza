import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/Operators';
import { environment } from './../../environments/environment';
import { ServicoRealizado } from './../models/servico-realizado';
import { Agendamento } from './../models/agendamento';


@Injectable({
  providedIn: 'root'
})
export class ServicosExecutadosService {

  constructor(private http: HttpClient) { }

  salvarServicoRealizado(servicoRealizado: ServicoRealizado){
    return this.http.post(`${environment.API}servico-realizado`, servicoRealizado).pipe(take(1));
  }

  listarServicosRealizados(){
    return this.http.get<Agendamento[]>(`${environment.API}agendamento?status=Realizado`);
  }

}
