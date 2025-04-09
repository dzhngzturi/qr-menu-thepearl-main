import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-global-frame',
  imports: [RouterOutlet,FooterComponent],
  templateUrl: './global-frame.component.html',
  styleUrl: './global-frame.component.css',
  standalone: true})
export class GlobalFrameComponent {

}
