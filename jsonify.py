#!/usr/bin/env python3.9

import json

listify = lambda x: open(x).read().strip().split()

giving = listify("givingassistant_urls.txt")
goodshop = listify("goodshop_urls.txt")
altruisto = listify("altruisto_urls.txt")

url_sites = {"https://givingassistant.org": giving,
             "https://goodshop.com": goodshop,
             "https://altruisto.com": altruisto,
    }

all_urls = set()

for site in url_sites:
    all_urls |= set(url_sites[site])

out = {}

for url in all_urls:
    inner = []
    for site in url_sites:
        if url in url_sites[site]:
            inner.append(site)
    out[url] = inner

file = open("urls.json", 'w')
json.dump(out, file)
