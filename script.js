let sloupce = 10;
let radky = 10;
let velikostPole = 40;
let mrizka = new Array(10);

// Vytvoreni mrizky a zaplneni hodnotami 0 a 1

// for (let x = 0; x < mrizka.length; x++) {
// 	mrizka[x] = new Array(10);
// }

// for (let x = 0; x < sloupce; x++) {
// 	for (let y = 0; y < radky; y++) {
// 		mrizka[x][y] = Math.floor(Math.random() * 2);
// 	}
// }

window.onload = function() {
	var can = document.getElementById('herniPlocha');
	var ctx = can.getContext('2d');
	
	for (let x = 0; x < mrizka.length; x++) {
		mrizka[x] = new Array(10);
	}
	
	for (let x = 0; x < sloupce; x++) {
		for (let y = 0; y < radky; y++) {
			mrizka[x][y] = Math.floor(Math.random() * 2);
			if (mrizka[x][y] == 0) {
				ctx.fillStyle = '#fff';
				ctx.fillRect(x*velikostPole, y*velikostPole, 40, 40);
			} else {
				ctx.fillStyle = '#000';
				ctx.fillRect(x*velikostPole, y*velikostPole, 40, 40);
			}
		}
	}
}