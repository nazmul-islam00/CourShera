function tkAfter(label, text) {
    const match = text.match(new RegExp(`${label}\\s*Tk\\s*([\\d,]+\\.?\\d*)`, "i"));
    return match ? parseFloat(match[1].replace(",", "")) : null;
  }
  
function phoneAfter(word, text) {
    const match = text.match(new RegExp(`${word}\\s+(\\+?\\d[\\d\\-]{8,14})`, "i"));
    return match ? match[1] : null;
  }
  
  // ─── bKash ──────────────────────────────────────────────────────────────────
function parseBkash(body) {
  
    return {
      service: "bkash",
      amount: tkAfter("received", body),
      fee:    tkAfter("Fee", body),
      balance: tkAfter("Balance", body),
      from:   phoneAfter("from", body),
      trxId:  (body.match(/TrxID\s+([A-Z0-9]+)/i) || [])[1] || null,
      datetime: (body.match(/at\s+(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2})/) || [])[1] || null,
      raw: body,
    };
  }
  
  // ─── Nagad ──────────────────────────────────────────────────────────────────
function parseNagad(body) {
    return null;
  }
  
  // ─── Rocket ──────────────────────────────────────────────────────────────────
function parseRocket(body) {
    return null;
  }
  
export function parseSms(sender, body) {
    const s = sender.toLowerCase();
  
    if (s.includes("bkash"))  return parseBkash(body);
    if (s.includes("nagad"))  return parseNagad(body);
    if (s.includes("rocket")) return parseRocket(body);
  
    return null;
  }