import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalFrameComponent } from '../../layout/global-frame/global-frame.component';
import { LanguageService } from '../../language.service';
import { FooterComponent } from "../../shared/footer/footer.component";

interface Urun {
  isim: string;
  aciklama: string;
  fiyat: string;
  resim?: string;
}

@Component({
  selector: 'app-kategori-detay',
  standalone: true, // EKLENDİ
  imports: [CommonModule, GlobalFrameComponent,], // GEREKLİDİR!
  templateUrl: './kategori-detay.component.html',
  styleUrls: ['./kategori-detay.component.css']
})

export class KategoriDetayComponent implements OnInit {
  kategoriAdi: string = '';
  public gorunumTipi: 'kart' | 'liste' = 'kart';
  public urunler: Urun[] = [];

  constructor(private route: ActivatedRoute, public langService: LanguageService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('id')?.toLowerCase() || '';
    const lang = this.langService.getLanguage();

    const normalize = (value: string) =>
      value.normalize("NFD").replace(/[^\w\s]/g, '').replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o');

    const normalizedSlug = normalize(slug);

    const kategoriSlugMap: Record<string, Record<string, string>> = {
      salatalar: { tr: 'Salatalar', en: 'Salads', bg: 'Салати' },
      baslangiclar: { tr: 'Başlangıçlar', en: 'Appetizers', bg: 'Предястия' },
      burgerler: { tr: 'Burgerler', en: 'Burgers', bg: 'Бургери' },
      makarnalar: { tr: 'Makarnalar', en: 'Pastas', bg: 'Пасти' },
      icecekler: { tr: 'Sıcak içecekler', en: 'Hot drinks', bg: 'Топли напитки' },
      tatlilar: { tr: 'Tatlılar', en: 'Desserts', bg: 'Десерти' }
    };

    const kategoriKeyMap: Record<string, string> = {
      salatalar: 'salads',
      salads: 'salads',
      салати: 'salads',
      baslangiclar: 'appetizers',
      appetizers: 'appetizers',
      предястия: 'appetizers',
      burgerler: 'burgers',
      burgers: 'burgers',
      бургери: 'burgers',
      makarnalar: 'pastas',
      pastas: 'pastas',
      пасти: 'pastas',
      icecekler: 'drinks',
      drinks: 'drinks',
      напитки: 'drinks',
      tatlilar: 'desserts',
      desserts: 'desserts',
      десерти: 'desserts'
    };
    

    this.kategoriAdi = kategoriSlugMap[normalizedSlug]?.[lang] || slug;
    
    const veriKey = kategoriKeyMap[slug] || kategoriKeyMap[normalizedSlug];
    

  
    const tumUrunler: Record<string, Record<string, Urun[]>> = {

      tr: {
        salads: [
          { isim: 'Burrata', aciklama: 'karışık salata, çeri domates, avokado, burrata, baharatlar', fiyat: '14 lv', resim: 'salata.jpg' },
          { isim: 'Sezar', aciklama: 'marul, tavuk fileto, kiraz domates, kruton, parmesan, sos', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Nitsa', aciklama: 'marul, tavuk fileto, kiraz domates, kruton, parmesan, sos', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Fırında peynirli kinoa', aciklama: 'karışık salatalar, domates, salatalık, kinoa, peynir, sos', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Yunan salatası', aciklama: 'domates, salatalık, közlenmiş biber peyniri, bruschetta, zeytin ezmesi', fiyat: '11 lv', resim: 'salata.jpg' },
          { isim: 'Gelenek', aciklama: 'közlenmiş biber, patlıcan, domates, peynir', fiyat: '11 lv', resim: 'salata.jpg' },
          { isim: 'Çoban salatası', aciklama: 'domates, salatalık, taze biber, mantar, jambon, kaşar, peynir, yumurta, zeytin', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Шопска салата', aciklama: 'domates, salatalık, taze biber, peynir', fiyat: '10 lv', resim: 'salata.jpg' },
          { isim: 'Kaprese', aciklama: 'domates, mozarella, fesleğen pesto', fiyat: '11 lv', resim: 'salata.jpg' }
        ],
        appetizers: [
          { isim: 'Yağda karides', aciklama: '180 gr.', fiyat: '16 lv', resim: 'shrimp.jpg' },
          { isim: 'Ekmekli kalamar', aciklama: '200 gr.', fiyat: '14 lv', resim: 'squid.jpg' },
          { isim: 'Tavuk nugget lı mısır gevreği', aciklama: '250 гр.', fiyat: '12.50 lv', resim: 'nuggets.jpg' },
          { isim: 'Kabak Yunan usulü', aciklama: '200 gr.', fiyat: '10.00 lv', resim: 'zucchini.jpg' },
          { isim: 'Yaban mersinli işlenmiş peynir', aciklama: '250 gr.', fiyat: '10.50 lv', resim: 'cheese.jpeg' },
          { isim: 'Ekmekli sarı peynir', aciklama: '250 gr.', fiyat: '10.50 lv', resim: 'breaded-cheese.jpg' },
          { isim: 'Tereyağında dil', aciklama: '200 gr.', fiyat: '8.50 lv', resim: 'tongue.jpg' },
          { isim: 'Yağda mantar', aciklama: '200 gr.', fiyat: '8.50 лв', resim: 'mushrooms.jpg' },
          { isim: 'Teriyaki tavuk kanatları', aciklama: '300 gr.', fiyat: '11 lv', resim: 'wings.jpg' },
          { isim: 'Buffalo Tavuk Kanatları', aciklama: '300 gr.', fiyat: '11 lv', resim: 'wings-buffalo.jpg' },
          { isim: 'Sotelenmiş patates', aciklama: '250 gr.', fiyat: '6.50 lv', resim: 'potatoes.jpg' },
          { isim: 'Cips', aciklama: '200 gr.', fiyat: '7 lv', resim: 'Chips.jpg' },
          { isim: 'Cips + peynir', aciklama: '250 gr.', fiyat: '7.80 lv', resim: 'Chips.jpg' },
          { isim: 'Anneannenin patatesleri', aciklama: '200 gr.', fiyat: '6.50 lv', resim: 'grandmas-potatoes.jpg' },
          { isim: 'Parmesanlı tatlı patates', aciklama: '200 gr.', fiyat: '8.50 lv', resim: 'sweet-potatoes.jpg' },
          { isim: 'Patates kızartması', aciklama: '200 gr.', fiyat: '5.50 lv', resim: 'french-fries.jpg' },
          { isim: 'Patates kızartması + peynir', aciklama: '250 gr.', fiyat: '6.80 lv', resim: 'french-fries.jpg' },
          { isim: 'Soğan ve mantarlı tavuk ciğeri', aciklama: '250 gr.', fiyat: '9.50 lv', resim: 'livers.jpeg' },
        ],
        drinks:[
          { isim: 'Kahve "Lavazza"', aciklama: '50 ml.', fiyat: '2.50 lv' },
          { isim: 'Kahve "Lavazza" kafeinsiz', aciklama: '50 ml.', fiyat: '2.50 lv' },
          { isim: '3 in 1', aciklama: '150 ml.', fiyat: '2.20 lv'},
          { isim: 'Cafe Richard', aciklama: '150 ml.', fiyat: '2.20 lv'},
          { isim: 'Ronnefeldt tea', aciklama: '150 ml.', fiyat: '2.20 lv'},
          { isim: 'Milk with coffee', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Milk with cocoa', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Hot chocolate', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Cappuccino', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Frappe', aciklama: '200 ml.', fiyat: '3.20 lv'},
          { isim: 'Viennese coffee', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Latte', aciklama: '400 ml.', fiyat: '6 lv'},
          { isim: 'Milkshake', aciklama: '400 ml.', fiyat: '6 lv'},
        ],

      },

      en: {
        salads: [
          { isim: 'Burrata', aciklama: 'salad mix, cherry tomatoes, avocado, burrata, spices', fiyat: '14 lv', resim: 'salata.jpg' },
          { isim: 'Caesar', aciklama: 'iceberg, chicken fillet, cherry tomatoes, croutons, parmesan, dressing', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Нitsa', aciklama: 'lettuce, tomatoes, cucumbers. tuna, egg. fresh onion, olives', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Quinoa with baked cheese', aciklama: 'mixed salads, tomatoes, cucumbers, quinoa, cheese, dressing', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Greek salad', aciklama: 'tomatoes, cucumbers, roasted pepper cheese, bruschetta, olive paste', fiyat: '11 lv', resim: 'salata.jpg' },
          { isim: 'Tradition', aciklama: 'roasted pepper, eggplant, tomatoes, cheese', fiyat: '11 lv', resim: 'salata.jpg' },
          { isim: 'Shepherds salad', aciklama: 'tomatoes, cucumbers, fresh pepper, mushrooms, ham, yellow cheese, cheese, egg, olives', fiyat: '12 lv', resim: 'salata.jpg' },
          { isim: 'Shopska salad', aciklama: 'tomatoes, cucumbers, fresh pepper, cheese', fiyat: '10 lv', resim: 'salata.jpg' },
          { isim: 'Caprese', aciklama: 'tomatoes, mozzarella, basil pesto', fiyat: '11 lv', resim: 'salata.jpg' }
        ],
        appetizers: [
          { isim: 'Shrimp in oil', aciklama: '180 gr.', fiyat: '16 lv', resim: 'shrimp.jpg' },
          { isim: 'Breaded squid', aciklama: '200 gr.', fiyat: '14 lv', resim: 'squid.jpg' },
          { isim: 'Chicken nuggets with cornflakes', aciklama: '250 gr.', fiyat: '12.50 lv', resim: 'nuggets.jpg' },
          { isim: 'Zucchini Greek style', aciklama: '200 gr.', fiyat: '10.00 lv', resim: 'zucchini.jpg' },
          { isim: 'Processed cheese with blueberries', aciklama: '250 gr.', fiyat: '10.50 lv', resim: 'cheese.jpeg' },
          { isim: 'Breaded yellow cheese', aciklama: '250 gr.', fiyat: '10.50 lv', resim: 'breaded-cheese.jpg' },
          { isim: 'Tongue in butter', aciklama: '200 gr.', fiyat: '8.50 lv', resim: 'tongue.jpg' },
          { isim: 'Mushrooms in oil', aciklama: '200 gr.', fiyat: '8.50 лв', resim: 'mushrooms.jpg' },
          { isim: 'Chicken wings Teriyaki', aciklama: '300 gr.', fiyat: '11 lv', resim: 'wings.jpg' },
          { isim: 'Chicken wings Buffalo', aciklama: '300 gr.', fiyat: '11 lv', resim: 'wings-buffalo.jpg' },
          { isim: 'Sautéed potatoes', aciklama: '250 gr.', fiyat: '6.50 lv', resim: 'potatoes.jpg' },
          { isim: 'Chips', aciklama: '200 gr.', fiyat: '7 lv', resim: 'Chips.jpg' },
          { isim: 'Chips + cheese', aciklama: '250 gr.', fiyat: '7.80 lv', resim: 'Chips.jpg' },
          { isim: 'Grandmas potatoes', aciklama: '200 gr.', fiyat: '6.50 lv', resim: 'grandmas-potatoes.jpg' },
          { isim: 'Sweet potatoes with parmesan', aciklama: '200 gr.', fiyat: '8.50 lv', resim: 'sweet-potatoes.jpg' },
          { isim: 'French fries', aciklama: '200 gr.', fiyat: '5.50 lv', resim: 'french-fries.jpg' },
          { isim: 'French fries + cheese', aciklama: '250 gr.', fiyat: '6.80 lv', resim: 'french-fries.jpg' },
          { isim: 'Chicken livers with onions and mushrooms', aciklama: '250 gr.', fiyat: '9.50 lv', resim: 'livers.jpeg' },
        ],
        drinks: [
          { isim: 'Coffe "Lavazza"', aciklama: '50 ml.', fiyat: '2.50 lv' },
          { isim: 'Coffe "Lavazza" decaffeinated', aciklama: '50 ml.', fiyat: '2.50 lv' },
          { isim: '3 in 1', aciklama: '150 ml.', fiyat: '2.20 lv'},
          { isim: 'Cafe Richard', aciklama: '150 ml.', fiyat: '2.20 lv'},
          { isim: 'Ronnefeldt tea', aciklama: '150 ml.', fiyat: '2.20 lv'},
          { isim: 'Milk with coffee', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Milk with cocoa', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Hot chocolate', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Cappuccino', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Frappe', aciklama: '200 ml.', fiyat: '3.20 lv'},
          { isim: 'Viennese coffee', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Latte', aciklama: '400 ml.', fiyat: '6 lv'},
          { isim: 'Milkshake', aciklama: '400 ml.', fiyat: '6 lv'},
        ],

      },

      bg: {
        salads: [
          { isim: 'Бурата', aciklama: 'микс салати, чери домати, авокадо, бурата, подправки', fiyat: '14 лв', resim: 'salata.jpg' },
          { isim: 'Цезар с пиле', aciklama: 'айсберг, пилешко филе, чери домати, крутони, пармезан, дресинг', fiyat: '12 лв', resim: 'salata.jpg' },
          { isim: 'Ница', aciklama: 'маруля, домати, краставици. риба тон, яйце. пресен лук, маслини', fiyat: '12 лв', resim: 'salata.jpg' },
          { isim: 'Киноа със запечено сирене', aciklama: 'микс салати, домати, краставици, киноа, сирене, дресинг', fiyat: '12 лв', resim: 'salata.jpg' },
          { isim: 'Грицка салата', aciklama: 'домати, краставици, печен пипер сирене, брускета, маслинова паста', fiyat: '11 лв', resim: 'salata.jpg' },
          { isim: 'Традиция', aciklama: 'печен пипер, патладжан домати, сирене', fiyat: '11 лв', resim: 'salata.jpg' },
          { isim: 'Овчарска салата', aciklama: 'домати, краставици, пресен пипер, гъби, шунка, кашкавал, сирене, яйце, маслини', fiyat: '12 лв', resim: 'salata.jpg' },
          { isim: 'Шопска салата', aciklama: 'домати, краставици, пресен пипер, сирене', fiyat: '10 лв', resim: 'salata.jpg' },
          { isim: 'Капрезе', aciklama: 'домати, моцарела, босилково песто', fiyat: '10 лв', resim: 'salata.jpg' }
        ],
        appetizers: [
          { isim: 'Скариди в масло', aciklama: '180 гр.', fiyat: '16 лв', resim: 'shrimp.jpg' },
          { isim: 'Панирани калмари', aciklama: '200 гр.', fiyat: '14 лв', resim: 'squid.jpg' },
          { isim: 'Пилешки хапки с корнфлейкс', aciklama: '250 гр.', fiyat: '12.50 лв', resim: 'nuggets.jpg' },
          { isim: 'Тиквички по гръцки', aciklama: '200 гр.', fiyat: '10.00 лв', resim: 'zucchini.jpg' },
          { isim: 'Топени сиренца с боровинки', aciklama: '250 гр.', fiyat: '10.50 лв', resim: 'cheese.jpeg' },
          { isim: 'Паниран кашкавал', aciklama: '250 гр.', fiyat: '10.50 лв', resim: 'breaded-cheese.jpg' },
          { isim: 'Език в масло', aciklama: '200 гр.', fiyat: '8.50 лв', resim: 'tongue.jpg' },
          { isim: 'Гъби в масло', aciklama: '200 гр.', fiyat: '8.50 лв', resim: 'mushrooms.jpg' },
          { isim: 'Пилешки крилца Терияки', aciklama: '300 гр.', fiyat: '11 лв', resim: 'wings.jpg' },
          { isim: 'Пилешки крилца Бъфало', aciklama: '300 гр.', fiyat: '11 лв', resim: 'wings-buffalo.jpg' },
          { isim: 'Сотирани картофи', aciklama: '250 гр.', fiyat: '6.50 лв', resim: 'potatoes.jpg' },
          { isim: 'Чипс', aciklama: '200 гр.', fiyat: '7 лв', resim: 'Chips.jpg' },
          { isim: 'Чипс + сирене', aciklama: '250 гр.', fiyat: '7.80 лв', resim: 'Chips.jpg' },
          { isim: 'Бабини картофи', aciklama: '200 гр.', fiyat: '6.50 лв', resim: 'grandmas-potatoes.jpg' },
          { isim: 'Сладки картофи с пармезан', aciklama: '200 гр.', fiyat: '8.50 лв', resim: 'sweet-potatoes.jpg' },
          { isim: 'Пържени картофи', aciklama: '200 гр.', fiyat: '5.50 лв', resim: 'french-fries.jpg' },
          { isim: 'Пържени картофи + сирене', aciklama: '250 гр.', fiyat: '6.80 лв', resim: 'french-fries.jpg' },
          { isim: 'Пилешки дробчета с лук и гъби', aciklama: '250 гр.', fiyat: '9.50 лв', resim: 'livers.jpeg' },
        ],
        drinks:[
          { isim: 'Кафе "Лаваца"', aciklama: '50 мл.', fiyat: '2.50 лв'},
          { isim: 'Кафе "Лаваца" без кофеин', aciklama: '50 мл.', fiyat: '2.50 лв'},
          { isim: '3 в 1', aciklama: '150 мл.', fiyat: '2.20 лв'},
          { isim: 'Кафе "Ришар"', aciklama: '150 мл.', fiyat: '2.20 лв'},
          { isim: 'Чай "Ronnefeldt"', aciklama: '150 мл.', fiyat: '2.20 лв'},
          { isim: 'Мляко с нес кафе', aciklama: '150 мл.', fiyat: '3 лв'},
          { isim: 'Мляко с какао', aciklama: '150 мл.', fiyat: '3 лв'},
          { isim: 'Горещ шоколад', aciklama: '150 мл.', fiyat: '3 лв'},
          { isim: 'Капучино', aciklama: '150 мл.', fiyat: '3.50 лв'},
          { isim: 'Фрапе', aciklama: '200 мл.', fiyat: '3.20 лв'},
          { isim: 'Виенско кафе', aciklama: '150 мл.', fiyat: '3.50 лв'},
          { isim: 'Лате', aciklama: '400 мл.', fiyat: '6 лв'},
          { isim: 'Млечен шейк', aciklama: '400 мл.', fiyat: '6 лв'},
        ],

      }


    };
    const listeKategorileri = ['Salatalar', 'Salads', 'Салати', 'icecekler', 'drinks', 'напитки',];
    this.gorunumTipi = listeKategorileri.includes(normalizedSlug) ? 'liste' : 'kart';
    this.urunler = veriKey ? tumUrunler[lang]?.[veriKey] || [] : [];
    console.log('Görünüm tipi:', this.gorunumTipi);
    console.log('Ürünler:', this.urunler);
  }
  
}