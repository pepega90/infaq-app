# Infaq App

A simple mobile application for managing and tracking charitable donations (infaq) in community environments, built with React Native (Expo) and SQLite.

https://github.com/user-attachments/assets/001602e7-f722-4bd0-8cb6-7415ea299738

## Key Features

- 📝 Record donation transactions
- 📊 View donation reports by period
- 🔍 Search resident data and transactions
- 📱 Mobile-responsive interface
- 🔄 Offline data storage with SQLite

## Technologies Used

- ⚛️ React Native (Expo)
- 🗃️ SQLite (expo-sqlite)
- � TypeScript (optional)
- � React Navigation
- 🎨 UI Library (React Native Paper or NativeBase)

## Installation

1. Ensure you have installed:
   - Node.js (v14+)
   - Expo CLI (`npm install -g expo-cli`)
   - Yarn (optional)

2. Clone this repository:
   ```bash
   git clone [your-repo-url]
   cd infaq-app
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Run the application:
   ```bash
   expo start
   ```

## Database Configuration

The app uses SQLite via `expo-sqlite`. Example database initialization:

```javascript
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('infaq.db');

// Initialize tables
db.transaction(tx => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS residents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      phone TEXT
    );`
  );
  
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      resident_id INTEGER,
      amount INTEGER NOT NULL,
      date TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY (resident_id) REFERENCES residents (id)
    );`
  );
});
```

## Contribution

1. Fork this project
2. Create a new branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a Pull Request

## License

[MIT](LICENSE)

---

Developed with ❤️ for community empowerment
