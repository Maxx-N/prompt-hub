import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
