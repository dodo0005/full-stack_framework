// npm run reset-data: copies data/seed/*.json back over data/, after tests or a class
import { copyFileSync } from "node:fs";

for (const file of ["movies.json", "votes.json", "reviews.json"]) {
  copyFileSync(new URL(`../data/seed/${file}`, import.meta.url), new URL(`../data/${file}`, import.meta.url));
}
console.log("data/ restored from data/seed/");