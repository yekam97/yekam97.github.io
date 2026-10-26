/** @type {import('next').NextConfig} */
// Static export: the whole site is prerendered (no server features), so it can
// be hosted on GitHub Pages. `trailingSlash` makes every page a folder with an
// index.html (/trayectoria/ -> out/trayectoria/index.html), which Pages serves
// without extra rewrites.
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
