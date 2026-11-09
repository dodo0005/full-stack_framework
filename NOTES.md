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
