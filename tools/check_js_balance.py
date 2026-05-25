import re,sys
p='c:/Users/c3413/Desktop/my website/contact.html'
text=open(p,encoding='utf-8').read()
scripts=re.findall(r'<script>(.*?)</script>',text,re.S)
if not scripts:
    print('NO_SCRIPTS')
    sys.exit(0)
js='\n'.join(scripts)
pairs={'(':')','{':'}','[':']'}
stack=[]
line=1
for i,ch in enumerate(js):
    if ch=='\n': line+=1
    if ch in pairs:
        stack.append((ch,line))
    elif ch in pairs.values():
        if not stack:
            print(f'UNMATCHED_CLOSING {ch} at line {line}')
            sys.exit(1)
        last,ln=stack.pop()
        if pairs[last]!=ch:
            print(f'MISMATCH {last}->{ch} at line {line}, opened at {ln}')
            sys.exit(1)
if stack:
    last,ln=stack[-1]
    print(f'UNMATCHED_OPEN {last} opened at line {ln}')
    sys.exit(1)
print('BALANCED')
