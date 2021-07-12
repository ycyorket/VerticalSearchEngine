from bilibili_api import bangumi, sync
import json
import requests
from bs4 import BeautifulSoup
import json
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/65.0.3325.162 Safari/537.36 '
}
years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012]


async def main():
    b = await bangumi.get_meta(28231846)
    # 打印 bv 号
    with open('result', 'w') as f:
        print(json.dumps(b, indent=4, ensure_ascii=False), file=f)


def get_info_by_season_id(id):
    # url = 'https://bangumi.tv/subject/274234'
    url = f'https://bangumi.tv{id}'
    res = {}
    try:
        r = requests.get(url, headers=headers)
        r.encoding = 'utf-8'
        html = r.text
        soup = BeautifulSoup(html, 'lxml')
        title = soup.find('h1').find('a').text
        res['title'] = title
        info = soup.findAll('ul', attrs={'id': 'infobox'})
        assert len(info) == 1
        info = info[0]
        lis = info.findAll('li')
        for li in lis:
            tip = li.find('span').text
            text = li.text[len(tip):]
            tip = tip[:-2]
            res[tip] = text
    except Exception:
        print(f'{url} failed')
        pass
    finally:
        pass
    return res


def get_ids(year, page):
    url = f'https://bangumi.tv/anime/browser/airtime/{year}?page={page}'
    res = []
    try:
        r = requests.get(url, headers=headers)
        r.encoding = 'utf-8'
        html = r.text
        soup = BeautifulSoup(html, 'lxml')
        ul = soup.findAll('ul', attrs={'id': 'browserItemList'})
        assert len(ul) == 1
        ul = ul[0]
        a = ul.findAll('a', attrs={'class': 'l'})
        with open('result.txt', 'w') as f:
            for i in a:
                href = i.get('href')
                text = i.text
                print(href, text)
                res.append(href)
    finally:
        pass
    return res


def get_page_number(year):
    url = f'https://bangumi.tv/anime/browser/airtime/{year}'
    try:
        r = requests.get(url, headers=headers)
        r.encoding = 'utf-8'
        html = r.text
        soup = BeautifulSoup(html, 'lxml')
        page_edge = soup.find('span', attrs={'class': 'p_edge'}).text
        page_num = int(page_edge.strip('()').strip().split('/')[1].strip())
        return page_num
    finally:
        pass


def get_all_ids_save():
    for year in years:
        page_num = get_page_number(year)
        res = []
        for page in range(page_num):
            res += get_ids(year, page)
        with open(f'ids/{year}.id.json', 'w') as f:
            json.dump(res, f, ensure_ascii=False, indent=4)


def read_ids_by_year(year):
    f = open(f'ids/{year}.id.json', 'r')
    res = json.load(f)
    return res


def get_all_infos_save():
    for year in years[:1]:
        ids = read_ids_by_year(year)
        infos = []
        fails = []
        for id in ids:
            info = get_info_by_season_id(id)
            if not info:
                fails.append(id)
                continue
            infos.append(info)
        with open(f'infos/{year}.info.json', 'w') as f:
            json.dump(infos, f, ensure_ascii=False, indent=4)
        with open(f'failed/{year}.fail.json', 'w') as f:
            json.dump(fails, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
    if not os.path.exists('failed'):
        print('create directory "failed"')
        os.mkdir('failed')
    if not os.path.exists('ids'):
        print('create directory "ids"')
        os.mkdir('ids')
    if not os.path.exists('infos'):
        print('create directory "infos"')
        os.mkdir('infos')
    # get_all_ids_save()
    get_all_infos_save()
