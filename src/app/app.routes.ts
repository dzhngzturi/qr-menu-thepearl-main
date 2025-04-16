import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { KategoriDetayComponent } from './pages/kategori-detay/kategori-detay.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'kategori/:id', component: KategoriDetayComponent },
  { path: '**', component: NotFoundComponent}
  
];
