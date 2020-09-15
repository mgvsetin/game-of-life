const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Rozměry herní plochy
const rozliseni = 10;
canvas.width = 600;
canvas.height = 600;
const SLOUPCE = canvas.width / rozliseni;
const RADKY = canvas.height / rozliseni;

// Vytvoření 2d pole a naplnění hodnotami 0 a 1
function vytvoritMrizku() {
  return new Array(SLOUPCE).fill(null)
    .map(() => new Array(RADKY).fill(null)
      .map(() => Math.floor(Math.random() * 2)));
}

// Vytvoření herní mřížky
let mrizka = vytvoritMrizku();

// Vytvoření další generace a její vykreslení
requestAnimationFrame(dalsiGenerace);

function dalsiGenerace() {
  mrizka = kontrolaStavuHerniPlochy(mrizka);
  vykreslitMrizku(mrizka);
  requestAnimationFrame(dalsiGenerace);
}

// Vykreslení mřížky na canvas
function vykreslitMrizku(mrizka) {
  for (let sloupec = 0; sloupec < mrizka.length; sloupec++) {
    for (let radek = 0; radek < mrizka[sloupec].length; radek++) {
      const bunka = mrizka[sloupec][radek];

      ctx.beginPath();
      ctx.rect(sloupec * rozliseni, radek*rozliseni, rozliseni, rozliseni);
      ctx.fillStyle = bunka ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Kontrola stavu herní plochy
function kontrolaStavuHerniPlochy(mrizka) {
  const kopieMrizky = mrizka.map(arr => [...arr]);

  for (let sloupec = 0; sloupec < mrizka.length; sloupec++) {
    for (let radek = 0; radek < mrizka[sloupec].length; radek++) {
      const bunka = mrizka[sloupec][radek];
      let pocetSousednichBunek = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_pozice = sloupec + i;
          const y_pozice = radek + j;

          if (x_pozice >= 0 && y_pozice >= 0 && x_pozice < SLOUPCE && y_pozice < RADKY) {
            const aktualniBunka = mrizka[x_pozice][y_pozice];
            pocetSousednichBunek += aktualniBunka;
          }
        }
      }

      // Pravidla hry

      if (bunka === 1 && pocetSousednichBunek < 2) {
        // 1. Každá živá buňka s méně než dvěma živými sousedy zemře
        kopieMrizky[sloupec][radek] = 0;
      } else if (bunka === 1 && pocetSousednichBunek === 2 || pocetSousednichBunek === 3) {
        // 2. Každá živá buňka se dvěma nebo třemi živými sousedy zůstává žít
        kopieMrizky[sloupec][radek] = 1;
      } else if (bunka === 1 && pocetSousednichBunek > 3) {
        // 3. Každá živá buňka s více než třemi živými sousedy zemře
        kopieMrizky[sloupec][radek] = 0;
      } else if (bunka === 0 && pocetSousednichBunek === 3) {
        // 4. Každá mrtvá buňka s právě třemi živými sousedy oživne
        kopieMrizky[sloupec][radek] = 1;
      }
    }
  }
  return kopieMrizky;
}