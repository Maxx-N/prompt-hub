import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Prompt } from './prompt.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/prompts`;

  getPrompts(): Observable<Prompt[]> {
    return this.httpClient.get<Prompt[]>(this.baseUrl);
  }

  createPrompt(prompt: { title: string; content: string; categoryId: number }): Observable<Prompt> {
    return this.httpClient.post<Prompt>(this.baseUrl, prompt);
  }
}
