## Setup

Make sure to install the dependencies:

```bash
# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# bun
bun run dev
```

## Production

Build the application for production:

```bash
# bun
bun run build
```

Locally preview production build:

```bash
# bun
bun run preview
```

## Roadmap

- [ ] use tanstack infinite scroll instead of vueuse one
- [ ] use state instead of local storage to save books
- [ ] disable add to library button if book is already in library
- [ ] add empty state for library when no books are added
- [ ] add empty state for search results when no books are found
- [ ] add search books by language
- [ ] add dark mode
