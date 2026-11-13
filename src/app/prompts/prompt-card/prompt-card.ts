import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

import { Prompt } from '../prompt.model';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-prompt-card',
  imports: [Button, TextareaModule, TagModule, CardModule, RouterLink],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  private authService = inject(AuthService);
  prompt = input.required<Prompt>();

  canEdit = computed(() => {
    const currentUser = this.authService.currentUser();
    return this.prompt().author.id === currentUser?.id;
  });

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content);
  }
}
