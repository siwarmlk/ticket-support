import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket, TicketCategory, TicketStatus } from './ticket.model';

export type CreatePublicTicketPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  title: string;
  description: string;
  category: TicketCategory;
};

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  /** Appels directs vers le backend (CORS activé côté Express). */
  private readonly apiBase = 'http://localhost:5000/api';

  readonly statuses: TicketStatus[] = [
    'To Do',
    'In Progress',
    'Waiting for Customer',
    'Resolved',
    'Closed'
  ];

  readonly categories: TicketCategory[] = [
    'Probleme technique',
    'Probleme de facturation',
    'Probleme d acces au compte',
    'Demande de remboursement',
    'Question generale'
  ];

  getTickets() {
    return this.http.get<Ticket[]>(`${this.apiBase}/tickets`);
  }

  getTicketById(id: string) {
    return this.http.get<Ticket>(`${this.apiBase}/tickets/${id}`);
  }

  createPublicTicket(payload: CreatePublicTicketPayload) {
    return this.http.post<Ticket>(`${this.apiBase}/public/tickets`, payload);
  }

  updateStatus(ticketId: string, status: TicketStatus) {
    return this.http.patch<Ticket>(`${this.apiBase}/tickets/${ticketId}/status`, { status });
  }

  assignToMe(ticketId: string) {
    return this.http.patch<Ticket>(`${this.apiBase}/tickets/${ticketId}/assign`, {});
  }

  unassignTicket(ticketId: string) {
    return this.http.patch<Ticket>(`${this.apiBase}/tickets/${ticketId}/assign`, { unassign: true });
  }
}
