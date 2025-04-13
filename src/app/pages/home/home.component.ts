import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true
})
export class HomeComponent {

  constructor(private router:Router) { }

  goMenu() {
    this.router.navigate(['/menu']);
  }

  languageChange(lang: string, isDefault: number) {
    localStorage.setItem('isDefaultLanguage', isDefault.toString());
    window.location.href = `https://qr.menufay.com/${lang}`;
  }

  showLanguageMenu = false;

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

}
