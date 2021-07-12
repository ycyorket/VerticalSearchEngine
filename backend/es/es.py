#!python3
from elasticsearch import Elasticsearch

mappings = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 1,
        "analysis": {
            "filter": {
                "ngram_filter": {
                    "type": "ngram",
                    "min_gram": 2,
                    "max_gram": 3
                }
            },
            "analyzer": {
                "ngram_analyzer": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "ngram_filter"
                    ]
                }
            }
        }
    },

    "mappings": {    
        "properties": {
            "id": {"type": "long"},
            "mingzi": {"type": "text", "index": True},
            "na": {"type": "text"},
            "tags": {
                "type": "object",
                "properties": {
                    "region": {"type": "text", "index": True},
                    "type": {"type": "text", "index": True}
                }
            }
        }
    }
}

class es_manager:
    def __init__(self):
        self.es = Elasticsearch("localhost:9200")

    def createIndex(self, index: str):
        result = self.es.indices.create(index=index, ignore=400)

    def createType(self, index: str, mapping: dict):
        result = self.es.indices.create(index=index, body=mapping)

    def createDocument(self, index: str, type: str, doc: dict, id: int):
        result = self.es.create(index=index, doc_type=type, id=id, body=doc)

    def updateDocument(self, index: str, type: str, doc: dict, id: int):
        result = self.es.update(index=index, doc_type=type, id=id, body=doc)

    def deleteDocument(self, index: str, type: str, id: int):
        result = self.es.delete(index=index, doc_type=type, id=id)

es = es_manager()
#es.createType("test", mappings)
es.createDocument(index="test", type="_doc", doc={
    "id": 3,
    "mingzi": "你的名字",
    "na": "君の名は",
    "tags": {"region": "日本", "type": "番剧"}
    }, id=1)