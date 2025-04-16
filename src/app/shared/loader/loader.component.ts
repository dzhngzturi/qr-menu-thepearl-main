import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports:[CommonModule],
  template: `<div class="loader">Loading...</div>`,
  styles: [`
    .loader {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(255,255,255,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-size: 1.5rem;
    }
  `]
})
export class LoaderComponent {}

