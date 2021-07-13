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

    