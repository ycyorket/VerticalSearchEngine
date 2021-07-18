import requests
from elasticsearch import Elasticsearch
import json

es = Elasticsearch('39.103.229.106:9200')

base_url = 'http://39.103.229.106:9200/bangumi'
headers = {
    'Content-Type': 'application/json'
}

index_name = 'bangumi'


# todo
def get_all_coprs():
    query = {
        'size': 0,
        'aggs': {
            '制作公司': {
                'terms': {'field': '制作公司', 'size': 20}
            },
        },
    }
    res = es.search(index='bangumi', body=query)['aggregations']
    # res = [item['key'] for item in res]
    print(res)


# todo
def get_anime_by_corp(corp):
    query = {
        'query': {
            'match': {
                '制作公司': corp
            }
        }
    }
    res = es.search(index=index_name, body=query)['hits']
    res = [item['_source'] for item in res['hits']]
    print(res)


def get_all_anime_ids():
    query = {
        'size': 0,
        'aggs': {
            'id': {
                'terms':{'field': 'id','size': 20}
            },
        },
    }
    res = es.search(index='bangumi', body=query)['aggregations']['id']['buckets']
    res = [item['key'] for item in res]
    # print(res)
    return res


def get_anime_info_by_id(id):
    query = {
        'query': {
            'term': {
                'id': id
            }
        }
    }
    res = es.search(index=index_name, body=query)['hits']['hits'][0]['_source']
    return res


def get_anime_by_director(director):
    query = {
        'query': {
            'match': {
                '导演': director
            }
        }
    }
    res = es.search(index=index_name, body=query)['hits']
    res = [item['_source'] for item in res['hits']]
    # print(res)
    return res


def get_anime_by_conditions(conditions:dict):
    shoulds = []
    for key in conditions.keys():
        should = []
        for value in conditions[key]:
            should.append({'match':{key: value}})
        shoulds.append({'bool': {'should': should}})
    query_body = {
        'query': {
            'bool':{'must': shoulds}
        }
    }
    # print(query_body)

    """
    query = {
        'query': {
            'bool': {
                'must': [
                    {
                        "bool": {
                            'should': [
                                {'match': {'中文名': '鬼灭之刃'}},
                            ]
                        },
                    },
                    {
                        "bool":{
                            'should': [
                                {'match': {'季度/月份': '1月'}},
                                {'match': {'季度/月份': '4月'}},
                            ]
                        },
                    },
                ],
            }
        }
    }
    """
    res = es.search(index=index_name, body=query_body)['hits']
    res = [item['_source'] for item in res['hits']]
    # print(json.dumps(res, indent=4, ensure_ascii=False))
    return res


if __name__ == '__main__':
    conditions = {
        '中文名': ['鬼灭之刃'],
        '季度/月份': ['1月', '4月', '10月']
    }
    get_anime_by_conditions(conditions)
