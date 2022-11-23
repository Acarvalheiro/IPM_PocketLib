from http.server import BaseHTTPRequestHandler, HTTPServer

JSON = '.json'

hostName = "localhost"
serverPort = 8080

user_folder = 'user/'
book_folder = '/folder/'

class Server(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.command == 'GET':
            print(self.path)
            operation = self.path.split('/')
            if operation[1] == 'user':
                self.getUser(operation[2])
            elif operation[1] == 'book':
                getBook(operation[2])


    def getUser(self, username):
        f = open(user_folder + username + JSON, 'r')
        content = f.read()
        self.send_response(200)
        self.send_header("Content-type: ", "application/json")
        self.end_headers()
        self.wfile.write(bytes(content, 'utf-8'))

    def getBook(self, bookname):
        f = open(book_folder + bookname + JSON, 'r')
        content = f.read()
        self.send_response(200)
        self.send_header("Content-type: ", "application/json")
        self.end_headers()
        self.wfile.write(bytes(content, 'utf-8'))





if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), Server)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")