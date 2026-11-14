import { NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

import { AuthService } from '../auth/auth-service';

const DARK_MODE_KEY = 'darkMode';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected authService = inject(AuthService);
  protected router = inject(Router);
  protected isDark = signal(localStorage.getItem(DARK_MODE_KEY) === 'true');
  protected loggingOut = signal(false);

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDark());
      localStorage.setItem(DARK_MODE_KEY, this.isDark().toString());
    });
  }

  logout() {
    this.loggingOut.set(true);
    this.authService.logout().subscribe(() => {
      this.loggingOut.set(false);
      this.router.navigate(['/']);
    });
  }
}
