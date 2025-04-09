import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { KategoriDetayComponent } from './pages/kategori-detay/kategori-detay.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'kategori/:id', component: KategoriDetayComponent }
];
