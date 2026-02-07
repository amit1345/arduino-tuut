# Arduino Uno Tutorial App

A web app that follows the **Arduino Projects Book** (PDF). It includes tutorials, step-by-step build instructions, quizzes with **how-to-fix** feedback when you're wrong, and a **Check my build** feature where you can send a photo and compare with the PDF using a checklist.

## How to open the app

1. Go to the folder: `Desktop\arduino-tutorial-app`
2. Double-click **index.html** to open it in your browser.

Or drag `index.html` into Chrome, Edge, or Firefox.

## What’s inside

- **Home** — Short intro and link to the PDF.
- **Projects** — All 15 projects from the book, one by one:
  1. Get to Know Your Tools  
  2. Spaceship Interface  
  3. Love-o-Meter  
  4. Color Mixing Lamp  
  5. Mood Cue  
  6. Light Theremin  
  7. Keyboard Instrument  
  8. Digital Hourglass  
  9. Motorized Pinwheel  
  10. Zoetrope  
  11. Crystal Ball  
  12. Knock Lock  
  13. Touchy-feely Lamp  
  14. Tweak the Arduino Logo  
  15. Hacking Buttons  

- **Each project has 4 sections:**
  - **Tutorial** — Summary and components (with link to the PDF).
  - **Build steps** — Step-by-step how to build it.
  - **Quiz** — Questions and answers; if you answer wrong, you get the correct answer and **how to fix** your understanding.
  - **Check my build** — Take or upload a photo of your build, then use the checklist to compare with the PDF and see if your build is OK.

## PDF

The app links to the Arduino Projects Book PDF here:  
[https://www.eitkw.com/wp-content/uploads/2020/03/Arduino_Projects_Book.pdf](https://www.eitkw.com/wp-content/uploads/2020/03/Arduino_Projects_Book.pdf)

Use it next to the app for full diagrams, code, and explanations.

## Files

- `index.html` — Main page and structure  
- `styles.css` — Layout and styling  
- `data.js` — All 15 projects (tutorial text, steps, quiz questions + fix text, checklists)  
- `app.js` — Navigation, tabs, quiz logic, photo preview, checklist  

No server or install needed — open `index.html` in a browser and use the app offline (except for opening the PDF in a new tab).
