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


  salvarServico(servico: Servico){
    return this.http.post(environment.API, servico).pipe(take(1));
  }

  getServicos(): Observable<Servico[]>{
    return this.http.get<Servico[]>(environment.API);
  }

  getServicoId(id: number){
    return this.http.get<Servico>(`${environment.API}/${id}`);
  }

  editarServico(servico: Servico){
    const url = `${environment.API}/${servico.id}`
    return this.http.put(url, servico).pipe(take(1));
  }

  deletarServico(id:number){
    return this.http.delete(`${environment.API}/${id}`).pipe(take(1));
  }

}
