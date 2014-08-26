
import os
import sys
import hashlib
import fnmatch
from os.path import join


def ImgHash(fn):
  x = hashlib.sha1()
  with open(fn) as f:
    c = f.read()
    size = len(c)
    x.update(c)
    hash = x.hexdigest()
    return size, hash

for root, dirs,files in os.walk('/Users/michael/Pictures/'):
  for name in files:
    if fnmatch.fnmatch(name, '*.jpg'):
      print name, ImgHash(join(root, name))