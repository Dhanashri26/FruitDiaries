import { mkdirSync, cpSync } from 'fs';
import { join } from 'path';

const dist = 'dist/fruitdiaries';
const output = '.vercel/output';

mkdirSync(join(output, 'functions/index.func'), { recursive: true });

// Copy server bundle
cpSync(join(dist, 'server'), join(output, 'functions/index.func/dist/server'), { recursive: true });

// Copy browser assets
cpSync(join(dist, 'browser'), join(output, 'static'), { recursive: true });

console.log('✅ Angular SSR output prepared for Vercel');
