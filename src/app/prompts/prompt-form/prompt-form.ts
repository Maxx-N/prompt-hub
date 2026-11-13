import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';

import { CategoryService } from '../category-service';
import { PromptService } from '../prompt-service';
import { Category } from '../category.model';

@Component({
  selector: 'app-prompt-form',
  imports: [Card, InputTextModule, Textarea, SelectModule, Button, ReactiveFormsModule, RouterLink],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  private readonly promptService = inject(PromptService);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);

  protected readonly form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)],
      nonNullable: true,
    }),
    content: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    categoryId: new FormControl(-1, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
  });
  protected readonly categories: Signal<Category[]> = toSignal(
    this.categoryService.getCategories(),
    {
      initialValue: [],
    },
  );

  protected submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const promptData = this.form.getRawValue();
    this.promptService.createPrompt(promptData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
