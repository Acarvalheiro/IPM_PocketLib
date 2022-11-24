from http.server import BaseHTTPRequestHandler, HTTPServer

JSON = '.json'

hostName = "localhost"
serverPort = 8080

user_folder = 'user/'
book_folder = '/folder/'


class Server(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.command == 'GET':
            print('GET\t' + self.path)
            operation = self.path.split('/')
            if operation[1] == 'user':
                self.getUser(operation[2])
            elif operation[1] == 'book':
                self.getBook(operation[2])

    def do_POST(self):
        if self.command == 'POST':
            print('POST\t' + self.path)
            operation = self.path.split('/')
            content_length = int(self.headers['Content-Length'])
            if operation[1] == 'user':
                content = self.rfile.read(content_length)
                print(content)
                self.writeUser(operation[2], content)

    def getUser(self, username):
        f = open(user_folder + username + JSON, 'r')
        content = f.read()
        self.send_response(200)
        self.send_header("Content-type: ", "application/json")
        self.end_headers()
        self.wfile.write(bytes(content, 'utf-8'))

    def writeUser(self, username, content):
        f = open(user_folder + username + JSON, 'w')
        f.write(str(content, 'utf-8'))
        self.send_response(200)

    def getBook(self, bookname):
        f = open(book_folder + bookname + JSON, 'r')
        content = f.read()
        self.send_response(200)
        self.send_header("Content-type: ", "application/json")
        self.end_headers()
        self.wfile.write(bytes(content, 'utf-8'))

    def writeBook(self, bookname, content):
        f = open(book_folder + bookname + JSON, 'w')
        f.write(str(content, 'utf-8'))
        self.send_response(200)


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), Server)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
