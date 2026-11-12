import { Component, input } from '@angular/core';
import { Button } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

import { Prompt } from '../prompt.model';

@Component({
  selector: 'app-prompt-card',
  imports: [Button, TextareaModule, TagModule, CardModule],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  prompt = input.required<Prompt>();

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content);
  }
}
