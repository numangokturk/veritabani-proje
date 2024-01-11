const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const path = require('path')

app.use('/', express.static('public'))


let db = new sqlite3.Database('market.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected database !!!');
});



db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS temizlik_urunleri(urun_id INT AUTO_INCREMENT PRIMARY KEY,urun_adi VARCHAR(255) NOT NULL,son_tuketim_tarihi DATE,urun_fiyati DECIMAL(10, 2) NOT NULL,stok_miktari INT NOT NULL)`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS taze_urunler(urun_id INT AUTO_INCREMENT PRIMARY KEY,urun_adi VARCHAR(255) NOT NULL,kategori VARCHAR(50) NOT NULL,birim_fiyat DECIMAL(10, 2) NOT NULL,stok_miktari INT NOT NULL,son_tuketim_tarihi DATE)`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS paketlenmis_urunler(urun_id INT AUTO_INCREMENT PRIMARY KEY,urun_adi VARCHAR(255) NOT NULL,kategori VARCHAR(50) NOT NULL,birim_fiyat DECIMAL(10, 2) NOT NULL,stok_miktari INT NOT NULL,son_tuketim_tarihi DATE)`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS tekel(urun_id INT AUTO_INCREMENT PRIMARY KEY,urun_adi VARCHAR(255) NOT NULL,birim_fiyat DECIMAL(10, 2) NOT NULL,stok_miktari INT NOT NULL)`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS kullanici(kullanici_id INT AUTO_INCREMENT PRIMARY KEY,kullanici_adi VARCHAR(50) NOT NULL,kullanici_soyadi VARCHAR(50) NOT NULL,kullanici_tc VARCHAR(11) NOT NULL)`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});


// db.run(`DELETE FROM paketlenmis_urunler WHERE urun_id=1` ,function(err) {
//   if (err) {
//     return console.log(err.message);
//   }
  
//   // get the last insert id
//   console.log(`A row has been inserted with rowid ${this.lastID}`);
// });

//  // eklemeyi burdan yap
//  db.run(`INSERT INTO tekel VALUES(4,"Muratti Rosso",59,)`, function(err) {
//   if (err) {
//     return console.log(err.message);
//   }
  
//   // get the last insert id
//   console.log(`A row has been inserted with rowid ${this.lastID}`);
// });



/*  pathler   */ 
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/public/index.html')
})



app.get('/users', (req, res) => {
  db.all(`SELECT * FROM Kullanici`, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
  });
})



app.get('/temizlik-urunleri', (req, res) => {
  db.all(`SELECT * FROM temizlik_urunleri`, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
  });
})

app.get('/tekel', (req, res) => {
  db.all(`SELECT * FROM tekel`, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
  });
})


app.get('/taze-urunler', (req, res) => {
  db.all(`SELECT * FROM taze_urunler`, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
  });
})

app.get('/paketlenmis-urunler', (req, res) => {
  db.all(`SELECT * FROM paketlenmis_urunler`, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


