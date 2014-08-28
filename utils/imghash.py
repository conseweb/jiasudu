
import os
import sys
import hashlib
import fnmatch
from os.path import join
import json


def ImgHash(fn):
  x = hashlib.sha1()
  with open(fn) as f:
    c = f.read()
    size = len(c)
    x.update(c)
    hash = x.hexdigest()
    return size, hash

def getHashs():
  for root, dirs,files in os.walk('/Users/michael/Pictures/'):
    for name in files:
      if fnmatch.fnmatch(name, '*.jpg'):
        size,hash = ImgHash(join(root, name))
        x = {}
        x['path'] = '/images/%s' % name
        x['size'] = size
        x['hash'] = hash
        x['site'] = '53fb0f147b2a91e1d1870ca5'
        print json.dumps(x)

getHashs()