import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servico } from './../models/servico';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/Operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }


  /* Método para salver um serviço */
  salvarServico(servico: Servico){
    return this.http.post(`${environment.API}servico`, servico).pipe(take(1));
  }

  /* Método para retornar todos os serviços cadastrados */
  getServicos(): Observable<Servico[]>{
    return this.http.get<Servico[]>(`${environment.API}servico`);
  }

  /* Método para retornar um serviço de acordo com seu ID */
  getServicoId(id: number){
    return this.http.get<Servico>(`${environment.API}servico/${id}`);
  }

  /* Método para editar um serviço*/
  editarServico(servico: Servico){
    const url = `${environment.API}servico/${servico.id}`
    return this.http.put(url, servico).pipe(take(1));
  }

  /* Método para deletar um serviço */
  deletarServico(id:number){
    return this.http.delete(`${environment.API}servico/${id}`).pipe(take(1));
  }

}
