# Netlify Deployment Instructions

## Environment Variable Setup (CRITICAL)

When adding environment variables to Netlify, follow these exact steps to ensure your Google Sheets integration works:

1. Go to Netlify dashboard → Site settings → Environment variables
2. Add the following three variables:

### 1. SHEET_ID
```
Copy the ID from your Google Sheet URL:
https://docs.google.com/spreadsheets/d/YOUR-SHEET-ID-HERE/edit
```

### 2. GOOGLE_SERVICE_ACCOUNT_EMAIL
```
waitlist-sheets@gen-lang-client-0622333307.iam.gserviceaccount.com
```

### 3. GOOGLE_PRIVATE_KEY
```
Add the ENTIRE private key string INCLUDING the BEGIN and END markers.

IMPORTANT: You MUST format it in one of these two ways:

OPTION 1 (PREFERRED) - With escaped newlines:
"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChlGMUphIvag1P\n4N4tgwqIogE+pyNi2JcTqvstLQHx34cPc/dYXn1k4QSFBFTPtZuSt/Jxj0x9/ZiB\n..." 

OPTION 2 - With actual line breaks (each line on a new line)
```

## Troubleshooting

If you still encounter errors:

1. Check the function logs in Netlify (Functions → join-waitlist → Logs)
2. Make sure your Google Sheet has columns exactly named "email" and "date"
3. Verify the sheet is shared with the service account email with Editor permissions
4. Try deploying a new version after making any environment variable changes

## Local Development Testing

To test locally, install the Netlify CLI and run:

```bash
npm install -g netlify-cli
npm install
netlify dev
```
