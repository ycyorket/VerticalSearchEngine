from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app, supports_credentials=True, resources=r'/*')


@app.route('/fuzzySearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def fuzzy_search():
    req = request.get_data(as_text=True)
    keyword = json.loads(req)['keyword']
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("FuzzySearch: ", keyword, file=f)
    ans = {'valid': 'true'}
    return json.dumps(ans)


@app.route('/query', methods=["POST", 'OPTIONS'])
@cross_origin()
def query():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
    tags = json.loads(req)['tags']
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("Query: ", keyword, str(tags), file=f)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans)


@app.route('/associatedWordSearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def associated_word_search():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("AssociatedWordSearch: ", keyword, file=f)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans)


@app.route('/recommend', methods=["POST", 'OPTIONS'])
@cross_origin()
def recommend():
    req = request.data.decode('utf-8')
    tags = json.loads(req)['tags']
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("Recommend: ", str(tags), file=f)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans)


if __name__ == '__main__':
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        f.write("YES!")
    app.run(host='0.0.0.0')
