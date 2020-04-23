var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request starting...');
    console.log(request.url);
    
    var filePath = '.' + request.url;
    filePath = filePath.split("?")[0];
    if (filePath == './')
        filePath = './index.html';
    
    var extname = path.extname(filePath);
    var contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.svg':
            contentType = 'application/svg+xml';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.ttf':
            contentType = 'font/ttf';
            break;
        case '.otf':
            contentType = 'font/otf';
            break;
        case '.eot':
            contentType = 'application/vnd.ms-fontobject';
            break;
        case '.woff':
            contentType = 'font/woff';
            break;
        case '.woff2':
            contentType = 'font/woff2';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
		default:
			contentType= "text/html";
			break;
    }
    fs.readFile(filePath, function(error, content) {
        if (error) {
			console.log("File Not found: ", filePath);
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
				console.log("Internal Server error: ", filePath);
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');