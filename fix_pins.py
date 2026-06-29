import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Step 1: Add pins to i18n.json
with open('content/i18n.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add pins field to contactPage
data['zh']['contactPage']['pins'] = 'Pins'
data['en']['contactPage']['pins'] = 'Pins'

with open('content/i18n.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('i18n.json updated')

# Step 2: Update contact page - add Pins card
with open('src/app/(pages)/contact/page.tsx', 'r', encoding='utf-8') as f:
    contact = f.read()

# Add Pins item to the cards array
old_cards = '''{h:cp.pexels,v:"pexels.com/@sam-lee",n:cp.follow_photo,link:"https://www.pexels.com/@sam-lee-2162121365/"},'''
new_cards = '''{h:cp.pexels,v:"pexels.com/@sam-lee",n:cp.follow_photo,link:"https://www.pexels.com/@sam-lee-2162121365/"},
            {h:cp.pins,v:"pinterest.com/@friends在014",n:cp.follow_photo,link:"https://pinterest.com/@friends在014"},'''

contact = contact.replace(old_cards, new_cards)

with open('src/app/(pages)/contact/page.tsx', 'w', encoding='utf-8') as f:
    f.write(contact)
print('Contact page updated')

# Step 3: Update homepage CTA - add Pins link
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    home = f.read()

old_pexels = '''<a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="mono text-sm text-[#666] hover:text-[#1A1A1A] transition-colors">Pexels</a>'''
new_social = '''<a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="mono text-sm text-[#666] hover:text-[#1A1A1A] transition-colors">Pexels</a>
            <a href="https://www.pinterest.com/friends%E5%9C%A8014/" target="_blank" rel="noopener" className="mono text-sm text-[#666] hover:text-[#1A1A1A] transition-colors">Pins</a>'''

home = home.replace(old_pexels, new_social)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(home)
print('Homepage updated')

# Step 4: Update Footer - add social links
with open('src/components/Footer.tsx', 'r', encoding='utf-8') as f:
    footer = f.read()

# Add social links before the copyright
old_footer_end = '<p className="text-xs text-[#999]">© 2026 Sam Lee</p>'
new_footer_end = '''<div className="flex gap-4 text-xs text-[#666]">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="hover:text-[#1A1A1A] transition-colors">Pexels</a>
            <a href="https://www.pinterest.com/friends%E5%9C%A8014/" target="_blank" rel="noopener" className="hover:text-[#1A1A1A] transition-colors">Pins</a>
          </div>
          <p className="text-xs text-[#999]">© 2026 Sam Lee</p>'''

footer = footer.replace(old_footer_end, new_footer_end)

with open('src/components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(footer)
print('Footer updated')

print('All done!')
