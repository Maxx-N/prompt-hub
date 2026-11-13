import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '../auth-service';

@Component({
  selector: 'app-auth-form',
  imports: [Card, ReactiveFormsModule, Button, InputText, PasswordModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected readonly mode = signal<'login' | 'register'>('login');
  protected readonly form = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
    }),
  });

  protected toggleMode() {
    this.mode.update((mode) => (mode === 'login' ? 'register' : 'login'));
  }

  protected submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const { username, password } = this.form.getRawValue();
    if (this.mode() === 'login') {
      this.login(username, password);
      return;
    }
    this.register(username, password);
  }

  private login(username: string, password: string) {
    this.authService.login(username, password).subscribe(() => this.router.navigate(['/']));
  }

  private register(username: string, password: string) {
    this.authService.register(username, password).subscribe(() => this.router.navigate(['/']));
  }
}
