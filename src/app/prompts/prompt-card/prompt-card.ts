import { Component, input } from '@angular/core';
import { Button } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

import { Prompt } from '../prompt.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prompt-card',
  imports: [Button, TextareaModule, TagModule, CardModule, RouterLink],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  prompt = input.required<Prompt>();

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content);
  }
}
