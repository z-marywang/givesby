#!/usr/bin/env python3.9

from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["10000 per hour"]
)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@limiter.limit("5/second", override_defaults=True)
def index(path):
    return redirect("https://github.com/z-marywang/SpendNShare", code=302)


setup()
app.run('0.0.0.0', 80)

