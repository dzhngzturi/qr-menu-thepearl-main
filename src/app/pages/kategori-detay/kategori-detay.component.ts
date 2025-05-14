import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../language.service';

interface Urun {
  isim: string;
  aciklama?: string;
  fiyat: string;
  resim?: string;
}

@Component({
  selector: 'app-kategori-detay',
  standalone: true, // EKLENDİ
  imports: [CommonModule], // GEREKLİDİR!
  templateUrl: './kategori-detay.component.html',
  styleUrls: ['./kategori-detay.component.css']
})

export class KategoriDetayComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
  
  kategoriAdi: string = '';
  public gorunumTipi: 'kart' | 'liste' = 'kart';
  public urunler: Urun[] = [];

  constructor(private route: ActivatedRoute, public langService: LanguageService, private location: Location) {}
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


  getWebpResim(dosyaAdi: string): string {
    return dosyaAdi ? dosyaAdi.replace(/\.(jpe?g|png)$/i, '.webp') : '';
  }
  
  

  ngOnInit(): void {

    
    const slug = this.route.snapshot.paramMap.get('id')?.toLowerCase() || '';
    const lang = this.langService.getLanguage();

    const normalize = (value: string) =>
      value.normalize("NFD").replace(/[^\w\s]/g, '').replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o');

    const normalizedSlug = normalize(slug);

    const kategoriSlugMap: Record<string, Record<string, string>> = {
      salatalar: { tr: 'Salatalar', en: 'Salads', bg: 'Салати' }, 
      mezelervebruschettalar: { tr: 'Mezeler ve Bruschettalar', en: 'Appetizers & Bruschettas', bg: 'Разядки и брускети' },
      anayemekler: { tr: 'Ana yemekler', en: 'Main dishes', bg: 'Основни ястия' },
      izgaralar: { tr: 'Izgaralar', en: 'Grill', bg: 'Скара' },
      makarnalar: { tr: 'Risotto ve makarna', en: 'Risotto and pasta', bg: 'Ризото и паста' },
      baslangiclar: { tr: 'Başlangıçlar', en: 'Starters', bg: 'Предястия' },
      burgerlervesandvicler: { tr: 'Burgerler ve sandviçler', en: 'Burgers and sandwiches', bg: 'Бургери и сандвичи' },
      pizzalar: { tr: 'Pizzalar', en: 'Pizzas', bg: 'Пици' },
      icecekler: { tr: 'Sıcak içecekler', en: 'Hot drinks', bg: 'Топли напитки' },
      garniturlervesoslar: { tr: 'Garnitürler ve soslar', en: 'Garnishes and sauces', bg: 'Гарнитури и сосове' },
      aperatiflervekuruyemisler: { tr: 'Aperatifler ve kuruyemişler ', en: 'Appetizers and nuts', bg: 'Мезета и ядки'},
      tatlilar: { tr: 'Tatlılar', en: 'Desserts', bg: 'Десерти' },
      alkolsuzicecekler: {tr: 'Alkolsüz içecekler', en:'Soft drinks', bg: 'Безалкохолни напитки'},
      rakilar: { tr: 'Rakılar', en:'Rakia', bg: 'Ракия'},
      viskiler: { tr: 'Viskiler', en: 'Whiskies', bg: 'Уиски'},
      vodkalar: { tr: 'Vodkalar', en: 'Vodkas', bg: 'Водки'},
      biralar: { tr: 'Biralar', en: 'Beer', bg: 'Бира'},
      alkoholluicecekler: { tr: 'Alkollü içecekler', en: 'Alcohol', bg: 'Алкохол'},
      saraplar: { tr: 'Şaraplar', en: 'Wines', bg: 'Вина'}
    };

    const kategoriKeyMap: Record<string, string> = {
      salatalar: 'salads',
      mezelervebruschettalar: 'appetizersandbruschettas',
      anayemekler: 'main',
      izgaralar: 'grill',
      makarnalar: 'risottoandpasta',
      baslangiclar: 'starters',
      burgerlervesandvicler: 'burgersandsandwiches',
      pizzalar: 'pizzas',
      garniturlervesoslar: 'garnishesandsauces',
      icecekler: 'drinks',
      aperatiflervekuruyemisler: 'аppetizersandnuts',
      tatlilar: 'desserts',
      alkolsuzicecekler: 'softdrinks',
      rakilar: 'rakia',
      viskiler: 'whisky',
      vodkalar: 'vodkas',
      biralar: 'beer',
      alkoholluicecekler: 'alcohol',
      saraplar: 'wine'
    };
    

    this.kategoriAdi = kategoriSlugMap[normalizedSlug]?.[lang] || slug;
    
    const veriKey = kategoriKeyMap[slug] || kategoriKeyMap[normalizedSlug];
    

  
    const tumUrunler: Record<string, Record<string, Urun[]>> = {

      tr: {
        salads: [
          { isim: 'Burrata', aciklama: 'karışık salata, çeri domates, avokado, burrata, baharatlar', fiyat: '15 lv', resim: 'burrata.png' },
          { isim: 'Sezar', aciklama: 'marul, tavuk fileto, kiraz domates, kruton, parmesan, sos', fiyat: '13 lv', resim: 'cezar.png' },
          { isim: 'Nitsa', aciklama: 'marul, tavuk fileto, kiraz domates, kruton, parmesan, sos', fiyat: '13 lv', resim: 'nitsa.png' },
          { isim: 'Fırında peynirli kinoa', aciklama: 'karışık salatalar, domates, salatalık, kinoa, peynir, sos', fiyat: '14 lv', resim: 'kinoa.png' },
          { isim: 'Yunan salatası', aciklama: 'domates, salatalık, közlenmiş biber peyniri, bruschetta, zeytin ezmesi', fiyat: '12 lv', resim: 'greek-salad.png' },
          { isim: 'Gelenek', aciklama: 'közlenmiş biber, patlıcan, domates, peynir', fiyat: '12 lv', resim: 'tradition.png' },
          { isim: 'Çoban salatası', aciklama: 'domates, salatalık, taze biber, mantar, jambon, kaşar, peynir, yumurta, zeytin', fiyat: '13 lv', resim: 'coban.png' },
          { isim: 'Shopska salata', aciklama: 'domates, salatalık, taze biber, peynir', fiyat: '10 lv', resim: 'shopska.png' },
          { isim: 'Kapreze', aciklama: 'domates, mozarella, fesleğen pesto', fiyat: '12 lv', resim: 'kapreze.png' }
        ],
        starters: [
          { isim: 'Yağda karides', aciklama: '180 g.', fiyat: '16 lv', resim: 'shrimp.jpg' },
          { isim: 'Ekmekli kalamar', aciklama: '200 g.', fiyat: '14 lv', resim: 'squid.jpg' },
          { isim: 'Tavuk nugget lı mısır gevreği', aciklama: '250 гр.', fiyat: '12.50 lv', resim: 'nuggets.jpg' },
          { isim: 'Kabak Yunan usulü', aciklama: '200 g.', fiyat: '10 lv', resim: 'zucchini.jpg' },
          { isim: 'Yaban mersinli işlenmiş peynir', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'cheese.jpeg' },
          { isim: 'Ekmekli sarı peynir', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'breaded-cheese.jpg' },
          { isim: 'Tereyağında dil', aciklama: '200 g.', fiyat: '9.50 lv', resim: 'tongue.jpg' },
          { isim: 'Yağda mantar', aciklama: '200 g.', fiyat: '8.50 lv', resim: 'mushrooms.jpg' },
          { isim: 'Teriyaki tavuk kanatları', aciklama: '300 g.', fiyat: '11 lv', resim: 'wings.jpg' },
          { isim: 'Buffalo Tavuk Kanatları', aciklama: '300 g.', fiyat: '11 lv', resim: 'wings-buffalo.jpg' },
          { isim: 'Sotelenmiş patates', aciklama: '250 g.', fiyat: '6.50 lv', resim: 'potatoes.jpg' },
          { isim: 'Cips', aciklama: '200 g.', fiyat: '7 lv', resim: 'Chips.jpg' },
          { isim: 'Cips + peynir', aciklama: '250 g.', fiyat: '7.80 lv', resim: 'Chips.jpg' },
          { isim: 'Anneannenin patatesleri', aciklama: '200 g.', fiyat: '6.50 lv', resim: 'grandmas-potatoes.jpg' },
          { isim: 'Parmesanlı tatlı patates', aciklama: '200 g.', fiyat: '8.50 lv', resim: 'sweet-potatoes.jpg' },
          { isim: 'Patates kızartması', aciklama: '200 g.', fiyat: '5.50 lv', resim: 'french-fries.jpg' },
          { isim: 'Patates kızartması + peynir', aciklama: '250 g.', fiyat: '6.80 lv', resim: 'french-fries.jpg' },
          { isim: 'Soğan ve mantarlı tavuk ciğeri', aciklama: '250 g.', fiyat: '9.50 lv', resim: 'livers.jpeg' },
        ],
        drinks:[
          { isim: 'Kahve "Lavazza"', aciklama: '50 ml.', fiyat: '2.60 lv' },
          { isim: 'Kahve "Lavazza" kafeinsiz', aciklama: '50 ml.', fiyat: '2.60 lv' },
          { isim: '3 in 1', aciklama: '150 ml.', fiyat: '2.50 lv'},
          { isim: 'Cafe Richard', aciklama: '150 ml.', fiyat: '2.50 lv'},
          { isim: 'Ronnefeldt tea', aciklama: '150 ml.', fiyat: '2.50 lv'},
          { isim: 'Milk with coffee', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Milk with cocoa', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Hot chocolate', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Cappuccino', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Frappe', aciklama: '200 ml.', fiyat: '4.50 lv'},
          { isim: 'Viennese coffee', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Latte', aciklama: '400 ml.', fiyat: '6 lv'},
          { isim: 'Milkshake', aciklama: '400 ml.', fiyat: '6 lv'},
        ],
        appetizersandbruschettas: [
          { isim: 'Tarama havyarı', aciklama: '150 g.', fiyat: '8.50 lv'},
          { isim: 'Közlenmiş Biberli katık', aciklama: '150 g.', fiyat: '7.50 lv'},
          { isim: 'Dzaziki /variation/', aciklama: '150 g.', fiyat: '7.50 lv'},
          { isim: 'Bruschetta', aciklama: 'krem peynir ve prosciutto, tarama, zeytin ezmesi 150g', fiyat: '7.50 lv'},

        ],
        risottoandpasta: [
          { isim: 'Risotto Giorgino', aciklama:'arborio pirinci, tavuk, yeşil ve kırmızı biber, kabak, havuç, parmesan, baharatlar 370 g.', fiyat: '14 lv'},
          { isim: 'Yabani mantarlı risotto', aciklama:'arborio pirinci, porçini mantarı, mantar, parmesan, baharatlar 370 g.', fiyat: '13 lv'},
          { isim: 'Tagliatelle "Bolognese"', aciklama:'kıyma, soğan, havuç, domates sosu, parmesan, baharatlar 350 g.', fiyat: '13 lv'},
          { isim: 'Tagalli "Carbonara"', aciklama:'pastırma, yumurta, yemeklik krema, parmesan 350g.', fiyat: '12 lv'},
          { isim: 'Tagliatelle "Arabiata"', aciklama:'soğan, sarımsak, acı biber, domates sosu, parmesan, baharatlar 350g.', fiyat: '11 lv'},
        ],
        main: [
          { isim: 'Scaloppini', aciklama: 'domuz eti, salata, parmesan sepeti, sos, baharat 350g', fiyat: '15.50 lv', resim:'skalopini.png'},
          { isim: 'Rokfor', aciklama: 'tavuk, brokoli, mavi peynir, pişirme kreması, baharat 350g', fiyat: '15 lv', resim:'rokfor.png'},
          { isim: 'tikka masala', aciklama: 'tavuk, domates sosu, pirinç, tortilla, soğan, baharat 400g', fiyat: '15 lv', resim:'tika-masala.png'},
          { isim: 'Tavuk Julien', aciklama: 'tavuk, soğan, pastırma, turşu, mantar, pişirme kreması, peynir, baharat 400g', fiyat: '14 lv', resim:'julien.png'},
          { isim: 'Fahita', aciklama: 'tavuk, yeşil ve kırmızı biber, soğan, cips, tortilla, baharat 350g', fiyat: '14.50 lv', resim:'fahita.png'},
          { isim: 'Tavuk Teriyaki', aciklama: 'tavuk, yeşil ve kırmızı biber, kabak, havuç, baharatlar, pirinç 350g', fiyat: '15.50 lv', resim:'teriaki.png'},
          { isim: 'Viyana şinitzel', aciklama: '350g', fiyat: '15 lv', resim:'shnitzel-viensko.png'},
          { isim: 'Çıtır tavuk şinitzel', aciklama: '350g.', fiyat: '14 lv', resim:'shnitzel.png'},
        ],
        grill: [
          { isim: 'Kaburga "Perla"', aciklama: '300g', fiyat: '13 lv'},
          { isim: 'Domuz boyun filetosu', aciklama: '250g', fiyat: '12 lv'},
          { isim: 'Sucuk tarağı', aciklama: '250g.', fiyat: '12 lv'},
          { isim: 'Tavuk biftek', aciklama: '250g.', fiyat: '10 lv'},
          { isim: 'Domuz şiş', aciklama: '130g.', fiyat: '3.50 lv'},
          { isim: 'Tavuk şiş', aciklama: '130g.', fiyat: '3.50 lv'},
          { isim: 'Köfte', aciklama: '100g', fiyat: '2.50 lv'},
          { isim: 'Kebap', aciklama: '100g', fiyat: '2.50 lv'}
        ],
        burgersandsandwiches: [
          {isim: 'Dana burger', aciklama: 'dana köfte, marul, domates, turşu, çedar peyniri, soğan, sos, ekmek, patates kızartması 350g.', fiyat: '13 lv', resim:'beef-burger.png'},
          { isim: 'Çıtır tavuk burger', aciklama: 'tavuk fileto, marul, turşu, çedar peyniri, soğan, sos, ekmek, patates kızartması 350g.', fiyat: '12 lv', resim:'chicken-burger.png'},
          { isim: 'Domuz burger', aciklama: 'Domuz köftesi, marul, domates, turşu, çedar peyniri, soğan, sos, ekmek, patates kızartması 350g.', fiyat: '12 lv', resim:'pork-burger.png'},
          { isim: 'Tavuk Quesadiya', aciklama: 'tavuk fileto, taze biber, taze soğan, domates, mozzarella, tortilla, baharatlı sos, baharatlar 350g.', fiyat: '12 lv', resim:'kesadiya.png'},
          { isim: 'Club sandviç', aciklama: 'jambon, pastırma, yumurta, marul, domates, sos, tost ekmeği 350g.', fiyat: '11 lv', resim:'club-sandvich.png'},
          { isim: 'Sandviç', aciklama: 'jambon ve peynir', fiyat: '6.50 lv', resim:'sandvich.png'},
        ],
        pizzas:[
          { isim: 'margarita', aciklama: 'domates sosu, peynir 30 cm.', fiyat: '10 lv', resim:'margarita.png'},
          { isim: 'davinchi', aciklama: 'domates sosu, peynir, domates, mısır, taze biber 30 cm.', fiyat: '11 lv', resim:'davinchi.png'},
          { isim: 'Bolonez', aciklama: 'domates sosu, peynir, kıyılmış peynir, soğan, taze domates, kekik 30 cm.', fiyat: '13 lv', resim:'Bolognese.png'},
          { isim: 'Tavuk-Kiev', aciklama: 'domates sos, peynir, tavuk, soğan, mısır, mantar 30 cm.', fiyat: '13 lv', resim:'Chicken-Kiev.png'},
          { isim: 'Peperoni', aciklama: 'domates sosu, peynir, speck salam, biber 30 cm.', fiyat: '13 lv', resim:'Peperoni.png'},
          { isim: 'Meksika', aciklama: 'domates sosu, peynir, speck salam, soğan, biber, chilli 30 cm.', fiyat: '13 lv', resim:'Mexiciana.png'},
          { isim: 'Toscana', aciklama: 'domates sosu, peynir, prosciutto, jambon, biber, mısır, zeytin 30 cm.', fiyat: '14 lv', resim:'Toskana.png'},
          { isim: 'Perla pizza', aciklama: 'domates sos, peynir, tavuk, speck salam, mısır, zeytin 30 cm.', fiyat: '14 lv', resim:'Pearl.png'},
          { isim: 'Ton balığı', aciklama: 'domates sosu, peynir, ton balığı, mısır, soğan 30 cm.', fiyat: '14 lv', resim:'Tuna.png'},
          { isim: 'Caprichosa', aciklama: 'domates sosu, peynir, jambon, pastırma, soğan, zeytin 30 cm.', fiyat: '14 lv', resim:'Kaprichosa.png'},
        ],
        garnishesandsauces:[
          { isim: 'Domates', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'Salatalık', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'Kızarmış patates', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'Pirinç', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'Mantar sosu', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Sarımsak sosu', aciklama: '100 ml.', fiyat: '1,50 lv'},
          { isim: 'Chippy sos', aciklama: '100 ml.', fiyat: '1,50 lv'},
          { isim: 'Barbekü sosu', aciklama: '100 ml.', fiyat: '1,50 lv'},
          { isim: 'Mayonez', aciklama: '100 ml.', fiyat: '1,50 lv'},
          { isim: 'Ketçap', aciklama: '100 ml.', fiyat: '1,50 lv'},
        ],
        аppetizersandnuts: [
          { isim: 'Fule “Elena”', aciklama: '100 g.', fiyat: '13 lv'},
          { isim: 'Pastırma', aciklama: '100 g.', fiyat: '13 lv'},
          { isim: 'Sucuk', aciklama: '100 g.', fiyat: '11 lv'},
          { isim: 'Peynir', aciklama: '100 g.', fiyat: '7 lv'},
          { isim: 'Kaşar', aciklama: '100 g.', fiyat: '6 lv'},
          { isim: 'Badem', aciklama: '100 g.', fiyat: '7.80 lv'},
          { isim: 'Kaju', aciklama: '100 g.', fiyat: '7.80 lv'},
          { isim: 'Fıstık', aciklama: '100 g.', fiyat: '5 lv'},

        ],
        desserts: [
          { isim: 'Çikolatalı sufle', fiyat: '8,50 lv', resim: 'sufle.png'},
          { isim: 'Melba', fiyat: '10 lv', resim: 'melba.png'},
          { isim: 'Dondurma', fiyat: '6.50 lv', resim: 'icecream.png'},
          { isim: 'Pancake tercihe görme', fiyat: '6 lv', resim: 'pancake.png'},
        ],
        softdrinks: [
          { isim: 'Cola, Fanta, Sprite, Schweps', aciklama: '250 ml.', fiyat: '3.20 lv'},
          { isim: 'Schweps Soda', aciklama: '250 ml.', fiyat: '2.60 lv'},
          { isim: 'Cappy', aciklama: '250 ml.', fiyat: '3.40 lv'},
          { isim: 'Buzlu çay', aciklama: '250 ml.', fiyat: '3.20 lv'},
          { isim: 'Maden suyu', aciklama: '330 ml.', fiyat: '2 lv'},
          { isim: 'Maden suyu', aciklama: '1000 ml.', fiyat: '3,20 lv'},
          { isim: 'Ayran', aciklama: '250 ml.', fiyat: '2.50 lv'},
          { isim: 'Ayran', aciklama: '1000 ml.', fiyat: '7 lv'},
          { isim: 'Red Bull', aciklama: '250 ml.', fiyat: '5.50 lv'},
          { isim: 'Fresh', aciklama: '250 ml.', fiyat: '6 lv'},
          { isim: 'Limonata', aciklama: '400 ml.', fiyat: '...lv'},
        ],
        rakia: [
          { isim: 'Burgaz Muskatova', aciklama: '50 ml.', fiyat: '2.80 lv'},
          { isim: 'Straldzhanska', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Burgaz 63', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Burgasz 63 Fıçı', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Troyanska Kaysı rakısı', aciklama: '50 ml.', fiyat: '3.50 lv'},
        ],
        whisky: [
          { isim: 'Jonnie Walker', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Jonnie Walker black label', aciklama: '50 ml.', fiyat: '7.40 lv'},
          { isim: 'Jonnie Walker yellow label', aciklama: '50 ml.', fiyat: '14 lv'},
          { isim: 'Bushmills', aciklama: '50 ml.', fiyat: '4.40 lv'},
          { isim: 'Jameson', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Tulamore du', aciklama: '50 ml.', fiyat: '4.40 lv'},
          { isim: 'Jim Beam', aciklama: '50 ml.', fiyat: '4.40 lv'},
          { isim: 'Jack Daniels', aciklama: '50 ml.', fiyat: '6.20 lv'},
          { isim: 'Jack Daniels single barrel', aciklama: '50 ml.', fiyat: '12 lv'},
          { isim: 'Chivas Regal 12 g.', aciklama: '50 ml.', fiyat: '7.40 lv'},
          { isim: 'Glenfidich 12 g.', aciklama: '50 ml.', fiyat: '9 lv'},
          { isim: 'Dumpling 15 g.', aciklama: '50 ml.', fiyat: '9 lv'},
        ],
        vodkas: [
          {isim:'Savoy', aciklama:'50 ml.', fiyat:'3 lv'},
          {isim: 'Absolut', aciklama: '50 ml.', fiyat:'4 lv'},
          {isim: 'Rus Standardı', aciklama: '50 ml.', fiyat:'4 lv'},
          {isim: 'Finlandiya', aciklama: '50 ml.', fiyat:'4 lv'},
          {isim: 'Belvedere', aciklama: '50 ml.', fiyat: '9 lv'},
          {isim: 'Beluta', aciklama: '50 ml.', fiyat: '9 lv'},
          {isim: 'Greygus', aciklama: '50 ml.', fiyat:'9 lv'},
        ],
        beer: [
          { isim: 'Shumensko pivo', aciklama: '500 ml.', fiyat: '3.50 lv'},
          { isim: 'Shumensko pivo', aciklama: '330 ml.', fiyat: '2.50 lv'},
          { isim: 'Pirinsko', aciklama: '500 ml.', fiyat: '3.50 lv'},
          { isim: 'Tuborg', aciklama: '500 ml.', fiyat: '3.50 lv'},
          { isim: 'Karlsberg', aciklama: '500 ml.', fiyat: '4 lv'},
          { isim: 'Budweiser', aciklama: '500 ml.', fiyat: '4 lv'},
          { isim: 'Corona', aciklama: '330 ml.', fiyat: '5 lv'},
          { isim: 'Leffe', aciklama: '330 ml.', fiyat: '6 lv'},
          { isim: 'Guinness', aciklama: '440 ml.', fiyat: '8 lv'},
          { isim: 'Radeberger', aciklama: '330 ml.', fiyat: '5 lv'},
          { isim: 'Hugarden', aciklama: '330 ml.', fiyat: '6 lv'},
          { isim: 'Summersby', aciklama: '330 ml.', fiyat: '3.50 lv'},
        ],
        alcohol: [
          { isim: 'Martini Bianco', aciklama: '50 ml.', fiyat: '2.50 lv'},
          { isim: 'Gin Beefeater', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Bombay Gin', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Gin Savoy', aciklama: '50 ml.', fiyat: '2.80 lv'},
          { isim: 'Konyak Pliska', aciklama: '50 ml.', fiyat: '3 lv'},
          { isim: 'Konyak Hennessy Special', aciklama: '50 ml.', fiyat: '9 lv'},
          { isim: 'Baileys', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Captain Morgan Dark Rom', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Captain Morgan rum spice', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Rum Bacardi', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Ouzo Plomari', aciklama: '200 ml.', fiyat: '15 lv'},
          { isim: 'Yeni Rakı', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Yegermeister', aciklama: '25 ml.', fiyat: '2 lv'},
          { isim: 'Tequila José Cervo', aciklama: '25 ml.', fiyat: '2.50 lv'},
          { isim: 'Tequila José Cervo Gold', aciklama: '25 ml.', fiyat: '3 lv'},
          { isim: 'Aftershock', aciklama: '25 ml.', fiyat: '3 lv'},
        ],
        wine: [
          { isim: 'Muscat ve Chardonnay', aciklama: 'Starosel 750 ml.', fiyat: '27 lv'},
          { isim: 'Savinjon Blanc', aciklama: 'Contemplation 750 ml.', fiyat: '26 lv'},
          { isim: 'La Blanc', aciklama: 'Katarhina Estate 750 ml.', fiyat: '35 lv'},
          { isim: 'La Rose', aciklama: 'Katarhina Estate 750 ml.', fiyat: '35 lv'},
          { isim: 'Silver Endhal', aciklama: 'Midallidare 750 ml.', fiyat: '28 lv'},
          { isim: 'Savignon Blanc', aciklama: 'Saikl 750 ml.', fiyat: '18 lv'},
          { isim: 'Savignon Blanc', aciklama: 'Nelson Cliff 750 ml.', fiyat: '35 lv'},
          { isim: 'Savignon Blanc', aciklama: 'Rongopay 750 ml.', fiyat: '36 lv'},
          { isim: 'Cabernet', aciklama: 'Pentagram 750 ml.', fiyat: '18 lv'},
          { isim: 'Merlot', aciklama: 'Pentagram 750 ml.', fiyat: '18 lv'},
          { isim: 'Syrah', aciklama: 'Pentagram 750 ml.', fiyat: '18 lv'},
          { isim: 'Moët & Chandon', aciklama: 'Köpüklü şaraplar 750 ml.', fiyat: '160 lv'},
          { isim: 'Merlot', aciklama: 'Starosel 750 ml.', fiyat: '27 lv'},
          { isim: 'Merlot ve Malbec', aciklama: 'Contemplation 750 ml.', fiyat: '26 lv'},
          { isim: 'Cabernet Sauvignon', aciklama: 'Midalidare 750 ml.', fiyat: '28 lv'},
          { isim: 'Cabernet Franc', aciklama: 'Sykle 750 ml.', fiyat: '18 lv'},
          { isim: 'Sauvignon Blanc', aciklama: 'Pomorie Şaraphanesi Şarap<br>1000/750 ml.', fiyat: '18/20 lv'},
          { isim: 'Syrah', aciklama: 'Pomorie Şaraphanesi şarap<br>1000/750 ml.', fiyat: '18/20 lv'},
          { isim: 'Rose', aciklama: 'Pomorie Winery bulk wine<br>1000/750 ml', fiyat: '18/20 lv'},
          { isim: 'Glass of wine', aciklama: 'Pomorie Winery bulk wine 250 ml', fiyat: '5 lv'},
        ]
        },
      en: {
        salads: [
          { isim: 'Burrata', aciklama: 'salad mix, cherry tomatoes, avocado, burrata, spices', fiyat: '15 lv', resim: 'burrata.png' },
          { isim: 'Caesar', aciklama: 'iceberg, chicken fillet, cherry tomatoes, croutons, parmesan, dressing', fiyat: '13 lv', resim: 'cezar.png' },
          { isim: 'Nitsa', aciklama: 'lettuce, tomatoes, cucumbers. tuna, egg. fresh onion, olives', fiyat: '13 lv', resim: 'nitsa.png' },
          { isim: 'Quinoa with baked cheese', aciklama: 'mixed salads, tomatoes, cucumbers, quinoa, cheese, dressing', fiyat: '14 lv', resim: 'kinoa.png' },
          { isim: 'Greek salad', aciklama: 'tomatoes, cucumbers, roasted pepper cheese, bruschetta, olive paste', fiyat: '12 lv', resim: 'greek-salad.png' },
          { isim: 'Tradition', aciklama: 'roasted pepper, eggplant, tomatoes, cheese', fiyat: '12 lv', resim: 'tradition.png' },
          { isim: 'Shepherds salad', aciklama: 'tomatoes, cucumbers, fresh pepper, mushrooms, ham, yellow cheese, cheese, egg, olives', fiyat: '13 lv', resim: 'coban.png' },
          { isim: 'Shopska salad', aciklama: 'tomatoes, cucumbers, fresh pepper, cheese', fiyat: '10 lv', resim: 'shopska.png' },
          { isim: 'Caprese', aciklama: 'tomatoes, mozzarella, basil pesto', fiyat: '12 lv', resim: 'kapreze.png' }
        ],
        starters: [
          { isim: 'Shrimp in oil', aciklama: '180 g.', fiyat: '16 lv', resim: 'shrimp.jpg' },
          { isim: 'Breaded squid', aciklama: '200 g.', fiyat: '14 lv', resim: 'squid.jpg' },
          { isim: 'Chicken nuggets with cornflakes', aciklama: '250 g.', fiyat: '12.50 lv', resim: 'nuggets.jpg' },
          { isim: 'Zucchini Greek style', aciklama: '200 g.', fiyat: '10 lv', resim: 'zucchini.jpg' },
          { isim: 'Processed cheese with blueberries', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'cheese.jpeg' },
          { isim: 'Breaded yellow cheese', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'breaded-cheese.jpg' },
          { isim: 'Tongue in butter', aciklama: '200 g.', fiyat: '9.50 lv', resim: 'tongue.jpg' },
          { isim: 'Mushrooms in oil', aciklama: '200 g.', fiyat: '8.50 lv', resim: 'mushrooms.jpg' },
          { isim: 'Chicken wings Teriyaki', aciklama: '300 g.', fiyat: '11 lv', resim: 'wings.jpg' },
          { isim: 'Chicken wings Buffalo', aciklama: '300 g.', fiyat: '11 lv', resim: 'wings-buffalo.jpg' },
          { isim: 'Sautéed potatoes', aciklama: '250 g.', fiyat: '6.50 lv', resim: 'potatoes.jpg' },
          { isim: 'Chips', aciklama: '200 g.', fiyat: '7 lv', resim: 'Chips.jpg' },
          { isim: 'Chips + cheese', aciklama: '250 g.', fiyat: '7.80 lv', resim: 'Chips.jpg' },
          { isim: 'Grandmas potatoes', aciklama: '200 g.', fiyat: '6.50 lv', resim: 'grandmas-potatoes.jpg' },
          { isim: 'Sweet potatoes with parmesan', aciklama: '200 g.', fiyat: '8.50 lv', resim: 'sweet-potatoes.jpg' },
          { isim: 'French fries', aciklama: '200 g.', fiyat: '5.50 lv', resim: 'french-fries.jpg' },
          { isim: 'French fries + cheese', aciklama: '250 g.', fiyat: '6.80 lv', resim: 'french-fries.jpg' },
          { isim: 'Chicken livers with onions and mushrooms', aciklama: '250 g.', fiyat: '9.50 lv', resim: 'livers.jpeg' },
        ],
        drinks: [
          { isim: 'Coffe "Lavazza"', aciklama: '50 ml.', fiyat: '2.60 lv' },
          { isim: 'Coffe "Lavazza" decaffeinated', aciklama: '50 ml.', fiyat: '2.60 lv' },
          { isim: '3 in 1', aciklama: '150 ml.', fiyat: '2.50 lv'},
          { isim: 'Cafe Richard', aciklama: '150 ml.', fiyat: '2.50 lv'},
          { isim: 'Ronnefeldt tea', aciklama: '150 ml.', fiyat: '2.50 lv'},
          { isim: 'Milk with coffee', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Milk with cocoa', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Hot chocolate', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Cappuccino', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Frappe', aciklama: '200 ml.', fiyat: '4.50 lv'},
          { isim: 'Viennese coffee', aciklama: '150 ml.', fiyat: '3.50 lv'},
          { isim: 'Latte', aciklama: '400 ml.', fiyat: '6 lv'},
          { isim: 'Milkshake', aciklama: '400 ml.', fiyat: '6 lv'},
        ],
        appetizersandbruschettas: [
          { isim: 'Tarama caviar', aciklama: '150 g.', fiyat: '8.50 lv'},
          { isim: 'Roasted Pepper Cake', aciklama: '150 g.', fiyat: '7.50 lv'},
          { isim: 'Dzaziki /variation/', aciklama: '150 g.', fiyat: '7.50 lv'},
          { isim: 'Bruschetta', aciklama: 'cream cheese and prosciutto, tarama, olive paste 150g', fiyat: '7.50 lv'},
        ],
        risottoandpasta: [
          { isim: 'Risotto Giorgio', aciklama: 'arborio rice, chicken, green and red pepper, zucchini, carrots, parmesan, spices 370 g.', fiyat: '14 lv'},
          { isim: 'Risotto with wild mushrooms', aciklama: 'arborio rice, porcini mushrooms, mushrooms, parmesan, spices 370 g.', fiyat: '13 lv'},
          { isim: 'Taliatele "Bolognese"', aciklama: 'minced beef, onion, carrots, tomato sauce, parmesan, spices 350 g.', fiyat: '13 lv'},
          { isim: 'Taliatele "Carbonara"', aciklama: 'bacon, egg, cooking cream, parmesan 350 g.', fiyat: '12 lv'},
          { isim: 'Taliatele "Arabiata"', aciklama: 'onion, garlic, chili peppers, tomato sauce, parmesan, spices 350g.', fiyat: '11 lv'},
        ],
        main: [
          { isim: 'Scaloppini', aciklama: 'pork, salads, parmesan basket, sauce, spices 350g', fiyat: '15.50 lv', resim:'skalopini.png'},
          { isim: 'Roquefort', aciklama: 'chicken, broccoli, blue cheese, cooking cream, spices 350g', fiyat: '15 lv', resim:'rokfor.png'},
          { isim: 'tikka masala', aciklama: 'chicken, tomato sauce, rice, tortilla, onion, spices 400g', fiyat: '15 lv', resim:'tika-masala.png'},
          { isim: 'Chicken Julien', aciklama: 'chicken, onion, bacon, pickles, mushrooms, cooking cream, cheese, spices 400g', fiyat: '14 lv', resim:'julien.png'},
          { isim: 'Fahita', aciklama: 'chicken, green and red pepper, onion, chips, tortilla, spices 350g', fiyat: '14.50 lv', resim:'fahita.png'},
          { isim: 'Chicken Teriyaki', aciklama: 'chicken, green and red pepper, zucchini, carrots, spices, rice 350g', fiyat: '15.50 lv', resim:'teriaki.png'},
          { isim: 'Wiener schnitzel', aciklama: '350g', fiyat: '15 lv', resim:'shnitzel-viensko.png'},
          { isim: 'Crispy chicken schnitzel', aciklama: '350g.', fiyat: '14 lv', resim:'shnitzel.png'},
        ],
        grill: [
          { isim: 'Perla ribs', aciklama: '300g', fiyat: '13 lv'},
          { isim: 'Pork neck fillet', aciklama: '250g', fiyat: '12 lv'},
          { isim: 'Sujuk comb', aciklama: '250g.', fiyat: '12 lv'},
          { isim: 'Chicken steak', aciklama: '250g.', fiyat: '10 lv'},
          { isim: 'Pork skewer', aciklama: '130g.', fiyat: '3.50 lv'},
          { isim: 'Chicken skewer', aciklama: '130g.', fiyat: '3.50 lv'},
          { isim: 'Kofte', aciklama: '100g', fiyat: '2.50 lv'},
          { isim: 'Kebab', aciklama: '100g', fiyat: '2.50 lv'}
        ],
        burgersandsandwiches: [
          { isim: 'Beef burger', aciklama: 'beef meatball, lettuce, tomatoes, pickles, cheddar cheese, onion, sauce, bun, fries 350g.', fiyat: '13 lv', resim:'beef-burger.png'},
          { isim: 'Crispy chicken burger', aciklama: 'chicken fillet, lettuce, pickles, cheddar cheese, onion, sauce, bun, fries 350g.', fiyat: '12 lv', resim:'chicken-burger.png'},
          { isim: 'Pork burger', aciklama: 'pork meatball, lettuce, tomatoes, pickles, cheddar cheese, onion, sauce, bun, fries 350g.', fiyat: '12 lv', resim:'pork-burger.png'},
          { isim: 'Chicken Quesadilla', aciklama: 'chicken fillet, fresh pepper, fresh onion, tomatoes, mozzarella, tortilla, spicy sauce, spices 350g.', fiyat: '12 lv', resim:'kesadiya.png'},
          { isim: 'Club sandwich', aciklama: 'ham, bacon, egg, lettuce, tomato, sauce, toaster bread 350g.', fiyat: '11 lv', resim:'club-sandvich.png'},
          { isim: 'Sandwich', aciklama: 'ham and yellow cheese', fiyat: '6.50 lv', resim:'sandvich.png'},
        ],
        pizzas: [
          { isim: 'margarita', aciklama: 'tomato sauce, cheese 30 cm.', fiyat: '10 lv', resim:'margarita.png'},
          { isim: 'davinchi', aciklama: 'tomato sauce, cheese, tomatoes, corn, fresh pepper 30 cm.', fiyat: '11 lv', resim:'davinchi.png'},
          { isim: 'Bolognese', aciklama: 'tomato sauce, cheese, minced cheese, onion, fresh tomatoes, oregano 30 cm.', fiyat: '13 lv', resim:'Bolognese.png'},
          { isim: 'Chicken-Kiev', aciklama: 'tomato sauce, cheese, chicken, onion, corn, mushrooms 30 cm.', fiyat: '13 lv', resim:'Chicken-Kiev.png'},
          { isim: 'Peperoni', aciklama: 'tomato sauce, cheese, speck salami, chilli 30 cm.', fiyat: '13 lv', resim:'Peperoni.png'},
          { isim: 'Mexican', aciklama: 'tomato sauce, cheese, speck salami, onion, pepper, chilli 30 cm.', fiyat: '13 lv', resim:'Mexiciana.png'},
          { isim: 'Toscana', aciklama: 'tomato sauce, cheese, prosciutto, ham, pepper, corn, olives 30 cm.', fiyat: '14 lv', resim:'Toskana.png'},
          { isim: 'Pearl pizza', aciklama: 'tomato sauce, cheese, chicken, speck salami, corn, olives 30 cm.', fiyat: '14 lv', resim:'Pearl.png'},
          { isim: 'Tuna', aciklama: 'tomato sauce, cheese, tuna, corn, onion 30 cm.', fiyat: '14 lv', resim:'Tuna.png'},
          { isim: 'Caprichosa', aciklama: 'tomato sauce, cheese, ham, bacon, onion, olives 30 cm.', fiyat: '14 lv', resim:'Kaprichosa.png'},
        ],
        garnishesandsauces:[
          { isim: 'Tomatoes', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'Cucumbers', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'French fries', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'Rice', aciklama: '150 g.', fiyat: '2.50 lv'},
          { isim: 'Mushroom sauce', aciklama: '150 ml.', fiyat: '3 lv'},
          { isim: 'Garlic sauce', aciklama: '100 ml.', fiyat: '1.50 lv'},
          { isim: 'Chippy sauce', aciklama: '100 ml.', fiyat: '1.50 lv'},
          { isim: 'BBQ sauce', aciklama: '100 ml.', fiyat: '1.50 lv'},
          { isim: 'Mayonnaise', aciklama: '100 ml.', fiyat: '1.50 lv'},
          { isim: 'Ketchup', aciklama: '100 ml.', fiyat: '1.50 lv'},
        ],
        аppetizersandnuts: [
          { isim: 'Fule "Elena"', aciklama: '100 g.', fiyat: '13 lv'},
          { isim: 'Pastrami', aciklama: '100 g.', fiyat: '13 lv'},
          { isim: 'Sujuk', aciklama: '100 g.', fiyat: '11 lv'},
          { isim: 'Yellow Cheese', aciklama: '100 g.', fiyat: '7 lv'},
          { isim: 'Cheese', aciklama: '100 g.', fiyat: '6 lv'},
          { isim: 'Almonds', aciklama: '100 g.', fiyat: '7.80 lv'},
          { isim: 'Cashews', aciklama: '100 g.', fiyat: '7.80 lv'},
          { isim: 'Peanuts', aciklama: '100 g.', fiyat: '5 lv'},
        ],
        desserts: [
          { isim: 'Chocolate soufflé', fiyat: '8.50 lv', resim: 'sufle.png'},
          { isim: 'Melba', fiyat: '10 lv', resim: 'melba.png'},
          { isim: 'Ice cream', fiyat: '6.50 lv', resim: 'icecream.png'},
          { isim: 'Pancake of choice', fiyat: '6 lv', resim: 'pancake.png'},
        ],
        softdrinks: [
          { isim: 'Cola, Fanta, Sprite, Schweps', aciklama: '250 ml.', fiyat: '3.20 lv'},
          { isim: 'Schweps Soda', aciklama: '250 ml.', fiyat: '2.60 lv'},
          { isim: 'Cappy', aciklama: '250 ml.', fiyat: '3.40 lv'},
          { isim: 'Iced tea', aciklama: '250 ml.', fiyat: '3.20 lv'},
          { isim: 'Mineral water', aciklama: '330 ml.', fiyat: '2 lv'},
          { isim: 'Mineral water', aciklama: '1000 ml.', fiyat: '3.20 lv'},
          { isim: 'Ayrian', aciklama: '250 ml.', fiyat: '2.50 lv'},
          { isim: 'Ayrian', aciklama: '1000 ml.', fiyat: '7 lv'},
          { isim: 'Red Bull', aciklama: '250 ml.', fiyat: '5.50 lv'},
          { isim: 'Fresh', aciklama: '250 ml.', fiyat: '6.80 lv'},
          { isim: 'Lemonade', aciklama: '400 ml.', fiyat: '...lv'},
        ],
        rakia: [
          { isim: 'Burgas Muscat', aciklama: '50 ml.', fiyat: '2.80 lv'},
          { isim: 'Straljanska', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Burgas 63', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Burgas 63 Barrel', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Trojan Apricot', aciklama: '50 ml.', fiyat: '3.50 lv'},
        ],
        whisky: [
          { isim: 'Jonnie Walker', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Jonnie Walker black label', aciklama: '50 ml.', fiyat: '7.40 lv'},
          { isim: 'Jonnie Walker yellow label', aciklama: '50 ml.', fiyat: '14 lv'},
          { isim: 'Bushmills', aciklama: '50 ml.', fiyat: '4.40 lv'},
          { isim: 'Jameson', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Tulamore du', aciklama: '50 ml.', fiyat: '4.40 lv'},
          { isim: 'Jim Beam', aciklama: '50 ml.', fiyat: '4.40 lv'},
          { isim: 'Jack Daniels', aciklama: '50 ml.', fiyat: '6.20 lv'},
          { isim: 'Jack Daniels single barrel', aciklama: '50 ml.', fiyat: '12 lv'},
          { isim: 'Chivas Regal 12 g.', aciklama: '50 ml.', fiyat: '7.40 lv'},
          { isim: 'Glenfidich 12 g.', aciklama: '50 ml.', fiyat: '9 lv'},
          { isim: 'Dumpling 15 g.', aciklama: '50 ml.', fiyat: '9 lv'},
        ],
        vodkas: [
          {isim:'Savoy', aciklama:'50 ml.', fiyat:'3 lv'},
          {isim: 'Absolut', aciklama: '50 ml.', fiyat:'4 lv'},
          {isim: 'Russian Standard', aciklama: '50 ml.', fiyat:'4 lv'},
          {isim: 'Finland', aciklama: '50 ml.', fiyat:'4 lv'},
          {isim: 'Belvedere', aciklama: '50 ml.', fiyat:'9 lv'},
          {isim: 'Beluta', aciklama: '50 ml.', fiyat:'9 lv'},
          {isim: 'Greygus', aciklama: '50 ml.', fiyat:'9 lv'},
        ],
        beer: [
          { isim: 'Shumensko pivo', aciklama: '500 ml.', fiyat: '3.50 lv'},
          { isim: 'Shumensko pivo', aciklama: '330 ml.', fiyat: '2.50 lv'},
          { isim: 'Pirinsko', aciklama: '500 ml.', fiyat: '3.50 lv'},
          { isim: 'Tuborg', aciklama: '500 ml.', fiyat: '3.50 lv'},
          { isim: 'Karlsberg', aciklama: '500 ml.', fiyat: '4 lv'},
          { isim: 'Budweiser', aciklama: '500 ml.', fiyat: '4 lv'},
          { isim: 'Corona', aciklama: '330 ml.', fiyat: '5 lv'},
          { isim: 'Leffe', aciklama: '330 ml.', fiyat: '6 lv'},
          { isim: 'Guinness', aciklama: '440 ml.', fiyat: '8 lv'},
          { isim: 'Radeberger', aciklama: '330 ml.', fiyat: '5 lv'},
          { isim: 'Hugarden', aciklama: '330 ml.', fiyat: '6 lv'},
          { isim: 'Summersby', aciklama: '330 ml.', fiyat: '3.50 lv'},
        ],
        alcohol: [
          { isim: 'Martini Bianco', aciklama: '50 ml.', fiyat: '2.50 lv'},
          { isim: 'Gin Beefeater', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Bombay Gin', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Gin Savoy', aciklama: '50 ml.', fiyat: '2.80 lv'},
          { isim: 'Cognac Pliska', aciklama: '50 ml.', fiyat: '3 lv'},
          { isim: 'Cognac Hennessy Special', aciklama: '50 ml.', fiyat: '9 lv'},
          { isim: 'Baileys', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Captain Morgan Dark Rum', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Captain Morgan rum spice', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Rum Bacardi', aciklama: '50 ml.', fiyat: '4.50 lv'},
          { isim: 'Ouzo Plomari', aciklama: '200 ml.', fiyat: '15 lv'},
          { isim: 'Yeni Rak', aciklama: '50 ml.', fiyat: '4 lv'},
          { isim: 'Yegermeister', aciklama: '25 ml.', fiyat: '2 lv'},
          { isim: 'Tequila José Cervo', aciklama: '25 ml.', fiyat: '2.50 lv'},
          { isim: 'Tequila José Cervo Gold', aciklama: '25 ml.', fiyat: '3 lv'},
          { isim: 'Aftershock', aciklama: '25 ml.', fiyat: '3 lv'},

        ],
        wine: [
          { isim: 'Muscat and Chardonnay', aciklama: 'Starosel 750 ml', fiyat: '27 lv'},
          { isim: 'Sauvignon Blanc', aciklama: 'Contemplation 750 ml', fiyat: '26 lv'},
          { isim: 'La Blanc', aciklama: 'Catahina Estate 750 ml', fiyat: '35 lv'},
          { isim: 'La Rose', aciklama: 'Catahina Estate 750 ml', fiyat: '35 lv'},
          { isim: 'Silver Endhal', aciklama: 'Midallidare 750 ml', fiyat: '28 lv'},
          { isim: 'Sauvignon Blanc', aciklama: 'Cycle 750 ml', fiyat: '18 lv'},
          { isim: 'Sauvignon Blanc', aciklama: 'Nelson Cliff 750 ml', fiyat: '35 lv'},
          { isim: 'Sauvignon Blanc', aciklama: 'Rongopai 750 ml', fiyat: '36 lv'},
          { isim: 'Cabernet', aciklama: 'Pentagram 750 ml', fiyat: '18 lv'},
          { isim: 'Merlot', aciklama: 'Pentagram 750 ml', fiyat: '18 lv'},
          { isim: 'Syrah', aciklama: 'Pentagram 750 ml', fiyat: '18 lv'},
          { isim: 'Moët & Chandon', aciklama: 'Sparkling wines 750 ml', fiyat: '160 lv'},
          { isim: 'Merlot', aciklama: 'Starosel 750 ml', fiyat: '27 lv'},
          { isim: 'Merlot and Malbec', aciklama: 'Contemplation 750 ml', fiyat: '26 lv'},
          { isim: 'Cabernet Sauvignon', aciklama: 'Midalidare 750 ml', fiyat: '28 lv'},
          { isim: 'Cabernet Franc', aciklama: 'Cycle 750 ml', fiyat: '18 lv'},
          { isim: 'Sauvignon Blanc', aciklama: 'Pomorie Winery bulk wine<br>1000/750 ml', fiyat: '18/20 lv'},
          { isim: 'Syrah', aciklama: 'Pomorie Winery bulk wine<br>1000/750 ml', fiyat: '18/20 lv'},
          { isim: 'Rosé', aciklama: 'Pomorie Winery wine by the glass<br>1000/750 ml', fiyat: '18/20 lv'},
          { isim: 'Glass of wine', aciklama: 'Pomorie Winery wine by the glass 250 ml', fiyat: '5 lv'},

        ]
      },
      bg: {
        salads:[
          { isim: 'Бурата', aciklama: 'микс салати, чери домати, авокадо, бурата, подправки', fiyat: '15 лв', resim: 'burrata.png' },
          { isim: 'Цезар с пиле', aciklama: 'айсберг, пилешко филе, чери домати, крутони, пармезан, дресинг', fiyat: '13 лв', resim: 'cezar.png' },
          { isim: 'Ница', aciklama: 'маруля, домати, краставици. риба тон, яйце. пресен лук, маслини', fiyat: '13 лв', resim: 'nitsa.png' },
          { isim: 'Киноа със запечено сирене', aciklama: 'микс салати, домати, краставици, киноа, сирене, дресинг', fiyat: '14 лв', resim: 'kinoa.png' },
          { isim: 'Гръцка салата', aciklama: 'домати, краставици, печен пипер сирене, брускета, маслинова паста', fiyat: '12 лв', resim: 'greek-salad.png' },
          { isim: 'Традиция', aciklama: 'печен пипер, патладжан домати, сирене', fiyat: '12 лв', resim: 'tradition.png' },
          { isim: 'Овчарска салата', aciklama: 'домати, краставици, пресен пипер, гъби, шунка, кашкавал, сирене, яйце, маслини', fiyat: '13 лв', resim: 'coban.png' },
          { isim: 'Шопска салата', aciklama: 'домати, краставици, пресен пипер, сирене', fiyat: '10 лв', resim: 'shopska.png' },
          { isim: 'Капрезе', aciklama: 'домати, моцарела, босилково песто', fiyat: '12 лв', resim: 'kapreze.png' }
        ],
        starters: [
          { isim: 'Скариди в масло', aciklama: '180 гр.', fiyat: '16 лв', resim: 'shrimp.jpg' },
          { isim: 'Панирани калмари', aciklama: '200 гр.', fiyat: '14 лв', resim: 'squid.jpg' },
          { isim: 'Пилешки хапки с корнфлейкс', aciklama: '250 гр.', fiyat: '12.50 лв', resim: 'nuggets.jpg' },
          { isim: 'Тиквички по гръцки', aciklama: '200 гр.', fiyat: '10.00 лв', resim: 'zucchini.jpg' },
          { isim: 'Топени сиренца с боровинки', aciklama: '250 гр.', fiyat: '10.50 лв', resim: 'cheese.jpeg' },
          { isim: 'Паниран кашкавал', aciklama: '250 гр.', fiyat: '10.50 лв', resim: 'breaded-cheese.jpg' },
          { isim: 'Език в масло', aciklama: '200 гр.', fiyat: '9.50 лв', resim: 'tongue.jpg' },
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
          { isim: 'Кафе "Лаваца"', aciklama: '50 мл.', fiyat: '2.60 лв'},
          { isim: 'Кафе "Лаваца" без кофеин', aciklama: '50 мл.', fiyat: '2.60 лв'},
          { isim: '3 в 1', aciklama: '150 мл.', fiyat: '2.50 лв'},
          { isim: 'Кафе "Ришар"', aciklama: '150 мл.', fiyat: '2.50 лв'},
          { isim: 'Чай "Ronnefeldt"', aciklama: '150 мл.', fiyat: '2.50 лв'},
          { isim: 'Мляко с нес кафе', aciklama: '150 мл.', fiyat: '3 лв'},
          { isim: 'Мляко с какао', aciklama: '150 мл.', fiyat: '3 лв'},
          { isim: 'Горещ шоколад', aciklama: '150 мл.', fiyat: '3 лв'},
          { isim: 'Капучино', aciklama: '150 мл.', fiyat: '3.50 лв'},
          { isim: 'Фрапе', aciklama: '200 мл.', fiyat: '4.50 лв'},
          { isim: 'Виенско кафе', aciklama: '150 мл.', fiyat: '3.50 лв'},
          { isim: 'Лате', aciklama: '400 мл.', fiyat: '6 лв'},
          { isim: 'Млечен шейк', aciklama: '400 мл.', fiyat: '6 лв'},
        ],
        appetizersandbruschettas:[
          { isim: 'Тарама хайвер', aciklama: '150 гр.', fiyat: '8.50 лв'},
          { isim: 'Катък с печен пипер', aciklama: '150 гр.', fiyat: '7.50 лв'},
          { isim: 'Дзадзики /вариация/', aciklama: '150 гр.', fiyat: '7.50 лв'},
          { isim: 'Брускети', aciklama: 'крема сирене и прошуто, тарама, маслинова паста 150гр.', fiyat: '7.50 лв'},
        ],
        risottoandpasta: [
          { isim: 'Ризото Джорджино', aciklama: 'ориз арборио, пилешко месо, зелен и червен пипер, тиквички, моркови, пармезан, подправки 370 гр.', fiyat: '14 лв'},
          { isim: 'Ризото с горски гъби', aciklama: 'ориз арборио, манатарки, печурки, пармезан, подправки 370 гр.', fiyat: '13 лв'},
          { isim: 'Талиателе "Болонезе"', aciklama: 'телешка кайма, лук, моркови, доматен сос, пармезан, подправки 350 гр.', fiyat: '13 лв'},
          { isim: 'Талиателе "Карбонара"', aciklama: 'бекон, яйце, готварска сметана, пармезан 350гр.', fiyat: '12 лв'},
          { isim: 'Талиателе "Арабиата"', aciklama: 'лук, чесън, люти чушки, доматен сос, пармезан, подправки 350гр.', fiyat: '11 лв'},
        ],
        main:[
          { isim: 'Скалопини', aciklama: 'свинско месо, салати, пармезанова кошничка, сос, подправки 350гр.', fiyat: '15.50 лв',  resim:'skalopini.png'},
          { isim: 'Рокфор', aciklama: 'пилешко месо, броколи, синьо сирене, готварска сметана, подправки 350гр.', fiyat: '15 лв',  resim:'rokfor.png'},
          { isim: 'Тика масала', aciklama: 'пилешко месо, доматен сос, ориз, тортиля, лук, подправки 400гр.', fiyat: '15 лв', resim:'tika-masala.png'},
          { isim: 'Пиле Жулиен', aciklama: 'пилешко месо, лук, бекон, кисели краставички, гъби, готварска сметана, кашкавал, подправки 400гр.', fiyat: '14 лв', resim:'julien.png'},
          { isim: 'Фахита', aciklama: 'пилешко месо, зелен и червен пипер, лук, чипи, тортиля, подправки 350гр.', fiyat: '14.50 лв', resim:'fahita.png'},
          { isim: 'Пиле Терияки', aciklama: 'пилешко месо, зелен и червен пипер, тиквички, моркови, подправки, ориз 350гр.', fiyat: '15.50 лв', resim:'teriaki.png'},
          { isim: 'Шницел по Виенски', aciklama: '350гр.', fiyat: '15 лв', resim:'shnitzel-viensko.png'},
          { isim: 'Хрупкав пилешки шницел', aciklama: '350гр.', fiyat: '14 лв', resim:'shnitzel.png'},
        ],
        grill:[
          { isim: 'Ребра "Перла"', aciklama: '300гр.', fiyat: '13 лв'},
          { isim: 'Вратни каренца', aciklama: '250гр.', fiyat: '12 лв'},
          { isim: 'Суджук гребен', aciklama: '250гр.', fiyat: '12 лв'},
          { isim: 'Пилешка пържола', aciklama: '250гр.', fiyat: '10 лв'},
          { isim: 'Свинско шишче', aciklama: '130гр.', fiyat: '3.50 лв'},
          { isim: 'Пилешко шишче', aciklama: '130гр.', fiyat: '3.50 лв'},
          { isim: 'Кюфте', aciklama: '100гр.', fiyat: '2.50 лв'},
          { isim: 'Кебапче', aciklama: '100гр.', fiyat: '2.50 лв'},
        ],
        burgersandsandwiches: [
          { isim: 'Телешки бургер', aciklama: 'телешко кюфте, маруля, домати, кисели краставички, сирене чедър, лук, сос, питка, пържени картофи 350гр.', fiyat: '13 лв',  resim:'beef-burger.png'},
          { isim: 'Хрупкав пилешки бургер', aciklama: 'пилешко филе, маруля, кисели краставички, сирене чедър, лук, сос, питка, пържени картофи 350гр.', fiyat: '12 лв',  resim:'chicken-burger.png'},
          { isim: 'Бургер със свинско месо', aciklama: 'свинско кюфте, маруля, домати, кисели краставички, сирене чедър, лук, сос, питка, пържени картофи 350гр.', fiyat: '12 лв',  resim:'pork-burger.png'},
          { isim: 'Кесадия с пиле', aciklama: 'пилешко филе, пресен пипер, пресен лук, домати, моцарела, тортила, пикантен сос, подправки 350гр.', fiyat: '12 лв',  resim:'kesadiya.png'},
          { isim: 'Клуб сандвич', aciklama: 'шунка, бекон, яйце, маруля, домат, сос, тостерен хляб 350гр.', fiyat: '11 лв',  resim:'club-sandvich.png'},
          { isim: 'Сандвич', aciklama: 'шунка и кашкавал', fiyat: '6.50 лв',  resim:'sandvich.png'},
        ],
        pizzas:[
          { isim: 'Маргарита', aciklama: 'доматен сос, кашкавал 30 см.', fiyat: '10 лв',  resim:'margarita.png'},
          { isim: 'Давинчи', aciklama: 'доматен сос, кашкавал, сирене, домати, царевица, пресен пипер 30 см.', fiyat: '11 лв',  resim:'davinchi.png'},
          { isim: 'Боленезе', aciklama: 'доматен сос, кашкавал, кайма, лук, пресни домати, риган 30 см.', fiyat: '13 лв',  resim:'Bolognese.png'},
          { isim: 'Пиле Киев', aciklama: 'доматен сос, кашкавал, пилешко месо, лук, царевица, гъби 30 см.', fiyat: '13 лв',  resim:'Chicken-Kiev.png'},
          { isim: 'Пеперони', aciklama: 'доматен сос, кашкавал, шпек салам, лют червен пипер 30 см.', fiyat: '13 лв',  resim:'Peperoni.png'},
          { isim: 'Мексиканска', aciklama: 'доматен сос, кашкавал, шпек салам, лук, пипер, люти чушки 30 см.', fiyat: '13 лв',  resim:'Mexiciana.png'},
          { isim: 'Тоскана', aciklama: 'доматен сос, кашкавал, прошуто, шунка, пипер, царевица, маслини 30 см.', fiyat: '14 лв',  resim:'Toskana.png'},
          { isim: 'Пица "Перла"', aciklama: 'доматен сос, кашкавал, пилешко месо, шпек салам, царевица, маслини 30 см.', fiyat: '14 лв',  resim:'Pearl.png'},
          { isim: 'Туна', aciklama: 'доматен сос, кашкавал, риба тон, царевица, лук 30 см.', fiyat: '14 лв',  resim:'Tuna.png'},
          { isim: 'Капричоза', aciklama: 'доматен сос, кашкавал, шунка, бекон, лук, маслини 30 см.', fiyat: '14 лв',  resim:'Kaprichosa.png'},
        ],
        garnishesandsauces:[
          { isim: 'Домати', aciklama: '150 гр.', fiyat: '2.50 лв'},
          { isim: 'Краставици', aciklama: '150 гр.', fiyat: '2.50 лв'},
          { isim: 'Пържени картофи', aciklama: '150 гр.', fiyat: '2.50 лв'},
          { isim: 'Ориз', aciklama: '150 гр.', fiyat: '2.50 лв'},
          { isim: 'Гъбен сос', aciklama: '150 мл.', fiyat: '3 лв'},
          { isim: 'Чеснов сос', aciklama: '100 мл.', fiyat: '1.50 лв'},
          { isim: 'Чипи сос', aciklama: '100 мл.', fiyat: '1.50 лв'},
          { isim: 'Барбекю сос', aciklama: '100 мл.', fiyat: '1.50 лв'},
          { isim: 'Майонеза', aciklama: '100 мл.', fiyat: '1.50 лв'},
          { isim: 'Кетчуп', aciklama: '100 мл.', fiyat: '1.50 лв'},
        ],
        аppetizersandnuts: [
          { isim: 'Фуле "Елена"', aciklama: '100 гр.', fiyat: '13 лв'},
          { isim: 'Пастърма', aciklama: '100 гр.', fiyat: '13 лв'},
          { isim: 'Суджук', aciklama: '100 гр.', fiyat: '11 лв'},
          { isim: 'Кашкавал', aciklama: '100 гр.', fiyat: '7 лв'},
          { isim: 'Сирене', aciklama: '100 гр.', fiyat: '6 лв'},
          { isim: 'Бадеми', aciklama: '100 гр.', fiyat: '7.80 лв'},
          { isim: 'Кашу', aciklama: '100 гр.', fiyat: '7.80 лв'},
          { isim: 'Фъстъци', aciklama: '100 гр.', fiyat: '5 лв'},

        ],
        desserts: [
          { isim: 'Шоколадово суфле', fiyat: '8.50 лв', resim: 'sufle.png'},
          { isim: 'Мелба', fiyat: '10 лв', resim: 'melba.png'},
          { isim: 'Сладолед', fiyat: '6.50 лв', resim: 'icecream.png'},
          { isim: 'Палачинка по избор', fiyat: '6 лв', resim: 'pancake.png'},
        ],
        softdrinks: [
          { isim: 'Кола, Фанта, Спрайт, Швепс', aciklama: '250 мл.', fiyat: '3.20 лв'},
          { isim: 'Швепс Сода', aciklama: '250 мл.', fiyat: '2.60 лв'},
          { isim: 'Капи', aciklama: '250 мл.', fiyat: '3.40 лв'},
          { isim: 'Студен чай', aciklama: '250 мл.', fiyat: '3.20 лв'},
          { isim: 'Минерална вода', aciklama: '330 мл.', fiyat: '2 лв'},
          { isim: 'Минерална вода', aciklama: '1000 мл.', fiyat: '3.20 лв'},
          { isim: 'Айрян', aciklama: '250 мл.', fiyat: '2.50 лв'},
          { isim: 'Айрян', aciklama: '1000 мл.', fiyat: '7 лв'},
          { isim: 'Ред Бул', aciklama: '250 мл.', fiyat: '5.50 лв'},
          { isim: 'Фреш', aciklama: '250 мл.', fiyat: '6 лв'},
          { isim: 'Лимонада', aciklama: '400 мл.', fiyat: '...лв'},
        ],
        rakia: [
          { isim: 'Бургаска мускатова', aciklama: '50 мл.', fiyat: '3 лв'},
          { isim: 'Стралджанска', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Бургас 63', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Бургас 63 Барел', aciklama: '50 мл.', fiyat: '4.50 лв'},
          { isim: 'Троянска Кайсиева', aciklama: '50 мл.', fiyat: '3.50 лв'},
        ],
        whisky: [
          { isim: 'Дхони Уокър', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Дхони Уокър черен етикет', aciklama: '50 мл.', fiyat: '7.40 лв'},
          { isim: 'Дхони Уокър жълт етикет', aciklama: '50 мл.', fiyat: '14 лв'},
          { isim: 'Бушмилс', aciklama: '50 мл.', fiyat: '4.40 лв'},
          { isim: 'Джеймсън', aciklama: '50 мл.', fiyat: '4.50 лв'},
          { isim: 'Тюламор дю', aciklama: '50 мл.', fiyat: '4.40 лв'},
          { isim: 'Джим Бийм', aciklama: '50 мл.', fiyat: '4.40 лв'},
          { isim: 'Джак Даниелс', aciklama: '50 мл.', fiyat: '6.20 лв'},
          { isim: 'Джак Даниелс сингъл барел', aciklama: '50 мл.', fiyat: '12 лв'},
          { isim: 'Чивас Регал 12 г.', aciklama: '50 мл.', fiyat: '7.40 лв'},
          { isim: 'Гленфидич 12 г.', aciklama: '50 мл.', fiyat: '9 лв'},
          { isim: 'Дъмпъл 15 г.', aciklama: '50 мл.', fiyat: '9 лв'},
        ],
        vodkas: [
          {isim: 'Савой', aciklama: '50 мл.', fiyat:'3 лв'},
          {isim: 'Абсолют', aciklama: '50 мл.', fiyat:'4 лв'},
          {isim: 'Руский Стандарт', aciklama: '50 мл.', fiyat:'4 лв'},
          {isim: 'Финландия', aciklama: '50 мл.', fiyat:'4 лв'},
          {isim: 'Белведере', aciklama: '50 мл.', fiyat:'9 лв'},
          {isim: 'Белута', aciklama: '50 мл.', fiyat:'9 лв'},
          {isim: 'Грейгус', aciklama: '50 мл.', fiyat:'9 лв'},
        ],
        beer: [
          { isim: 'Шуменско пиво', aciklama: '500 мл.', fiyat: '3.50 лв'},
          { isim: 'Шуменско пиво', aciklama: '330 мл.', fiyat: '2.50 лв'},
          { isim: 'Пиринско', aciklama: '500 мл.', fiyat: '3.50 лв'},
          { isim: 'Туборг', aciklama: '500 мл.', fiyat: '3.50 лв'},
          { isim: 'Карлсберг', aciklama: '500 мл.', fiyat: '4 лв'},
          { isim: 'Будвайзер', aciklama: '500 мл.', fiyat: '4 лв'},
          { isim: 'Корона', aciklama: '330 мл.', fiyat: '5 лв'},
          { isim: 'Лефе', aciklama: '330 мл.', fiyat: '6 лв'},
          { isim: 'Гинес', aciklama: '440 мл.', fiyat: '8 лв'},
          { isim: 'Радебергер', aciklama: '330 мл.', fiyat: '5 лв'},
          { isim: 'Хугарден', aciklama: '330 мл.', fiyat: '6 лв'},
          { isim: 'Самърсби', aciklama: '330 мл.', fiyat: '3.50 лв'},
        ],
        alcohol: [
          { isim: 'Мартини Бианко', aciklama: '50 мл.', fiyat: '2.50 лв'},
          { isim: 'Джин Бийфитър', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Джин Бомбай', aciklama: '50 мл.', fiyat: '4.50 лв'},
          { isim: 'Джин Савой', aciklama: '50 мл.', fiyat: '2.80 лв'},
          { isim: 'Коняк Плиска', aciklama: '50 мл.', fiyat: '3 лв'},
          { isim: 'Коняк Хенеси Спешъл', aciklama: '50 мл.', fiyat: '9 лв'},
          { isim: 'Бейлис', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Ром Капитан Морган дарк', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Ром Капитан Морган спайс', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Ром Бакарди', aciklama: '50 мл.', fiyat: '4.50 лв'},
          { isim: 'Узо Пломари', aciklama: '200 мл.', fiyat: '15 лв'},
          { isim: 'Йени Ракъ', aciklama: '50 мл.', fiyat: '4 лв'},
          { isim: 'Йегермайстор', aciklama: '25 мл.', fiyat: '2 лв'},
          { isim: 'Текила Хосе Керво', aciklama: '25 мл.', fiyat: '2.50 лв'},
          { isim: 'Текила Хосе Керво голд', aciklama: '25 мл.', fiyat: '3 лв'},
          { isim: 'Афтършок', aciklama: '25 мл.', fiyat: '3 лв'},
        ],
        wine: [
          { isim: 'Мускат и Шардоне', aciklama: 'Старосел 750 мл.', fiyat: '27 лв'},
          { isim: 'Савиньон Блан', aciklama: 'Контемплейшън 750 мл.', fiyat: '26 лв'},
          { isim: 'Ла Блан', aciklama: 'Катархина Естейт 750 мл.', fiyat: '35 лв'},
          { isim: 'Ла Розе', aciklama: 'Катархина Естейт 750 мл.', fiyat: '35 лв'},
          { isim: 'Силвър Ейндхъл', aciklama: 'Мидалидаре 750 мл.', fiyat: '28 лв'},
          { isim: 'Савиньон Блан', aciklama: 'Сайкъл 750 мл.', fiyat: '18 лв'},
          { isim: 'Савиньон Блан', aciklama: 'Нелсън Клиф 750 мл.', fiyat: '35 лв'},
          { isim: 'Савиньон Блан', aciklama: 'Ронгопай 750 мл.', fiyat: '36 лв'},
          { isim: 'Каберне', aciklama: 'Пентаграм 750 мл.', fiyat: '18 лв'},
          { isim: 'Мерло', aciklama: 'Пентаграм 750 мл.', fiyat: '18 лв'},
          { isim: 'Сира', aciklama: 'Пентаграм 750 мл.', fiyat: '18 лв'},
          { isim: 'Моет Шандон', aciklama: 'Пенливи вина 750 мл.', fiyat: '160 лв'},
          { isim: 'Мерло', aciklama: 'Старосел 750 мл.', fiyat: '27 лв'},
          { isim: 'Мерло и Малбек', aciklama: 'Контемплейшън 750 мл.', fiyat: '26 лв'},
          { isim: 'Каберне Совиньон', aciklama: 'Мидалидаре 750 мл.', fiyat: '28 лв'},
          { isim: 'Каберне фран', aciklama: 'Сайкъл 750 мл.', fiyat: '18 лв'},

          { isim: 'Савиньон Блан', aciklama: 'Наливно вино Поморийска изба<br>1000/750 мл.', fiyat: '18/20 лв'},
          { isim: 'Сира', aciklama: 'Наливно вино Поморийска изба<br>1000/750 мл.', fiyat: '18/20 лв'},
          { isim: 'Розе', aciklama: 'Наливно вино Поморийска изба<br>1000/750 мл.', fiyat: '18/20 лв'},
          { isim: 'Чаша вино', aciklama: 'Наливно вино Поморийска изба 250 мл.', fiyat: '5 лв'},
        ]
      }


    };
    const listeKategorileri = ['mezelervebruschettalar', 'icecekler', 'makarnalar', 'izgaralar',
       'garniturlervesoslar', 'aperatiflervekuruyemisler','alkolsuzicecekler', 'rakilar', 
       'viskiler', 'vodkalar', 'biralar', 'alkoholluicecekler', 'saraplar'];
    this.gorunumTipi = listeKategorileri.includes(normalizedSlug) ? 'liste' : 'kart';
    this.urunler = veriKey ? tumUrunler[lang]?.[veriKey] || [] : [];
  // console.log('Görünüm tipi:', this.gorunumTipi);
  // console.log('Ürünler:', this.urunler);
  }
  
}