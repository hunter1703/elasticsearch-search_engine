from elasticsearch import Elasticsearch
import json

host, port = '10.200.6.157', 9200

es = Elasticsearch([{'host' : host, 'port' : port}])

def search(str):
	q = {
		"query" : {
			"match" : {
				"text" : str
				}
			},
		"highlight" : {
			"pre_tags" : ["<div class='highlight'>"],
			"post_tags" : ["</div>"],
			"fields" : {
				"text" : {}
			}
		},
		"size" : 1000
	}
	
	res = es.search(index = 'library', doc_type = 'book', body = q)
	return res
	