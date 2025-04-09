import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GlobalFrameComponent } from './layout/global-frame/global-frame.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet,HttpClientModule, GlobalFrameComponent]
})
export class AppComponent implements OnInit {
  lang: string = 'en';
  isMenuPage: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isMenuPage = event.url.includes('/menu');
      }
    });
  }

  ngOnInit() {}

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
