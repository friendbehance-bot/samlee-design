import os, requests, json, sys
api_key = os.environ.get("AGNES_API_KEY")
headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
base = "https://apihub.agnes-ai.com/v1"
concepts = [
    {"name":"editorial","size":"1440x1024","prompt":"Professional furniture designer portfolio homepage mockup, editorial magazine style layout. Dark charcoal background with cream text overlay. Large bold typography SAM LEE as hero. Asymmetric grid layout with furniture photography bleeding off edges. Industrial aesthetic with warm wood accent tones. Clean sans-serif typography hierarchy. 4-column editorial grid for project thumbnails. Photo essay feel with generous whitespace and bold section dividers. High-end design portfolio, desktop viewport 1440x1024"},
    {"name":"minimal","size":"1440x1024","prompt":"Japanese-inspired minimalist furniture designer portfolio homepage. Immaculate white background with subtle warm grey tones. Delicate thin lines and generous whitespace. Small elegant typography with precise tracking. One large hero image of a furniture piece with soft lighting. Grid layout with 2px borders, 3-column project grid. Muted earth tones D4C5A9, 8B7355, F5F0EB as accent colors. Zen-like simplicity. No decorative elements. Desktop viewport design portfolio 1440x1024"},
    {"name":"craft","size":"1440x1024","prompt":"Warm artisanal furniture designer portfolio homepage. Rich cream F6F3EC background with deep walnut brown 5C4033 accent. Large art-directed hero with overlapping text and image. Hand-drawn style decorative elements. Texture overlays resembling Japanese paper. Photography presented in thin brass-colored frames. Mix of serif headlines and clean sans-serif body. Project cards with material-like depth. High-end design gallery meets craft workshop. Desktop viewport 1440x1024"}
]
for c in concepts:
    print(f"Generating: {c['name']}")
    payload = {"model": "agnes-image-2.1-flash", "prompt": c["prompt"], "size": c["size"]}
    r = requests.post(f"{base}/images/generations", json=payload, headers=headers, timeout=120)
    if r.ok:
        data = r.json()
        url = data.get("data",[{}])[0].get("url","")
        if url:
            img = requests.get(url, timeout=60)
            path = f"C:/Users/frien/Documents/portfolio/public/images/concept-{c['name']}.png"
            with open(path, "wb") as f: f.write(img.content)
            print(f"  Saved: concept-{c['name']}.png ({len(img.content)} bytes)")
        else:
            print(f"  No URL: {json.dumps(data)[:300]}")
    else:
        print(f"  Error: {r.status_code} {r.text[:200]}")
print("Done")