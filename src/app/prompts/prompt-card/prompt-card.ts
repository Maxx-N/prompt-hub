import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { from } from 'rxjs';

import { AuthService } from '../../auth/auth-service';
import { PromptService } from '../prompt-service';
import { Prompt } from '../prompt.model';

@Component({
  selector: 'app-prompt-card',
  imports: [Button, TextareaModule, TagModule, CardModule, RouterLink],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  private router = inject(Router);
  private authService = inject(AuthService);
  private promptService = inject(PromptService);
  private messageService = inject(MessageService);
  prompt = input.required<Prompt>();

  voting = signal(false);
  score = linkedSignal(() => this.prompt().score);
  userVote = linkedSignal(() => (this.authService.currentUser() ? this.prompt().userVote : null));

  canEdit = computed(() => {
    const currentUser = this.authService.currentUser();
    return this.prompt().author.id === currentUser?.id;
  });

  async copyToClipboard() {
    from(navigator.clipboard.writeText(this.prompt().content)).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copié',
        detail: 'Prompt copié dans le presse-papier',
      });
    });
  }

  upvote() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.voting.set(true);
    this.promptService.upvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
      this.score.set(updatedPrompt.score);
      this.userVote.set(updatedPrompt.userVote);
      this.voting.set(false);
    });
  }

  downvote() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.voting.set(true);
    this.promptService.downvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
      this.score.set(updatedPrompt.score);
      this.userVote.set(updatedPrompt.userVote);
      this.voting.set(false);
    });
  }
}
