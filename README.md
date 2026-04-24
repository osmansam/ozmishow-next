# Ozmishow Next.js - SEO-Optimized Page Builder

## 🚀 Migration from React to Next.js

This is your migrated Next.js application with full SEO support, Server-Side Rendering (SSR), and schema-driven component rendering.

---

## 📋 Project Structure

```
ozmishow-nextjs/
├── app/                          # Next.js App Router
│   ├── [slug]/                  # Dynamic pages
│   │   └── page.tsx            # Page renderer with SSR
│   ├── api/
│   │   └── revalidate/         # On-demand revalidation
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── blocks/                 # Schema components (Hero, Gallery, etc.)
│   ├── component-registry.ts  # Component mapping
│   └── SchemaRenderer.tsx     # Core renderer
├── lib/
│   ├── api-client.ts          # Backend API client
│   ├── metadata.ts            # SEO metadata generators
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript types
├── .env.local                 # Environment variables
└── package.json
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd /Users/osmansamilerdogan/Desktop/ozmishow-nextjs
npm install
```

### 2. Configure Backend URL

Edit `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
# Or your production API:
# NEXT_PUBLIC_BACKEND_URL=https://api.yourbackend.com
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🔗 Backend API Requirements

Your Go backend needs these endpoints:

### Required Endpoints:

```
GET  /api/page-options
     → Returns array of PageOptionsType[]

GET  /api/pages/{slug}?language=en
     → Returns { pageOptions, containers }

GET  /api/pages
     → Returns all pages for sitemap
```

### Example Response:

```json
{
  "pageOptions": {
    "_id": "123",
    "pageNameEN": "home",
    "isNavbar": true,
    "isSubpage": false,
    "metadata": {
      "title": "Home | Ozmishow",
      "description": "Welcome to our site",
      "keywords": ["hotel", "booking"],
      "ogImage": "https://cdn.example.com/og-image.jpg"
    }
  },
  "containers": [
    {
      "_id": "c1",
      "componentName": "Hero",
      "componentType": "Hero",
      "language": "en",
      "position": 1,
      "page": "home",
      "props": {
        "variant": "fullscreen"
      },
      "data": {
        "title": "Welcome to Ozmishow",
        "backgroundImage": "https://..."
      }
    }
  ]
}
```

---

## 🎨 Migrating Your Components

### 1. Copy Component from React App

From your React app, copy the component:

```tsx
// Old location: ozmishow/src/components/carousel/CarouselType2.tsx
```

### 2. Adapt for Next.js

Move to:

```tsx
// New location: ozmishow-nextjs/components/blocks/CarouselType2.tsx
```

Make it accept schema props:

```tsx
interface CarouselType2Props {
  // Props from backend schema
  images?: string[];
  autoplay?: boolean;
  // ... other props
}

export default function CarouselType2({
  images,
  autoplay,
}: CarouselType2Props) {
  // Component code
}
```

### 3. Register in Component Registry

Edit `components/component-registry.ts`:

```tsx
import CarouselType2 from "./blocks/CarouselType2";

const componentRegistry = {
  // ... existing components

  CarouselType2: {
    component: CarouselType2,
    propBuilder: (item, page) => ({
      ...item.props,
      ...item.data,
      page,
    }),
  },
};
```

### 4. Test the Component

Visit: `http://localhost:3000/your-page`

---

## 🔍 SEO Features

### ✅ What's Included:

1. **Server-Side Rendering (SSR)**
   - Pages render on server with full content
   - Search engines see complete HTML

2. **Dynamic Metadata**
   - Title, description per page
   - Open Graph tags for social media
   - Twitter Cards

3. **Structured Data (JSON-LD)**
   - Schema.org markup
   - Rich snippets in search results

4. **Sitemap Generation**
   - Auto-generated from backend data
   - Updated automatically

5. **Robots.txt**
   - Controls crawler access

### Testing SEO:

```bash
# Build and run production mode
npm run build
npm start

# View sitemap:
http://localhost:3000/sitemap.xml

# View robots:
http://localhost:3000/robots.txt

# Test a page:
curl http://localhost:3000/home
# You'll see fully rendered HTML!
```

---

## ⚡ Caching Strategy

### ISR (Incremental Static Regeneration)

Pages are cached and revalidated every 60 seconds:

```tsx
// In app/[slug]/page.tsx
export const revalidate = 60;
```

### On-Demand Revalidation

When you update content in Go backend, trigger revalidation:

```go
// Go backend - after updating a page
func notifyNextJs(pageSlug string) {
    url := fmt.Sprintf(
        "%s/api/revalidate?secret=%s",
        os.Getenv("NEXTJS_URL"),
        os.Getenv("REVALIDATION_SECRET"),
    )

    payload := map[string]interface{}{
        "type": "page",
        "value": pageSlug,
    }

    // POST request
    http.Post(url, "application/json", payload)
}
```

---

## 🌍 Multi-Language Support

Pages support language via query param:

```
/home?lang=en
/home?lang=tr
```

The SchemaRenderer filters containers by language automatically.

---

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Option 3: Traditional Server

```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "ozmishow" -- start
```

---

## 🔄 Migration Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Configure backend URL in `.env.local`
- [ ] Test connection to Go backend
- [ ] Migrate 5-10 core components
- [ ] Register components in registry
- [ ] Test pages locally
- [ ] Verify SEO (view source, check metadata)
- [ ] Test sitemap generation
- [ ] Set up on-demand revalidation
- [ ] Deploy to staging
- [ ] Run Lighthouse audit
- [ ] Deploy to production
- [ ] Submit sitemap to Google Search Console

---

## 🛠️ Development Commands

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run type-check  # TypeScript check
```

---

## 📊 Performance

Expected Lighthouse scores:

- **Performance**: 90+
- **SEO**: 100
- **Accessibility**: 90+
- **Best Practices**: 95+

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"

Check `.env.local` and ensure Go backend is running:

```bash
# Test backend
curl http://localhost:8080/api/page-options
```

### Issue: "Component not rendering"

1. Check component is in registry
2. Verify componentName matches registry key
3. Check browser console for errors

### Issue: "Metadata not showing"

1. Check pageOptions includes metadata
2. View page source (not DevTools)
3. Verify generateMetadata is being called

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [SEO in Next.js](https://nextjs.org/learn/seo/introduction-to-seo)
- [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

---

## 🎉 What You Get

✅ **Full SEO** - Google can crawl and index your pages  
✅ **Server-Side Rendering** - Fast initial page loads  
✅ **Dynamic Metadata** - Perfect social media sharing  
✅ **Auto Sitemap** - Search engines find all pages  
✅ **Type Safety** - TypeScript throughout  
✅ **Modern Stack** - Next.js 15, React 18  
✅ **Same Backend** - Works with your Go API  
✅ **Easy Migration** - Keep your component logic

---

**Questions?** Check the code comments or Next.js docs!

**Ready to migrate?** Start with the setup instructions above! 🚀
# ozmishow-next
