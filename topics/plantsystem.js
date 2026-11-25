/* Topic: Plant transport system (P4 Systems). Data only - see tools/AUTHORING.md for the format. */
(function(){
const PICS = {
  girdled:["7/75/AnnelageAnn%C3%A9lationGirdling1LilleLamiot3.jpg/330px-AnnelageAnn%C3%A9lationGirdling1LilleLamiot3.jpg","a tree trunk with a ring of bark removed","被环剥的树干","🌳"],
  celerybunch:["0/0d/Celery_1.jpg/330px-Celery_1.jpg","celery","芹菜","🥬"]
};
// job cards for the sort (ids from plants.js / classification.js are reused where they fit)
const EMO = {
  ps_water:["⬆️","carries water from the roots to the leaves","把水从根运到叶子"],
  ps_salts:["🧂","carries mineral salts absorbed by the roots","运送根吸收的矿物盐"],
  ps_food:["🍞","carries food made in the leaves","运送叶子制造的食物"],
  ps_roots:["⬇️","brings food down to the roots","把食物往下运到根"],
  ps_ring:["⭕","is removed when a ring of bark is stripped off","环剥树皮时被去掉"],
  ps_red:["🔴","is stained red when the stem stands in red water","茎放在红水里时被染红"],
  ps_outer:["🟠","is nearer the outside of the stem","比较靠近茎的外面"],
  ps_inner:["🔵","is deeper inside the stem (in the wood of a tree)","在茎的里面（树的木质部分）"],
  ps_wilt:["🥀","if it is cut, the leaves above soon wilt","被切断后，上面的叶子很快枯萎"],
  ps_swell:["🫧","if it is cut, food collects above the cut and the stem swells","被切断后，食物堆在切口上方，茎会膨大"]
};

/* ---------------- charts ---------------- */
const CHARTS = {
 xsec:{type:"svg", title:"Cross-section of a young stem. X and Y are two kinds of tubes.", svg:"<svg viewBox='0 0 320 230' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='15' font-weight='bold'><circle cx='130' cy='115' r='100' fill='#dcfce7' stroke='#15803d' stroke-width='4'/><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/><g transform='rotate(45 130 115)'><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/></g><g transform='rotate(90 130 115)'><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/></g><g transform='rotate(135 130 115)'><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/></g><g transform='rotate(180 130 115)'><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/></g><g transform='rotate(225 130 115)'><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/></g><g transform='rotate(270 130 115)'><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/></g><g transform='rotate(315 130 115)'><ellipse cx='130' cy='39' rx='12' ry='8' fill='#fb923c' stroke='#9a3412' stroke-width='2'/><ellipse cx='130' cy='57' rx='10' ry='9' fill='#60a5fa' stroke='#1e40af' stroke-width='2'/></g><g stroke='#1e293b' stroke-width='2'><path d='M193 61L262 40'/><path d='M180 115L262 132'/></g><g fill='#fff' stroke='#1e293b' stroke-width='2'><circle cx='276' cy='36' r='14'/><circle cx='276' cy='134' r='14'/></g><g fill='#1e293b' text-anchor='middle'><text x='276' y='42'>X</text><text x='276' y='140'>Y</text></g></svg>"},
 trunk:{type:"svg", title:"Cross-section of a tree trunk. P, Q and R are layers.", svg:"<svg viewBox='0 0 320 230' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='15' font-weight='bold'><circle cx='130' cy='115' r='100' fill='#78350f'/><circle cx='130' cy='115' r='86' fill='#fb923c'/><circle cx='130' cy='115' r='78' fill='#fde68a' stroke='#a16207' stroke-width='2'/><g fill='none' stroke='#d6a54a' stroke-width='2'><circle cx='130' cy='115' r='60'/><circle cx='130' cy='115' r='42'/><circle cx='130' cy='115' r='24'/></g><g fill='#3b82f6'><circle cx='130' cy='60' r='3'/><circle cx='170' cy='90' r='3'/><circle cx='94' cy='96' r='3'/><circle cx='112' cy='150' r='3'/><circle cx='160' cy='146' r='3'/><circle cx='186' cy='120' r='3'/><circle cx='74' cy='126' r='3'/><circle cx='130' cy='176' r='3'/><circle cx='100' cy='66' r='3'/><circle cx='150' cy='112' r='3'/></g><g stroke='#1e293b' stroke-width='2'><path d='M218 70L262 50'/><path d='M212 112L262 112'/><path d='M178 160L262 174'/></g><g fill='#fff' stroke='#1e293b' stroke-width='2'><circle cx='276' cy='46' r='14'/><circle cx='276' cy='112' r='14'/><circle cx='276' cy='176' r='14'/></g><g fill='#1e293b' text-anchor='middle'><text x='276' y='52'>P</text><text x='276' y='118'>Q</text><text x='276' y='182'>R</text></g></svg>"},
 ringA:{type:"svg", title:"A ring of the outer layer (bark) was removed from the trunk at B.", svg:"<svg viewBox='0 0 280 270' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='15' font-weight='bold'><rect x='40' y='226' width='180' height='40' fill='#fde7c7'/><path d='M40 226H220' stroke='#92400e' stroke-width='3'/><path d='M130 226V262M130 236L104 258M130 236L156 258' stroke='#78350f' stroke-width='4' fill='none'/><rect x='112' y='52' width='36' height='176' fill='#92400e' stroke='#451a03' stroke-width='2'/><rect x='108' y='132' width='44' height='24' fill='#fff'/><rect x='118' y='132' width='24' height='24' fill='#fde68a' stroke='#a16207' stroke-width='2'/><g fill='#22c55e' stroke='#15803d' stroke-width='2'><ellipse cx='130' cy='34' rx='60' ry='24'/><ellipse cx='96' cy='46' rx='30' ry='16'/><ellipse cx='164' cy='46' rx='30' ry='16'/></g><g stroke='#1e293b' stroke-width='2'><path d='M150 116L222 108'/><path d='M140 144L222 144'/><path d='M150 186L222 186'/></g><g fill='#fff' stroke='#1e293b' stroke-width='2'><circle cx='236' cy='106' r='14'/><circle cx='236' cy='144' r='14'/><circle cx='236' cy='186' r='14'/></g><g fill='#1e293b' text-anchor='middle'><text x='236' y='112'>A</text><text x='236' y='150'>B</text><text x='236' y='192'>C</text></g></svg>"},
 ringB:{type:"svg", title:"The same tree some weeks after the ring of bark was removed at B", svg:"<svg viewBox='0 0 280 270' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='15' font-weight='bold'><rect x='40' y='226' width='180' height='40' fill='#fde7c7'/><path d='M40 226H220' stroke='#92400e' stroke-width='3'/><path d='M130 226V262M130 236L104 258M130 236L156 258' stroke='#78350f' stroke-width='4' fill='none'/><rect x='112' y='52' width='36' height='176' fill='#92400e' stroke='#451a03' stroke-width='2'/><path d='M112 100Q100 120 112 132H148Q160 120 148 100Z' fill='#92400e'/><path d='M112 100Q100 120 112 132M148 100Q160 120 148 132' stroke='#451a03' stroke-width='2' fill='none'/><rect x='108' y='132' width='44' height='24' fill='#fff'/><rect x='118' y='132' width='24' height='24' fill='#fde68a' stroke='#a16207' stroke-width='2'/><g fill='#22c55e' stroke='#15803d' stroke-width='2'><ellipse cx='130' cy='34' rx='60' ry='24'/><ellipse cx='96' cy='46' rx='30' ry='16'/><ellipse cx='164' cy='46' rx='30' ry='16'/></g><g stroke='#1e293b' stroke-width='2'><path d='M150 116L222 108'/><path d='M140 144L222 144'/><path d='M150 186L222 186'/></g><g fill='#fff' stroke='#1e293b' stroke-width='2'><circle cx='236' cy='106' r='14'/><circle cx='236' cy='144' r='14'/><circle cx='236' cy='186' r='14'/></g><g fill='#1e293b' text-anchor='middle'><text x='236' y='112'>A</text><text x='236' y='150'>B</text><text x='236' y='192'>C</text></g></svg>"},
 celery:{type:"svg", title:"A celery stalk was left in red water for 4 hours, then cut across.", svg:"<svg viewBox='0 0 320 260' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='14' font-weight='bold'><rect x='32' y='176' width='76' height='72' fill='#fca5a5'/><path d='M30 140V250H110V140' stroke='#64748b' stroke-width='3' fill='none'/><rect x='62' y='56' width='16' height='184' rx='6' fill='#bbf7d0' stroke='#16a34a' stroke-width='2'/><path d='M66 238V60M70 238V60M74 238V60' stroke='#dc2626' stroke-width='2'/><g fill='#bbf7d0' stroke='#16a34a' stroke-width='2'><ellipse cx='52' cy='46' rx='18' ry='9' transform='rotate(-30 52 46)'/><ellipse cx='88' cy='46' rx='18' ry='9' transform='rotate(30 88 46)'/><ellipse cx='70' cy='30' rx='9' ry='18'/></g><path d='M70 56V16M70 54L40 38M70 54L100 38' stroke='#dc2626' stroke-width='2'/><path d='M48 110H92' stroke='#1e293b' stroke-width='2' stroke-dasharray='5 3'/><path d='M100 110Q150 96 176 110' stroke='#475569' stroke-width='2' fill='none'/><path d='M188 92Q176 160 240 168Q304 160 292 92Q272 128 240 128Q208 128 188 92Z' fill='#bbf7d0' stroke='#16a34a' stroke-width='3'/><g fill='#dc2626'><circle cx='194' cy='112' r='4'/><circle cx='202' cy='134' r='4'/><circle cx='218' cy='150' r='4'/><circle cx='240' cy='156' r='4'/><circle cx='262' cy='150' r='4'/><circle cx='278' cy='134' r='4'/><circle cx='286' cy='112' r='4'/></g><g fill='#1e293b'><text x='240' y='80' text-anchor='middle'>cut across</text><text x='118' y='222'>red water</text><text x='240' y='196' text-anchor='middle'>after 4 hours</text></g></svg>"},
 roothair:{type:"svg", title:"Part of a root (seen through a magnifying glass)", svg:"<svg viewBox='0 0 320 220' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='15' font-weight='bold'><rect x='0' y='0' width='320' height='220' fill='#fef3c7'/><path d='M110 78l-14 -4M130 78l14 -7M110 84l-19 -7M130 84l19 -4M110 90l-24 -4M130 90l24 -7M110 96l-14 -7M130 96l14 -4M110 102l-19 -4M130 102l19 -7M110 108l-24 -7M130 108l24 -4M110 114l-14 -4M130 114l14 -7M110 120l-19 -7M130 120l19 -4M110 126l-24 -4M130 126l24 -7M110 132l-14 -7M130 132l14 -4M110 138l-19 -4M130 138l19 -7M110 144l-24 -7M130 144l24 -4M110 150l-14 -4M130 150l14 -7M110 156l-19 -7M130 156l19 -4M110 162l-24 -4M130 162l24 -7' stroke='#a16207' stroke-width='2' fill='none'/><path d='M110 10V178Q120 200 130 178V10Z' fill='#fde68a' stroke='#a16207' stroke-width='3'/><g stroke='#1e293b' stroke-width='2'><path d='M150 104L206 84'/><path d='M126 190L206 196'/></g><g fill='#1e293b'><text x='212' y='82'>root hairs</text><text x='212' y='202'>root tip</text></g><text x='18' y='36' fill='#92400e' font-size='14'>soil</text></svg>"},
 wilt:{type:"svg", title:"Two plants of the same kind", svg:"<svg viewBox='0 0 320 220' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='15' font-weight='bold' fill='#1e293b'><path d='M60 170H120L112 214H68Z' fill='#c2410c' stroke='#7c2d12' stroke-width='2'/><path d='M90 170V70' stroke='#16a34a' stroke-width='4'/><ellipse cx='70' cy='140' rx='20' ry='7' transform='rotate(-20 70 140)' fill='#22c55e' stroke='#15803d' stroke-width='2'/><ellipse cx='110' cy='125' rx='20' ry='7' transform='rotate(20 110 125)' fill='#22c55e' stroke='#15803d' stroke-width='2'/><ellipse cx='70' cy='105' rx='20' ry='7' transform='rotate(-20 70 105)' fill='#22c55e' stroke='#15803d' stroke-width='2'/><ellipse cx='110' cy='88' rx='20' ry='7' transform='rotate(20 110 88)' fill='#22c55e' stroke='#15803d' stroke-width='2'/><ellipse cx='90' cy='66' rx='6' ry='10' fill='#22c55e' stroke='#15803d' stroke-width='2'/><circle cx='90' cy='36' r='14' fill='#fff' stroke='#1e293b' stroke-width='2'/><text x='90' y='42' text-anchor='middle'>P</text><path d='M190 170H250L242 214H198Z' fill='#c2410c' stroke='#7c2d12' stroke-width='2'/><path d='M220 170Q220 110 250 98Q272 96 276 128' stroke='#65a30d' stroke-width='4' fill='none'/><ellipse cx='206' cy='150' rx='18' ry='6' transform='rotate(70 206 150)' fill='#a3e635' stroke='#4d7c0f' stroke-width='2'/><ellipse cx='234' cy='148' rx='18' ry='6' transform='rotate(-70 234 148)' fill='#a3e635' stroke='#4d7c0f' stroke-width='2'/><ellipse cx='214' cy='124' rx='18' ry='6' transform='rotate(60 214 124)' fill='#a3e635' stroke='#4d7c0f' stroke-width='2'/><ellipse cx='246' cy='116' rx='18' ry='6' transform='rotate(80 246 116)' fill='#a3e635' stroke='#4d7c0f' stroke-width='2'/><ellipse cx='266' cy='118' rx='18' ry='6' transform='rotate(-75 266 118)' fill='#a3e635' stroke='#4d7c0f' stroke-width='2'/><ellipse cx='277' cy='136' rx='5' ry='9' fill='#a3e635' stroke='#4d7c0f' stroke-width='2'/><circle cx='220' cy='36' r='14' fill='#fff' stroke='#1e293b' stroke-width='2'/><text x='220' y='42' text-anchor='middle'>Q</text></svg>"},
 ringt:{type:"table", title:"Mr Tan removed a ring of bark from a young tree and watched it for some weeks.", cols:["Week","stem just above the ring","leaves"],
   rows:[["1","normal","green, not wilted"],["4","swollen","green, not wilted"],["12","swollen","wilted; the tree was dying"]]},
 hairbars:{type:"bars", title:"Water absorbed in one day by two seedlings of the same kind and size", unit:"ml of water", rows:[["X: many root hairs",30],["Y: few root hairs",9]]}
};

/* ---------------- learn cards ---------------- */
const LEARN = [
 {sec:"1 · The plant transport system 植物的运输系统"},
 {t:"Two kinds of tubes 两种管道", ch:"xsec", facts:[
  "A plant has a <b>transport system</b>: tubes that run from the <b>roots</b>, through the <b>stem</b>, to the <b>leaves</b>, flowers and fruits.",
  "<b>Water-carrying tubes</b> carry <b>water and mineral salts</b> from the <b>roots</b> up to <b>all other parts</b> of the plant.",
  "<b>Food-carrying tubes</b> carry <b>food made in the leaves</b> to <b>all other parts</b> — up to the flowers and fruits, and down to the stem and roots.",
  "In a young stem, the tubes are in <b>bundles</b> arranged in a ring. In each bundle the <b>food-carrying tubes (X)</b> are nearer the <b>outside</b>, and the <b>water-carrying tubes (Y)</b> are nearer the <b>inside</b>."],
  zh:"运水的管道：把水和矿物盐从根运到各部分（只往上）。运食物的管道：把叶子制造的食物运到各部分（往上也往下）。",
  trap:"⚠️ Water moves only UP from the roots. Food moves from the leaves to ALL parts — up AND down."},
 {t:"Inside a tree trunk 树干里面", ch:"trunk", facts:[
  "<b>P — bark</b>: the outer layer that protects the stem.",
  "<b>Q — food-carrying tubes</b>: a thin layer just inside the bark.",
  "<b>R — wood</b>: it contains the <b>water-carrying tubes</b>, deeper inside.",
  "When a ring of bark is stripped off, the food-carrying tubes (Q) come off with it, but the water-carrying tubes in the wood (R) are left behind."],
  zh:"树皮下面一薄层是运食物的管道；里面的木头有运水的管道。剥掉树皮，运食物的管道也一起被剥掉。",
  trap:"⚠️ Removing a ring of bark removes the FOOD-carrying tubes, not the water-carrying tubes."},
 {t:"Ring-barking 环剥", pics:["girdled"], ch:"ringB", facts:[
  "<b>Ring-barking</b>: a ring of the outer layer (bark) is removed all round the stem. The food-carrying tubes at the ring (B) are removed.",
  "Food made in the leaves <b>cannot move down past the ring</b>. It <b>collects above the ring</b>, so the stem above the ring (A) <b>swells</b>.",
  "The stem below the ring (C) and the <b>roots get no food</b>. After some time the roots die. Dead roots cannot absorb water, so <b>the whole plant dies</b>.",
  "At first the leaves do <b>not wilt</b>: the water-carrying tubes deeper inside are not removed, so water still reaches the leaves."],
  zh:"环剥 → 运食物的管道被切断 → 食物堆在环的上方（膨大）→ 根得不到食物而死 → 根不能吸水 → 整棵植物死掉。叶子一开始不会枯萎，因为运水的管道还在。",
  trap:"⚠️ The swelling is ABOVE the ring (food from the leaves comes from above). The leaves do not wilt at once."},
 {sec:"2 · Experiments 实验"},
 {t:"Coloured water 有色水实验", ch:"celery", pics:["celerybunch"], facts:[
  "Stand a celery stalk or a white flower in <b>coloured water</b>. After a few hours the leaves or petals become coloured.",
  "This shows that water is carried <b>up</b> through the <b>water-carrying tubes</b>.",
  "Cut the stalk across: the <b>coloured dots</b> are the water-carrying tubes. In celery they are near the outer edge.",
  "Split the stem of a white flower into two halves and stand one half in red water and the other in blue water: one part of the flower turns red and another part turns blue. Each tube carries water to its own part of the flower."],
  zh:"有色水往上走，说明运水的管道把水往上运。横切面上的有色小点就是运水的管道。",
  trap:"⚠️ The colour shows WATER-carrying tubes. Food-carrying tubes do not carry the coloured water."},
 {t:"Roots and root hairs 根和根毛", ch:"roothair", facts:[
  "<b>Root hairs</b> are tiny hair-like parts that grow near the tip of each root.",
  "They <b>increase the surface area</b> of the roots, so the plant can <b>absorb more water and mineral salts</b>.",
  "The water then enters the <b>water-carrying tubes</b> in the root and is carried up the stem.",
  "When moving a plant, keep the soil around its roots: root hairs are easily damaged, and a plant with damaged root hairs may wilt."],
  zh:"根毛让根的表面积变大，所以能吸收更多水和矿物盐。",
  trap:"⚠️ Write \"increase the SURFACE AREA for absorbing water\", not just \"absorb water\"."},
 {t:"Wilting and the whole system 枯萎和整个系统", ch:"wilt", facts:[
  "A plant <b>wilts</b> (droops) when it <b>does not get enough water</b>: the soil is dry, the roots are damaged, or the water-carrying tubes are cut.",
  "If it is watered in time, a wilted plant becomes firm again.",
  "The parts work together as a <b>system</b>: roots absorb water → water-carrying tubes carry it up → leaves use water and light to make food → food-carrying tubes carry the food to all parts, including the roots.",
  "If one part cannot do its job, the whole plant is affected (ring-barking → roots get no food → the plant dies)."],
  zh:"植物缺水就会枯萎。根、茎里的两种管道、叶子一起工作，是一个系统。",
  trap:"⚠️ Explain WHICH part could not do its job, and what happened because of it."}
];

/* ---------------- question sets ---------------- */
const SETS = [
 {id:"t1", lv:2, title:"Tubes & roots", zh:"两种管道和根", qs:[
  {q:"What do the water-carrying tubes carry?", o:["water and mineral salts","food","water and food","air"], a:0,
   e:"Water-carrying tubes carry water and the mineral salts dissolved in it, from the roots to the other parts.", z:"运水的管道运送水和矿物盐。"},
  {q:"In which direction do the water-carrying tubes carry water?", o:["from the roots up to the other parts","from the leaves down to the roots","from the leaves to the flowers only","up and down"], a:0,
   e:"Water is absorbed by the roots and carried upwards to the stem, leaves, flowers and fruits.", z:"水只从根往上运。"},
  {q:"What do the food-carrying tubes carry, and where to?", o:["food made in the leaves, to all other parts","food from the soil, up to the leaves","water, from the roots to the leaves","food made in the roots, up to the leaves"], a:0,
   e:"The leaves make food. The food-carrying tubes carry it to all other parts of the plant.", z:"运食物的管道把叶子做的食物运到其它部分。"},
  {q:"Which parts of a plant receive food through the food-carrying tubes?", st:["roots","stem","fruits","flowers"], o:["A only","A and B only","C and D only","A, B, C and D"], a:3,
   e:"Every living part needs food, so food is carried to the roots, stem, flowers and fruits.", z:"所有部分都需要食物。"},
  {q:"What is the function of root hairs?", o:["They increase the surface area for absorbing water and mineral salts.","They make food for the roots.","They store food.","They hold the plant upright."], a:0,
   e:"Many tiny root hairs give the roots a much larger surface, so more water can be absorbed.", z:"根毛增加吸收水分的表面积。"},
  {ch:"xsec", q:"In a young stem, where are the food-carrying tubes found?", o:["nearer the outside (X)","nearer the centre (Y)","only in the middle of the stem","only in the leaves"], a:0,
   e:"In each bundle, the food-carrying tubes are nearer the outside and the water-carrying tubes nearer the inside.", z:"运食物的管道比较靠外（X）。"},
  {q:"Which shows the path of water through a plant?", o:["soil → root hairs → water-carrying tubes in the root and stem → leaves","leaves → stem → roots → soil","soil → leaves → stem → roots","soil → root hairs → food-carrying tubes → leaves"], a:0,
   e:"Root hairs absorb water from the soil; the water-carrying tubes carry it up to the leaves.", z:"土 → 根毛 → 运水的管道 → 叶子。"},
  {q:"A plant wilts when ___.", o:["it does not get enough water","it gets too much light","it makes too much food","its flowers fall off"], a:0,
   e:"Without enough water, the plant droops (wilts).", z:"缺水就会枯萎。"},
  {q:"Why do gardeners keep the soil around the roots when they move a plant to a new pot?", o:["To avoid damaging the root hairs, so the plant can still absorb water.","To give the plant extra food.","To keep the roots warm.","To make the plant heavier so it will not fall."], a:0,
   e:"Root hairs are tiny and easily damaged. Without them, the plant cannot absorb enough water and may wilt.", z:"保护根毛，植物才能继续吸水。"},
  {q:"Which statement about the plant transport system is correct?", o:["The tubes run from the roots, through the stem, to the leaves.","The tubes are found only in the stem.","Water and food are carried in the same tubes.","Food is carried only upwards."], a:0,
   e:"There are two kinds of tubes, and they run through the roots, stem and leaves.", z:"管道从根经过茎一直到叶子。"}
 ]},
 {id:"t2", lv:3, title:"Ring-barking & experiments", zh:"环剥和实验", qs:[
  {ch:"ringA", q:"After some weeks, which part of the trunk would most likely swell?", o:["A","B","C"], a:0, fix:true,
   e:"Food made in the leaves moves down but cannot pass the ring at B, so it collects at A, just above the ring.", z:"食物从上面下来，堆在环的上方 A。"},
  {ch:"ringB", q:"Why did part A swell?", o:["Food made in the leaves could not move down past the ring, so it collected above it.","Water collected above the ring.","The roots sent extra food up to A.","New leaves grew at A."], a:0,
   e:"The food-carrying tubes were removed at B, so food could not move down past the ring.", z:"运食物的管道断了，食物堆在 A。"},
  {ch:"ringB", q:"Which tubes were removed at B?", o:["the food-carrying tubes only","the water-carrying tubes only","both kinds of tubes","no tubes"], a:0,
   e:"The food-carrying tubes are in the outer layer just under the bark. The water-carrying tubes are deeper inside.", z:"只去掉了运食物的管道。"},
  {ch:"ringt", q:"Why were the leaves still green and not wilted in week 4?", o:["The water-carrying tubes deeper inside were not removed, so water still reached the leaves.","The leaves were getting food from the roots.","The food-carrying tubes were not removed.","Leaves never wilt."], a:0,
   e:"Ring-barking removes the food-carrying tubes only. Water still travels up to the leaves.", z:"运水的管道还在，所以叶子还有水。"},
  {ch:"ringt", q:"Why was the tree dying by week 12?", o:["The roots received no food, so they died and could no longer absorb water.","The leaves received no water from the start.","The swelling blocked the light.","The bark makes food for the tree."], a:0,
   e:"No food reached the roots. When the roots died, no water was absorbed, so the leaves wilted and the tree died.", z:"根没有食物 → 根死 → 不能吸水 → 树死。"},
  {ch:"xsec", q:"A young stem was left in red water for a few hours and then cut across. Which part would be stained red?", o:["X","Y","both X and Y"], a:1, fix:true,
   e:"Y is the water-carrying tubes. The red water travels up in them.", z:"红水在运水的管道 Y 里。"},
  {ch:"trunk", q:"A ring of bark is removed right down to the wood. Which layers are removed?", o:["P and Q only","P only","Q and R only","P, Q and R"], a:0, fix:true,
   e:"The bark (P) and the food-carrying tubes just inside it (Q) come off. The wood (R) with the water-carrying tubes stays.", z:"去掉 P 和 Q，木头 R 还在。"},
  {ch:"celery", q:"What are the red dots in the cut celery stalk?", o:["water-carrying tubes","food-carrying tubes","seeds","root hairs"], a:0,
   e:"The red water travelled up the water-carrying tubes, so the tubes show up as red dots.", z:"红点是运水的管道。"},
  {ch:"hairbars", q:"Why did seedling X absorb more water than seedling Y?", o:["X had more root hairs, so its roots had a larger surface area for absorbing water.","X had more leaves.","X was given more food.","Y had no water-carrying tubes."], a:0,
   e:"More root hairs → larger surface area → more water absorbed.", z:"根毛多 → 表面积大 → 吸水多。"},
  {q:"Rina split the stem of a white flower into two halves. She stood one half in red water and the other half in blue water. What did she most likely see after a day?", o:["One part of the flower turned red and another part turned blue.","The whole flower turned purple.","The flower stayed white.","Only the stem changed colour."], a:0,
   e:"Each water-carrying tube carries water to its own part of the flower, so the colours do not mix.", z:"每条管道把水运到花的某一部分，颜色不会混在一起。"}
 ]},
 {id:"t3", lv:3, title:"AL1 challenge", zh:"难题挑战", qs:[
  {q:"Which statements about ring-barking a tree are correct?", st:["It removes the food-carrying tubes at the ring.","The roots stop receiving food.","The leaves wilt within a few hours.","The tree will die after some time."], o:["A and B only","A, B and D only","B, C and D only","A, B, C and D"], a:1,
   e:"The water-carrying tubes are not removed, so the leaves do not wilt at once.", z:"叶子不会马上枯萎。"},
  {ch:"xsec", q:"Which statement about X and Y is correct?", o:["X carries food made in the leaves; Y carries water from the roots.","X carries water; Y carries food.","Both X and Y carry water.","X and Y both carry food to the leaves only."], a:0,
   e:"X (outer) = food-carrying tubes; Y (inner) = water-carrying tubes.", z:"X 运食物，Y 运水。"},
  {q:"A ring of bark is removed from ONE branch of a mango tree, near the trunk. What will most likely happen to the mangoes on that branch?", o:["They grow bigger, because the food made by the leaves on that branch stays in the branch.","They fall off at once, because they get no water.","They stop growing, because they get no food from the roots.","They turn into flowers."], a:0,
   e:"Food made by the leaves on that branch cannot move past the ring, so more of it goes to the fruits. The tree does not die: the other branches still send food to the roots.", z:"那根树枝的食物运不出去，留给芒果，所以芒果长得更大。"},
  {q:"Mrs Lee's plant wilted on a hot afternoon. After she watered it, it became firm again. Why?", o:["The roots absorbed the water, and the water-carrying tubes carried it up to the leaves.","The food-carrying tubes carried the water to the leaves.","The leaves absorbed the water poured on the soil.","The water gave the plant food."], a:0,
   e:"Roots absorb water; the water-carrying tubes carry it up to the drooping leaves.", z:"根吸水，运水的管道把水送到叶子。"},
  {q:"Why does a cut flower in a vase of water stay fresh for some days, even though it has no roots?", o:["The water-carrying tubes in its stem take in water and carry it up to the petals and leaves.","It gets food from the water in the vase.","Its petals absorb water from the air.","Its food-carrying tubes carry water."], a:0,
   e:"The cut end of the stem takes in water, and the water-carrying tubes carry it upwards.", z:"茎里运水的管道把花瓶里的水往上运。"},
  {q:"A caterpillar ate away a ring of the outer layer all round the stem of a young plant. Which part will NOT receive food from the leaves?", o:["the roots","the leaves","the flowers above the ring","the stem above the ring"], a:0,
   e:"The food-carrying tubes are broken at the ring, so food from the leaves cannot reach the parts below it, such as the roots.", z:"环下面的部分（根）得不到食物。"},
  {q:"Which statements describe how the parts of a plant work together?", st:["The roots absorb water that the leaves use to make food.","The leaves make food for the roots.","The stem carries water and food between the roots and the leaves."], o:["A only","A and C only","B and C only","A, B and C"], a:3,
   e:"All three are correct: the roots, stem and leaves depend on one another.", z:"三个都对：根、茎、叶互相依靠。"},
  {ch:"wilt", q:"Plants P and Q were the same kind and size. Which could explain why Q wilted?", st:["Q's roots were damaged.","Q's soil was dry.","Q's water-carrying tubes were cut."], o:["A only","A and B only","B and C only","A, B and C"], a:3,
   e:"Any of these stops enough water from reaching the leaves, so the plant wilts.", z:"三种情况都会让水到不了叶子。"},
  {q:"A tree's water-carrying tubes are deeper inside its trunk than its food-carrying tubes. How does this help the tree survive if animals scrape off some of its bark?", o:["Water can still reach the leaves, because the water-carrying tubes are not easily damaged.","The tree can still get food from the soil.","The bark grows back at once.","The food-carrying tubes can carry water instead."], a:0,
   e:"Scraping off bark damages the outer food-carrying tubes first, but water can still travel up to the leaves.", z:"运水的管道在里面，不容易被破坏。"}
 ]},
 {id:"t4", lv:4, title:"Full-mark answers", zh:"选出能拿满分的答案", qs:[
  {ch:"ringB", q:"Explain why part A swelled. [2 marks]\nWhich answer gets full marks?", o:["The food-carrying tubes were removed at B. Food made in the leaves could not move down past B, so it collected at A.","Food collected at A.","The water-carrying tubes were removed, so water collected at A.","The tree was growing at A."], a:0,
   n:["✓ Which tubes were removed + food collected above the ring.","½ Only the result, not why.","✗ Wrong tubes.","✗ Not the reason."],
   e:"Two marks: name the tubes that were removed, and explain where the food went.", z:"两分：写哪种管道被去掉，和食物堆在哪里。"},
  {q:"Explain why a ring-barked tree eventually dies. [2 marks]", o:["Food could not reach the roots, so the roots died. Dead roots cannot absorb water, so the whole tree died.","The roots died.","The leaves could not get water from the start.","The tree had no bark to protect it."], a:0,
   n:["✓ Full chain: no food → roots die → no water absorbed.","½ Only one step.","✗ Water still reaches the leaves at first.","✗ Not the main reason."],
   e:"Give the whole chain of events.", z:"把因果链写完整。"},
  {ch:"ringt", q:"Explain why the leaves had not wilted by week 4. [1 mark]", o:["The water-carrying tubes were not removed, so water could still reach the leaves.","The leaves were still green.","The food-carrying tubes still carried water.","The tree was strong."], a:0,
   n:["✓ Names the tubes and what they still do.","✗ Only describes.","✗ Food-carrying tubes do not carry water, and they were removed.","✗ Not scientific."],
   e:"Say which tubes were still working and what they carried.", z:"写出哪种管道还在工作。"},
  {ch:"roothair", q:"How do root hairs help a plant? [1 mark]", o:["They increase the surface area of the roots, so more water and mineral salts can be absorbed.","They absorb water.","They hold the plant firmly in the soil.","They make the roots longer."], a:0,
   n:["✓ Surface area + more water absorbed.","½ Correct, but the keyword \"surface area\" is missing.","✗ That is the main roots' job.","✗ Not their function."],
   e:"Keyword: increase the surface area.", z:"关键词：增加表面积。"},
  {ch:"celery", q:"What does this experiment show? [1 mark]", o:["Water is carried up the stalk to the leaves by the water-carrying tubes.","The celery turned red.","The celery likes red water.","Food is carried to the leaves."], a:0,
   n:["✓ What moves, where, and in which tubes.","✗ Only describes what was seen.","✗ Not scientific.","✗ The red water shows water, not food."],
   e:"A conclusion explains what the result means.", z:"结论要说明结果代表什么。"},
  {q:"State the function of the food-carrying tubes. [1 mark]", o:["They carry food made in the leaves to all other parts of the plant.","They carry food.","They carry food from the roots to the leaves.","They carry water and food."], a:0,
   n:["✓ What, from where, to where.","½ Does not say from where to where.","✗ Wrong direction: food is made in the leaves.","✗ They do not carry water."],
   e:"A full answer says what is carried, from where and to where.", z:"写清楚运什么、从哪里、到哪里。"},
  {q:"A plant's roots were damaged. It wilted even though the soil was wet. Explain why. [1 mark]", o:["The damaged roots could not absorb enough water, so not enough water was carried up to the leaves.","The soil was too wet.","The roots could not make food.","The leaves were damaged."], a:0,
   n:["✓ Roots → water → leaves.","✗ Wet soil is not the problem.","✗ Roots do not make food.","✗ Nothing says the leaves were damaged."],
   e:"Link the damaged part to the missing water.", z:"受损的根 → 吸不到水 → 叶子缺水。"},
  {q:"Explain why the transport system is important to the roots. [1 mark]", o:["The roots cannot make food, so they need the food-carrying tubes to bring food from the leaves.","The roots need water.","The roots make food for the leaves.","The roots need light."], a:0,
   n:["✓ Roots depend on food from the leaves.","✗ The roots absorb water themselves.","✗ Leaves make food, not roots.","✗ Roots do not need light."],
   e:"Roots are underground and cannot make food.", z:"根不能制造食物，要靠运食物的管道。"}
 ]}
];

/* ---------------- sort game ---------------- */
const SORTS = [
 {id:"s1", title:"Water-carrying or food-carrying tubes?", zh:"运水的管道还是运食物的管道", bins:[["W","Water-carrying tubes","运水的管道"],["F","Food-carrying tubes","运食物的管道"]], items:[
  ["ps_water","W","Water travels up from the roots."],["ps_salts","W","Mineral salts are dissolved in the water."],["ps_red","W","Coloured water travels in the water-carrying tubes."],
  ["ps_inner","W","They are deeper inside, in the wood."],["ps_wilt","W","No water reaches the leaves, so they wilt."],
  ["ps_food","F","Food is made in the leaves."],["ps_roots","F","Food is carried to all parts, including the roots."],["ps_ring","F","They are just under the bark."],
  ["ps_outer","F","They are nearer the outside of the stem."],["ps_swell","F","Food cannot move down past the cut, so it collects above it."]]}
];

TOPIC({id:"plantsystem", lv:"P4", icon:"🌿", title:"Plant transport system", zh:"植物的运输系统（小四）",
  pics:PICS, emo:EMO, learn:LEARN, charts:CHARTS, sets:SETS, sorts:SORTS});
})();
