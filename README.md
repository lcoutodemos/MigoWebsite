# Migo Website

This is the landing page for Migo - the indispensable digital companion for modern dog ownership.

## Project Structure

- `index.html` - Main landing page HTML
- `styles.css` - CSS styling for the website
- `script.js` - JavaScript functionality
- `assets/` - Directory containing images and other assets
  - `dog-illustration.svg` - Vector illustration of dog mascot
- `AppOverview.md` - Product vision and roadmap document

## Features

The landing page includes:

- Value proposition section
- Features overview
- Coming soon / Beta signup section
- Mobile-responsive design

## Running the Website

To view the website locally, you can open the index.html file in a web browser, or run a local server:

```
cd /Users/lucascouto/Desktop/ProductMaking/MigoWebsite
python -m http.server
```

Then navigate to `http://localhost:8000` in your browser.

## Development

The site is built with standard HTML, CSS, and vanilla JavaScript with Google Sheets integration for the waitlist.

## Netlify Deployment

### Deploying to Netlify

1. Push this repository to GitHub
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect to your GitHub account and select the MigoWebsite repository
5. In the "Build settings" section, leave the defaults (Netlify will detect it's a static site)
6. Click "Deploy site"

### Setting up Environment Variables

Once deployed, you need to set up these three environment variables for the waitlist function:

1. Go to Site settings > Build & deploy > Environment
2. Click "Edit variables" and add:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Copy from your JSON file (client_email field)
   - `GOOGLE_PRIVATE_KEY`: Copy from your JSON file (private_key field - include the entire key with BEGIN/END markers)
   - `SHEET_ID`: Your Google Sheet ID

### Google Sheets Setup

1. Create a new Google Sheet
2. Share it with the service account email address with Editor permissions
3. Set up columns for "email" and "date" in the first sheet

### Local Development with Netlify Functions

To test the Netlify functions locally:

```bash
npm install
npm run dev
```
