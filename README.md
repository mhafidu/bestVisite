# BestVisite

Merupakan Aplikasi Website yang memberikan informasi tentang tempat wisata terbaik yang ada di Indonesia.

## Fitur

- [ ] Memberikan Informasi tempat wisata terabik di Indonesia
- [ ] Menambahkan tempat wisata
- [ ] Melakukan CRUD
- [ ] Acess Login dan Logout
- [ ] Database menggunakan MongoDB
- [ ] Maps HereMaps
- [ ] css CDN Tailwind
- [ ] Upload Gambar

## Screenshot
### Home
![Tampilan Home](./screenshot/1.png)
![Tampilan Home](./screenshot/2.png)
### Places
![Tampilan Home](./screenshot/3.png)
### Show Places
![Tampilan Home](./screenshot/4.png)
### Edit
![Tampilan Home](./screenshot/5.png)

# Bestpoint MongoDB Database

**Bestpoint** adalah database MongoDB yang digunakan untuk menyimpan informasi terkait tempat, pengguna, dan ulasan dalam sebuah aplikasi.

## Database Name
`bestpoint`

## Collections

### 1. **Places**
Collection ini menyimpan informasi tentang tempat-tempat yang tercantum di dalam aplikasi.

#### Contoh Struktur Dokumen:
```json
 {
    _id: ObjectId('66dd7c98225bf0169aa10757'),
    title: 'Candi Prambanan',
    price: 20000,
    description: 'Prambanan is a 9th-century Hindu temple compound in the Special Region of Yogyakarta, in southern Java, Indonesia, dedicated to the Trimūrti, the expression of God as the Creator, the Preserver and the Destroyer.',
    location: 'Seleman, Indonesia',
    geometry: { type: 'Point', coordinates: [ 110.34875, -7.70267 ] },
    reviews: [ ObjectId('66dd7cf9225bf0169aa10778') ],
    images: [
      {
        url: 'public\\images\\image-1725791383231-984049738.png',
        filename: 'image-1725791383231-984049738.png',
        _id: ObjectId('66dd7c98225bf0169aa10758')
      }
    ],
    author: ObjectId('66b9e1571696f4d4ceead7cb'),
    __v: 1
  }

## Instalasi

Instruksi untuk menginstal dan menjalankan proyek ini secara lokal.

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
npm install
npm start

