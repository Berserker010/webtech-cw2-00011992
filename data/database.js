import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "database.json");
const adapter = new JSONFile(file);
const database = new Low(adapter);

await database.read();
await database.write();

export default database;
