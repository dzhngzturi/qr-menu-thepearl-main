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
      mezelervebruschettalar: { tr: 'Mezeler ve Bruschettalar', en: 'Appetizers & Bruschettas', bg: 'Разядки и брускети' },
      anayemekler: { tr: 'Ana yemekler', en: 'Main dishes', bg: 'Основни ястия' },
      izgaralar: { tr: 'Izgaralar', en: 'Grill', bg: 'Скара' },
      makarnalar: { tr: 'Makarnalar', en: 'Risotto and pasta', bg: 'Ризото и паста' },
      baslangiclar: { tr: 'Başlangıçlar', en: 'Starters', bg: 'Предястия' },
      burgerlervesandvicler: { tr: 'Burgerler ve sandviçler', en: 'Burgers and sandwiches', bg: 'Бургери и сандвичи' },
      pizzalar: { tr: 'Pizzalar', en: 'Pizzas', bg: 'Пици' },
      icecekler: { tr: 'Sıcak içecekler', en: 'Hot drinks', bg: 'Топли напитки' },
      tatlilar: { tr: 'Tatlılar', en: 'Desserts', bg: 'Десерти' }
    };

    const kategoriKeyMap: Record<string, string> = {
      salatalar: 'salads',
      mezelervebruschettalar: 'appetizersandbruschettas',
      anayemekler: 'main',
      izgaralar: 'grill',
      makarnalar: 'risottovemakarna',
      baslangiclar: 'starters',
      burgerlervesandvicler: 'burgersandsandwiches',
      pizzalar: 'pizzas',
      icecekler: 'drinks',
      tatlilar: 'desserts'
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
        starters: [
          { isim: 'Yağda karides', aciklama: '180 g.', fiyat: '16 lv', resim: 'shrimp.jpg' },
          { isim: 'Ekmekli kalamar', aciklama: '200 g.', fiyat: '14 lv', resim: 'squid.jpg' },
          { isim: 'Tavuk nugget lı mısır gevreği', aciklama: '250 гр.', fiyat: '12.50 lv', resim: 'nuggets.jpg' },
          { isim: 'Kabak Yunan usulü', aciklama: '200 g.', fiyat: '10.00 lv', resim: 'zucchini.jpg' },
          { isim: 'Yaban mersinli işlenmiş peynir', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'cheese.jpeg' },
          { isim: 'Ekmekli sarı peynir', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'breaded-cheese.jpg' },
          { isim: 'Tereyağında dil', aciklama: '200 g.', fiyat: '8.50 lv', resim: 'tongue.jpg' },
          { isim: 'Yağda mantar', aciklama: '200 g.', fiyat: '8.50 лв', resim: 'mushrooms.jpg' },
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
        appetizersandbruschettas: [
          { isim: 'Tarama havyarı', aciklama: '150 g.', fiyat: '7.50 lv'},
          { isim: 'Közlenmiş Biberli katık', aciklama: '150 g.', fiyat: '6.50 lv'},
          { isim: 'Dzaziki /variation/', aciklama: '150 g.', fiyat: '6.50 lv'},
          { isim: 'Bruschetta', aciklama: 'krem peynir ve prosciutto, tarama, zeytin ezmesi 150g', fiyat: '7.50 lv'},

        ],
        risottovemakarna: [
          { isim: 'Risotto Giorgino', aciklama:'arborio pirinci, tavuk, yeşil ve kırmızı biber, kabak, havuç, parmesan, baharatlar 370 g.', fiyat: '14 lv'},
          { isim: 'Yabani mantarlı risotto', aciklama:'arborio pirinci, porçini mantarı, mantar, parmesan, baharatlar 370 g.', fiyat: '13 lv'},
          { isim: 'Tagliatelle "Bolognese"', aciklama:'kıyma, soğan, havuç, domates sosu, parmesan, baharatlar 350 g.', fiyat: '12 lv'},
          { isim: 'Tagalli "Carbonara"', aciklama:'pastırma, yumurta, yemeklik krema, parmesan 350g.', fiyat: '11 lv'},
          { isim: 'Tagliatelle "Arabiata"', aciklama:'soğan, sarımsak, acı biber, domates sosu, parmesan, baharatlar 350g.', fiyat: '10 lv'},
        ],
        main: [
          { isim: 'Skalopini', aciklama: 'domuz eti, salatalar, parmesan sepeti, sos, baharatlar 350g.', fiyat: '15.50 lv', resim:'skalopini.png'},
          { isim: 'Rokfor', aciklama: 'tavuk eti, brokoli, mavi peynir, pişirme kreması, baharatlar 350g.', fiyat: '15 lv', resim:'rokfor.png'},
          { isim: 'Tikka masala', aciklama: 'tavuk eti, domates sosu, pirinç, tortilla, soğan, baharatlar 400g.', fiyat: '15 lv', resim:'tika-masala.png'},
          { isim: 'Tavuk Jülyen', aciklama: 'tavuk eti, soğan, pastırma, turşu, mantar, pişirme kreması, kaşar peyniri, baharatlar 400 g.', fiyat: '14 lv', resim:'fahita.png'},
          { isim: 'Fajita', aciklama: 'tavuk eti, yeşil ve kırmızı biber, soğan, cips, tortilla, baharatlar 350g.', fiyat: '14.50 lv', resim:'teriaki.png'},
          { isim: 'Tavuk Teriyaki', aciklama: 'tavuk eti, yeşil ve kırmızı biber, kabak, havuç, baharatlar, pirinç 350g.', fiyat: '15.50 lv', resim:'shnitzel-viensko.png'},
          { isim: 'Viyana Şinitzel', aciklama: '350g.', fiyat: '15 lv', resim:'tika-masala.png'},
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
          { isim: 'Sandviç', aciklama: 'jambon ve peynir', fiyat: '6.50 BGN', resim:'sandvich.png'},
        ],
        pizzas:[
          { isim: 'margarita', aciklama: 'domates sosu, peynir 30 cm.', fiyat: '9 lv', resim:'margarita.png'},
          { isim: 'davinchi', aciklama: 'domates sosu, peynir, domates, mısır, taze biber 30 cm.', fiyat: '10 lv', resim:'davinchi.png'},
          { isim: 'Bolonez', aciklama: 'domates sosu, peynir, kıyılmış peynir, soğan, taze domates, kekik 30 cm.', fiyat: '12 lv', resim:'Bolognese.png'},
          { isim: 'Tavuk-Kiev', aciklama: 'domates sos, peynir, tavuk, soğan, mısır, mantar 30 cm.', fiyat: '12 lv', resim:'Chicken-Kiev.png'},
          { isim: 'Peperoni', aciklama: 'domates sosu, peynir, speck salam, biber 30 cm.', fiyat: '12 lv', resim:'Peperoni.png'},
          { isim: 'Meksika', aciklama: 'domates sosu, peynir, speck salam, soğan, biber, chilli 30 cm.', fiyat: '12 lv', resim:'Mexiciana.png'},
          { isim: 'Toscana', aciklama: 'domates sosu, peynir, prosciutto, jambon, biber, mısır, zeytin 30 cm.', fiyat: '14 lv', resim:'Toskana.png'},
          { isim: 'Perla pizza', aciklama: 'domates sos, peynir, tavuk, speck salam, mısır, zeytin 30 cm.', fiyat: '13 lv', resim:'Pearl.png'},
          { isim: 'Ton balığı', aciklama: 'domates sosu, peynir, ton balığı, mısır, soğan 30 cm.', fiyat: '13 lv', resim:'Tuna.png'},
          { isim: 'Caprichosa', aciklama: 'domates sosu, peynir, jambon, pastırma, soğan, zeytin 30 cm.', fiyat: '12 lv', resim:'Kaprichosa.png'},
        ]
      
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
        starters: [
          { isim: 'Shrimp in oil', aciklama: '180 g.', fiyat: '16 lv', resim: 'shrimp.jpg' },
          { isim: 'Breaded squid', aciklama: '200 g.', fiyat: '14 lv', resim: 'squid.jpg' },
          { isim: 'Chicken nuggets with cornflakes', aciklama: '250 g.', fiyat: '12.50 lv', resim: 'nuggets.jpg' },
          { isim: 'Zucchini Greek style', aciklama: '200 g.', fiyat: '10.00 lv', resim: 'zucchini.jpg' },
          { isim: 'Processed cheese with blueberries', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'cheese.jpeg' },
          { isim: 'Breaded yellow cheese', aciklama: '250 g.', fiyat: '10.50 lv', resim: 'breaded-cheese.jpg' },
          { isim: 'Tongue in butter', aciklama: '200 g.', fiyat: '8.50 lv', resim: 'tongue.jpg' },
          { isim: 'Mushrooms in oil', aciklama: '200 g.', fiyat: '8.50 лв', resim: 'mushrooms.jpg' },
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
        appetizersandbruschettas: [
          { isim: 'Tarama caviar', aciklama: '150 g.', fiyat: '7.50 lv'},
          { isim: 'Roasted Pepper Cake', aciklama: '150 g.', fiyat: '6.50 lv'},
          { isim: 'Dzaziki /variation/', aciklama: '150 g.', fiyat: '6.50 lv'},
          { isim: 'Bruschetta', aciklama: 'cream cheese and prosciutto, tarama, olive paste 150g', fiyat: '7.50 lv'},
        ],
        risottoandpasta: [
          { isim: 'Risotto Giorgio', aciklama: 'arborio rice, chicken, green and red pepper, zucchini, carrots, parmesan, spices 370 g.', fiyat: '14 lv'},
          { isim: 'Risotto with wild mushrooms', aciklama: 'arborio rice, porcini mushrooms, mushrooms, parmesan, spices 370 g.', fiyat: '13 lv'},
          { isim: 'Taliatele "Bolognese"', aciklama: 'minced beef, onion, carrots, tomato sauce, parmesan, spices 350 g.', fiyat: '12 lv'},
          { isim: 'Taliatele "Carbonara"', aciklama: 'bacon, egg, cooking cream, parmesan 350 g.', fiyat: '11 lv'},
          { isim: 'Taliatele "Arabiata"', aciklama: 'onion, garlic, chili peppers, tomato sauce, parmesan, spices 350g.', fiyat: '10 lv'},
        ],
        main: [
          { isim: 'Scalopini', aciklama: 'pork, salads, parmesan basket, sauce, spices 350g.', fiyat: '15.50 lv', resim:'skalopini.png'},
          { isim: 'Roquefort', aciklama: 'chicken, broccoli, blue cheese, cooking cream, spices 350g.', fiyat: '15 lv', resim:'rokfor.png'},
          { isim: 'Tikka masala', aciklama: 'chicken, tomato sauce, rice, tortilla, onion, spices 400g.', fiyat: '15 lv', resim:'tika-masala.png'},
          { isim: 'Chicken Julienne', aciklama: 'chicken, onion, bacon, pickles, mushrooms, cooking cream, yellow cheese, spices 400g.', fiyat: '14 lv', resim:'fahita.png'},
          { isim: 'Fahita', aciklama: 'chicken meat, green and red pepper, onion, chips, tortilla, spices 350g.', fiyat: '14.50 lv', resim:'teriaki.png'},
          { isim: 'Chicken Teriyaki', aciklama: 'chicken meat, green and red pepper, zucchini, carrots, spices, rice 350g.', fiyat: '15.50 lv', resim:'shnitzel-viensko.png'},
          { isim: 'Wiener Schnitzel', aciklama: '350g.', fiyat: '15 lv', resim:'tika-masala.png'},
          { isim: 'Crispy Chicken Schnitzel', aciklama: '350g.', fiyat: '14 BGN', resim:'shnitzel.png'},
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
          { isim: 'margarita', aciklama: 'tomato sauce, cheese 30 cm.', fiyat: '9 lv', resim:'margarita.png'},
          { isim: 'davinchi', aciklama: 'tomato sauce, cheese, tomatoes, corn, fresh pepper 30 cm.', fiyat: '10 lv', resim:'davinchi.png'},
          { isim: 'Bolognese', aciklama: 'tomato sauce, cheese, minced cheese, onion, fresh tomatoes, oregano 30 cm.', fiyat: '12 lv', resim:'Bolognese.png'},
          { isim: 'Chicken-Kiev', aciklama: 'tomato sauce, cheese, chicken, onion, corn, mushrooms 30 cm.', fiyat: '12 lv', resim:'Chicken-Kiev.png'},
          { isim: 'Peperoni', aciklama: 'tomato sauce, cheese, speck salami, chilli 30 cm.', fiyat: '12 lv', resim:'Peperoni.png'},
          { isim: 'Mexican', aciklama: 'tomato sauce, cheese, speck salami, onion, pepper, chilli 30 cm.', fiyat: '12 lv', resim:'Mexiciana.png'},
          { isim: 'Toscana', aciklama: 'tomato sauce, cheese, prosciutto, ham, pepper, corn, olives 30 cm.', fiyat: '14 lv', resim:'Toskana.png'},
          { isim: 'Pearl pizza', aciklama: 'tomato sauce, cheese, chicken, speck salami, corn, olives 30 cm.', fiyat: '13 lv', resim:'Pearl.png'},
          { isim: 'Tuna', aciklama: 'tomato sauce, cheese, tuna, corn, onion 30 cm.', fiyat: '13 lv', resim:'Tuna.png'},
          { isim: 'Caprichosa', aciklama: 'tomato sauce, cheese, ham, bacon, onion, olives 30 cm.', fiyat: '12 lv', resim:'Kaprichosa.png'},
        ]
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
        starters: [
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
        appetizersandbruschettas: [
          { isim: 'Тарама хайвер', aciklama: '150 гр.', fiyat: '7.50 лв'},
          { isim: 'Катък с печен пипер', aciklama: '150 гр.', fiyat: '6.50 лв'},
          { isim: 'Дзадзики /вариация/', aciklama: '150 гр.', fiyat: '6.50 лв'},
          { isim: 'Брускети', aciklama: 'крема сирене и прошуто, тарама, маслинова паста 150гр.', fiyat: '7.50 лв'},
        ],
        risottoandpasta: [
          { isim: 'Ризото Джорджино', aciklama: 'ориз арборио, пилешко месо, зелен и червен пипер, тиквички, моркови, пармезан, подправки 370 гр.', fiyat: '14 лв'},
          { isim: 'Ризото с горски гъби', aciklama: 'ориз арборио, манатарки, печурки, пармезан, подправки 370 гр.', fiyat: '13 лв'},
          { isim: 'Талиателе "Болонезе"', aciklama: 'телешка кайма, лук, моркови, доматен сос, пармезан, подправки 350 гр.', fiyat: '12 лв'},
          { isim: 'Талиателе "Карбонара"', aciklama: 'бекон, яйце, готварска сметана, пармезан 350гр.', fiyat: '11 лв'},
          { isim: 'Талиателе "Арабиата"', aciklama: 'лук, чесън, люти чушки, доматен сос, пармезан, подправки 350гр.', fiyat: '10 лв'},
        ],
        main:[
          { isim: 'Скалопини', aciklama: 'свинско месо, салати, пармезанова кошничка, сос, подправки 350гр.', fiyat: '15.50 лв',  resim:'skalopini.png'},
          { isim: 'Рокфор', aciklama: 'пилешко месо, броколи, синьо сирене, готварска сметана, подправки 350гр.', fiyat: '15 лв',  resim:'rokfor.png'},
          { isim: 'Тика масала', aciklama: 'пилешко месо, доматен сос, ориз, тортиля, лук, подправки 400гр.', fiyat: '15 лв', resim:'tika-masala.png'},
          { isim: 'Пиле Жулиен', aciklama: 'пилешко месо, лук, бекон, кисели краставички, гъби, готварска сметана, кашкавал, подправки 400гр.', fiyat: '14 лв', resim:'fahita.png'},
          { isim: 'Фахита', aciklama: 'пилешко месо, зелен и червен пипер, лук, чипи, тортиля, подправки 350гр.', fiyat: '14.50 лв', resim:'teriaki.png'},
          { isim: 'Пиле Терияки', aciklama: 'пилешко месо, зелен и червен пипер, тиквички, моркови, подправки, ориз 350гр.', fiyat: '15.50 лв', resim:'shnitzel-viensko.png'},
          { isim: 'Шницел по Виенски', aciklama: '350гр.', fiyat: '15 лв', resim:'tika-masala.png'},
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
          { isim: 'Маргарита', aciklama: 'доматен сос, кашкавал 30 см.', fiyat: '9 лв',  resim:'margarita.png'},
          { isim: 'Давинчи', aciklama: 'доматен сос, кашкавал, сирене, домати, царевица, пресен пипер 30 см.', fiyat: '10 лв',  resim:'davinchi.png'},
          { isim: 'Боленезе', aciklama: 'доматен сос, кашкавал, кайма, лук, пресни домати, риган 30 см.', fiyat: '12 лв',  resim:'Bolognese.png'},
          { isim: 'Пиле Киев', aciklama: 'доматен сос, кашкавал, пилешко месо, лук, царевица, гъби 30 см.', fiyat: '12 лв',  resim:'Chicken-Kiev.png'},
          { isim: 'Пеперони', aciklama: 'доматен сос, кашкавал, шпек салам, лют червен пипер 30 см.', fiyat: '12 лв',  resim:'Peperoni.png'},
          { isim: 'Мексиканска', aciklama: 'доматен сос, кашкавал, шпек салам, лук, пипер, люти чушки 30 см.', fiyat: '12 лв',  resim:'Mexiciana.png'},
          { isim: 'Тоскана', aciklama: 'доматен сос, кашкавал, прошуто, шунка, пипер, царевица, маслини 30 см.', fiyat: '14 лв',  resim:'Toskana.png'},
          { isim: 'Пица "Перла"', aciklama: 'доматен сос, кашкавал, пилешко месо, шпек салам, царевица, маслини 30 см.', fiyat: '13 лв',  resim:'Pearl.png'},
          { isim: 'Туна', aciklama: 'доматен сос, кашкавал, риба тон, царевица, лук 30 см.', fiyat: '13 лв',  resim:'Tuna.png'},
          { isim: 'Капричоза', aciklama: 'доматен сос, кашкавал, шунка, бекон, лук, маслини 30 см.', fiyat: '12 лв',  resim:'Kaprichosa.png'},
        ]
      }


    };
    const listeKategorileri = ['mezelervebruschettalar', 'icecekler', 'makarnalar','izgaralar'];
    this.gorunumTipi = listeKategorileri.includes(normalizedSlug) ? 'liste' : 'kart';
    this.urunler = veriKey ? tumUrunler[lang]?.[veriKey] || [] : [];
    console.log('Görünüm tipi:', this.gorunumTipi);
    console.log('Ürünler:', this.urunler);
  }
  
}