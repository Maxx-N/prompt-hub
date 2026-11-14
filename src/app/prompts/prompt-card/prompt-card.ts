import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

import { Prompt } from '../prompt.model';
import { AuthService } from '../../auth/auth-service';
import { PromptService } from '../prompt-service';

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
  prompt = input.required<Prompt>();

  score = linkedSignal(() => this.prompt().score);
  userVote = linkedSignal(() => (this.authService.currentUser() ? this.prompt().userVote : null));

  canEdit = computed(() => {
    const currentUser = this.authService.currentUser();
    return this.prompt().author.id === currentUser?.id;
  });

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content);
  }

  upvote() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.promptService.upvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
      this.score.set(updatedPrompt.score);
      this.userVote.set(updatedPrompt.userVote);
    });
  }

  downvote() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.promptService.downvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
      this.score.set(updatedPrompt.score);
      this.userVote.set(updatedPrompt.userVote);
    });
  }
}
