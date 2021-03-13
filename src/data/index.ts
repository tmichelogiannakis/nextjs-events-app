import path from 'path';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync(
  path.join(process.cwd(), 'src', 'data', 'db.json')
);
const db = low(adapter);

export default db;
