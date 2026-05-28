import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoService {
  private readonly platformId: Object = inject(PLATFORM_ID);

  getItem(item: string) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(item);
    }

    return null;
  }

  setItem(item: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(item, value);
    }
  }

  removeItem(item: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(item);
    }
  }
}
