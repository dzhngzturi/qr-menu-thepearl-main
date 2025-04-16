import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(), // opsiyonel
    ),
    {
      provide: 'restoreScrollPosition',
      useValue: () => {
        window.scrollTo(0, 0); // her rota geçişinde en üste kaydır
      }
    }
  ]
};