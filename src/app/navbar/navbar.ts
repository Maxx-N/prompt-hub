import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected authService = inject(AuthService);
  protected router = inject(Router);
  protected isDark = signal(false);

  toggleDarkMode() {
    this.isDark.update((isDark) => !isDark);
    document.documentElement.classList.toggle('app-dark', this.isDark());
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
