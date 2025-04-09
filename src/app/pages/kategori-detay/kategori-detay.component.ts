import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalFrameComponent } from '../../layout/global-frame/global-frame.component';

interface Urun {
  isim: string;
  aciklama: string;
  fiyat: number;
  resim: string;
}

@Component({
  selector: 'app-kategori-detay',
  standalone: true, // EKLENDİ
  imports: [CommonModule, GlobalFrameComponent], // GEREKLİDİR!
  templateUrl: './kategori-detay.component.html',
  styleUrls: ['./kategori-detay.component.css']
})

export class KategoriDetayComponent implements OnInit {
  kategoriAdi: string = '';
  urunler: Urun[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.kategoriAdi = this.route.snapshot.paramMap.get('id') || '';

  const tumUrunler: { [key: string]: Urun[] } = {
    salatalar: [
      { isim: 'Бурата', aciklama: 'микс салати, чери домати, авокадо, бурата, подправки', fiyat: 60, resim: 'salata.jpg' },
      { isim: 'Цезар с пиле', aciklama: 'айсберг, пилешко филе, чери домати, крутони, пармезан, дресинг', fiyat: 40, resim: 'salata.jpg' },
    ],
    burger: [ /* burger ürünleri buraya */ ],
    // diğer kategoriler...
  };

  this.urunler = tumUrunler[this.kategoriAdi.toLowerCase()] || [];
  }
  
}