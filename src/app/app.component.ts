import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GlobalFrameComponent } from './layout/global-frame/global-frame.component';
import { filter } from 'rxjs';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet,HttpClientModule, GlobalFrameComponent, LoaderComponent,CommonModule]
})
export class AppComponent implements OnInit {
  lang: string = 'en';
  isMenuPage: boolean = false;
  showLanguageMenu = false;
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {
      // Sayfa geçişlerinde scroll sıfırlama sadece belirli sayfalar için
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
  
        // Sadece ana sayfa ve /menu sayfasında en üste scroll
        if (url === '/' || url === '/menu' || url === '/home') {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
  
      // Loading animation kontrolü
      this.router.events.subscribe(event => {
        if (event.constructor.name === 'NavigationStart') {
          this.isLoading = true;
        }
        if ([
          'NavigationEnd',
          'NavigationCancel',
          'NavigationError'
        ].includes(event.constructor.name)) {
          setTimeout(() => this.isLoading = false, 300);
        }
      });

  }

  ngOnInit() {}

  goMenu() {
    this.router.navigate(['/menu']);
  }

  

}
