<<<<<<< HEAD
from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
import json
from database import get_anime_info_by_id
from database import get_anime_by_conditions


app = Flask(__name__)

url_base = 'http://39.103.229.106/bangumi'


def log(*info):
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print(*info, file=f)
=======
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app, supports_credentials=True, resources=r'/*')
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)


@app.route('/fuzzySearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def fuzzy_search():
    req = request.get_data(as_text=True)
    keyword = json.loads(req)['keyword']
<<<<<<< HEAD
    log("FuzzySearch: ", keyword)
=======
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("FuzzySearch: ", keyword, file=f)
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)
    ans = {'valid': 'true'}
    return json.dumps(ans)


<<<<<<< HEAD
# todo: done
@app.route('/getAnimeInfo', methods=["POST", 'OPTIONS'])
@cross_origin()
def get_anime_info():
    req = request.get_data(as_text=True)
    id = json.loads(req)['id']
    log("getAnimeInfo: ", id)
    ans = {'valid': 'true', 'tags': {}}
    ans = get_anime_info_by_id(id)
    return json.dumps(ans, ensure_ascii=False)


=======
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)
@app.route('/query', methods=["POST", 'OPTIONS'])
@cross_origin()
def query():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
    tags = json.loads(req)['tags']
<<<<<<< HEAD

    log("Query: ", keyword, tags)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans, ensure_ascii=False)
=======
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("Query: ", keyword, str(tags), file=f)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans)
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)


@app.route('/associatedWordSearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def associated_word_search():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
<<<<<<< HEAD
    log("AssociatedWordSearch: ", keyword)
=======
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("AssociatedWordSearch: ", keyword, file=f)
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans)


<<<<<<< HEAD
# todo: done
=======
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)
@app.route('/recommend', methods=["POST", 'OPTIONS'])
@cross_origin()
def recommend():
    req = request.data.decode('utf-8')
    tags = json.loads(req)['tags']
<<<<<<< HEAD
    log("Recommend: ", tags)
    conditions = {
        'tag': tags
    }
    # ans = {'count': 0, 'result': []}
    ans = get_anime_by_conditions(conditions)
    return json.dumps(ans, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    log("YES!")
    app.run(host='127.0.0.1')

=======
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print("Recommend: ", str(tags), file=f)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans)


if __name__ == '__main__':
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        f.write("YES!")
    app.run(host='0.0.0.0')
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)
