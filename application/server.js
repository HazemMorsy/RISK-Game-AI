var http = require('http');  
var url = require('url');  
var fs = require('fs'); 

var server = http.createServer(function(request, response) {  
    var path = url.parse(request.url).pathname;
    console.log(path);
    if(request.url.indexOf('.html') != -1) {
        fs.readFile(__dirname + path, function (error, data) {
            if (error) {
                response.writeHead(404, {"COntent-type":"text/plain"});
                response.end("No Html Page Found.");
            } else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end(); 
            }

        });
    }
    else if(request.url.indexOf('.js') != -1) {
        fs.readFile(__dirname + path, function (error, data) {
            if (error) {
                response.writeHead(404, {"COntent-type":"text/plain"});
                response.end("No Javascript Page Found.");
            } else{
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.write(data);
                response.end(); 
            }

        });
    } 
    else if(request.url.indexOf('.css') != -1) {
        fs.readFile(__dirname + path, function (error, data) {
            if (error) {
                response.writeHead(404, {"COntent-type":"text/plain"});
                response.end("No CSS Page Found.");
            } else{
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end(); 
            }

        });
    } 
});  
server.listen(8082); 