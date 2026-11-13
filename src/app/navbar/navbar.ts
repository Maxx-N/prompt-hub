import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected authService = inject(AuthService)
  protected isDark = signal(false);

  toggleDarkMode() {
    this.isDark.update((isDark) => !isDark);
    document.documentElement.classList.toggle('app-dark', this.isDark());
  }
}
