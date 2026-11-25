// Checks every topic file in ../topics (or the files given as arguments).
// Usage: node tools/check.js            -> all topics
//        node tools/check.js topics/magnets.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
let files = process.argv.slice(2);
if (!files.length) files = fs.readdirSync(path.join(root, "topics")).filter(f => f.endsWith(".js")).map(f => path.join("topics", f));
const all = fs.readdirSync(path.join(root, "topics")).filter(f => f.endsWith(".js")).map(f => path.join("topics", f));

const TOPICS = [];
const ctx = vm.createContext({TOPIC: t => TOPICS.push(t), console});
const fileOf = {};
for (const f of all) {
  const before = TOPICS.length;
  try { vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, {filename: f}); }
  catch (e) { console.log(`✗ ${f}: script error: ${e.message}`); process.exitCode = 1; continue; }
  for (let i = before; i < TOPICS.length; i++) fileOf[TOPICS[i].id] = f;
}

// merged photo / emoji maps (topics may reuse each other's ids)
const PICS = {}, EMO = {}, probs = [];
for (const t of TOPICS) {
  for (const [k, v] of Object.entries(t.pics || {})) {
    if (PICS[k] && JSON.stringify(PICS[k]) !== JSON.stringify(v)) probs.push(`${t.id}: photo id "${k}" already used by another topic with a different photo`);
    PICS[k] = v;
    if (!Array.isArray(v) || v.length !== 4 || !/^[0-9a-f]\/[0-9a-f]{2}\/[^/]+\/\d+px-[^/]+$/.test(v[0])) probs.push(`${t.id}: photo "${k}" must be [thumbPath, en, zh, emoji] with a path like "a/ab/File.jpg/330px-File.jpg"`);
  }
  for (const [k, v] of Object.entries(t.emo || {})) { EMO[k] = v; if (!Array.isArray(v) || v.length !== 3) probs.push(`${t.id}: emo "${k}" must be [emoji, en, zh]`); }
}
const has = id => PICS[id] || EMO[id];
const CHART_TYPES = ["tree", "key", "flow", "table", "groups", "bars", "svg"];
const ids = new Set();
let grand = 0;

