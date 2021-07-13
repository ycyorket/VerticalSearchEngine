# VerticalSearchEngine

创建索引语句
PUT http://localhost:9200/test
{
    "settings": {
        "index": {
            "number_of_shards": "5",
            "number_of_replicas": "0"
        }
    },
    "mappings": {
        "properties": {
            "日文名": {
                "type": "text",
                "analyzer": "whitespace"
            },
            "中文名": {
                "type": "text",
                "analyzer": "whitespace"
            },
            "导演": {
                "type": "text",
                "analyzer": "whitespace"
            },
            "原作": {
                "type": "text",
                "analyzer": "whitespace"
            },
            "版权方": {
                "type": "text",
                "analyzer": "whitespace"
            },
            "季度": {
                "type": "text",
                "analyzer": "whitespace"
            },
            "话数": {
                "type": "long"
            }
        }
    }
}