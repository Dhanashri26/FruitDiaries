# How to Verify Meta Tags in Localhost View Source

## Step 1: Open the Correct URL
- Make sure you're viewing: `http://localhost:4000/blog/3`
- NOT: `http://localhost:4200/blog/3` (that's dev server, not SSR)

## Step 2: View Page Source (NOT Inspect Element)
- Right-click → "View Page Source" (or `Cmd+Option+U` on Mac, `Ctrl+U` on Windows)
- OR use: `view-source:http://localhost:4000/blog/3` in address bar

## Step 3: What to Look For in the `<head>` Section

### ✅ Title Tag (Should be dynamic)
```html
<title>The Nutritional Power of Blueberries</title>
```
- Should match the blog post title
- NOT: "Fruit Diaries" or "Buy fresh fruits online..."

### ✅ Meta Description (Should be dynamic)
```html
<meta name="description" content="Blueberries are small but mighty when it comes to nutrition. They are rich in antioxidants, vitamins, and minerals. Learn about the health benefits of incorporating blueberries into your diet.">
```
- Should match the blog post description
- NOT: "Buy fresh fruits online at affordable prices..."

### ✅ Open Graph Meta Tags (All should be present and dynamic)

1. **og:title** - Should match blog title
```html
<meta property="og:title" content="The Nutritional Power of Blueberries">
```

2. **og:description** - Should match blog description
```html
<meta property="og:description" content="Blueberries are small but mighty when it comes to nutrition. They are rich in antioxidants, vitamins, and minerals. Learn about the health benefits of incorporating blueberries into your diet.">
```

3. **og:image** - Should be the blog's image URL (FIXED - no double prefix)
```html
<meta property="og:image" content="https://images.unsplash.com/photo-1558364015-0d5ba7a4ba86?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
```
- Should start with `https://images.unsplash.com/...`
- NOT: `https://natures-basket-mocha.vercel.app/https://images.unsplash.com/...` (double prefix)

4. **og:url** - Should be the blog's URL
```html
<meta property="og:url" content="https://natures-basket-mocha.vercel.app/blog/3">
```

5. **og:type** - Should be "article" for blog posts
```html
<meta property="og:type" content="article">
```

6. **og:site_name** - Consistent across all pages
```html
<meta property="og:site_name" content="Fruit Diaries">
```

### ✅ Twitter Card Meta Tags
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="The Nutritional Power of Blueberries">
<meta name="twitter:description" content="Blueberries are small but mighty...">
<meta name="twitter:image" content="https://images.unsplash.com/photo-1558364015-...">
```

### ✅ Canonical Link
```html
<link rel="canonical" href="https://natures-basket-mocha.vercel.app/blog/3">
```

## Step 4: Verify SSR is Working
Look for this attribute in the `<app-root>` tag:
```html
<app-root ... ng-server-context="ssr">
```
- If you see `ng-server-context="ssr"` → SSR is working ✅
- If you see `ng-server-context="ssg"` → Pre-rendering only (not ideal for dynamic routes)

## Step 5: Test Different Blog Posts
- Test: `http://localhost:4000/blog/1`
- Test: `http://localhost:4000/blog/2`
- Test: `http://localhost:4000/blog/3`
- Each should have DIFFERENT meta tags (title, description, image)

## Common Issues:

### ❌ If meta tags are missing:
- Make sure you're using SSR server (`npm run serve:ssr:fruitdiaries`)
- NOT dev server (`ng serve`)

### ❌ If meta tags show default values:
- Check if resolver is working (check console logs)
- Verify blog data is being fetched

### ❌ If image URL has double prefix:
- Rebuild: `npm run build`
- Restart SSR server: `npm run serve:ssr:fruitdiaries`

## Quick Test Command:
```bash
curl -s http://localhost:4000/blog/3 | grep -E 'og:title|og:description|og:image' | head -5
```
Should show all three meta tags with correct values.