for (const t of TOPICS) {
  if (!files.some(f => path.resolve(root, f) === path.resolve(root, fileOf[t.id]))) continue;
  const P = m => probs.push(`${t.id}: ${m}`);
  if (ids.has(t.id)) P("duplicate topic id"); ids.add(t.id);
  for (const k of ["id", "lv", "icon", "title", "zh"]) if (!t[k]) P(`missing ${k}`);
  if (!["P3", "P4", "P3/P4"].includes(t.lv)) P(`lv must be "P3", "P4" or "P3/P4"`);
  const charts = t.charts || {};
  for (const [k, c] of Object.entries(charts)) {
    if (!CHART_TYPES.includes(c.type)) P(`chart ${k}: unknown type ${c.type}`);
    if (!c.title) P(`chart ${k}: needs a title`);
    if (c.type === "svg") {
      if (!/^<svg[\s\S]*viewBox=[\s\S]*<\/svg>$/.test((c.svg || "").trim())) P(`chart ${k}: svg must start with <svg ... viewBox=...> and end with </svg>`);
      if (/<script|on\w+=|href=/i.test(c.svg || "")) P(`chart ${k}: svg must not contain scripts, event handlers or links`);
      if ((c.svg || "").length > 6000) P(`chart ${k}: svg is very large (${c.svg.length} chars)`);
    }
    if (c.type === "table" && c.rows.some(r => r.length !== c.cols.length)) P(`chart ${k}: every row needs ${c.cols.length} cells`);
    if (c.type === "bars" && !(Array.isArray(c.rows) && c.rows.every(r => typeof r[1] === "number"))) P(`chart ${k}: bars rows must be [label, number]`);
  }
  // learn
  for (const c of t.learn || []) {
    if (c.sec) continue;
    if (!c.t || !Array.isArray(c.facts) || !c.facts.length || !c.zh) P(`learn card needs t, facts[], zh: ${c.t}`);
    [...(c.pics || []), ...(c.emo || [])].forEach(p => { if (!has(p)) P(`learn "${c.t}": unknown photo/emoji id ${p}`); });
    if (c.ch && !charts[c.ch]) P(`learn "${c.t}": unknown chart ${c.ch}`);
  }
  // sets
  const setIds = new Set(), texts = new Set();
  for (const s of t.sets || []) {
    if (setIds.has(s.id)) P(`duplicate set id ${s.id}`); setIds.add(s.id);
    if (![1, 2, 3, 4].includes(s.lv)) P(`set ${s.id}: lv must be 1-4`);
    if (!s.title || !s.zh) P(`set ${s.id}: needs title and zh`);
    if (!s.qs.length || s.qs.length > 10) P(`set ${s.id}: ${s.qs.length} questions (must be 1-10)`);
    s.qs.forEach((q, i) => {
      const tag = `${s.id}-${i + 1}`;
      grand++;
      if (!q.q || !Array.isArray(q.o) || q.o.length < 2 || q.o.length > 4) P(`${tag}: needs q and 2-4 options`);
      if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length)) P(`${tag}: answer index a is wrong`);
      if (new Set(q.o).size !== q.o.length) P(`${tag}: duplicate options`);
      if (!q.e || !q.z) P(`${tag}: needs e (English explanation) and z (Chinese hint)`);
      if (q.n && q.n.length !== q.o.length) P(`${tag}: n must have one note per option`);
      (q.pic || []).forEach(p => { if (!has(p)) P(`${tag}: unknown photo id ${p}`); });
      if (q.pl && (!q.pic || q.pl.length !== q.pic.length)) P(`${tag}: pl needs one label per photo`);
      if (q.ch && !charts[q.ch]) P(`${tag}: unknown chart ${q.ch}`);
      if (q.st) {
        if (q.st.length < 2 || q.st.length > 4) P(`${tag}: st needs 2-4 statements`);
        const letters = "ABCD".slice(0, q.st.length);
        q.o.forEach(o => (o.match(/\b[A-D]\b/g) || []).forEach(L => { if (!letters.includes(L)) P(`${tag}: option uses ${L} but there are only ${q.st.length} statements`); }));
      }
      const key = q.q + "|" + (q.ch || "") + "|" + (q.pic || []).join() + "|" + q.o[q.a];
      if (texts.has(key)) P(`${tag}: same question appears twice`); texts.add(key);
    });
  }
  // sorts
  for (const s of t.sorts || []) {
    const keys = s.bins.map(b => b[0]), seen = new Set();
    if (s.items.length < 6) P(`sort ${s.id}: needs at least 6 items`);
    s.items.forEach(it => {
      if (!has(it[0])) P(`sort ${s.id}: unknown photo/emoji id ${it[0]}`);
      if (!keys.includes(it[1])) P(`sort ${s.id}: unknown bin ${it[1]} for ${it[0]}`);
      if (seen.has(it[0])) P(`sort ${s.id}: ${it[0]} twice`); seen.add(it[0]);
      if (!it[2]) P(`sort ${s.id}: ${it[0]} needs a reason`);
    });
    keys.forEach(k => { if (!s.items.some(it => it[1] === k)) P(`sort ${s.id}: bin ${k} has no items`); });
  }
  const nq = (t.sets || []).reduce((a, s) => a + s.qs.length, 0);
  console.log(`${t.icon} ${t.id} (${t.lv}): ${t.learn.filter(c => !c.sec).length} learn cards, ${(t.sorts || []).length} sorts, ${(t.sets || []).length} sets, ${nq} questions`);
}
console.log(probs.length ? `\n✗ ${probs.length} problem(s):\n - ` + probs.join("\n - ") : `\n✓ no problems (${grand} questions checked)`);
if (probs.length) process.exitCode = 1;
