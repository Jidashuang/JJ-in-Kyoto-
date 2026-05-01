# Theme cover images

Drop seven JPGs here to replace the automatic fallback (each theme currently
uses its first linked place's heroImage until a curated shot is provided).

Filenames must match the feature slug exactly:

| File | Theme | Lead visual hook |
|---|---|---|
| `the-basement-hours.jpg` | The Basement Hours / 喫茶時間 | Basement stairwell looking down, or a thick coffee cup on aged wood with warm low-Kelvin light |
| `along-the-river.jpg` | Along the River / 川沿い | Picnic basket on Kamo stone steps, morning side-light, river in soft focus |
| `slow-hands.jpg` | Slow Hands / 手の仕事 | Craftsman's hands mid-action with copper/tin/paper/bamboo — no face |
| `reading-rooms.jpg` | Reading Rooms / 読む部屋 | A full book-spine wall shot at eye level, or a record dropping onto a turntable (5cm) |
| `counters-unchanged.jpg` | Counters Unchanged / 変わらぬ席 | A single bowl just landing on a dark wood counter, steam rising; flat daylight |
| `low-lanterns.jpg` | Low Lanterns / 夜、低く | Yanagikoji-style vertical alley, lanterns dropping from above, everything else dark |
| `steam-and-soap.jpg` | Steam & Soap / 湯の時間 | Funaoka-Onsen carved-wood entry or a textured bathhouse tile, late evening tone |

## Style rules that apply to all seven

- No visible faces. Hands, backs, shoulders, and objects only.
- No tourists, phones, signage, price tags.
- No cherry blossoms, maple leaves, geisha, or rickshaws.
- If a person appears, frame so the back/hand/silhouette carries the shot.
- Warm undertones: low-Kelvin light, stone/wood/ink tones; avoid oversaturated green/teal.
- Crop target: 3:2 (landscape). Min long edge 1800px.

See the full image direction per theme in the editorial plan —
each theme has 3 specific shot recipes beyond the cover.

## Fallback behavior

`src/data/features.ts` → `resolveFeatureCoverImage()` substitutes the lead
place's heroImage whenever the coverImage is absent or still uses the
`/images/features/{slug}.jpg` convention path. Adding a real JPG at the
matching path silently overrides the fallback with no other code change.
