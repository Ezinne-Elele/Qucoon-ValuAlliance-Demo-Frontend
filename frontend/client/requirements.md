## Packages
recharts | Required for Dashboard AUM Trend and Fund Allocation charts, plus Performance charts
date-fns | Required for formatting dates and calculating differences
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility to merge tailwind classes without style conflicts

## Notes
- This is a frontend-only build using mock data as requested.
- No API calls are made to a backend server. All state is managed locally in React components using the provided mock data.
- Tailwind config should ideally be extended with the specific Navy and Gold color palette, but CSS variables are heavily utilized in `index.css` to ensure exact color matching without modifying `tailwind.config.ts`.
- Custom icons are implemented exactly as specified in `Icons.tsx` without relying on external libraries like Lucide.
- JetBrains Mono is used for tabular numerical data, and Inter for general sans-serif text.
