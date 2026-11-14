import { Component, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Prompt } from '../prompt.model';
import { PromptCard } from '../prompt-card/prompt-card';
import { PromptService } from '../prompt-service';

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard, ProgressSpinnerModule],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService = inject(PromptService);

  loading = signal(true);
  prompts: Signal<Prompt[]> = toSignal(
    this.promptService.getPrompts().pipe(
      tap(() => {
        this.loading.set(false);
      }),
    ),
    { initialValue: [] },
  );
}
