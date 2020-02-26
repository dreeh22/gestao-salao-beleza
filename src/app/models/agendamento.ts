import { Time } from '@angular/common';

export class Agendamento {

    id: number;
    dataAgendamento: Date;
    cliente: string;
    servico: string;
    inicio: string;
    fim: string;
    observacao: string;
    status: string;
    valorServico: number;
}
