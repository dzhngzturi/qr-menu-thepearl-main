import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
private currentLang: string = 'tr';

setLanguage(lang: string) {
  this.currentLang = lang;
  localStorage.setItem('language', lang);
}

getLanguage(): string {
  return localStorage.getItem('language') || this.currentLang;
}

  constructor() { }
}
