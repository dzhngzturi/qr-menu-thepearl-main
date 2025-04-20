import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule]
})
export class MenuComponent implements OnInit, AfterViewInit {
  lang: string = 'bg';
  menuVerileri: any[] = [];
  showLanguageMenu: boolean = false;

  constructor(private router: Router, public langService: LanguageService, private viewportScroller: ViewportScroller) {}

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

  ngAfterViewInit(): void {
    const slug = localStorage.getItem('scrollToSlug');
    if (slug) {
      setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
        localStorage.removeItem('scrollToSlug'); // tekrar scroll yapmasın
      }, 100);
    }
  }
  

  kategoriSec(kategori: any) {
    localStorage.setItem('scrollToSlug', kategori.slug); // hangi karta döneceğimizi hatırlıyoruz
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

  get backLabel(): string {
    const lang = this.langService.getLanguage();
    switch (lang) {
      case 'en': return 'Back';
      case 'bg': return 'Назад';
      default: return 'Geri';
    }
  }

  goBack() {
    history.back();
  }

  getWebpResim(dosyaAdi: string): string {
    return dosyaAdi ? dosyaAdi.replace(/\.(jpe?g|png)$/i, '.webp') : '';
  }
}
