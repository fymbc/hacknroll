from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def helpdesk():
    data = request.json
    # Add your helpdesk logic here
    response = {'message': 'Helpdesk request received', 'data': data}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
