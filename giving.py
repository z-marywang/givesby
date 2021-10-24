#!/usr/bin/env python3.9
import requests
import re
import string

url = "https://www.givingassistant.org/sitemap/"
ends = list(string.ascii_lowercase) + ["list"]
rx = 'href="/coupon-codes/(.*?)"'

links = set()

for i in ends:
    content = requests.get(url+str(i)).text
    links |= {m.group(1) for m in re.finditer(rx, content)}
    print(f"Scraped '{i}'")

print(links)

print(f"\n{len(links)} links found")

f = open("givingassistant_urls.txt", "w")
[f.write(i+'\n') for i in links]
