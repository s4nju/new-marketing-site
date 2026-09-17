import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

// Run after replacing phone-mockup.png, then commit the variants and manifest.
const source = new URL('../public/images/phone-mockup.png', import.meta.url);
const output = new URL('../public/images/optimized/', import.meta.url);
await mkdir(output, { recursive: true });
const variants = { avif: [], webp: [] };
for (const width of [384, 640, 750, 1080]) {
  for (const format of ['avif', 'webp']) {
    const image = sharp(source.pathname).resize({ width });
    const { data, info } = await (format === 'avif'
      ? image.avif({ quality: 60, effort: 6 })
      : image.webp({ quality: 75, effort: 6 })).toBuffer({ resolveWithObject: true });
    const hash = createHash('sha256').update(data).digest('hex').slice(0, 12);
    const filename = `phone-${width}.${hash}.${format}`;
    await writeFile(new URL(filename, output), data);
    variants[format].push({ src: `/images/optimized/${filename}`, width: info.width, height: info.height });
  }
}
await writeFile(new URL('../lib/phone-images.json', import.meta.url), JSON.stringify(variants, null, 2) + '\n');
console.log('Generated responsive hero images (AVIF and WebP).');
