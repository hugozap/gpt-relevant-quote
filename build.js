const esbuild = require('esbuild');
const tscPlugin = require('esbuild-plugin-tsc');

esbuild
  .build({
    entryPoints: ['functions/getQuotes.ts'],
    outfile: 'functions/getQuotes.js',
    bundle: true,
    platform: 'node',
    target: 'node12',
    external: ['axios'],
    plugins: [tscPlugin()],
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
