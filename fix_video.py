content = open("src/app/(pages)/contact/page.tsx", "r", encoding="utf-8").read()

# Replace video tag
old = "autoPlay muted loop playsInline controls preload=\"auto\""
new = "autoPlay muted playsInline controls preload=\"metadata\""
content = content.replace(old, new)

# Fix pins link
content = content.replace("pinterest.com/@friends\u00e5\u0153\u201d014", "pinterest.com/friendsz9014")
# Also try the raw bytes version
import re
content = re.sub(r"pinterest\.com/@[^\"\s]+", "pinterest.com/friendsz9014", content)

open("src/app/(pages)/contact/page.tsx", "w", encoding="utf-8").write(content)
print("Done")
