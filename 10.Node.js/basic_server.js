/* USTVARI BASIC SERVER */
// ustvari server
const http = require('http');
// inline funkcija: request in response
const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<h1>Hello World</h1>'); //response (HTML format z text/html sicer plain text)
});
 //port, localhost, funkcija katero server zazene ob zacetku
server.listen(3000,'127.0.0.1', () => {
    console.log('Server running...');
});
