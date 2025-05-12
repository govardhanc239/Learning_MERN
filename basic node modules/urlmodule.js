// import http from 'http';
// import { parse } from 'url';
// const adr = 'http://username:password@localhost:8080/path/name/index.html?id=123&month=april#section2';
// const parsedUrl = url.parse(adr, true)
// const server = http.createServer((req, res) => {
//   const q = parse(req.url, true); // Parse URL
//   const query = q.query;

//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write(`<h1>Hello!</h1><p>You searched for: ${query.month}</p>`);
//   res.end();
// });

// server.listen(8080);


// import http from 'http';
// import { parse } from 'url';

// const server = http.createServer((req, res) => {
//   const parsedUrl = parse(req.url, true); // `true` gives parsed query object

//   res.writeHead(200, { 'Content-Type': 'text/html' });

//   res.write('<h2>Parsed URL Properties</h2>');
//   res.write('<ul>');
//   res.write(`<li><strong>href:</strong> ${req.url}</li>`);
//   res.write(`<li><strong>protocol:</strong> http:</li>`); // http module always uses http
//   res.write(`<li><strong>host:</strong> ${req.headers.host}</li>`);
//   res.write(`<li><strong>pathname:</strong> ${parsedUrl.pathname}</li>`);
//   res.write(`<li><strong>search:</strong> ${parsedUrl.search}</li>`);
//   res.write(`<li><strong>query:</strong> ${JSON.stringify(parsedUrl.query)}</li>`);
//   res.write(`<li><strong>hash:</strong> (not available in server – handled by browser only)</li>`);
//   res.write('</ul>');

//   res.end();
// });

// server.listen(8080, () => {
//   console.log('Server running on http://localhost:8080');
// });
