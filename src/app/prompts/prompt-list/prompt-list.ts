import { Component, inject, Signal, signal } from '@angular/core';

import { Prompt } from '../prompt.model';
import { PromptCard } from '../prompt-card/prompt-card';
import { PromptService } from '../prompt-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService = inject(PromptService);

  prompts: Signal<Prompt[]> = toSignal(this.promptService.getPrompts(), { initialValue: [] });
}
