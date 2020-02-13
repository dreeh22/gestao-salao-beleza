import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from './../models/agendamento';
import { take } from 'rxjs/Operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  salvarAgenda(agenda: Agendamento){
      return this.http.post(`${environment.API}agendamento`, agenda).pipe(take(1));
  }
 
  listarAgendaPorDataAtual(data: string){
    return this.http.get<Agendamento[]>(`${environment.API}agendamento?dataAgendamento=${data}`);
  }

  consultarAgendaPorData(data: Date){
    return this.http.get<Agendamento[]>(`${environment.API}agendamento?dataAgendamento=${data}`)
  }

  buscarAgendaPorId(id: number){
    return this.http.get<Agendamento>(`${environment.API}agendamento?id=${id}`);
  }

  editarStatusAgenda(agenda: Agendamento){
    const url = `${environment.API}agendamento/${agenda.id}`;
    return this.http.patch(url, agenda).pipe(take(1));
  }

}
