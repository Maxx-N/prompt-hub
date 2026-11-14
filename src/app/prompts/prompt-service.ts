import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

import { Prompt, PromptData } from './prompt.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/prompts`;

  getPrompts(): Observable<Prompt[]> {
    return this.httpClient.get<Prompt[]>(this.baseUrl).pipe(delay(3000));
  }

  getPrompt(promptId: number): Observable<Prompt> {
    return this.httpClient.get<Prompt>(`${this.baseUrl}/${promptId}`).pipe(delay(3000));
  }

  createPrompt(prompt: PromptData): Observable<Prompt> {
    return this.httpClient.post<Prompt>(this.baseUrl, prompt).pipe(delay(3000));
  }

  updatePrompt(promptId: number, prompt: PromptData): Observable<Prompt> {
    return this.httpClient.put<Prompt>(`${this.baseUrl}/${promptId}`, prompt).pipe(delay(3000));
  }

  deletePrompt(promptId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${promptId}`).pipe(delay(3000));
  }

  upvotePrompt(promptId: number): Observable<Prompt> {
    return this.httpClient
      .post<Prompt>(`${this.baseUrl}/${promptId}/upvote`, null)
      .pipe(delay(3000));
  }

  downvotePrompt(promptId: number): Observable<Prompt> {
    return this.httpClient
      .post<Prompt>(`${this.baseUrl}/${promptId}/downvote`, null)
      .pipe(delay(3000));
  }
}
