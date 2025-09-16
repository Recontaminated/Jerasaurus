- when you make design changes note in in claude md and then keep consistent design across codenbase, if we make changes to design that make something different, ask me and we can change it everywhere

## Design System Guidelines

### Section Headers
- All section headers use: `text-3xl sm:text-4xl font-bold text-white/90`
- Consistent across: About, Tech Stack, Projects, Contact sections

### Section Label Tags
- All section label tags use: `rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur`
- Text style: `text-sm text-white/60`
- Used for: "Available for work", "A little about me", "Featured Work", etc.

### Decorative Backgrounds
- Gradient orbs use `bg-purple-500/10` and `bg-blue-500/10` with `blur-3xl`
- Positioned with negative margins to avoid being cut off by container overflow
- Allow overflow-visible on background containers while keeping content contained

### Project Cards
- Cover images are proxied through `/api/images` endpoint
- Gradient overlays for hover effects
- Tags use consistent pill style with subtle backgrounds

### Color Accents
- Purple gradient for special emphasis: `bg-gradient-to-r from-purple-400 to-blue-400`
- Used sparingly for key elements like "Projects" word in headers