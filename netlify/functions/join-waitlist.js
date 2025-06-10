const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method not allowed" })
    };
  }
  
  try {
    const { email } = JSON.parse(event.body);
    
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Email is required" })
      };
    }

    // Connect to Google Sheets using environment variables
    const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
    
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    });

    // Load document and sheet
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    // Add row
    await sheet.addRow({
      email: email,
      date: new Date().toISOString()
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ success: true, message: "Thank you for joining our waitlist!" })
    };
  } catch (error) {
    console.log('Error adding to waitlist:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ success: false, message: "Failed to add you to the waitlist" })
    };
  }
};
