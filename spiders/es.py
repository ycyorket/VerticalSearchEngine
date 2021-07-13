<<<<<<< HEAD
from elasticsearch import Elasticsearch
import json

es = Elasticsearch('39.103.229.106:9200')

mappings = {
    "properties": {
        "id": {
            "type": "keyword",
        },

        "name": {
            "type": 'keyword',
        },

        "cover": {
            'type': 'keyword',
        },

        "开播时间": {
            'type': 'keyword',
        },

        "中文名": {
            "type": "text",
            "analyzer": "ik_max_word",
            "search_analyzer": "ik_max_word"
        },

        "日文名": {
            "type": "keyword",
        },

        "简介": {
            "type": "keyword",
        },

        "年份": {
            "type": "keyword",
        },

        "季度/月份": {
            "type": "keyword",
        },

        "导演": {
            "type": "text",
        },

        "版权方": {
            "type": "keyword",
        },

        "制作公司": {
            "type": "text",
        },

        "原作": {
            "type": "text",
        },

        "话数": {
            "type": "keyword",
        },

        "声优": {
            "type": "text",
        },

        "角色声优": {
            "type": "keyword",
        },

        "staff": {
            "type": "keyword",
        },

        "播放量": {
          "type": "keyword",
        },

        "追番": {
          "type": "keyword",
        },

        "评分": {
          "type": "keyword"
        },

        "tag": {
            "type": "text",
        },

        "是否完结": {
            "type": "keyword",
        },
    }
}
settings = {
    "index": {
        "number_of_shards": 3,
        "number_of_replicas": 0
    }
}


def create_index(index):
    body = {'mappings': mappings, 'settings':settings}
    es.indices.create(index=index, body=body)


def get_index_info(index):
    result = es.indices.get(index=index)
    return result


def put_doc(index, _id, _doc):
    es.create(index=index, id=_id, body=_doc)


def search(name):
    query = {
        "query": {
            "term": {
                '中文名': name
            }
        }
    }
    res = es.search(index='bangumi', body=query)
    print(res)


def load_bangumi(year):
    with open(f'infos/{year}.info.json', 'r') as f:
        return json.load(f)


def load_bilibili():
    with open(f'bilibili.json', 'r') as f:
        return json.load(f)


def parse_date(date:str):
    date = date.replace('/', '-')
    date = date.replace('年', '-')
    date = date.replace('月', '-')
    date = date.replace('日', '')
    date += '-' * (2 - date.count('-'))
    ymd = date.split('-')
    assert len(ymd) >= 3
    return ymd[0], ymd[1], ymd[2]


def build_doc(info:dict):
    cvs = info.get('角色声优')
    if cvs is not None:
        cvs = cvs.split('\n')
        cvs = [cv.split('：')[1] for cv in cvs]
        cvs = ','.join(cvs)
    name = info.get('中文名')
    res = {
        'name':  name,
        'id':    info.get('id'),
        'cover': info.get('cover'),
        '中文名': info.get('中文名'),
        '日文名': info.get('title'),
        '简介':   info.get('简介'),
        "年份":   parse_date(info.get('放送开始', info.get('上映年度', "")))[0],
        "季度/月份": parse_date(info.get('放送开始', info.get('上映年度', "")))[1] + '月',
        "导演":   info.get('导演'),
        "版权方": info.get('版权方'),
        "制作公司": info.get('制作公司'),
        "原作": info.get('原作'),
        "话数": info.get('话数'),
        "声优": cvs,
        "角色声优": info.get('角色声优'),
        "staff": info.get('Staff'),
        "播放量": info.get('播放量'),
        "追番": info.get('系列追番人数'),
        "评分": info.get('评分'),
        "tag": info.get('tags'),
        "是否完结": info.get('完结情况'),
    }
    return res


def update_doc(index, id, new_data):
    body = {
        'doc': new_data
    }
    res = es.update(index=index, id=id, body=body)
    return res


def exist_doc(doc):
    name = doc['中文名']
    query = {
        "query": {
            "constant_score": {
                "filter": {
                    "term": {
                        "name": name
                    }
                }
            }
        }
    }
    res = es.search(index='bangumi', body=query)
    cnt = res['hits']['total']['value']
    return cnt > 0


def from_bangumi(year):
    bangumis = load_bangumi(year)
    for bangumi in bangumis[500:]:
        doc = build_doc(bangumi)
        id = doc.get('id')
        name = doc.get('中文名')
        if not name:
            print(id, 'name null')
            continue
        if exist_doc(doc):
            print(id, name, 'existed')
            continue
        print(id, name, 'putting...')
        put_doc('bangumi', id, doc)


def from_bilibili():
    bangumis = load_bilibili()
    for bangumi in bangumis:
        doc = build_doc(bangumi)
        if exist_doc(doc):
            id = doc['id']
        break


if __name__ == '__main__':
    # create_index('bangumi')
    from_bangumi(2020)
=======
#!python3
from elasticsearch import Elasticsearch

class es_manager:
    def __init__(self):
        self.es = Elasticsearch("localhost:9200")

    def createType(self, index: str, mapping: dict):
        result = self.es.indices.create(index=index, body=mapping)

    def createDocument(self, index: str, type: str, doc: dict, id: int):
        result = self.es.create(index=index, doc_type=type, id=id, body=doc)

    def updateDocument(self, index: str, type: str, doc: dict, id: int):
        result = self.es.update(index=index, doc_type=type, id=id, body=doc)

    def deleteDocument(self, index: str, type: str, id: int):
        result = self.es.delete(index=index, doc_type=type, id=id)

    
>>>>>>> 5a91d19 (增加了后端代码,丰富了前端页面)
