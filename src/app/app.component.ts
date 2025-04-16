import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GlobalFrameComponent } from './layout/global-frame/global-frame.component';
import { filter } from 'rxjs';
import { LoaderComponent } from './shared/loader/loader.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });

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
