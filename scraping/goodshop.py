#!/usr/bin/env python3.9
import requests
import re

url = "https://www.goodshop.com/coupons/all/"
rx = 'class="link coupons" href="/coupons/(.*?)"'
num_pages = 254

links = []

for i in range(1, num_pages+1):
    content = requests.get(url+str(i)).text
    links += [m.group(1) for m in re.finditer(rx, content)]
    if i % 10 == 0:
        print(f"{i} of {num_pages} pages scraped")

print(links)

print(f"\n{len(links)} links found")

f = open("goodshop_urls.txt", "w")
[f.write(i+'\n') for i in links]
