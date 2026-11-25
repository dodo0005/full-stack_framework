1. In which file are the `<html>` and `<body>` tags? | in 'app/layout.tsx'
2. Which file renders the page at `/`? | 'app/pages.tsx'
3. Which folder is for images and other static files, and how do you reference them? | 'public/'
4. What is  `tsconfig.json ` doing in your project? | TypeScript configuration. Defines the `@/*` alias.
5. What does `@/*` mean in `tsconfig.json`? Write an import that uses it. | it is a path alias, it let's you make paths using @/ instead of ../.. 
example :
import Button from "@/app/components/Button";
6. What does `app/layout.tsx` import from `next/font/google`, and what does Next.js do with it at build time? | it imports Geist, Geist_Mono both of which are fonts. Next.js  downloads them at build time ane puts the fonts locally in the app output, then creates a css variable to reference the fonts.
7. What’s the difference between `layout.tsx` and `page.tsx`?  | layout defines the overall archetecture surrounding pages, meanwhile page.tsx defines the content shown for the url 
8. Where would you put a navbar that appears on every page? | in app/layout.tsx because the layout wraps every page in the Next.js application
9. What is `globals.css` for, and where is it imported? | it is for saving fonts like before, background colors, margins and padding, tailwind css imports, and makes styles to be used in multiple pages. it is imported in layout.tsx 
10. What is `AGENTS.md`, and does your app need it to run? | it is to help guide agents when working on the codebase have a better idea about the application. It is not needed for the app to run






1. In the page source, are the movie titles present for `/movies`? For `/movies-client`? Why? 
 yes, 
 The movie titles are already included in the HTML because Next.js renders the page on the server. 
 no, 
 The movie titles are fetched by JavaScript in the browser after the page loads. Initially, the HTML only contains "Loading movies...".
 
2. Without the `force-dynamic` line of Part E, you run `npm run build` again tomorrow, then `npm start`, without changing anything else. What does the "Rendered at" timestamp of `/movies` show, and why? It shows the date and time of tomorrow's build, because /movies uses static rendering by default. Next.js generates the HTML during the build, not every time someone visits the page.
3. Part E made every request to `/movies` about one second slower. Give one situation where `force-dynamic` is still the right choice, and explain why.  For example, a banking dashboard showing a user's current account balance.  force-dynamic is appropriate because the information must be fresh for every request. Showing an old balance could mislead the user.
4. A classmate sees `[movies] rendered 6 movies` in the browser console and says: "So this code runs in the browser." What do you answer, and how can you prove it? No, the code runs on the server. The browser console may display a debugging copy, but the actual console.log executes on the server.  it can be proved by 

-Looking at the terminal running Next.js and finding the log message.
-Disabling JavaScript in the browser and reloading /movies. The movie list still appears.
-Checking the page source (view-source:). The movie titles are already in the HTML.
5. Which version would you choose for a public movie catalogue that changes once a week, and why?1. In the page source, are the movie titles present for `/movies`? For `/movies-client`? Why? static rendering (SSG), because :
-The catalogue only changes once a week.
-Pages load quickly because HTML is generated at build time.
-The server doesn't need to fetch the data for every visitor.
-It is better for performance and SEO.


# Lab 3

## 1. How can NavLink use usePathname and still appear in the page source?

`NavLink` is a Client Component because it uses the `usePathname()` hook. However, Next.js can render Client Components on the server when generating the initial HTML.

Next.js knows the current URL, so it can determine which navigation link is active and include `aria-current="true"` in the initial HTML. The browser then hydrates the component to make it interactive.

## 2. Why does generateStaticParams return String(movie.id), and why is /movies/42 a 404?

`generateStaticParams()` returns strings because dynamic route parameters are URL segments, and URL parameters are strings.

For example, the movie ID `2` becomes `"2"`.

We use `dynamicParams = false` to tell Next.js that only the IDs returned by `generateStaticParams()` are allowed.

Since movie 42 is not in the generated list, Next.js returns a 404 without executing the movie page component.

## 3. Why does the note stay between /movies and /movies/2 but disappear when visiting /about?

The movies pages share the same nested layout: `app/movies/layout.tsx`.

Next.js preserves this layout during client-side navigation between `/movies` and `/movies/2`. Therefore, the Notes input remains mounted and keeps its value.

The `/about` page does not use the movies layout. When navigating there, the movies layout is unmounted. Returning to `/movies` creates a new layout, so the Notes input is empty.

## 4. Where is the real error message in production, and why is it not sent to the browser?

The real error message is available in the server terminal logs.

Next.js hides detailed server error messages from the browser in production to prevent sensitive information about the application from being exposed.

Instead, the browser receives a generic error message and an error digest that can help identify the error in the server logs.

## 5. Why does Loading the movies... appear in development for /movies/2 but not in production?

In development, Next.js renders pages on demand. Loading the movie data takes time, so the loading component can appear while the page is being rendered.

In production, the individual movie pages have already been prerendered during `npm run build`, so their HTML is ready immediately. The loading component is not needed when opening those pages.

The `/movies` listing still needs to load its data at runtime, so its loading component can still appear.



# Lab 4, part 2

## Part E — Predictions

| Page | Fetch option | Expected build output |
|---|---|---|
| `/movies` | `next: { revalidate: 10 }` | ○ with 10s revalidation |
| `/movies/[id]` | `cache: "force-cache"` | ● prerendered pages |

/movies uses ISR with a 10-second revalidation period.
/movies/[id] uses SSG.
The production build succeeded.
The /movies page displayed all six movies.
The cache header continued returning STALE during your test, despite regeneration logs.

## Part F
### Part F – Experiment 1: Sequential fetching
2.87s
Time to first byte
2.87s
Total loading time


### Part F – Experiment 2: Suspense
Measurement | Before Suspense | With Suspense
Time to first byte | 2.87 s	| 0.17 s
Total time	| 2.87 s | 2.70 s


### Part F – Results
Experiment	First byte	Total
Sequential fetching	2.87 s	2.87 s
With Suspense	0.17 s	2.70 s
Suspense + Promise.all	0.15 s	1.66 s



## Part H — What happens when the API is stopped?

With the API server stopped and the production Next.js server still running:

| Page | Result |
|---|---|
| `/movies` | The movies still appear because the page was generated and cached by Next.js. |
| `/movies/2` | The movie details still appear because the page was prerendered during the build (SSG). |
| `/` | The homepage title and "Counting the votes..." fallback appear, but the Top 3 cannot load because the API is unavailable. |
| `/movies-client` | "Loading movies..." appears first, followed by the error message because the browser cannot fetch the movies from the API. |

The server-rendered pages can continue displaying previously generated HTML without contacting the API for every request. However, the homepage's Top 3 section uses uncached fetches, so it needs the API at request time.

The client-rendered page also needs the API because the browser fetches the movie data after the page loads.

When the API is unavailable, the Next.js server logs a fetch error. The client page catches its failed request and displays an error message instead of crashing.