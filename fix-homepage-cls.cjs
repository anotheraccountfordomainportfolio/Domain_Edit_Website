const fs = require('fs');
let content = fs.readFileSync('views/HomePage.tsx', 'utf8');

content = content.replace(
  '<div className="relative w-full flex justify-center items-center">',
  '<div className="relative w-full flex justify-center items-center min-h-[24vw] md:min-h-[12vw]">'
);

fs.writeFileSync('views/HomePage.tsx', content);
