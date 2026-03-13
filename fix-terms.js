const fs = require('fs');

let content = fs.readFileSync('app/terms/page.tsx', 'utf8');

// Show what's actually on line 34 for debugging
const lines = content.split('\n');
const line34 = lines[33];
console.log('Line 34 raw:', JSON.stringify(line34));

// Replace the entire Governing Law section entry with a safe version
content = content.replace(
  /\{ title: 'Governing Law', content: '[^']*'\s*\},/,
  "{ title: 'Governing Law', content: 'These terms are governed by the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of the applicable jurisdiction.' },"
);

// Replace the Contact entry with {clinic phone} JSX issue
content = content.replace(
  /\{ title: 'Contact', content: '[^']*\{clinic phone\}[^']*'\s*\},/,
  "{ title: 'Contact', content: 'For any questions about these terms, please contact us at our clinic directly.' },"
);

fs.writeFileSync('app/terms/page.tsx', content);
console.log('Done. Line 34 is now:', JSON.stringify(content.split('\n')[33]));
