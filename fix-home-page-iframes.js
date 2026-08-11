const fs = require('fs');

let content = fs.readFileSync('views/HomePage.tsx', 'utf8');

content = content.replace(/<iframe\s*src=\{project\.url\}\s*className="w-full h-full border-0 pointer-events-auto"\s*allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\s*allowFullScreen\s*loading="lazy"\s*\/>/g, 
  '<ReactPlayer url={project.url} width="100%" height="100%" light={true} playing={true} controls={true} className="w-full h-full border-0 pointer-events-auto" />'
);

fs.writeFileSync('views/HomePage.tsx', content);
