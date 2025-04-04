# Infaq App

Aplikasi sederhana untuk menagih dan mengelola infaq di lingkungan masyarakat, dibangun dengan React Native (Expo) dan SQLite.

## Fitur Utama

- 📝 Catat transaksi infaq warga
- 📊 Lihat laporan infaq per periode
- 🔍 Cari data warga dan transaksi
- 📱 Tampilan mobile yang responsif
- 🔄 Penyimpanan data offline dengan SQLite

## Teknologi yang Digunakan

- ⚛️ React Native (Expo)
- 🗃️ SQLite (expo-sqlite)
- � TypeScript (opsional)
- � React Navigation
- 🎨 UI Library (React Native Paper atau NativeBase)

## Instalasi

1. Pastikan Anda telah menginstall:
   - Node.js (v14+)
   - Expo CLI (`npm install -g expo-cli`)
   - Yarn (opsional)

2. Clone repositori ini:
   ```bash
   git clone [url-repo-anda]
   cd infaq-app
   ```

3. Install dependencies:
   ```bash
   npm install
   # atau
   yarn install
   ```

4. Jalankan aplikasi:
   ```bash
   expo start
   ```

## Struktur Folder

```
infaq-app/
├── assets/            # File aset (gambar, font)
├── components/        # Komponen reusable
├── constants/         # Konstanta aplikasi
├── hooks/             # Custom hooks
├── navigation/        # Konfigurasi navigasi
├── screens/           # Halaman aplikasi
├── services/          # Layanan (database, API)
├── types/             # Type definitions (jika pakai TypeScript)
├── utils/             # Utility functions
├── App.tsx            # Entry point
└── package.json
```

## Konfigurasi Database

Aplikasi menggunakan SQLite melalui `expo-sqlite`. Contoh inisialisasi database:

```javascript
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('infaq.db');

// Inisialisasi tabel
db.transaction(tx => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS warga (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      alamat TEXT,
      no_hp TEXT
    );`
  );
  
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS transaksi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      warga_id INTEGER,
      jumlah INTEGER NOT NULL,
      tanggal TEXT NOT NULL,
      keterangan TEXT,
      FOREIGN KEY (warga_id) REFERENCES warga (id)
    );`
  );
});
```

## Kontribusi

1. Fork project ini
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

[MIT](LICENSE)

---

Dikembangkan dengan ❤️ untuk masyarakat
