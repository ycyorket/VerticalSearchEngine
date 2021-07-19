import requests
from pyquery import PyQuery as pq
import json
import time

all_mid = []
all_bangumi = []

def getMid():
    global all_mid
    # pagesize: 一次获取的番剧个数
    # page: 换页 < 68
    page = 1

    while page <= 68:
        params = {
            'season_version': '-1',
            'area': '-1',
            'is_finish': '-1',
            'copyright': '-1',
            'season_status': '-1',
            'season_month': '-1',
            'year': '-1',
            'style_id': '-1',
            'order': '3',
            'st': '1',
            'sort':  '0',
            'page': page,
            'season_type': '1',
            'pagesize': '50',
            'type': '1',
        }

        try:
            print("获取第 " + str(page) + " 页番剧列表")
            response = requests.get('https://api.bilibili.com/pgc/season/index/result', params = params)
            json_obj = json.loads(response.text)
            if json_obj['code'] == 0:
                ban_list = json_obj['data']['list']

            # media_id: 番剧编号
            for item in ban_list:
                all_mid.append(item.get('media_id'))

        except Exception as e:
            print(e)

        page += 1
    
    filename = "mid.txt"
    with open(filename, "w", encoding='utf-8') as f:
        json.dump(all_mid, f, ensure_ascii=False)
        print("加载入文件完成...")

def getDetails():
    global all_mid
    global all_bangumi
    bangumi_count = 0

    for mid in all_mid:
        bangumi_dict = {}
        print("mid" + str(mid))
        
        detail_url = 'https://www.bilibili.com/bangumi/media/md' + str(mid)
        d=pq(url=detail_url, encoding='utf-8')

        count = 0
        info = ""
        for item in d('body').find('script').items():
            if count == 1:
                info = item.text()
                break
            count += 1
        info = info.strip('window.__INITIAL_STATE__ = ')
        info = info.split(';(function()')[0]

        json_obj = json.loads(info)
        
        bangumi_dict['mid'] = mid
        bangumi_dict['中文名'] = json_obj['mediaInfo']['title']      # 标题 
        bangumi_dict['cover'] = json_obj['mediaInfo']['cover']      # 封面
        bangumi_dict['角色声优'] = json_obj['mediaInfo']['actors']  # 演员表
        bangumi_dict['简介'] = json_obj['mediaInfo']['evaluate']    # 简介
        bangumi_dict['title'] = json_obj['mediaInfo']['origin_name']  # 原名
        bangumi_dict['Staff'] = json_obj['mediaInfo']['staff']      # staff
        bangumi_dict['话数'] = json_obj['mediaInfo']['episode_index']['index'] # 话数
        is_finish = json_obj['mediaInfo']['publish']['is_finish']   # 完结情况
        if(is_finish == 1):
            is_finish = "已完结"
        else:
            is_finish = "未完结"
        bangumi_dict['完结情况'] = is_finish
        bangumi_dict['放送开始'] = json_obj['mediaInfo']['publish']['pub_date_show']    # 开播日期

        bangumi_dict['系列追番人数'] = json_obj['mediaInfo']['stat']['series_follow']  # 系列追番人数
        bangumi_dict['播放量'] = json_obj['mediaInfo']['stat']['views']  # 总播放
        if ( 'rating' in json_obj['mediaInfo']) :
            bangumi_dict['评分'] = json_obj['mediaInfo']['rating']['score'] # 评分

        tags = []
        # 获取标签
        for item in d('.media-tags span').items():
            tags.append(item.text())

        bangumi_dict['tags'] = tags

        all_bangumi.append(bangumi_dict)
        
        time.sleep(4)
        bangumi_count += 1
        print("第 " + str(bangumi_count) + " 部番剧: " + bangumi_dict['中文名'])

        if bangumi_count%300 == 0:
            filename = "bilibili_bangumi_info_" + str(bangumi_count/300) +".json"
            with open(filename, "w", encoding='utf-8') as f:
                json.dump(all_bangumi, f, ensure_ascii=False)
                print("加载入文件完成...")

    filename = "bilibili_bangumi_info.json"
    with open(filename, "w", encoding='utf-8') as f:
        json.dump(all_bangumi, f, ensure_ascii=False)
        print("加载入文件完成...")

if __name__ == "__main__":
    getMid()
    getDetails()