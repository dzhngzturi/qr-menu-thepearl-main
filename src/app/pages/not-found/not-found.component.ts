import { Component, Inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  message = {
    tr: 'Aradığınız sayfa bulunamadı.',
    en: 'The page you are looking for was not found.',
    bg: 'Страницата, която търсите, не беше намерена.'
  };

  homeText = {
    tr: 'Anasayfaya Dön',
    en: 'Go to Home',
    bg: 'Към началото'
  };

  currentLang: 'tr' | 'en' | 'bg';

  constructor(@Inject(LOCALE_ID) private locale: string) {
    const baseLang = locale.split('-')[0];
    this.currentLang = (['tr', 'en', 'bg'].includes(baseLang) ? baseLang : 'en') as 'tr' | 'en' | 'bg';
  }

  get localizedMessage(): string {
    return this.message[this.currentLang];
  }

  get homeButtonText(): string {
    return this.homeText[this.currentLang];
  }
}