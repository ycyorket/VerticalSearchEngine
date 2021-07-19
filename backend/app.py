from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
import json
from database import get_anime_info_by_id
from database import get_anime_by_conditions
from database import get_suggestion
from database import get_anime_info_by_cn_name


app = Flask(__name__)

url_base = 'http://39.103.229.106/bangumi'


def log(*info):
    with open('backend.txt', 'a+', encoding="utf-8") as f:
        print(*info, file=f)


# todo: done
@app.route('/fuzzySearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def fuzzy_search():
    req = request.get_data(as_text=True)
    keyword = json.loads(req)['keyword']
    log("FuzzySearch: ", keyword)
    res = get_anime_info_by_cn_name(keyword, size=6)
    # ans = {'valid': 'true'}
    return json.dumps(res)


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


# todo: done
@app.route('/query', methods=["POST", 'OPTIONS'])
@cross_origin()
def query():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
    # tags = json.loads(req)['tags']
    # log("Query: ", keyword)
    res = get_anime_info_by_cn_name(keyword, size=6)
    return json.dumps(res, ensure_ascii=False)


# todo: done
@app.route('/associatedWordSearch', methods=["POST", 'OPTIONS'])
@cross_origin()
def associated_word_search():
    req = request.data.decode('utf-8')
    keyword = json.loads(req)['keyword']
    log("AssociatedWordSearch: ", keyword)

    res = get_suggestion(keyword, fields=['中文名'])
    return json.dumps(res, ensure_ascii=False)


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