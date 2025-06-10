const { GoogleSpreadsheet } = require('google-spreadsheet');

export default async (req) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method not allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
    );
  }
  
  try {
    // Log environment variables (without revealing secrets)
    console.log('SHEET_ID exists:', !!process.env.SHEET_ID);
    console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL exists:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('GOOGLE_PRIVATE_KEY exists:', !!process.env.GOOGLE_PRIVATE_KEY);
    
    const body = await req.json();
    const { email } = body;
    
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        }
      );
    }

    // Connect to Google Sheets using environment variables
    const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
    
    // Properly format the private key
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    console.log('Attempting to authenticate with Google Sheets...');
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey
    });

    // Load document and sheet
    console.log('Loading document info...');
    await doc.loadInfo();
    
    console.log('Sheet title:', doc.title);
    console.log('Available sheets:', doc.sheetCount);
    
    const sheet = doc.sheetsByIndex[0];
    console.log('Using sheet:', sheet.title);
    
    // Add row
    console.log('Adding new row with email:', email);
    await sheet.addRow({
      email: email,
      date: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ success: true, message: "Thank you for joining our waitlist!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
    );
  } catch (error) {
    console.log('Error adding to waitlist:', error);
    console.log('Error details:', error.message);
    console.log('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to add you to the waitlist", 
        error: error.message 
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
    );
  }
};
