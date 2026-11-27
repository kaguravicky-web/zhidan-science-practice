# How to write a topic file

The site is a home-practice page for one Singapore Primary 3 boy (going into P4) who failed P3 Science.
**Goal: AL1** (top band). Content must match the **MOE Primary Science syllabus (2023)** and the depth of
top-school tests (Raffles Girls', Nanyang, Henry Park): MCQs with statement combinations ("A and B only"),
charts, tables, graphs, experiment set-ups (fair tests), and open-ended questions that need exact keywords.

One topic = one file `topics/<id>.js`. `lv` is "P3", "P4" or "P3/P4" (taught in P3, examined again in P4). Copy the shape of `topics/classification.js` (the finished example) —
read it first, including its questions, to match the style and difficulty.

```js
(function(){
const PICS = { id: ["a/ab/File_name.jpg/330px-File_name.jpg", "english name", "中文名", "🧲"] };
const EMO  = { id: ["🧲", "english name", "中文名"] };          // things that need no photo
const CHARTS = { chartId: {type:"table", title:"...", ...} };
const LEARN = [ {sec:"1 · Section title 中文"}, {t:"Card title 中文", pics:["id"], emo:["id"], ch:"chartId", facts:["...<b>keyword</b>..."], zh:"中文要点", trap:"⚠️ common mistake"} ];
const SORTS = [ {id:"s1", title:"...", zh:"...", bins:[["K","Bin name","中文"],...], items:[["photoOrEmoId","K","short reason"],...]} ];
const SETS = [ {id:"m1", lv:1, title:"...", zh:"...", qs:[ {...}, ... ]} ];
TOPIC({id:"magnets", lv:"P3/P4", icon:"🧲", title:"Magnets", zh:"磁铁", pics:PICS, emo:EMO, learn:LEARN, charts:CHARTS, sets:SETS, sorts:SORTS});
})();
```

## Hard rules
- **No typing anywhere.** Everything is tapped. Open-ended skills are trained with "pick the full-mark answer" questions (level 4) that have a note per option (`n`).
- **At most 10 questions per set.** Aim for 4–6 sets per topic (40–60 questions), covering levels 1–4:
  - `lv:1` pictures / basics (recognise things, simple facts)
  - `lv:2` knowledge and traps
  - `lv:3` exam formats: charts, tables, bar graphs, experiments, statement combinations
  - `lv:4` full-mark answers (OEQ technique) with `n` notes — "✓ …", "½ …", "✗ …"
- Exactly **one** correct option, and it must be clearly correct by the syllabus. Wrong options must be plausible
  (real misconceptions), never silly. No "all of the above". No trick wording.
- Every question has `e` (short English explanation, says why) and `z` (short Chinese hint for the parent).
- Options are shuffled automatically. Use `fix:true` only when order matters (options like "A","B","C" or "P","Q","R" or numbers).
- Statement-combination questions: `st:["...","...","..."]` (2–4 statements, shown as A–D) and options such as
  "A and B only", "A, B and C only". Vary which combination is right across questions.
- English: simple, British spelling (colour, aluminium, metre, mould), Singapore context (HDB, hawker, MRT, rain trees).
- Write questions yourself. Never copy questions from websites or papers (copyright) — use them only to judge depth.

## No giveaways (answer length and shape)
A child must never be able to find the answer by picking the longest or most detailed option. (The first version failed
this: on Level 4 the right answer was the longest in 104 of 108 questions.) `tools/check.js` enforces it:
- Write all options **in the same shape and about the same length** (within ~25 %). A short answer with the right keyword beats
  a long one without it — so wrong options are often the longer ones.
- The right option must **never contain a wrong option inside it** (right = "Useful: yoghurt. Harmful: food poisoning.",
  wrong = "Useful: yoghurt." — the child just picks the superset).
- In each set the right option may be the longest in **at most 3** questions.
- **Level 4 ("which answer gets full marks?")**: every option is a complete-looking answer of the same shape (if the question
  asks for two things, every option gives two things). Each wrong option has ONE real exam mistake that a teacher would mark down:
  everyday words instead of the keyword ("dark" instead of "opaque", "hot" instead of "gains heat"), one of the two parts wrong
  (a fungus given as a bacterium, a use that is not a use), the reason missing but padded with a true but irrelevant detail,
  cause and effect reversed, an observation instead of an explanation, an over-statement ("all bacteria", "never").
  Never nonsense options — the child must need science to tell them apart.
- **No "odd one out" either.** If every wrong option is the right answer with ONE half swapped, the right answer is the one the
  others agree with, and a test-wise child picks it without knowing the science. For answers with two parts (two functions;
  property + reason; change + reason; keyword + link) build the options as a **2×2 grid**: right+right ✓, right+wrong ½,
  wrong+right ½, wrong+wrong ✗ — then each half appears exactly twice and no option is "the middle one". For one-part answers,
  make the wrong options differ from the right one AND from each other in different ways. `check.js` allows the right option
  to be the one sharing the most words with the others in at most 3 questions per set.
- Notes `n` start with ✓ (full marks, only on the right option), ½ (part marks) or ✗ (no marks) and say exactly which word or
  idea earns or loses the mark. The page shows ½ options in amber ("half marks"), not red.

## Question fields
`q` question (use `\n` for a new line, `___` for a blank) · `o` 2–4 options · `a` index of the right option in `o` ·
`e` explanation · `z` 中文提示 · optional: `st` statements, `pic:["id"]` photos above the question (their names are
hidden, so a photo can be the question), `pl:["Plant A","Plant B"]` labels under the photos, `ch:"chartId"` a chart
above the question, `n:[...]` one note per option (level 4), `fix:true`.

## Charts (`CHARTS`)
- `table`: `{type:"table", title, cols:["Material","bends easily","waterproof"], rows:[["P",1,0],["Q","5 cm",1]]}` — 1 = ✓, 0 = ✗, other values shown as text.
- `bars`: `{type:"bars", title, unit:"paper clips", rows:[["Magnet A",12],["Magnet B",5]]}` — a simple bar graph.
- `tree`: classification tree `{type:"tree", title, root:{t:"Animals", kids:[{t:"has feathers", g:"A"}, ...]}}` (see classification.js).
- `flow`: yes/no flow chart (see `plantflow` in classification.js). `key`: binary key with question boxes (see `key`).
- `groups`: `{type:"groups", title, groups:[["A",["iron nail","steel spoon"]],["B",["copper wire"]]]}`.
- `svg`: a diagram you draw: `{type:"svg", title, svg:"<svg viewBox='0 0 320 180' xmlns='http://www.w3.org/2000/svg'>…</svg>"}`.
  Keep it simple and clear (labels as letters A, B, C… or short words, font-size ≥ 13, stroke ≥ 2, plain colours,
  no scripts/links, under ~5 KB). Use it for set-ups: torch–object–screen, magnet and clips, a ring-barked stem,
  beakers wrapped in different materials, the digestive system with lettered parts, a syringe, a measuring cylinder.
  Make sure the drawing actually matches the question (letters in the right places).

## Photos
Real photos help a lot (he did not know what moss was). Use Wikimedia Commons thumbnails, hotlinked — do **not** download image files.
- Find them with the API, in as few requests as possible (it rate-limits; on HTTP 429 wait 60–90 s; never more than ~4 requests a minute).
  Send header `User-Agent: kids-science-practice-page/1.0 (static educational page)`.
  - Lead photo of several Wikipedia articles in ONE request:
    `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail|name&pithumbsize=330&redirects=1&format=json&formatversion=2&titles=Butterfly|Mosquito|Seedling`
  - Search Commons files: `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=bean+seedling&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=330&format=json&formatversion=2`
- Store the part of the thumb URL after `https://thumb.wikimedia.org/wikipedia/commons/thumb/` (drop any `?utm…`), e.g.
  `"4/45/Green_moss_growing_on_a_rock.jpg/330px-Green_moss_growing_on_a_rock.jpg"`.
- Prefer clear, single-subject photos; avoid old drawings, collages, scary close-ups. The file name is your only clue,
  so choose names that clearly describe the subject (e.g. "Monarch_butterfly_chrysalis.jpg"). The lead reviewer will look at every photo.
- Photo ids are shared across topics — reuse ids from classification.js where they fit (e.g. `frog`, `tadpole`), and pick new, specific ids otherwise.
- Use `EMO` (emoji) for everyday objects that need no photo (🥄 spoon, 🧦 sock, 🔦 torch…).

## Learn cards
6–12 cards per topic, grouped by `{sec:"…"}` headings. Each card: photos and/or a diagram, 3–6 short facts with
<b>keywords</b>, a Chinese summary `zh`, and a `trap` for the commonest exam mistake. Teach exactly what the questions test,
including the exam keywords ("absorbs water", "attracts magnetic materials", "conducts heat", "occupies space", …).

## Golf science cards
Every unit starts its learn cards with `{sec:"⛳ Golf science 高尔夫里的科学", golf:1}` and 1–3 cards marked `golf:1`
(shown green). He plays golf every day and understands wind, carry, slopes and greens, so these cards start the unit
from things he knows on the course (grass, fungi after rain, pond animals, bunker sand, shadows, clubs, sprinklers)
and lead into the unit's exam keywords. Same rules as other cards: correct by the syllabus, keywords in <b>, a `zh` and a `trap`.
Only claim what is true for most gear ("most driver heads are titanium") and invite him to test it himself.

## Sort games
1–2 per topic where it makes sense (magnetic / not magnetic; solid / liquid / gas; good / poor conductor of heat;
transparent / translucent / opaque; 3-stage / 4-stage life cycle). At least 8 items, each with a short reason.

## Check before you finish
Run `node tools/check.js topics/<id>.js` from the repo root — it must print "no problems". Then re-read every question
once more as a strict Singapore science teacher: is the marked answer the only correct one? Is the explanation right?
Do not edit any file other than your own `topics/<id>.js` files.
