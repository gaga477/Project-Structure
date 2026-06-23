const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../client/index.html");
let content = fs.readFileSync(filePath, "utf8");

// Find the start and end of the printReceipt function
const fnStart = content.indexOf("  function printReceipt(");
if (fnStart === -1) { console.error("printReceipt not found"); process.exit(1); }

// Find the closing brace — walk forward tracking brace depth
// The function starts at fnStart. Find the opening { of the function body.
let braceDepth = 0;
let fnEnd = -1;
for (let i = fnStart; i < content.length; i++) {
  if (content[i] === "{") braceDepth++;
  else if (content[i] === "}") {
    braceDepth--;
    if (braceDepth === 0) { fnEnd = i + 1; break; }
  }
}

if (fnEnd === -1) { console.error("Could not find end of printReceipt"); process.exit(1); }

console.log("Found printReceipt from index", fnStart, "to", fnEnd);

const newFn = `  function printReceipt(cartItems = cart, cartTotal = total, receiptNo = Date.now().toString(), cashierName = localStorage.getItem("username") || "Cashier") {
    const date = new Date().toLocaleString("en-NG");

    // Each item: name + amount on same row; qty x unit price on row below
    const rows = (cartItems || []).map(i => {
      const lineTotal = (i.price * i.qty).toLocaleString();
      const unitPrice = (i.price || 0).toLocaleString();
      return \`<tr>
          <td style="font-weight:600;padding:2px 0">\${i.name}</td>
          <td style="text-align:right;font-weight:700;white-space:nowrap;padding:2px 0">&#8358;\${lineTotal}</td>
        </tr>
        <tr>
          <td style="padding:0 0 5px 6px;font-size:11px;color:#333">\${i.qty} x &#8358;\${unitPrice}</td>
          <td></td>
        </tr>\`;
    }).join("");

    const itemCount = (cartItems || []).reduce((a, i) => a + i.qty, 0);

    const w = window.open("", "PRINT", "width=320,height=600");
    w.document.write(\`<!DOCTYPE html><html><head><style>
      @media print {
        @page { margin: 2mm; size: 80mm auto; }
      }
      * { box-sizing: border-box; }
      body {
        font-family: 'Courier New', Courier, monospace;
        width: 76mm;
        margin: 0 auto;
        padding: 4px;
        font-size: 13px;
        color: #000;
      }
      h2 { text-align:center; font-size:16px; margin:4px 0 2px; letter-spacing:1px; }
      .c { text-align:center; margin:2px 0; font-size:12px; }
      hr { border:none; border-top:1px dashed #000; margin:6px 0; }
      table { width:100%; border-collapse:collapse; }
      td { vertical-align:top; padding:2px 0; font-size:13px; }
      td:last-child { text-align:right; white-space:nowrap; }
      .hdr { font-size:11px; font-weight:bold; text-transform:uppercase; border-bottom:1px solid #000; padding-bottom:3px; }
      .totline { display:flex; justify-content:space-between; font-size:15px; font-weight:bold; padding:4px 0 2px; }
      .subline { display:flex; justify-content:space-between; font-size:12px; padding:2px 0; }
      .foot { text-align:center; font-size:11px; margin:3px 0; }
    </style></head><body>

      <h2>ZUNNY MINI MART</h2>
      <p class="c">No: 221 New Ogorode Road, Sapele</p>
      <p class="c">Tel: 08088309326 / 07066787348</p>
      <hr>
      <p class="c">Receipt No: \${receiptNo}</p>
      <p class="c">Cashier: \${cashierName}</p>
      <p class="c">\${date}</p>
      <hr>

      <table>
        <thead>
          <tr>
            <td class="hdr">Item</td>
            <td class="hdr" style="text-align:right">Amount</td>
          </tr>
        </thead>
        <tbody>\${rows}</tbody>
      </table>

      <hr>
      <div class="subline"><span>Items sold:</span><span>\${itemCount}</span></div>
      <div class="totline"><span>TOTAL</span><span>&#8358;\${(cartTotal || 0).toLocaleString()}</span></div>
      <hr>
      <p class="foot">*** Thank you for shopping! ***</p>
      <p class="foot">Please come again &#9786;</p>
      <br><br>

    </body></html>\`);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); w.close(); }, 400);
  }`;

content = content.slice(0, fnStart) + newFn + content.slice(fnEnd);
fs.writeFileSync(filePath, content, "utf8");
console.log("✅ printReceipt patched successfully.");
