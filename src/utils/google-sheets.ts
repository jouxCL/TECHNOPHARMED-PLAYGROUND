import { SignJWT } from "jose";

export async function appendToSheet(data: any, env: any) {
  const SHEET_ID = env.GOOGLE_SHEET_ID;
  const CLIENT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

  // JWT Logic (Web Crypto API compliant)
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  let cleanKey = PRIVATE_KEY.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(cleanKey), c => c.charCodeAt(0));
  
  const privateKey = await crypto.subtle.importKey(
    "pkcs8", binaryDer, 
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, 
    false, ["sign"]
  );

  const jwt = await new SignJWT({
    iss: CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);

  // Get Access Token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const { access_token } = await tokenRes.json();

  // Append row
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        { 
          insertDimension: { 
            range: { sheetId: 0, dimension: "ROWS", startIndex: 1, endIndex: 2 }, 
            inheritFromBefore: false 
          } 
        },
        { 
          updateCells: { 
            range: { sheetId: 0, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 4 },
            rows: [{ values: [
              { userEnteredValue: { stringValue: data.name } },
              { userEnteredValue: { stringValue: data.email } },
              { userEnteredValue: { stringValue: data.phone || '' } },
              { userEnteredValue: { stringValue: data.message } },
            ]}],
            fields: "userEnteredValue"
          }
        }
      ]
    })
  });
}
