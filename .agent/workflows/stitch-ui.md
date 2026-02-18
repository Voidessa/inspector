---
description: Generate UI components using Google Stitch AI and integrate into Next.js project
---

# Google Stitch UI Generation Workflow

## Prerequisites
- gcloud CLI installed and authenticated
- Stitch API enabled in Google Cloud project
- `.mcp.json` configured with your `STITCH_PROJECT_ID`

## Setup (one-time)

// turbo
1. Check if gcloud is installed:
```bash
gcloud --version
```

2. If not installed:
```bash
brew install google-cloud-sdk
```

// turbo
3. Authenticate with Google:
```bash
gcloud auth login
gcloud auth application-default login
```

4. Set your project:
```bash
gcloud config set project YOUR_PROJECT_ID
```

// turbo
5. Enable Stitch API:
```bash
gcloud services enable stitch.googleapis.com
```

// turbo
6. Test MCP package:
```bash
npx @_davideast/stitch-mcp --version
```

## Daily Usage

### Generate a UI component via Stitch

In Cursor or Gemini CLI, use the `@stitch` MCP tool:

```
@stitch list-projects
@stitch generate "a product card for a fashion store with image, title, price, and add to cart button"
```

### Pull generated design into project

// turbo
```bash
npx @_davideast/stitch-mcp serve --project-id $STITCH_PROJECT_ID
```

Then open `http://localhost:3000` to preview the generated component.

### Export and adapt

1. Copy the generated HTML/CSS/React from Stitch
2. Create a new file in `src/components/`
3. Adapt to TypeScript + Tailwind v4 conventions
4. Import and use in your pages

## Tips

- Describe components in detail: layout, colors, interactions
- Reference existing components for consistency: "similar to ProductCard but for categories"
- Use Stitch for initial design, then refine manually
- Always adapt generated code to match project's design system (globals.css tokens)
