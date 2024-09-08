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
```
### 2. **Users**
Collection ini menyimpan informasi tentang User yang digunakan untuk login.

#### Contoh Struktur Dokumen:
```json
 {
    _id: ObjectId('66d6aad63c99b58d2ace80d4'),
    email: 'fais@gmail.com',
    username: 'fais',
    salt: '3e0b4bea489fdcc161e8b56ca8e4afebd064e6b8b5a47386bd99a5a157d1fa2b',
    hash: 'f3aef25d27e91cfde0b976cc283795bd78fe2cfa2e4363d4fa60dab59712ca2562773e937735be15354e98cf5c2458ddfb4b333351b366fbff6d79c9648b3110bcbd7648ea38ded4017b15e43170786982be97dbd73101695c4abdac573a719c78f2848911c56064f1a7ee7706a31be91d8457bd760af2e557613f7324c08d8f00129f146aca38f3b242d0cb45ffa7ca6d1fcd0059e70ec7b4bd60d3b2fb6459faa82a907d8edeae09cc41ed1b8a697610fc36dbfa1108dc5e197ff49cf01a1e19f07de9b67c165ae00404a5fa5ba5272c1ae01ccbc8fd6cf09ce4cbd81288154571748a04e191fb40f8f58aa847a09664d33be7636d17ad7aa95f72d6e475e5262dc257c50ee8deaf5effae2371511e20359a652ee5765221db06ab6c162afb8e5ad702d3d3ff8f9ba6c73679ee6e68264396a47eaf8ac78c49f52dfb3d47faef202a93d26162058cd3dff18c7dc093782fb16024d27c0a11804cb7f8d89892640ffeb9e5b7b4ae1a254346819ca409f7386d0bef430471fb3f1f7f1ab1aaacba5d1e0edfe8241bcef3d2c89181964247cc290153fd7ec5e4a4315c4a0de3b47a00771022f194e92a985fcfccb4ff245da74b02add7451c26e861fd67c752dadb323f658acb7c2bc45bc6e776a65fb59076a16fb090106c5ee602455f3c85ddc24944b07df380e2d949f7e4837db0838bc083320f601ba30ed593be6eea483b',
    __v: 0
  }
```

### 3. **Reviews**
Collection ini menyimpan rivews yang diberikan user.

#### Contoh Struktur Dokumen:
```json
 {
    _id: ObjectId('66d314086ecff95810c4d721'),
    rating: 5,
    body: 'bagus',
    author: ObjectId('66b9e1571696f4d4ceead7cb'),
    __v: 0
  }
```

## Instalasi

Instruksi untuk menginstal dan menjalankan proyek ini secara lokal.

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
npm install
npm start

