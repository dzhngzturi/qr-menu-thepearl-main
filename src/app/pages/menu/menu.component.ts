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

  get backLabel(): string {
    const lang = this.langService.getLanguage();
    switch (lang) {
      case 'en': return 'Back';
      case 'bg': return 'Назад';
      default: return 'Geri';
    }
  }


  goBack() {
    history.back(); // veya this.router.navigate(['/menu']);
  }


  ngOnInit(): void {

    window.scrollTo(0, 0);
    const lang = this.langService.getLanguage();
    this.lang = lang
    this.menuVerileri = [
      {
        slug: 'salatalar',
        kategori: lang === 'en' ? 'Salads' : lang === 'bg' ? 'Салати' : 'Salatalar',
        resim: 'salata.jpg',
      },
      {
        slug: 'baslangiclar',
        kategori: lang === 'en' ? 'Starters' : lang === 'bg' ? 'Предястия' : 'Başlangıçlar',
        resim: 'shrimp.jpg',
      },
      {
        slug: 'mezelervebruschettalar',
        kategori: lang === 'en' ? 'Appetizers and bruschettas' : lang === 'bg' ? 'Разядки и брускети' : 'Mezeler ve bruschettalar',
        resim: 'mezeler.jpg',
      },
      {
        slug: 'makarnalar',
        kategori: lang === 'en' ? 'Risotto and pasta' : lang === 'bg' ? 'Ризото и паста' : 'Risotto ve makarna',
        resim: 'carbonara.jpg',
      },
      {
        slug: 'anayemekler',
        kategori: lang === 'en' ? 'Main dishes' : lang === 'bg' ? 'Основни ястия' : 'Ana yemekler',
        resim: 'julien.png',
      },
      {
        slug: 'izgaralar',
        kategori: lang === 'en' ? 'Grill' : lang === 'bg' ? 'Скара' : 'Izgaralar',
        resim: 'grill.jpg',
      },
      {
        slug: 'burgerlervesandvicler',
        kategori: lang === 'en' ? 'Burgers and sandwiches' : lang === 'bg' ? 'Бургери и сандвичи' : 'Burgerler ve sandviçler',
        resim: 'burger.jpg',
      },
      {
        slug: 'pizzalar',
        kategori: lang === 'en' ? 'Pizzas' : lang === 'bg' ? 'Пици' : 'Pizzalar',
        resim: 'davinchi.png',
      },
      {
        slug: 'garni̇turlervesoslar',
        kategori: lang === 'en' ? 'Garnishes and sauces' : lang === 'bg' ? 'Гарнитури и сосове' : 'Garni̇türler ve soslar',
        resim: 'sauces.jpg',
      },
      {
        slug: 'aperatiflervekuruyemisler',
        kategori: lang === 'en' ? 'Appetizers and nuts ' : lang === 'bg' ? 'Мезета и ядки' : 'Aperatifler ve kuruyemişler ',
        resim: 'meze.jpg',
      },
      {
        slug: 'tatlilar',
        kategori: lang === 'en' ? 'Desserts' : lang === 'bg' ? 'Десерти' : 'Tatlılar',
        resim: 'sufle.png',
      },
      {
        slug: 'icecekler',
        kategori: lang === 'en' ? 'Hot Drinks' : lang === 'bg' ? 'Топли Напитки' : 'Sıcak İçecekler',
        resim: 'kafe.jpg',
      },
      {
        slug: 'alkolsuzicecekler',
        kategori: lang === 'en' ? 'Soft drinks' : lang === 'bg' ? 'Безалкохолни напитки' : 'Alkolsüz içecekler',
        resim: 'softdrinks.jpg',
      },
      {
        slug: 'rakilar',
        kategori: lang === 'en' ? 'Rakia' : lang === 'bg' ? 'Ракиа' : 'Rakılar',
        resim: 'burgas63.jpg',
      },
      {
        slug: 'viskiler',
        kategori: lang === 'en' ? 'Whiskies' : lang === 'bg' ? 'Уиски' : 'Viskiler',
        resim: 'jonniewalker.jpg',
      },
      {
        slug: 'vodkalar',
        kategori: lang === 'en' ? 'Vodkas' : lang === 'bg' ? 'Водки' : 'Vodkalar',
        resim: 'belvedere.png',
      },
      {
        slug: 'biralar',
        kategori: lang === 'en' ? 'Beers' : lang === 'bg' ? 'Бира' : 'Biralar',
        resim: 'beer.jpg',
      },
      {
        slug: 'alkoholluicecekler',
        kategori: lang === 'en' ? 'Alcohol' : lang === 'bg' ? 'Алкохол' : 'Alkollü içecekler',
        resim: 'alcohol.jpg',
      },
      {
        slug: 'saraplar',
        kategori: lang === 'en' ? 'Wines' : lang === 'bg' ? 'Вина' : 'Şaraplar içecekler',
        resim: 'sarap.jpg',
      },
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