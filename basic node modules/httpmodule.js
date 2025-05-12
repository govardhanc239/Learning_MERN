// httpmodule.js (ES Module version)

// import http from 'http';         // Replace require() with import
// import { myDateTime } from './mytimemodule.js';  // Make sure extension `.js` is mentioned

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('The date and time are currently: ' + myDateTime());
//     res.end('Hello World!');
// });

// server.listen(8090, () => {
//     console.log('Server is running on port 8090');
// });

// import http from 'http';         // 
// const server =http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(req.url);
//     res.end();
//   });

//   server.listen(8080), ()=>{
//     console.log('Server is running on port 8080');
//   }

// import http from 'http';  
// import fs from 'fs';       

// const server = http.createServer(function (req, res) {
//     // Append some extra content inside demo.html

//     fs.open('demo.html', 'a', (err, fd) => {
//         if (err) throw err;
//         fs.appendFile('demo.html', `<p>New visitor visited URL: ${req.url}</p>\n`, (err) => {
//             if (err) throw err;
//             console.log('Content appended to demo.html!');
//     })
    
//     });

//     // Now read and show the updated demo.html
//     fs.readFile('demo.html', (err, data) => {
//         if (err) {
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.write('Error reading file.');
//             return res.end();
//         }
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         return res.end();
//     });
// });

// server.listen(8080, () => {
//     console.log('Server is running on port 8080');
// });

// import http from 'http';
// import fs from 'fs';

// const server = http.createServer(function (req, res) {
//     // Overwrite the demo.html file with new content
//     fs.writeFile('demo.html', `<h1>New File Content</h1><p>Visitor at URL: ${req.url}</p>\n`, (err) => {
//         if (err) throw err;
//         console.log('File overwritten using writeFile()');
//     });

//     // Read and show updated demo.html
//     fs.readFile('demo.html', (err, data) => {
//         if (err) {
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.write('Error reading file.');
//             return res.end();
//         }
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         return res.end();
//     });
// });

// server.listen(8080, () => {
//     console.log('Server is running on port 8080');
// });


import http from 'http';
import fs from 'fs';
import url from 'url';

const server = http.createServer((req,res)=>{
    const q = url.parse(req.url,true);
    const filename = "." + q.pathname;
    fs.readFile(filename,(err,data)=>{
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
})

server.listen(8080, () => {
 console.log('Server is running on port 8080');
});