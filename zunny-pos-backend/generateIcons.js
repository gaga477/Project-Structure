const fs = require('fs');
const zlib = require('zlib');

function createSimplePNG(size, outputPath) {
  const width = size;
  const height = size;

  // Create raw RGBA pixel data — green background (#16a34a)
  const pixels = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      // Green background
      pixels[i] = 22;      // R
      pixels[i+1] = 163;   // G
      pixels[i+2] = 74;    // B
      pixels[i+3] = 255;   // A

      // Draw white circle in center (cart icon area)
      const cx = width / 2, cy = height / 2, r = width * 0.35;
      const dx = x - cx, dy = y - cy;
      if (dx*dx + dy*dy < r*r) {
        pixels[i] = 255;
        pixels[i+1] = 255;
        pixels[i+2] = 255;
        pixels[i+3] = 255;
      }
    }
  }

  // Build PNG raw data (filter byte 0 per row)
  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0; // filter type None
    pixels.copy(row, 1, y * width * 4, (y + 1) * width * 4);
    rows.push(row);
  }
  const rawData = Buffer.concat(rows);
  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    const table = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[i] = c;
    }
    for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const typeB = Buffer.from(type);
    const crcB = Buffer.alloc(4);
    crcB.writeUInt32BE(crc32(Buffer.concat([typeB, data])));
    return Buffer.concat([len, typeB, data, crcB]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);

  fs.writeFileSync(outputPath, png);
  console.log(`Created: ${outputPath} (${size}x${size})`);
}

createSimplePNG(192, './public/icons/icon-192.png');
createSimplePNG(512, './public/icons/icon-512.png');
