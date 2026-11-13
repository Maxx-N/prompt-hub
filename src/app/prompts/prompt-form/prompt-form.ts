import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Textarea } from 'primeng/textarea';

import { CategoryService } from '../category-service';
import { Category } from '../category.model';

@Component({
  selector: 'app-prompt-form',
  imports: [Card, InputTextModule, Textarea, SelectModule],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  private readonly categoryService = inject(CategoryService);

  protected readonly categories: Signal<Category[]> = toSignal(
    this.categoryService.getCategories(),
    {
      initialValue: [],
    },
  );
}
