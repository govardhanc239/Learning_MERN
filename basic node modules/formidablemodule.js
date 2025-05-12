// import http from 'http';
// import formidable from 'formidable';
// import fs from 'fs';

// const server = http.createServer((req, res) => {
//   if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
//     const form = formidable({ uploadDir: './formidable-module', keepExtensions: true });

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         res.writeHead(400, { 'Content-Type': 'text/plain' });
//         res.end('Error in file upload');
//         return;
//       }

//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write('File uploaded successfully!');
//       res.end();
//     });
//   } else {
//     // Simple upload form
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(`
//       <form action="/upload" method="post" enctype="multipart/form-data">
//         <input type="file" name="myFile" />
//         <input type="submit" />
//       </form>
//     `);
//     res.end();
//   }
// });

// server.listen(8080, () => {
//   console.log('Server running on http://localhost:8080');
// });

// import http from 'http';
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // ES module __dirname workaround
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 1. Ensure upload folder exists
// const uploadPath = path.join(process.cwd(), 'uploads');
// console.log('Upload path:', uploadPath);
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

// // 2. Create server
// const server = http.createServer((req, res) => {
//   if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
//     const form = formidable({ uploadDir: uploadPath, keepExtensions: true });

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('File upload failed');
//         return;
//       }

//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write('<h2>File uploaded successfully!</h2>');
//       res.write(`<pre>${JSON.stringify(files, null, 2)}</pre>`);
//       res.end();
//     });
//   } else {
//     // 3. Serve the HTML form
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(`
//       <h2>Upload a file</h2>
//       <form action="/upload" method="post" enctype="multipart/form-data">
//         <input type="file" name="file"><br><br>
//         <input type="submit" value="Upload">
//       </form>
//     `);
//   }
// });

// // 4. Listen on port
// server.listen(8080, () => {
//   console.log('Server running on http://localhost:8080');
// });


import http from 'http';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    const form = formidable({ keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error parsing the file');
        return;
      }

      const uploadedFile = files.filetoupload[0];
      const oldPath = uploadedFile.filepath;
      const newPath = path.join(__dirname, uploadedFile.originalFilename);

      // ✅ Copy file, then delete the original (fix for cross-device error)
      fs.copyFile(oldPath, newPath, (copyErr) => {
        if (copyErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error saving the file');
          return;
        }

        fs.unlink(oldPath, (unlinkErr) => {
          if (unlinkErr) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error cleaning up temp file');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('File uploaded and moved successfully!');
        });
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="filetoupload"><br>
        <input type="submit">
      </form>
    `);
  }
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
