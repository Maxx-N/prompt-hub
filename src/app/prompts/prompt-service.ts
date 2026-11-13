import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Prompt, PromptData } from './prompt.model';
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

  getPrompt(promptId: number): Observable<Prompt> {
    return this.httpClient.get<Prompt>(`${this.baseUrl}/${promptId}`);
  }

  createPrompt(prompt: PromptData): Observable<Prompt> {
    return this.httpClient.post<Prompt>(this.baseUrl, prompt);
  }

  updatePrompt(promptId: number, prompt: PromptData): Observable<Prompt> {
    return this.httpClient.put<Prompt>(`${this.baseUrl}/${promptId}`, prompt);
  }

  deletePrompt(promptId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${promptId}`);
  }
}
