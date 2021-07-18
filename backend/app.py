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


@app.route('/fuzzySearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def fuzzy_search():
    req = request.get_data(as_text=True)
    keyword = json.loads(req)['keyword']
    log("FuzzySearch: ", keyword)
    ans = {'valid': 'true'}
    return json.dumps(ans)


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


@app.route('/query', methods=["POST", 'OPTIONS'])
@cross_origin()
def query():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
    tags = json.loads(req)['tags']

    log("Query: ", keyword, tags)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans, ensure_ascii=False)


@app.route('/associatedWordSearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def associated_word_search():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
    log("AssociatedWordSearch: ", keyword)
    ans = {'count': 0, 'result': []}
    return json.dumps(ans)


# todo: done
@app.route('/recommend', methods=["POST", 'OPTIONS'])
@cross_origin()
def recommend():
    req = request.data.decode('utf-8')
    tags = json.loads(req)['tags']
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

