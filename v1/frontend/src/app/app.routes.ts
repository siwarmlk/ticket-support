import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { SupportRequestComponent } from './pages/support-request/support-request.component';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { LoginComponent } from './pages/login/login.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'support-request' },
  { path: 'support-request', component: SupportRequestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'kanban', component: KanbanComponent, canActivate: [authGuard] },
  { path: 'tickets/:id', component: TicketDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'support-request' }
];
