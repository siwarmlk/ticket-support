import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected credentials = {
    username: '',
    password: ''
  };

  protected readonly errorMessage = signal('');
  protected readonly isSubmitting = signal(false);

  protected login(): void {
    const user = this.credentials.username.trim();
    const pass = this.credentials.password;

    if (!user || !pass) {
      this.errorMessage.set('Remplissez le nom d utilisateur et le mot de passe.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.auth.login(user, pass).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/kanban';
        this.isSubmitting.set(false);
        void this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.errorMessage.set('Connexion impossible. Verifiez vos identifiants.');
        this.isSubmitting.set(false);
      }
    });
  }
}
