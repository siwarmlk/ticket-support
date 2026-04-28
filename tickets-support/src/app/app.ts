
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  form: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      prenom: [''],
      nom: [''],
      telephone: [''],
      email: [''],
      titre: [''],
      categorie: ['Question generale'],
      description: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // Here you can send the form data to your backend or service
      alert('Demande envoyée!\n' + JSON.stringify(this.form.value, null, 2));
      this.form.reset({ categorie: 'Question generale' });
      this.submitted = false;
    }
  }
}
