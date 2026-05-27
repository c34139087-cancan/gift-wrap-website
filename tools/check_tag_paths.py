import re
import os
root = os.path.dirname(os.path.abspath(__file__))
contact = os.path.join(root, '..', 'contact.html')
contact = os.path.normpath(contact)
with open(contact, 'r', encoding='utf-8') as f:
    s = f.read()
paths = re.findall(r"f:\\'([^']+)\\'", s)
paths += re.findall(r'f:\\"([^\\"]+)\\"', s)
paths = sorted(set(paths))
missing = []
for path in paths:
    full = os.path.normpath(os.path.join(root, '..', *path.split('/')))
    exists = os.path.exists(full)
    print(('OK ' if exists else 'MISSING'), path)
    if not exists:
        missing.append(path)
print('\nSummary:')
print('Total referenced:', len(paths))
print('Missing:', len(missing))
if missing:
    print('\nMissing files:')
    for p in missing:
        print(p)
