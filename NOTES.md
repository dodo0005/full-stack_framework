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