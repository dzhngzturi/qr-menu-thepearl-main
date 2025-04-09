import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule]
})
export class MenuComponent implements OnInit{
  menuVerileri: any[] = [];
  seciliKategori: any = null;
  seciliUrun: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menuVerileri = [
      {
        kategori: 'Salatalar',
        resim: 'salata.jpg'
      },
      {
         kategori: 'Salatalar',
        resim: 'salata.jpg'
      },
      {
         kategori: 'Salatalar',
        resim: 'salata.jpg'
      },
    ];

  }
  
  kategoriSec(kategori: any) {
    this.router.navigate(['/kategori', kategori.kategori.toLowerCase()]);
  }

  urunSec(urun: any): void {
    this.seciliUrun = urun;
  }


}