// Movie API for Lab 4. No dependencies, only Node.js: npm run api
//
//   GET /api/movies        all movies (1 s, a slow database query)
//   GET /api/movies/:id    one movie (1 s), or 404
//   GET /api/votes         the votes for tonight (1.5 s)
//
// Every call is printed in the terminal: watch it to see who calls the API
// (the Next.js server or a browser) and when.
import http from "node:http";
import { readFileSync } from "node:fs";

const PORT = Number(process.env.PORT ?? 4001);
// This computer only, and the same address as in lib/movies.ts.
// Do not use "localhost" here: on some systems it means only the IPv6
// address ::1, and a fetch to 127.0.0.1 is then refused.
const HOST = "127.0.0.1";

let calls = 0;

// Read on every call: edit a file in api/data and the next call sees it
function read(file) {
  return JSON.parse(readFileSync(new URL(`./data/${file}`, import.meta.url), "utf8"));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function send(req, res, status, body) {
  const headers = { "Content-Type": "application/json" };
  // CORS: the page /movies-client runs on another origin than the API
  // (http://localhost:3000 or http://127.0.0.1:3000, not port 4001). The
  // browser only lets that page read the response if the API allows its
  // origin. Requests from the Next.js server are not affected.
  const origin = req.headers.origin;
  if (origin && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  calls += 1;
  const { pathname } = new URL(req.url ?? "/", `http://${HOST}`);
  const time = new Date().toLocaleTimeString("en-GB");
  // The Next.js server sends the user agent "node", a browser sends its name
  const agent = (req.headers["user-agent"] ?? "none").slice(0, 40);
  console.log(`${time}  #${calls}  ${req.method} ${pathname}  (user agent: ${agent})`);

  if (req.method !== "GET") {
    send(req, res, 405, { error: "Method not allowed" });
    return;
  }

  if (pathname === "/api/movies") {
    await wait(1000);
    send(req, res, 200, read("movies.json"));
    return;
  }

  if (pathname === "/api/votes") {
    await wait(1500);
    send(req, res, 200, { votes: read("votes.json"), countedAt: new Date().toISOString() });
    return;
  }

  // "/api/movies/2" -> "2". The id in the URL is a string.
  const match = pathname.match(/^\/api\/movies\/([^/]+)$/);
  if (match) {
    await wait(1000);
    const movie = read("movies.json").find((m) => String(m.id) === match[1]);
    if (movie) send(req, res, 200, movie);
    else send(req, res, 404, { error: "Movie not found" });
    return;
  }

  send(req, res, 404, { error: "Not found" });
});

server.listen(PORT, HOST, () => {
  console.log(`Movie API on http://${HOST}:${PORT}/api/movies`);
});