/* Topic: Digestive system (P3/P4 Systems). Data only - see tools/AUTHORING.md for the format. */
(function(){
const PICS = {
  humanteeth:["d/db/06-10-06smile.jpg/330px-06-10-06smile.jpg","teeth","牙齿","🦷"],
  crackers:["2/29/Saltine_crackers.jpg/330px-Saltine_crackers.jpg","plain crackers","苏打饼干","🍘"],
  skeletonmodel:["1/14/Human-Skeleton.jpg/330px-Human-Skeleton.jpg","human skeleton","人体骨骼","🦴"],
  chickenrice:["7/71/Hainanese_Chicken_Rice.jpg/330px-Hainanese_Chicken_Rice.jpg","chicken rice","海南鸡饭","🍗"],
  digestdiag:["8/8a/Diagram_showing_the_parts_of_the_digestive_system_CRUK_324.svg/330px-Diagram_showing_the_parts_of_the_digestive_system_CRUK_324.svg.png","the digestive system","消化系统","🍎"],
  gulletdiag:["0/08/Diagram_showing_the_position_of_the_oesophagus_CRUK_355.svg/330px-Diagram_showing_the_position_of_the_oesophagus_CRUK_355.svg.png","gullet (oesophagus)","食道","⬇️"],
  smallintdiag:["b/b0/Diagram_showing_the_position_of_the_small_bowel_CRUK_360.svg/330px-Diagram_showing_the_position_of_the_small_bowel_CRUK_360.svg.png","small intestine","小肠","🌀"],
  largeintdiag:["7/7c/Diagram_showing_the_parts_of_the_large_bowel_CRUK_329.svg/330px-Diagram_showing_the_parts_of_the_large_bowel_CRUK_329.svg.png","large intestine","大肠","🟤"]
};
// emoji-only things (no photo needed)
const EMO = {
  body:["🧍","human body","人体"], mouth:["👄","mouth","口腔"], tongue:["👅","tongue","舌头"], lungs:["🫁","lungs","肺"],
  heart:["🫀","heart","心脏"], nose:["👃","nose","鼻子"], blood:["🩸","blood","血液"], skull:["💀","skull","头骨"],
  bone:["🦴","bones","骨头"], muscle:["💪","muscles","肌肉"], runner:["🏃","running","跑步"]
};

/* ---------------- charts ---------------- */
const CHARTS = {
 dsys:{type:"svg", title:"The human digestive system", svg:"<svg viewBox='0 0 360 380' xmlns='http://www.w3.org/2000/svg' font-family='Arial,sans-serif'><rect width='360' height='380' fill='#fff'/><circle cx='180' cy='48' r='32' fill='#f1f5f9' stroke='#94a3b8' stroke-width='2'/><rect x='166' y='76' width='28' height='26' fill='#f1f5f9'/><path d='M166,78 L166,100 M194,78 L194,100' stroke='#94a3b8' stroke-width='2'/><path d='M128,100 Q180,94 232,100 Q250,104 250,126 L248,336 Q247,364 220,365 L140,365 Q113,364 112,336 L110,126 Q110,104 128,100 Z' fill='#f1f5f9' stroke='#94a3b8' stroke-width='2'/><path d='M140,304 L138,236 Q138,228 146,228 L220,228 Q228,228 228,236 L228,300 Q228,326 204,332 Q184,336 182,352' fill='none' stroke='#b45309' stroke-width='13' stroke-linecap='round' stroke-linejoin='round'/><path d='M180,70 L180,148 Q180,158 188,160' fill='none' stroke='#f59e0b' stroke-width='7' stroke-linecap='round'/><path d='M184,156 C208,140 242,154 238,188 C234,214 202,222 184,212 C176,207 178,198 187,195 C200,191 203,178 191,172 C185,169 182,163 184,156 Z' fill='#fda4af' stroke='#be123c' stroke-width='2'/><path d='M182,212 V242 H168 C152,242 152,258 168,258 H198 C214,258 214,274 198,274 H168 C152,274 152,290 168,290 H200 C214,290 214,304 200,304 H146' fill='none' stroke='#ec4899' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/><ellipse cx='180' cy='63' rx='12' ry='5' fill='#f43f5e' stroke='#9f1239' stroke-width='1.5'/><circle cx='182' cy='356' r='4' fill='#334155'/><g stroke='#1e293b' stroke-width='1.5'><path d='M166,63 H100 M178,125 H100 M230,185 H282 M138,265 H100 M100,350 L165,304 M188,356 H282'/></g><circle cx='165' cy='304' r='3' fill='#1e293b'/><g font-size='17' font-weight='bold' fill='#1e293b' text-anchor='middle'><text x='88' y='69'>B</text><text x='88' y='131'>D</text><text x='294' y='191'>A</text><text x='88' y='271'>C</text><text x='88' y='358'>E</text><text x='294' y='362'>F</text></g></svg>"},
 dlab:{type:"svg", title:"The human digestive system", svg:"<svg viewBox='0 0 360 380' xmlns='http://www.w3.org/2000/svg' font-family='Arial,sans-serif'><rect width='360' height='380' fill='#fff'/><circle cx='180' cy='48' r='32' fill='#f1f5f9' stroke='#94a3b8' stroke-width='2'/><rect x='166' y='76' width='28' height='26' fill='#f1f5f9'/><path d='M166,78 L166,100 M194,78 L194,100' stroke='#94a3b8' stroke-width='2'/><path d='M128,100 Q180,94 232,100 Q250,104 250,126 L248,336 Q247,364 220,365 L140,365 Q113,364 112,336 L110,126 Q110,104 128,100 Z' fill='#f1f5f9' stroke='#94a3b8' stroke-width='2'/><path d='M140,304 L138,236 Q138,228 146,228 L220,228 Q228,228 228,236 L228,300 Q228,326 204,332 Q184,336 182,352' fill='none' stroke='#b45309' stroke-width='13' stroke-linecap='round' stroke-linejoin='round'/><path d='M180,70 L180,148 Q180,158 188,160' fill='none' stroke='#f59e0b' stroke-width='7' stroke-linecap='round'/><path d='M184,156 C208,140 242,154 238,188 C234,214 202,222 184,212 C176,207 178,198 187,195 C200,191 203,178 191,172 C185,169 182,163 184,156 Z' fill='#fda4af' stroke='#be123c' stroke-width='2'/><path d='M182,212 V242 H168 C152,242 152,258 168,258 H198 C214,258 214,274 198,274 H168 C152,274 152,290 168,290 H200 C214,290 214,304 200,304 H146' fill='none' stroke='#ec4899' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/><ellipse cx='180' cy='63' rx='12' ry='5' fill='#f43f5e' stroke='#9f1239' stroke-width='1.5'/><circle cx='182' cy='356' r='4' fill='#334155'/><g stroke='#1e293b' stroke-width='1.5'><path d='M166,63 H100 M178,125 H100 M230,185 H282 M138,265 H100 M100,350 L165,304 M188,356 H282'/></g><circle cx='165' cy='304' r='3' fill='#1e293b'/><g font-size='14' fill='#1e293b'><g text-anchor='end'><text x='96' y='68'>mouth</text><text x='96' y='130'>gullet</text><text x='96' y='270'>large intestine</text><text x='96' y='355'>small intestine</text></g><text x='286' y='190'>stomach</text><text x='286' y='361'>anus</text></g></svg>"},
 gsys:{type:"groups", title:"Some organs of the human body are grouped into systems W, X, Y and Z.", groups:[["W",["heart","blood vessels","blood"]],["X",["nose","windpipe","lungs"]],["Y",["skull","ribs","backbone"]],["Z",["mouth","gullet","stomach"]]]},
 dbar:{type:"bars", title:"Food passes through parts P, Q, R, S and T in this order. The graph shows how much of the food is NOT yet digested as it leaves each part.", unit:"% of food not yet digested",
   rows:[["P",85],["Q",85],["R",55],["S",15],["T",15]]},
 dtab:{type:"table", title:"W, X, Y and Z are parts of the digestive system. ✓ = happens there, ✗ = does not", cols:["Part","food is digested","digested food is absorbed into the blood","water is absorbed from undigested food"],
   rows:[["W",1,0,0],["X",0,0,0],["Y",1,1,0],["Z",0,0,1]]},
 dtube:{type:"table", title:"Two test tubes were kept at 37 °C for 20 minutes.", cols:["Tube","starch solution","liquid added","starch left after 20 min"],
   rows:[["A","10 ml","5 ml of saliva",0],["B","10 ml","5 ml of water",1]]},
 dpieces:{type:"table", title:"Ali put 20 g of cooked egg white and 20 ml of the same digestive juice into each beaker, at 37 °C.", cols:["Beaker","egg white cut into","time taken for all the egg white to be digested"],
   rows:[["P","1 big piece","90 min"],["Q","4 pieces","60 min"],["R","16 small pieces","35 min"]]},
 dtemp:{type:"table", title:"Equal amounts of starch solution and saliva were put into three test tubes, kept at different temperatures.", cols:["Tube","temperature","time taken for all the starch to be digested"],
   rows:[["X","10 °C","40 min"],["Y","37 °C","8 min"],["Z","70 °C","not digested after 60 min"]]}
};

/* ---------------- learn cards ---------------- */
const LEARN = [
 {sec:"1 · Body systems 人体系统"},
 {t:"Systems in the body 人体系统", emo:["body"], facts:[
  "A <b>system</b> is a group of parts (<b>organs</b>) that <b>work together</b> to carry out a function (do a job).",
  "The human body has several systems, e.g. the <b>skeletal, muscular, respiratory, circulatory</b> and <b>digestive</b> systems.",
  "Each system has its own function, and the systems <b>work together</b> to keep us alive."],
  zh:"系统 = 一组器官一起合作，完成一项功能。人体有骨骼、肌肉、呼吸、循环、消化等系统。",
  trap:"⚠️ A system is not one organ. The stomach is an organ; the digestive system is the whole group of organs (mouth, gullet, stomach, small and large intestines)."},
 {t:"Skeletal and muscular systems 骨骼和肌肉系统", pics:["skeletonmodel"], emo:["skull","muscle"], facts:[
  "The <b>skeletal system</b> (all the bones) <b>supports</b> the body and gives it its <b>shape</b>.",
  "It <b>protects</b> soft organs inside the body: the <b>skull</b> protects the brain; the <b>ribs</b> protect the heart and lungs.",
  "The <b>muscular system</b> works with the skeletal system to <b>allow movement</b>: muscles pull on bones to move them."],
  zh:"骨骼系统：支撑身体、给身体形状、保护内脏（头骨保护脑，肋骨保护心和肺），和肌肉一起让身体活动。",
  trap:"⚠️ Bones cannot move by themselves. Movement needs the skeletal AND muscular systems working together."},
 {t:"Respiratory and circulatory systems 呼吸和循环系统", emo:["lungs","heart","blood"], facts:[
  "<b>Respiratory system</b> (nose, windpipe, lungs): <b>takes in oxygen</b> and <b>removes carbon dioxide</b> from the body.",
  "<b>Circulatory system</b> (heart, blood vessels, blood): the <b>heart pumps blood</b> around the body.",
  "The blood <b>carries digested food and oxygen</b> to all parts of the body, and carries waste such as carbon dioxide away."],
  zh:"呼吸系统：吸进氧气，排出二氧化碳。循环系统：心脏把血液泵到全身，血液运送消化后的养分和氧气。",
  trap:"⚠️ The heart does not make oxygen or digest food. It pumps the blood; the blood carries the oxygen and the digested food."},
 {t:"Systems work together 各系统一起合作", emo:["runner"], facts:[
  "When you run, your <b>muscles pull on your bones</b> to move your legs (muscular + skeletal systems).",
  "You breathe faster to take in more oxygen (<b>respiratory</b>), and your heart beats faster to carry more oxygen and digested food to the muscles (<b>circulatory</b>).",
  "Food digested by the <b>digestive system</b> is absorbed into the blood, and the <b>circulatory system</b> carries it to every part of the body."],
  zh:"跑步时：肌肉拉动骨骼；呼吸变快、心跳变快，把更多氧气和养分送到肌肉。消化系统消化食物，循环系统把养分运到全身。"},
 {sec:"2 · Digestion 消化"},
 {t:"What is digestion? 什么是消化", pics:["chickenrice"], facts:[
  "Food gives us <b>energy</b> and what we need to <b>grow</b>. But the food we eat is too big and complex to pass into the blood.",
  "<b>Digestion</b> is the <b>breaking down of food into simpler substances</b> that can be <b>absorbed</b> by the body.",
  "<b>Absorption</b>: the digested food passes through the walls of the small intestine <b>into the blood</b>.",
  "Food that the body cannot digest is <b>undigested food</b>. It leaves the body as <b>faeces</b>."],
  zh:"消化 = 把食物分解成简单的物质，让身体可以吸收。吸收 = 消化后的养分穿过小肠壁进入血液。",
  trap:"⚠️ Digestion is NOT the same as absorption. Digestion breaks food down; absorption takes the digested food into the blood."},
 {t:"The path of food 食物的路线", ch:"dlab", pics:["digestdiag"], facts:[
  "Food passes through: <b>mouth → gullet → stomach → small intestine → large intestine → anus</b>.",
  "The gullet is also called the <b>oesophagus</b>.",
  "Digestion <b>begins in the mouth</b>, continues in the stomach and is <b>completed in the small intestine</b>.",
  "<b>No digestion</b> takes place in the gullet and the large intestine."],
  zh:"食物路线：口腔 → 食道 → 胃 → 小肠 → 大肠 → 肛门。消化从口腔开始，在小肠完成。",
  trap:"⚠️ The large intestine comes AFTER the small intestine, even though it is called 'large'."},
 {t:"Mouth 口腔", pics:["humanteeth","crackers"], emo:["tongue"], facts:[
  "<b>Teeth</b> chew and <b>break food into smaller pieces</b>.",
  "<b>Saliva</b> is a <b>digestive juice</b>. It <b>starts to digest</b> food (starch) and makes food soft and wet, so it is easy to swallow.",
  "The <b>tongue</b> mixes food with saliva and helps us to <b>swallow</b>.",
  "Chew a plain cracker for a few minutes and it starts to taste <b>sweet</b>: saliva breaks down the starch into <b>sugar</b>, a simpler substance.",
  "Digestion <b>begins</b> in the mouth."],
  zh:"口腔：牙齿把食物咬碎；唾液是消化液，开始消化淀粉；舌头把食物和唾液混合，帮助吞咽。",
  trap:"⚠️ Chewing does not finish digestion. Smaller pieces just have more surface in contact with digestive juices, so they are digested faster."},
 {t:"Gullet and stomach 食道和胃", pics:["gulletdiag"], facts:[
  "The <b>gullet</b> is a muscular tube. Its muscles squeeze to <b>push food down to the stomach</b>.",
  "<b>No digestion</b> takes place in the gullet.",
  "The <b>stomach</b> is a muscular bag. It <b>churns</b> the food and <b>mixes it with digestive juices</b>.",
  "<b>Digestion continues</b> in the stomach. Food stays there for a few hours.",
  "Digested food is <b>not</b> absorbed into the blood in the stomach — that happens in the small intestine."],
  zh:"食道只把食物送到胃，不消化。胃把食物和消化液搅拌混合，继续消化，但不吸收养分。",
  trap:"⚠️ The gullet does NOT digest food, and the stomach is NOT where digested food is absorbed."},
 {t:"Small intestine 小肠", pics:["smallintdiag"], facts:[
  "The small intestine is a <b>long, coiled tube</b> (about 6 m long in an adult).",
  "Digestive juices from the small intestine (and from other organs such as the liver and pancreas) <b>complete digestion</b> here.",
  "<b>Most</b> digestion takes place in the small intestine.",
  "Digested food is <b>absorbed into the blood</b> through the <b>walls</b> of the small intestine.",
  "Its inner walls have <b>many tiny folds</b>, so there is a large surface to absorb digested food."],
  zh:"小肠：完成消化，把消化后的养分吸收进血液。小肠很长，内壁有很多褶皱。",
  trap:"⚠️ Most digestion takes place in the small intestine, NOT in the stomach."},
 {t:"Large intestine and anus 大肠和肛门", pics:["largeintdiag"], facts:[
  "Only <b>undigested food</b> and water reach the large intestine.",
  "The large intestine <b>absorbs water</b> (and some minerals) from the undigested food.",
  "<b>No digestion</b> takes place in the large intestine.",
  "The undigested food becomes <b>faeces</b>, which leave the body through the <b>anus</b>.",
  "If too little water is absorbed, the faeces are watery and the body loses water."],
  zh:"大肠吸收未消化食物里的水分，不消化食物。剩下的变成粪便，从肛门排出。",
  trap:"⚠️ The large intestine absorbs WATER, not digested food."},
 {sec:"3 · Experiments and exam skills 实验与答题"},
 {t:"Digestion experiments 消化实验", ch:"dbar", facts:[
  "<b>Smaller pieces</b> of food are digested <b>faster</b>, because more of the food's surface is <b>in contact with</b> the digestive juice.",
  "Digestive juices work best at about <b>body temperature (37 °C)</b>. They work slowly in the cold and stop working when it is too hot.",
  "Fair test: change only <b>one</b> variable (e.g. the size of the pieces). Keep the type and amount of food, the amount of digestive juice and the temperature the <b>same</b>.",
  "Bar graph of food not yet digested: <b>no change</b> = no digestion in that part (gullet, large intestine); the <b>biggest drop</b> = the small intestine."],
  zh:"食物越小块，接触消化液的表面越多，消化越快；消化液在体温（37°C）时效果最好。看图：没有变化 = 不消化；下降最多 = 小肠。",
  trap:"⚠️ 'The pieces are smaller' is only half an answer. Add: 'so more surface is in contact with the digestive juice'."},
 {t:"Full-mark answers 怎样拿满分", facts:[
  "Name the part AND its function: \"The small intestine absorbs digested food into the blood.\"",
  "Use exact keywords: <b>simpler substances</b>, <b>digestive juices</b>, <b>absorbed into the blood</b>, <b>absorbs water</b>, <b>undigested food</b>.",
  "Write <b>digested food</b> (not just \"food\") when you talk about absorption into the blood.",
  "Link cause and effect: \"Less water is absorbed, <b>so</b> the faeces are watery.\"",
  "Experiments: the <b>changed variable</b> is what you change on purpose; the <b>measured variable</b> is the result (e.g. the time taken)."],
  zh:"写器官也写功能；用关键词（简单物质、消化液、吸收进血液）；因果要连起来；分清改变的变量和测量的结果。"}
];

/* ---------------- question sets ---------------- */
const SETS = [
 {id:"d1", lv:1, title:"Parts and pictures", zh:"看图认器官", qs:[
  {pic:["humanteeth"], q:"What do our teeth do to food?", o:["break food into smaller pieces","absorb digested food into the blood","push food down to the stomach","absorb water from undigested food"], a:0,
   e:"Teeth chew and break food into smaller pieces, which are easier to swallow and to digest.", z:"牙齿把食物咬碎成小块。"},
  {pic:["tongue"], q:"How does the tongue help us when we eat?", o:["It mixes food with saliva and helps us swallow.","It cuts and grinds food into smaller pieces.","It makes saliva to start digesting food.","It absorbs digested food into the blood."], a:0,
   e:"The tongue moves the food about, mixes it with saliva and pushes it to the back of the mouth to be swallowed. The teeth cut and grind food; saliva is made by glands in the mouth, not by the tongue.", z:"舌头把食物和唾液混合，帮助吞咽。咬碎食物的是牙齿。"},
  {pic:["skeletonmodel"], q:"Which system is shown in the photo?", o:["skeletal system","digestive system","respiratory system","circulatory system"], a:0,
   e:"All the bones of the body make up the skeletal system.", z:"全身的骨头组成骨骼系统。"},
  {pic:["heart"], q:"The heart is part of which system?", o:["circulatory system","respiratory system","digestive system","skeletal system"], a:0,
   e:"The heart pumps blood around the body. Heart, blood vessels and blood make up the circulatory system.", z:"心脏属于循环系统。"},
  {pic:["lungs"], q:"The lungs are part of which system?", o:["respiratory system","circulatory system","digestive system","muscular system"], a:0,
   e:"The nose, windpipe and lungs make up the respiratory system. It takes in oxygen and removes carbon dioxide.", z:"肺属于呼吸系统。"},
  {ch:"dsys", q:"Which part is the mouth?", o:["A","B","C","D"], a:1, fix:true,
   e:"B is the mouth at the top. Food enters the digestive system here.", z:"B 是口腔。"},
  {ch:"dsys", q:"Which part is the stomach?", o:["A","C","D","E"], a:0, fix:true,
   e:"A is the stomach, the muscular bag at the end of the gullet.", z:"A 是胃，在食道下面。"},
  {ch:"dsys", q:"Which part is the small intestine?", o:["A","C","E","F"], a:2, fix:true,
   e:"E is the long, coiled small intestine. C is the large intestine around it.", z:"E 是弯弯曲曲的小肠；C 是围在外面的大肠。"},
  {q:"In which order does food pass through the digestive system?", o:["mouth → gullet → stomach → small intestine → large intestine","mouth → stomach → gullet → small intestine → large intestine","mouth → gullet → stomach → large intestine → small intestine","mouth → gullet → small intestine → stomach → large intestine"], a:0,
   e:"Mouth, gullet, stomach, small intestine, large intestine, then out through the anus.", z:"口腔 → 食道 → 胃 → 小肠 → 大肠。"},
  {q:"Undigested food leaves the body through the ___.", o:["anus","large intestine","small intestine","stomach"], a:0,
   e:"Undigested food passes through the large intestine and leaves the body through the anus as faeces.", z:"未消化的食物从肛门排出。"}
 ]},
 {id:"d2", lv:2, title:"Body systems", zh:"人体系统", qs:[
  {q:"What is a system?", o:["a group of organs that work together to carry out a function","one organ, such as the stomach, that carries out a function","all the bones in the body, which give the body its shape","the part of the body that digests the food we eat"], a:0,
   e:"A system is a group of organs working together, e.g. the mouth, gullet, stomach and intestines in the digestive system.", z:"系统 = 一组器官一起合作。"},
  {q:"Which statements about the skeletal system are correct?", st:["It gives the body its shape and support.","It protects some organs inside the body.","It works with the muscular system to allow movement.","It pumps blood around the body."], o:["A and B only","A, B and C only","B, C and D only","A, B, C and D"], a:1,
   e:"The heart (circulatory system) pumps blood, not the skeleton.", z:"泵血的是心脏（循环系统），不是骨骼。"},
  {pic:["skull"], q:"Which organ does the skull protect?", o:["brain","heart","lungs","stomach"], a:0,
   e:"The skull is a hard case of bone around the brain.", z:"头骨保护脑。"},
  {q:"The ribs protect the ___.", o:["heart and lungs","brain","small and large intestines","muscles of the legs"], a:0,
   e:"The ribs form a cage around the heart and lungs.", z:"肋骨保护心和肺。"},
  {q:"What is the function of the respiratory system?", o:["to take in oxygen and remove carbon dioxide","to pump blood to all parts of the body","to break down food into simpler substances","to support the body and give it shape"], a:0,
   e:"The respiratory system (nose, windpipe, lungs) takes in oxygen and removes carbon dioxide.", z:"呼吸系统：吸进氧气，排出二氧化碳。"},
  {q:"Which statement about the circulatory system is correct?", o:["The heart pumps blood, which carries oxygen and digested food.","The heart digests food and sends the digested food into the blood.","The blood takes in oxygen through the walls of the stomach.","The heart makes oxygen and pumps it to all parts of the body."], a:0,
   e:"The heart pumps blood. Blood carries oxygen (from the lungs) and digested food (from the small intestine) around the body.", z:"心脏泵血，血液运送氧气和养分。"},
  {ch:"gsys", q:"Which correctly names systems X and Z?", o:["X: respiratory, Z: digestive","X: circulatory, Z: digestive","X: respiratory, Z: circulatory","X: digestive, Z: respiratory"], a:0,
   e:"Nose, windpipe and lungs → respiratory. Mouth, gullet and stomach → digestive.", z:"X 鼻子、气管、肺 → 呼吸；Z 口腔、食道、胃 → 消化。"},
  {ch:"gsys", q:"What is a function of the parts in group Y?", o:["They support the body and protect organs inside it.","They take in oxygen and remove carbon dioxide.","They carry digested food and oxygen around the body.","They break down food into simpler substances."], a:0,
   e:"Skull, ribs and backbone are bones of the skeletal system: support and protection.", z:"Y 是骨骼：支撑和保护。"},
  {q:"Which two systems work together to move our arms and legs?", o:["skeletal and muscular systems","digestive and respiratory systems","circulatory and digestive systems","respiratory and skeletal systems"], a:0,
   e:"Muscles pull on bones to move them.", z:"肌肉拉动骨骼，身体才会动。"},
  {q:"Ali runs a race. Which of these happen in his body?", st:["He breathes faster to take in more oxygen.","His lungs pump blood to his legs.","His heart beats faster.","His muscles pull on his bones."], o:["A and C only","A, C and D only","B, C and D only","A, B, C and D"], a:1,
   e:"The heart pumps blood, not the lungs. The lungs take in oxygen.", z:"泵血的是心脏，不是肺。"}
 ]},
 {id:"d3", lv:2, title:"Digestion facts and traps", zh:"消化：知识和陷阱", qs:[
  {q:"What is digestion?", o:["the breaking down of food into simpler substances","the taking in of digested food into the blood","the removal of undigested food from the body","the chewing of food into smaller pieces by the teeth"], a:0,
   e:"Digestion breaks food down into simpler substances. Taking them into the blood is absorption.", z:"消化 = 分解成简单物质；进入血液 = 吸收。"},
  {q:"Where does digestion BEGIN?", o:["mouth","stomach","gullet","small intestine"], a:0,
   e:"Saliva in the mouth starts to digest starch.", z:"消化从口腔开始（唾液）。"},
  {q:"Where is digestion COMPLETED?", o:["small intestine","stomach","large intestine","mouth"], a:0,
   e:"Digestive juices in the small intestine complete digestion.", z:"消化在小肠完成。"},
  {q:"In which part of the digestive system is digested food absorbed into the blood?", o:["small intestine","stomach","large intestine","gullet"], a:0,
   e:"Digested food passes through the walls of the small intestine into the blood.", z:"养分在小肠被吸收进血液。"},
  {q:"In which part does NO digestion take place?", o:["gullet","mouth","stomach","small intestine"], a:0,
   e:"The gullet only carries food to the stomach.", z:"食道只运送食物，不消化。"},
  {q:"Which statements about the gullet are correct?", st:["It carries food from the mouth to the stomach.","Its muscles push the food down.","Digestion takes place in it.","Digested food is absorbed in it."], o:["A only","A and B only","A, B and C only","B, C and D only"], a:1,
   e:"The gullet's muscles push food down to the stomach. No digestion or absorption happens there.", z:"食道：用肌肉把食物推到胃，不消化也不吸收。"},
  {q:"Which statements about the stomach are correct?", st:["It churns food.","Digestion is completed in it.","It mixes food with digestive juices.","Digested food is mainly absorbed into the blood here."], o:["A and C only","A, B and C only","B and D only","A, B, C and D"], a:0,
   e:"Digestion is completed, and digested food is absorbed, in the small intestine — not in the stomach.", z:"消化完成和吸收养分都在小肠，不在胃。"},
  {q:"What is the main function of the large intestine?", o:["to absorb water from undigested food","to absorb digested food into the blood","to complete the digestion of food","to churn food and mix it with digestive juices"], a:0,
   e:"The large intestine absorbs water (and minerals). It does not digest food.", z:"大肠吸收水分。"},
  {q:"Saliva is ___.", o:["a digestive juice that starts digestion","only water, which makes food soft and wet","a digestive juice made in the stomach","the digestive juice that completes digestion"], a:0,
   e:"Saliva is made in the mouth. It starts digesting starch and also softens food.", z:"唾液是消化液，在口腔开始消化。"},
  {q:"Which statement is correct?", o:["Most digestion takes place in the small intestine.","Most digestion takes place in the stomach.","Food is digested in the large intestine.","The gullet digests food as it passes down to the stomach."], a:0,
   e:"The stomach digests some food, but most digestion happens in the small intestine.", z:"大部分消化在小肠进行。"}
 ]},
 {id:"d4", lv:3, title:"Diagrams, tables and graphs", zh:"图表题", qs:[
  {ch:"dsys", q:"In which part does digestion begin?", o:["A","B","D","E"], a:1, fix:true,
   e:"Digestion begins in the mouth (B), where saliva starts to digest starch.", z:"B 口腔：消化开始。"},
  {ch:"dsys", q:"Which part carries food to the stomach but does not digest it?", o:["A","B","C","D"], a:3, fix:true,
   e:"D is the gullet. It pushes food down to the stomach (A); no digestion takes place in it.", z:"D 是食道，不消化。"},
  {ch:"dsys", q:"In which part is water absorbed from undigested food?", o:["A","C","E","F"], a:1, fix:true,
   e:"C is the large intestine. It absorbs water from undigested food.", z:"C 大肠吸收水分。"},
  {ch:"dsys", q:"In which parts does digestion take place?", o:["A, B and E only","A, C and E only","B, D and E only","A, B, C and E only"], a:0,
   e:"Mouth (B), stomach (A) and small intestine (E). No digestion in the gullet (D) or large intestine (C).", z:"口腔 B、胃 A、小肠 E 会消化；食道 D 和大肠 C 不消化。"},
  {ch:"dsys", q:"Which shows the path of food in the correct order?", o:["B → D → A → E → C → F","B → A → D → E → C → F","B → D → A → C → E → F","D → B → A → E → C → F"], a:0,
   e:"Mouth (B) → gullet (D) → stomach (A) → small intestine (E) → large intestine (C) → anus (F).", z:"口腔 B → 食道 D → 胃 A → 小肠 E → 大肠 C → 肛门 F。"},
  {ch:"dbar", q:"Which part is most likely the gullet?", o:["P","Q","R","S"], a:1, fix:true,
   e:"The amount of food not yet digested is the same when it leaves Q as when it leaves P, so no digestion took place in Q. Q comes right after the mouth (P): it is the gullet.", z:"Q 没有变化 = 没有消化，又紧跟在口腔后面 → 食道。"},
  {ch:"dbar", q:"Which part is most likely the small intestine?", o:["P","R","S","T"], a:2, fix:true,
   e:"The biggest drop (55% → 15%) happens in S, and nothing more is digested after it. Digestion is completed in the small intestine.", z:"S 下降最多，之后不再消化 → 小肠。"},
  {ch:"dbar", q:"In which parts does NO digestion take place?", o:["Q and T only","P and Q only","T only","Q, S and T only"], a:0,
   e:"The amount stays the same in Q (gullet) and T (large intestine).", z:"Q（食道）和 T（大肠）没有变化。"},
  {ch:"dtab", q:"Which part is Y?", o:["small intestine","stomach","large intestine","gullet"], a:0,
   e:"Food is digested AND digested food is absorbed into the blood only in the small intestine.", z:"既消化又吸收养分 → 小肠。"},
  {ch:"dtab", q:"Which could parts W and X be?", o:["W: stomach, X: gullet","W: gullet, X: stomach","W: large intestine, X: gullet","W: stomach, X: small intestine"], a:0,
   e:"W digests food but absorbs nothing: the stomach (or the mouth). X does none of these: the gullet. Z, which absorbs water, is the large intestine.", z:"W 只消化 → 胃；X 什么都不做 → 食道。"}
 ]},
 {id:"d5", lv:3, title:"Experiments", zh:"实验题", qs:[
  {pic:["crackers"], q:"Wei chewed a plain cracker for 3 minutes without swallowing it. It began to taste sweet. Why?", o:["Saliva digested the starch in the cracker into sugar.","His teeth broke the starch into sugar as he chewed.","Saliva has sugar in it, which soaked into the cracker.","His stomach began digesting the cracker into sugar."], a:0,
   e:"Saliva is a digestive juice. It breaks down starch into sugar, a simpler substance that tastes sweet. Teeth only break food into smaller pieces, and the cracker never reached his stomach.", z:"唾液把淀粉分解成糖，所以变甜。牙齿只把饼干咬碎；饼干没有吞下去，没到胃。"},
  {ch:"dtube", q:"What does this experiment show?", o:["Saliva digests starch.","Water digests starch.","Starch can only be digested in the stomach.","Saliva is not a digestive juice."], a:0,
   e:"The tubes were the same except for saliva. Starch was gone only in tube A, which had saliva.", z:"只有加唾液的 A 没有淀粉了 → 唾液消化淀粉。"},
  {ch:"dtube", q:"Why was 5 ml of water added to tube B?", o:["so that saliva is the only difference between the tubes","so that the starch in tube B is digested more quickly","so that the starch in tube B tastes sweeter","so that tube B ends up with more starch than tube A"], a:0,
   e:"Tube B is for comparison. Adding the same amount of water keeps everything the same except the saliva.", z:"B 是对照组，只有唾液这一个条件不同。"},
  {ch:"dpieces", q:"What was Ali trying to find out?", o:["whether the size of the pieces affects how fast egg white is digested","whether temperature affects how fast egg white is digested","whether the amount of digestive juice affects how fast egg white is digested","whether cooked egg white can be digested by a digestive juice"], a:0,
   e:"Only the size of the pieces was changed. Temperature, mass of egg white and amount of juice were kept the same.", z:"只改变了蛋白的大小。"},
  {ch:"dpieces", q:"Which conclusion is correct?", o:["The smaller the pieces, the faster the egg white was digested.","The bigger the pieces, the faster the egg white was digested.","The size of the pieces did not affect the time taken.","Egg white can only be digested by juices kept at 37 °C."], a:0,
   e:"16 small pieces took only 35 min; 1 big piece took 90 min. The experiment did not test other temperatures.", z:"越小块消化越快。实验没有比较温度。"},
  {ch:"dpieces", q:"Which variables did Ali keep the same to make it a fair test?", st:["number of pieces","mass of egg white","amount of digestive juice","temperature"], o:["A and B only","B, C and D only","A, C and D only","A, B, C and D"], a:1,
   e:"The number (size) of pieces (A) is the variable he changed on purpose. Everything else was kept the same.", z:"块数（大小）是他故意改变的条件，其余都保持不变。"},
  {ch:"dtemp", q:"At which temperature did the saliva work best?", o:["37 °C","10 °C","70 °C","It worked equally well at all three."], a:0,
   e:"The starch in tube Y (37 °C) was digested in the shortest time: 8 min.", z:"37 °C 用时最短。"},
  {ch:"dtemp", q:"Why was the starch in tube Z not digested?", o:["The saliva stopped working because it was too hot.","The starch turned into water because it was too hot.","Tube Z had less saliva in it than tube Y had.","Tube Z was not left long enough for the saliva to work."], a:0,
   e:"Digestive juices stop working when it is too hot. The amounts of saliva were equal, and tube Z was left for 60 min — much longer than the 8 min tube Y needed.", z:"太热，唾液失去作用。题目说唾液的量相同，Z 放了 60 分钟也没消化。"},
  {ch:"dtemp", q:"Based on the results, why do our digestive juices work well inside our body?", o:["Our body temperature is about 37 °C.","Our body is very cold inside.","Our body is about 70 °C inside.","Food stays in our mouth for a long time."], a:0,
   e:"Digestive juices work best at about body temperature, 37 °C.", z:"人的体温约 37 °C，消化液最有效。"},
  {q:"Jun and Ken ate the same lunch. Jun chewed every mouthful well; Ken swallowed big pieces. Whose food was likely digested faster, and why?", o:["Jun's — smaller pieces have more surface in contact with digestive juices.","Ken's — big pieces take more food down to the stomach in each swallow.","Ken's — big pieces slide down the gullet and reach the stomach faster.","Both are the same — chewing only makes the food easier to swallow."], a:0,
   e:"Chewing breaks food into smaller pieces, so more surface is in contact with digestive juices and digestion is faster.", z:"嚼碎 → 接触消化液的表面更多 → 消化更快。"}
 ]},
 {id:"d6", lv:4, title:"Full-mark answers", zh:"选出能拿满分的答案", qs:[
  {q:"What is digestion? [1 mark]\nWhich answer gets the mark?", o:["Digestion is the breaking down of food into simpler substances that can be absorbed.","Digestion is the taking in of digested food into the blood in the small intestine.","Digestion is the breaking down of food into smaller pieces by chewing and churning.","Digestion is the passing of food from the mouth, through the gullet, to the intestines."], a:0,
   n:["✓ Keywords: broken down into simpler substances that can be absorbed.","✗ This is absorption, not digestion. Food must be digested before it can be absorbed.","✗ \"Smaller pieces\" is what chewing does. Digestion makes simpler substances.","✗ This is only the path of food. It does not say that food is broken down."],
   e:"Digestion = breaking down food into simpler substances that the body can absorb. \"Smaller pieces\" or \"food moving along\" does not get the mark.", z:"关键词：分解成简单物质（不是“小块”），可以被吸收。吸收是另一回事。"},
  {q:"State two functions of the small intestine. [2 marks]", o:["It completes digestion, and it absorbs digested food into the blood.","It completes digestion, and it absorbs water from undigested food.","It starts the digestion of food, and it absorbs digested food into the blood.","It starts the digestion of food, and it absorbs water from undigested food."], a:0,
   n:["✓ Two correct functions: completes digestion + absorbs digested food into the blood — 2 marks.","½ \"Completes digestion\" is right, but absorbing water from undigested food is the large intestine's job — 1 mark.","½ \"Absorbs digested food into the blood\" is right, but digestion starts in the mouth — 1 mark.","✗ Both halves wrong: digestion starts in the mouth, and the large intestine absorbs water."],
   e:"Two functions: it completes digestion, and it absorbs digested food into the blood. Check each half on its own.", z:"两个功能：完成消化 + 把消化后的养分吸收进血液。每一半分开检查。"},
  {q:"Explain how chewing food well helps digestion. [1 mark]", o:["Food is broken into smaller pieces, so more surface is in contact with digestive juices.","Food is broken into smaller pieces, so it is softer and easier to swallow down the gullet.","Food is broken into smaller pieces, and smaller pieces are digested faster than big ones.","Food is broken into smaller pieces, so the teeth can complete the digestion of the food."], a:0,
   n:["✓ Links smaller pieces to more surface in contact with digestive juices.","✗ True, but this is about swallowing, not digestion.","½ Says what happens, but not why: more surface is in contact with digestive juices.","✗ Teeth do not digest food. Digestion is completed in the small intestine."],
   e:"Give the reason: smaller pieces → more surface in contact with digestive juices → faster digestion.", z:"要写原因：小块 → 接触消化液的表面更多 → 消化更快。"},
  {q:"Mr Tan had most of his large intestine removed. How would his faeces change, and why? [2 marks]", o:["They would be more watery, because less water is absorbed from his undigested food.","They would be more watery, because less digested food is absorbed into his blood.","They would be harder and drier, because less water is absorbed from his undigested food.","They would be harder and drier, because less digested food is absorbed into his blood."], a:0,
   n:["✓ The change (more watery) + the reason (less water absorbed) — 2 marks.","½ The change is right, but digested food is absorbed in the small intestine, which he still has — 1 mark.","½ The reason is right, but less water absorbed makes faeces more watery, not harder — 1 mark.","✗ Both parts wrong: the faeces become watery, and digested food is absorbed in the small intestine."],
   e:"The large intestine absorbs water from undigested food. Without most of it, less water is absorbed, so the faeces are watery.", z:"大肠吸收水分；大肠没了 → 吸收的水少 → 粪便很稀。"},
  {q:"Mr Tan's doctor told him to drink more water. Explain why. [1 mark]", o:["Less water is absorbed from his undigested food, so he loses more water in his faeces.","His large intestine can no longer digest food, so he needs water to help digest it.","His faeces are watery, so drinking more water will make his faeces harder again.","His small intestine absorbs less water now, so he loses more water in his faeces."], a:0,
   n:["✓ Links the lost function (absorbing water) to the water lost in his faeces.","✗ The large intestine never digested food — it absorbs water.","✗ Cause and effect are mixed up: drinking water does not make faeces harder.","✗ Wrong part: his small intestine was not removed. The large intestine absorbs water."],
   e:"Connect the advice to the function he lost: less water is absorbed, so more water leaves in his faeces and must be replaced.", z:"把医生的建议和失去的功能连起来：吸收的水少 → 粪便带走更多水 → 要多喝水补充。"},
  {pic:["crackers"], q:"A plain cracker tastes sweet after it is chewed for a long time. Explain why. [1 mark]", o:["Saliva digests the starch in the cracker into sugar, which tastes sweet.","Saliva digests the cracker into simpler substances, which taste sweet.","The teeth break the starch in the cracker into sugar, which tastes sweet.","The teeth break the cracker into smaller pieces, which taste sweet."], a:0,
   n:["✓ Says what digests (saliva), what is digested (starch) and what it becomes (sugar).","½ Right idea, but name the food substance (starch) and what it becomes (sugar).","✗ Teeth do not digest food. It is saliva that digests starch into sugar.","✗ Smaller pieces are not sweeter. The sweet taste comes from starch digested into sugar by saliva."],
   e:"Name the digestive juice, the food substance and the simpler substance: saliva digests starch into sugar.", z:"写清楚：唾液把淀粉分解成糖。牙齿只把饼干咬碎。"},
  {q:"No digestive juices are made in the gullet. What is its function? [1 mark]", o:["Its muscles push food from the mouth down to the stomach.","It digests food as it moves from the mouth down to the stomach.","Its muscles push food from the stomach to the small intestine.","It digests food as it moves from the stomach to the small intestine."], a:0,
   n:["✓ The gullet's muscles push food from the mouth to the stomach.","✗ The path is right, but no digestion takes place in the gullet.","✗ Wrong part of the path: the gullet joins the mouth to the stomach.","✗ Both wrong: the gullet does not digest food, and it ends at the stomach."],
   e:"The gullet's muscles push food from the mouth down to the stomach. No digestion takes place there.", z:"食道：用肌肉把食物从口腔推到胃，不消化。"},
  {ch:"dpieces", q:"What was the changed variable in Ali's experiment? [1 mark]", o:["the size of the pieces Ali cut the egg white into","the time taken for all the egg white to be digested","the amount of digestive juice in each beaker","the temperature of the digestive juice in each beaker"], a:0,
   n:["✓ The one thing Ali changed on purpose.","✗ That is the measured variable (the result he recorded).","✗ Kept the same: 20 ml in each beaker.","✗ Kept the same: 37 °C in each beaker."],
   e:"Changed variable = the one thing you change on purpose. Measured variable = the result you record.", z:"改变的变量 = 故意改变的（块的大小）；测量的 = 结果（时间）。"},
  {ch:"dtube", q:"Why was tube B set up? [1 mark]", o:["To show that it was the saliva, and not the water, that digested the starch in tube A.","To show that water can digest starch too, if it is kept at 37 °C for 20 minutes.","To show that the starch in tube A was digested because it was kept at 37 °C.","To get a second set of results, so that the experiment is more reliable."], a:0,
   n:["✓ Tube B is for comparison: the only difference is the saliva.","✗ The results show the opposite: starch was still left in tube B.","✗ Both tubes were at 37 °C, so temperature cannot explain the difference.","✗ Tube B is not a repeat of tube A — it has water instead of saliva, so it is for comparison."],
   e:"Tube B is the same as tube A except that it has water instead of saliva. Comparing them shows that the saliva digested the starch.", z:"B 是对照组：只有唾液这一个条件不同，证明是唾液消化了淀粉。"},
  {q:"Explain how the digestive and circulatory systems work together. [2 marks]", o:["Digested food is absorbed into the blood, and the heart pumps the blood to carry it around the body.","Digested food is absorbed into the blood, and the lungs pump the blood to carry it around the body.","The food we eat goes straight into the blood, and the heart pumps the blood to carry it around the body.","The food we eat goes straight into the blood, and the lungs pump the blood to carry it around the body."], a:0,
   n:["✓ Shows the link: digested food goes into the blood, and the heart pumps it round — 2 marks.","½ The link is right, but the heart pumps blood, not the lungs — 1 mark.","½ Food must be digested before it can be absorbed into the blood — 1 mark.","✗ Both wrong: food is digested first, and the heart (not the lungs) pumps blood."],
   e:"Show the link: digested food is absorbed INTO THE BLOOD, and the heart pumps the blood to carry it to all parts of the body.", z:"连接点：养分被吸收进血液，心脏把血液泵到全身。"}
 ]}
];

/* ---------------- sort games (tap to classify) ---------------- */
const SORTS = [
 {id:"ds1", title:"Which system?", zh:"属于哪个系统", bins:[["D","Digestive","消化"],["R","Respiratory","呼吸"],["C","Circulatory","循环"],["S","Skeletal / muscular","骨骼／肌肉"]], items:[
  ["humanteeth","D","Teeth break food into smaller pieces."],["tongue","D","The tongue mixes food with saliva and helps us swallow."],["mouth","D","Digestion begins in the mouth."],
  ["gulletdiag","D","The gullet carries food to the stomach."],["smallintdiag","D","Digestion is completed and digested food is absorbed here."],["largeintdiag","D","It absorbs water from undigested food."],
  ["lungs","R","The lungs take in oxygen and remove carbon dioxide."],["nose","R","Air enters the body through the nose."],
  ["heart","C","The heart pumps blood around the body."],["blood","C","Blood carries digested food and oxygen around the body."],
  ["skull","S","The skull protects the brain."],["skeletonmodel","S","The bones support the body and give it shape."],["bone","S","Bones support and protect the body."],["muscle","S","Muscles pull on bones so that we can move."]]}
];

TOPIC({id:"digestive", lv:"P3/P4", icon:"🍎", title:"Digestive system", zh:"消化系统（人体系统）",
  pics:PICS, emo:EMO, learn:LEARN, charts:CHARTS, sets:SETS, sorts:SORTS});
})();
