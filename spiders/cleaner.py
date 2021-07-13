import json
from es import es_manager

def regularize(myDate):
    month = 0
    if '-' in myDate:
        l = myDate.split('-')
        month = int(l[1])
    else:
        l = myDate.split('年')
        if len(l) > 1:
            l = [l[0]] + l[1].split('月')
        else:
            return "十月"
        l = list(filter(lambda l: l != '', l))
        if len(l) > 1:  
            month = int(l[1])
        else:
            return "十月"
    if month < 4:
        return "一月"
    if 4 <= month < 7:
        return "四月"
    if 7 <= month < 10:
        return "七月"
    if month >= 10:
        return "十月"

filename = "infos/2021.info.json"
animeList = []
with open(filename) as f:
    animes = json.load(f)
for anime in animes:
    keys = anime.keys()
    if 'title' in keys and '中文名' in keys and '放送开始' in keys and '导演'  in keys and 'Copyright' in keys:
        new_anime = {}
        new_anime['日文名'] = anime['title']
        new_anime['中文名'] = anime['中文名']
        new_anime['季度'] = regularize(anime['放送开始'])
        new_anime['导演'] = anime['导演']
        new_anime['版权方'] = anime['Copyright']
        new_anime['原作'] = anime['原作'] if '原作' in keys else '原创'
        new_anime['话数'] = anime['话数'] if '话数' in keys else '*'
        new_anime['话数'] = int(new_anime['话数']) if new_anime['话数'] != '*' else 99999
        animeList.append(new_anime)

es = es_manager()
i = 1
for anime in animeList:
    es.createDocument(index="test", type="_doc", doc=anime, id=i)
    i += 1