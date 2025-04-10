import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../language.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule]
})
export class MenuComponent implements OnInit{
  lang: string = 'tr';
  menuVerileri: any[] = [];
  showLanguageMenu: boolean = false;

  constructor(private router: Router, public langService: LanguageService) {}

  ngOnInit(): void {
    const lang = this.langService.getLanguage();
    this.lang = lang
    this.menuVerileri = [
      {
        slug: 'salatalar',
        kategori: lang === 'en' ? 'Salads' : lang === 'bg' ? 'Салати' : 'Salatalar',
        resim: 'salata.jpg',
      },
      {
        slug: 'mezelervebruschettalar',
        kategori: lang === 'en' ? 'Appetizers and bruschettas' : lang === 'bg' ? 'Разядки и брускети' : 'Mezeler ve bruschettalar',
        resim: 'salata.jpg',
      },
      {
        slug: 'makarnalar',
        kategori: lang === 'en' ? 'Risotto and pasta' : lang === 'bg' ? 'Ризото и паста' : 'Risotto ve makarna',
        resim: 'salata.jpg',
      },
      {
        slug: 'baslangiclar',
        kategori: lang === 'en' ? 'Starters' : lang === 'bg' ? 'Предястия' : 'Başlangıçlar',
        resim: 'salata.jpg',
      },
      {
        slug: 'burgerler',
        kategori: lang === 'en' ? 'Burgers' : lang === 'bg' ? 'Бургери' : 'Burgerler',
        resim: 'salata.jpg',
      },
     
      {
        slug: 'icecekler',
        kategori: lang === 'en' ? 'Drinks' : lang === 'bg' ? 'Напитки' : 'İçecekler',
        resim: 'salata.jpg',
      },
      {
        slug: 'tatlilar',
        kategori: lang === 'en' ? 'Desserts' : lang === 'bg' ? 'Десерти' : 'Tatlılar',
        resim: 'salata.jpg',
      }
    ];
  }

  kategoriSec(kategori: any) {
    this.router.navigate(['/kategori', kategori.slug]);
  }

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  changeLanguage(lang: string) {
    this.langService.setLanguage(lang);
    this.showLanguageMenu = false;
    this.ngOnInit(); 
  }

  

}