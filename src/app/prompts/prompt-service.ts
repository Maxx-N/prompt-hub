import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Prompt } from './prompt.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/prompts`;

  getPrompts() {
    return this.httpClient.get<Prompt[]>(this.baseUrl);
  }
}
