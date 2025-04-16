import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-global-frame',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './global-frame.component.html',
  styleUrls: ['./global-frame.component.css']
})
export class GlobalFrameComponent {
  isHomePage: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.url === '/' || event.url.startsWith('/home');
    });
    



  }
}
