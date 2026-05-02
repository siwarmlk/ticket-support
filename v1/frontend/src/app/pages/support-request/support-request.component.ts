import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketCategory } from '../../ticket.model';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-support-request',
  imports: [FormsModule],
  templateUrl: './support-request.component.html',
  styleUrl: './support-request.component.scss'
})
export class SupportRequestComponent {
  private readonly ticketService = inject(TicketService);

  protected readonly categories = this.ticketService.categories;
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  protected readonly form = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    title: '',
    description: '',
    category: 'Question generale' as TicketCategory
  };

  protected createTicket(): void {
    const { firstName, lastName, phone, email, title, description } = this.form;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !title.trim() ||
      !description.trim()
    ) {
      this.errorMessage.set('Tous les champs sont obligatoires.');
      this.successMessage.set('');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.ticketService
      .createPublicTicket({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        title: title.trim(),
        description: description.trim(),
        category: this.form.category
      })
      .subscribe({
        next: () => {
          this.form.firstName = '';
          this.form.lastName = '';
          this.form.phone = '';
          this.form.email = '';
          this.form.title = '';
          this.form.description = '';
          this.form.category = 'Question generale';
          this.successMessage.set('Votre demande a ete envoyee. Merci.');
          this.isSubmitting.set(false);
        },
        error: () => {
          this.errorMessage.set('Envoi impossible. Reessayez plus tard.');
          this.isSubmitting.set(false);
        }
      });
  }
}
