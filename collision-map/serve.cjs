const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.geojson':'application/geo+json','.png':'image/png'};
http.createServer((req,res)=>{
  let file;
  try {file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));} catch {res.writeHead(400);res.end('Bad request');return;}
  const relative=path.relative(root,file);
  if(relative.startsWith('..') || path.isAbsolute(relative)){res.writeHead(403);res.end('Forbidden');return;}
  fs.stat(file,(error,stat)=>{
    if(error){res.writeHead(404);res.end('Not found');return;}
    if(stat.isDirectory())file=path.join(file,'index.html');
    fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data);});
  });
}).listen(4327,'127.0.0.1',()=>console.log('Data viz: http://127.0.0.1:4327'));
