export interface PurineFoodItem {
  id: string;
  name: string;
  category: "肉類・卵" | "魚介類・海産物" | "野菜・キノコ・豆" | "お酒・飲料" | "主食" | "その他・おつまみ";
  purineLevel: "LOW" | "MEDIUM" | "HIGH";
  purineMg: number; // 100gあたりの目安プリン体量 (mg)
  advice: string; // 痛風対策アドバイス
  alternatives: string[]; // おすすめの代替食品
  portion?: string; // 1人前あたりの標準的な量
}

export const purineDatabase: PurineFoodItem[] = [
  // === 肉類・卵 ===
  {
    id: "m1",
    name: "鶏レバー（焼き鳥レバーなど）",
    category: "肉類・卵",
    purineLevel: "HIGH",
    purineMg: 312,
    advice: "極めてプリン体が多い食材です。痛風発作の危険性が高いため、急性期は絶対に避け、日常的にも極力控えてください。",
    alternatives: ["鶏ハツ（中等度）", "鶏もも肉", "豚ハツ"],
    portion: "1本 (50g)"
  },
  {
    id: "m2",
    name: "豚レバー",
    category: "肉類・卵",
    purineLevel: "HIGH",
    purineMg: 284,
    advice: "非常に高いプリン体含有量です。レバニラなどで多く摂取しがちですが、少量に留めるか、痛風治療中は控えるべきです。",
    alternatives: ["豚もも肉", "豚ヒレ肉"],
    portion: "1皿 (100g)"
  },
  {
    id: "m3",
    name: "牛レバー",
    category: "肉類・卵",
    purineLevel: "HIGH",
    purineMg: 219,
    advice: "レバー類の中では比較的少なめですが、それでも「高プリン体」に分類されます。食べ過ぎには厳重に注意してください。",
    alternatives: ["牛もも肉", "牛ヒレ肉"],
    portion: "100g"
  },
  {
    id: "m4",
    name: "鶏ささみ",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 153,
    advice: "ヘルシーなイメージがありますが、実はプリン体は中程度含まれます。一度に大量に食べず、野菜と一緒に摂取しましょう。",
    alternatives: ["卵（極めて低い）", "豆腐"],
    portion: "1枚 (80g)"
  },
  {
    id: "m5",
    name: "鶏もも肉（皮なし）",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 122,
    advice: "一般的なお肉として適度な量であれば問題ありませんが、唐揚げなど食べ過ぎになりがちなメニューは控えるのが無難です。",
    alternatives: ["牛乳（低プリン）", "卵"],
    portion: "1枚 (200g)"
  },
  {
    id: "m6",
    name: "豚バラ肉",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 90,
    advice: "プリン体自体は「やや低め〜中程度」ですが、脂質が多いため肥満の原因となり、関節の尿酸結晶化を間接的に促すので食べ過ぎに注意。",
    alternatives: ["豚ヒレ肉", "大豆製品"],
    portion: "100g"
  },
  {
    id: "m7",
    name: "牛もも肉",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 110,
    advice: "赤身肉は適度なタンパク質補給になりますが、1日100g程度を目安にし、茹でる（スープは飲まない）調理法でさらにプリン体を減らせます。",
    alternatives: ["卵", "チーズ"],
    portion: "100g"
  },
  {
    id: "m8",
    name: "鶏手羽先",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 137,
    advice: "骨周りや皮は旨味が強いですが、プリン体も中程度含まれます。スープにする場合、溶け出したプリン体をすべて摂取することになるので注意が必要です。",
    alternatives: ["鶏むね肉（皮なし）"],
    portion: "2本 (80g)"
  },
  {
    id: "m9",
    name: "卵（鶏卵）",
    category: "肉類・卵",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "卵は細胞を持たないため、プリン体がほぼゼロ（検出限界以下）です。痛風患者にとって極めて優秀で安全なタンパク質源です。",
    alternatives: [],
    portion: "1個 (50g)"
  },
  {
    id: "m10",
    name: "うずらの卵",
    category: "肉類・卵",
    purineLevel: "LOW",
    purineMg: 1,
    advice: "鶏卵同様、非常に低プリン体です。おつまみやトッピングとして安全に召し上がっていただけます。",
    alternatives: [],
    portion: "3個 (30g)"
  },
  {
    id: "m11",
    name: "豚もも肉（赤身）",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 120,
    advice: "赤身部分はプリン体が中程度です。バラ肉などより脂質が低く、良質なタンパク質補給になりますが、過剰摂取は控えましょう。",
    alternatives: ["卵", "豆腐"],
    portion: "100g"
  },
  {
    id: "m12",
    name: "豚ロース肉",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 116,
    advice: "脂質が適度にあり美味しいですが、中程度のプリン体を含みます。生姜焼きなど一度にたくさん食べるメニューは量に注意しましょう。",
    alternatives: ["豚ヒレ肉", "大豆製品"],
    portion: "100g"
  },
  {
    id: "m13",
    name: "牛ロース肉",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 98,
    advice: "牛肉の中でも適度なプリン体含有量です。焼きすぎると硬くなりますが、脂身は少なめに取るのがヘルシーです。",
    alternatives: ["卵", "チーズ"],
    portion: "100g"
  },
  {
    id: "m14",
    name: "ラム肉（羊肉）",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 97,
    advice: "カルニチンを含みヘルシーとされる羊肉も、中等度のプリン体を含みます。過信して食べすぎないようにしてください。",
    alternatives: ["豆腐", "白身魚"],
    portion: "100g"
  },
  {
    id: "m15",
    name: "鶏砂肝",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 142,
    advice: "焼き鳥でも人気の砂肝ですが、プリン体は140mg以上と、お肉の中ではやや高めです。コリコリした食感は良いですがおつまみの食べ過ぎに注意。",
    alternatives: ["ちくわ", "枝豆"],
    portion: "2本 (60g)"
  },
  {
    id: "m16",
    name: "鶏ハツ（心臓）",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 126,
    advice: "レバーに比べてプリン体は少なめですが、中等度に分類されます。タレではなく塩で焼き、食べ過ぎないよう適量に留めましょう。",
    alternatives: ["鶏もも肉", "焼き豆腐"],
    portion: "2本 (60g)"
  },
  {
    id: "m17",
    name: "鶏皮",
    category: "肉類・卵",
    purineLevel: "MEDIUM",
    purineMg: 84,
    advice: "プリン体自体は中等度より低めですが、極めて高脂質です。肥満防止のためにも、唐揚げや焼き鳥では取り除いて食べるのがおすすめです。",
    alternatives: ["鶏ささみ", "軟骨"],
    portion: "50g"
  },
  {
    id: "m18",
    name: "ピータン",
    category: "肉類・卵",
    purineLevel: "LOW",
    purineMg: 2,
    advice: "アヒルの卵を熟成させたピータンも、卵類と同様に極めて低プリン体で、安心しておつまみとして楽しめます。",
    alternatives: [],
    portion: "1個 (50g)"
  },
  {
    id: "m19",
    name: "ロースハム",
    category: "肉類・卵",
    purineLevel: "LOW",
    purineMg: 58,
    advice: "加工肉は生肉よりもプリン体含有量が比較的低めですが、塩分と添加物が多いため、食べ過ぎは尿酸コントロールに良くありません。",
    alternatives: ["卵", "プレーンヨーグルト"],
    portion: "3枚 (40g)"
  },
  {
    id: "m20",
    name: "ベーコン",
    category: "肉類・卵",
    purineLevel: "LOW",
    purineMg: 65,
    advice: "加熱調理してにじみ出た脂を落とすことで、プリン体をさらに減らせます。ただ高カロリー・高塩分なので使用は少量に。",
    alternatives: ["ロースハム", "豆腐"],
    portion: "2枚 (35g)"
  },

  // === 魚介類・海産物 ===
  {
    id: "f1",
    name: "マイワシ（干物）",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 305,
    advice: "干物は水分が抜けて凝縮されているため、非常に高プリン体です。イワシの干物やめざしは痛風の天敵といえます。",
    alternatives: ["焼きサケ", "アジ（生・適量）"],
    portion: "1尾 (60g)"
  },
  {
    id: "f2",
    name: "アジ（干物）",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 246,
    advice: "アジの開きは美味しいですがプリン体が多いので、痛風が気になる時は生の刺身を適量食べる方がまだ安全です。",
    alternatives: ["アジの刺身（中等度）", "サケ"],
    portion: "1枚 (100g)"
  },
  {
    id: "f3",
    name: "大正エビ / 車エビ",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 273,
    advice: "エビの頭や内臓、むき身にも多くのプリン体が含まれます。エビチリや天ぷらなど、ごちそうの場ではセーブしましょう。",
    alternatives: ["イカ（中等度）", "カキ（少量）"],
    portion: "3尾 (75g)"
  },
  {
    id: "f4",
    name: "カツオ（刺身）",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 211,
    advice: "カツオは運動量が多いため筋肉中のプリン体が非常に豊富です。タタキや刺身を大量に食べるのは避けましょう。",
    alternatives: ["マグロ赤身（中等度）", "タイ"],
    portion: "1皿 (100g)"
  },
  {
    id: "f5",
    name: "白子（タラなど）",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 300,
    advice: "白子やあん肝といった魚の内臓・生殖巣は、細胞分裂が極めて盛んなため核酸（プリン体）が超豊富です。一口に留めるべきです。",
    alternatives: ["カマボコ", "ちくわ"],
    portion: "1鉢 (50g)"
  },
  {
    id: "f6",
    name: "サンマ（焼き）",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 140,
    advice: "中程度のプリン体です。青魚のサラサラ脂（EPA/DHA）は健康に良いですが、サンマの内臓（ワタ）はプリン体が極めて多いので残しましょう。",
    alternatives: ["白身魚（タイ、ヒラメなど）"],
    portion: "1尾 (100g)"
  },
  {
    id: "f7",
    name: "サケ（鮭）",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 119,
    advice: "魚介類の中ではプリン体が比較的穏やかで、痛風患者でも食べやすい魚です。朝食の塩鮭なども日常範囲なら安心です。",
    alternatives: ["タラ", "タイ"],
    portion: "1切 (80g)"
  },
  {
    id: "f8",
    name: "マグロ（赤身）",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 157,
    advice: "お刺身の定番ですが、中程度のプリン体があります。大トロや中トロなど脂が多い部分も同様です。食べ過ぎなければ問題ありません。",
    alternatives: ["イカ（適量）", "白身魚"],
    portion: "1皿 (100g)"
  },
  {
    id: "f9",
    name: "スルメイカ",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 186,
    advice: "イカは中等度の中でもやや高めです。特に「するめ（乾燥）」はおつまみとして食べ過ぎてしまうので、生を適量が無難です。",
    alternatives: ["タコ（やや少なめ）"],
    portion: "100g"
  },
  {
    id: "f10",
    name: "タラコ",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 120,
    advice: "「魚卵はプリン体が多い」と誤解されがちですが、実は卵1個が1細胞なのでプリン体自体はレバーほど多くありません。ただし塩分やコレステロールが高いため、別視点から控えめにすべきです。",
    alternatives: ["数の子（実は低プリン体）"],
    portion: "1腹 (30g)"
  },
  {
    id: "f11",
    name: "カキ（牡蠣）",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 184,
    advice: "栄養が豊富ですが、プリン体は高めに近いです。カキフライや生牡蠣は、一度に2〜3個程度にして楽しむのが安全です。",
    alternatives: ["アサリ（適量）"],
    portion: "3個 (60g)"
  },
  {
    id: "f12",
    name: "ホタテ貝（貝柱）",
    category: "魚介類・海産物",
    purineLevel: "LOW",
    purineMg: 76,
    advice: "魚介類の中ではプリン体がかなり低く、痛風患者でも比較的安心して食べられる優秀なシーフードです。ひも部分は避け、貝柱を中心に。",
    alternatives: [],
    portion: "2個 (60g)"
  },
  {
    id: "f13",
    name: "わかめ / 昆布",
    category: "魚介類・海産物",
    purineLevel: "LOW",
    purineMg: 15,
    advice: "海藻類は、尿をアルカリ性に傾ける作用があり、尿酸を尿に溶けやすくして排出を強力にサポートします。進んで食べましょう。",
    alternatives: [],
    portion: "1皿 (20g)"
  },
  {
    id: "f14",
    name: "アジ（刺身・生）",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 165,
    advice: "アジは生で食べる方が干物よりも大幅にプリン体が低くなります。お魚を食べるなら開きではなく刺身を選ぶのが断然おすすめです。",
    alternatives: ["サケ（鮭）", "白身魚（タイなど）"],
    portion: "1皿 (80g)"
  },
  {
    id: "f15",
    name: "マイワシ（生）",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 210,
    advice: "生のイワシは、干物よりは低いですがそれでも200mgを超えており『高プリン体』に分類されます。食べ過ぎには注意が必要です。",
    alternatives: ["マアジの刺身", "サケ"],
    portion: "100g"
  },
  {
    id: "f16",
    name: "真タコ",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 137,
    advice: "タコは中程度のプリン体です。高タンパク・低脂質でタウリンを含みヘルシーですが、おつまみでの過剰摂取は控えましょう。",
    alternatives: ["イカ", "ホタテ貝柱"],
    portion: "1皿 (80g)"
  },
  {
    id: "f17",
    name: "ズワイガニ",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 136,
    advice: "カニの身には中程度のプリン体が含まれます。カニ味噌部分は細胞が密集しているためより高プリン体になるので、食べるなら身の部分を中心にしましょう。",
    alternatives: ["ホタテ貝柱", "かまぼこ"],
    portion: "100g"
  },
  {
    id: "f18",
    name: "明太子",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 159,
    advice: "たらこと同様に中等度のプリン体量です。塩分が非常に高いため、痛風の合併症である高血圧対策としても、一口サイズなど少量に抑えてください。",
    alternatives: ["数の子"],
    portion: "1本 (25g)"
  },
  {
    id: "f19",
    name: "シジミ",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 143,
    advice: "オルニチンを含み肝臓に良いですが、貝類としてのプリン体は中等度あります。みそ汁や吸い物にする際、プリン体がスープに溶け出すため、汁の飲み干しは控えましょう。",
    alternatives: ["もずく", "わかめ"],
    portion: "1杯"
  },
  {
    id: "f20",
    name: "サザエ",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 120,
    advice: "刺身や壺焼きなど、おつまみに人気ですが中程度のプリン体です。内臓（ウロ）の黒・緑色の部分はプリン体がより多いので避けるのが無難です。",
    alternatives: ["ホタテ貝柱"],
    portion: "1個 (50g)"
  },
  {
    id: "f21",
    name: "数の子",
    category: "魚介類・海産物",
    purineLevel: "LOW",
    purineMg: 22,
    advice: "魚卵のなかでも、ニシンの卵である数の子はプリン体が非常に低く、おせち料理等でも安心して食べられます。ただし塩抜きはしっかり行いましょう。",
    alternatives: [],
    portion: "2切 (30g)"
  },
  {
    id: "f22",
    name: "イクラ",
    category: "魚介類・海産物",
    purineLevel: "LOW",
    purineMg: 4,
    advice: "鮭の卵であるイクラは、大粒の単細胞のため、100gあたり約4mgと極めて低プリン体なのが特徴です。塩分・コレステロールに気をつければ安全です。",
    alternatives: [],
    portion: "大さじ1 (15g)"
  },
  {
    id: "f23",
    name: "キャビア",
    category: "魚介類・海産物",
    purineLevel: "MEDIUM",
    purineMg: 90,
    advice: "高級食材のキャビアは中程度のプリン体です。一度に大量に食べるものではないため、過度な心配は不要ですが塩分に留意しましょう。",
    alternatives: ["数の子"],
    portion: "10g"
  },
  {
    id: "f24",
    name: "ちりめんじゃこ",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 258,
    advice: "イワシの稚魚を乾燥させたもので、丸ごと食べるためプリン体が非常に凝縮されています。大さじ1杯程度など、料理のアクセントで使うのが無難です。",
    alternatives: ["しらす（生しらすなど、水分の多いもの）"],
    portion: "大さじ1 (10g)"
  },
  {
    id: "f25",
    name: "桜エビ（素干し）",
    category: "魚介類・海産物",
    purineLevel: "HIGH",
    purineMg: 215,
    advice: "乾燥された桜エビはプリン体が豊富です。お好み焼きや炒め物のトッピングとして少量使う程度なら問題ありません。",
    alternatives: ["もずく", "わかめ"],
    portion: "5g"
  },
  {
    id: "f26",
    name: "もずく",
    category: "魚介類・海産物",
    purineLevel: "LOW",
    purineMg: 5,
    advice: "海藻類であるもずくは超低プリン体。水溶性食物繊維が豊富で、尿のアルカリ化を促し、尿酸の溶解と排出を強力にサポートします。",
    alternatives: [],
    portion: "1パック (80g)"
  },

  // === 野菜・キノコ・豆 ===
  {
    id: "v1",
    name: "ブロッコリースプラウト",
    category: "野菜・キノコ・豆",
    purineLevel: "MEDIUM",
    purineMg: 129,
    advice: "野菜の中ではプリン体が高めですが、植物性のプリン体は、肉や魚、アルコールのプリン体と異なり、痛風の発症リスクを高めないことが最新の研究で分かっています。",
    alternatives: ["一般のブロッコリー", "キャベツ"],
    portion: "1パック (30g)"
  },
  {
    id: "v2",
    name: "ほうれん草",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 57,
    advice: "尿をアルカリ化するのを助ける優秀な野菜ですが、シュウ酸を多く含むため、結石を防ぐ観点からも茹でて水にさらしてから食べるのがベストです。",
    alternatives: ["小松菜", "キャベツ"],
    portion: "1浸し (70g)"
  },
  {
    id: "v3",
    name: "キャベツ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 10,
    advice: "プリン体はほぼ含まれず、尿をアルカリ性に傾けて尿酸排出を助けます。満腹感も得られるため、肥満防止にも最適です。",
    alternatives: [],
    portion: "1皿 (100g)"
  },
  {
    id: "v4",
    name: "トマト / ミニトマト",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 15,
    advice: "非常に優秀な抗酸化野菜です。尿のアルカリ化を助けるので、毎日積極的にサラダやスープなどで摂取してください。",
    alternatives: [],
    portion: "1個 (150g)"
  },
  {
    id: "v5",
    name: "にんじん / 大根",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 8,
    advice: "根菜類は尿のアルカリ化を促し、水分も豊富です。おでんや煮物などで、プリン体を気にせずお腹いっぱい食べられます。",
    alternatives: [],
    portion: "100g"
  },
  {
    id: "v6",
    name: "干し椎茸",
    category: "野菜・キノコ・豆",
    purineLevel: "HIGH",
    purineMg: 380,
    advice: "乾燥キノコは水分が抜けてプリン体が超高濃度に凝縮されています。出汁（ダシ）にもプリン体が溶け出すため、しいたけ出汁の多用には注意しましょう。",
    alternatives: ["生の椎茸", "エリンギ", "マイタケ"],
    portion: "3個 (9g・乾燥時)"
  },
  {
    id: "v7",
    name: "生シイタケ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 25,
    advice: "生キノコは低プリン体で、食物繊維が豊富、カロリーもほぼ無いため、痛風の大敵である「肥満」を解消・予防するのにうってつけの食材です。",
    alternatives: [],
    portion: "1パック (100g)"
  },
  {
    id: "v8",
    name: "納豆",
    category: "野菜・キノコ・豆",
    purineLevel: "MEDIUM",
    purineMg: 114,
    advice: "健康に非常に良い発酵食品ですが、大豆が凝縮されているためプリン体は中程度あります。1日1パック程度を目安にしましょう。",
    alternatives: ["豆腐（水分が多いためプリン体はさらに低め）"],
    portion: "1パック (50g)"
  },
  {
    id: "v9",
    name: "豆腐（絹ごし・木綿）",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 31,
    advice: "大豆加工の過程で水分が多くなっているため、プリン体はかなり低めです。痛風患者にとって極めて理想的な良質植物性タンパク源です。",
    alternatives: [],
    portion: "1丁 (300g)"
  },
  {
    id: "v10",
    name: "バナナ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 5,
    advice: "果物全般は非常にプリン体が少ないです。ただし、果物に多く含まれる「果糖」は体内で尿酸値を上げる作用を誘発するため、1日1本程度が目安です。",
    alternatives: [],
    portion: "1本 (100g)"
  },
  {
    id: "v11",
    name: "エリンギ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 30,
    advice: "食物繊維が豊富で、弾力のある食感が満腹感を刺激します。低プリン体・超低カロリーのダイエット向き食材です。",
    alternatives: [],
    portion: "1パック (100g)"
  },
  {
    id: "v12",
    name: "マイタケ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 28,
    advice: "キノコ類全般は、乾燥させない限り低プリン体で安全です。お鍋や炒め物、ホイル焼きなどで美味しく食べられます。",
    alternatives: [],
    portion: "1パック (100g)"
  },
  {
    id: "v13",
    name: "えのきたけ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 35,
    advice: "低プリン体でビタミンDや食物繊維が豊富。お肉の代わりにカサ増し食材として使うと非常に健康的です。",
    alternatives: [],
    portion: "1袋 (100g)"
  },
  {
    id: "v14",
    name: "厚揚げ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 45,
    advice: "豆腐と同様にプリン体は低めです。油を落とすためにサッと湯通ししてから調理すると、脂質がカットされてさらにヘルシーになります。",
    alternatives: [],
    portion: "1枚 (150g)"
  },
  {
    id: "v15",
    name: "豆乳",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 22,
    advice: "大豆を絞った豆乳は、水分が多いためプリン体はかなり低く抑えられています。牛乳や低脂肪乳の代わりとしても有用です。",
    alternatives: [],
    portion: "1杯 (200ml)"
  },
  {
    id: "v16",
    name: "枝豆",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 47,
    advice: "ビールのおつまみ定番ですが、プリン体は低いです。ビール自体をノンアルビールやハイボール、炭酸水に変えれば、極めて安全なおつまみになります。",
    alternatives: [],
    portion: "1鉢 (100g・サヤ含む)"
  },
  {
    id: "v17",
    name: "大豆（乾燥）",
    category: "野菜・キノコ・豆",
    purineLevel: "MEDIUM",
    purineMg: 172,
    advice: "乾燥大豆は中程度のプリン体を含みます。煮豆や煎り大豆として食べる場合は、水分を吸った状態で適量を意識しましょう。",
    alternatives: ["豆腐", "おから"],
    portion: "50g"
  },
  {
    id: "v18",
    name: "ピーマン",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 12,
    advice: "ビタミンCが豊富で、プリン体は極小。尿をアルカリ性に保つカリウムも豊富に含まれており、毎日食べたい緑黄色野菜です。",
    alternatives: [],
    portion: "2個 (60g)"
  },
  {
    id: "v19",
    name: "ナス",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 11,
    advice: "ほぼ水分で構成されており、プリン体は極小です。体をアルカリ化するカリウムが含まれており、夏バテ予防にも効果的です。",
    alternatives: [],
    portion: "1本 (80g)"
  },
  {
    id: "v20",
    name: "キュウリ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 8,
    advice: "カリウムと水分が非常に豊富なため、高い利尿作用があり、体に溜まった尿酸を洗い流すサポートをしてくれます。",
    alternatives: [],
    portion: "1本 (100g)"
  },
  {
    id: "v21",
    name: "タマネギ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 9,
    advice: "抗酸化成分のケルセチンが含まれ、尿酸値を下げる効果が期待されています。プリン体もほぼゼロで毎日食べたい食材です。",
    alternatives: [],
    portion: "半分 (100g)"
  },
  {
    id: "v22",
    name: "じゃがいも",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 16,
    advice: "イモ類はカリウムが多く、尿のアルカリ化に貢献します。フライドポテトではなく、油を使わない蒸し・茹ででの調理がベストです。",
    alternatives: [],
    portion: "1個 (100g)"
  },
  {
    id: "v23",
    name: "さつまいも",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 18,
    advice: "食物繊維とビタミンCが非常に豊富。プリン体が極めて少なく、適量であれば便秘解消や肥満防止にも非常に役立ちます。",
    alternatives: [],
    portion: "中1本 (150g)"
  },
  {
    id: "v24",
    name: "りんご",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 5,
    advice: "カリウムやリンゴ酸が尿をアルカリ性に傾け、尿酸排出に貢献してくれます。果糖が含まれますので1日1個程度を目安にしてください。",
    alternatives: [],
    portion: "半分 (150g)"
  },
  {
    id: "v25",
    name: "スイカ",
    category: "野菜・キノコ・豆",
    purineLevel: "LOW",
    purineMg: 4,
    advice: "シトルリンという成分に強力な利尿作用があり、尿酸を効率よく尿に溶かして体外へ排出するのを助けてくれる素晴らしい果物です。",
    alternatives: [],
    portion: "1切れ (200g)"
  },

  // === お酒・飲料 ===
  {
    id: "a1",
    name: "ビール（一般的なビール）",
    category: "お酒・飲料",
    purineLevel: "HIGH",
    purineMg: 5,
    advice: "ビールは『アルコール自体が尿酸値を上げる作用』に加え、『お酒自体にプリン体が含まれる』という痛風のダブルパンチ飲料です。できるだけ避け、プリン体ゼロやノンアルビールに切り替えるのが鉄則です。",
    alternatives: ["プリン体ゼロビール", "ハイボール", "焼酎（水割り）"],
    portion: "1缶 (350ml)"
  },
  {
    id: "a2",
    name: "プリン体ゼロ発泡酒 / ノンアルビール",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0.1,
    advice: "プリン体はほぼゼロですが、アルコールを分解する際に体内で尿酸が生成されるため、飲み過ぎは尿酸値を上げます。ノンアルコールであれば一番安全です。",
    alternatives: ["ノンアルコールビール"],
    portion: "1缶 (350ml)"
  },
  {
    id: "a3",
    name: "日本酒",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 1.2,
    advice: "醸造酒のため少しプリン体を含みますが微量です。しかし、度数が高く飲み過ぎになりやすいため、日本酒なら1日1合程度を目安にし、和らぎ水（お水）を同量飲むのが重要です。",
    alternatives: ["焼酎", "ウイスキー"],
    portion: "1合 (180ml)"
  },
  {
    id: "a4",
    name: "ウイスキー / ハイボール",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0.1,
    advice: "蒸留酒のため、プリン体は実質ほぼゼロです。ただしアルコール代謝時の尿酸上昇はあるため、薄めのハイボールで1日2杯程度が限界と心得ましょう。",
    alternatives: ["炭酸水"],
    portion: "1杯 (350ml)"
  },
  {
    id: "a5",
    name: "本格焼酎（麦・芋・米）",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0.1,
    advice: "蒸留酒でありプリン体はゼロです。糖質も含まないため肥満対策にも最適ですが、アルコールによる脱水を防ぐため、水割りやお湯割りで、しっかり水分も併せて摂取しましょう。",
    alternatives: [],
    portion: "1杯 (100ml・水割り)"
  },
  {
    id: "a6",
    name: "ワイン（赤・白）",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0.4,
    advice: "ワインは適量（1日グラス2杯程度）であれば尿酸値を上げにくいお酒という研究データもあります（特にポリフェノール豊富な赤ワイン）。ただし、おつまみのプリン体に注意しましょう。",
    alternatives: [],
    portion: "1杯 (120ml)"
  },
  {
    id: "a7",
    name: "コーヒー（ブラック）",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "1日複数杯のコーヒーを飲む人は痛風の発症率が低いという有名な疫学データがあります。尿酸値を下げる穏やかな作用が認められているため、砂糖なしのブラックで水分補給としてもおすすめです。",
    alternatives: [],
    portion: "1杯 (150ml)"
  },
  {
    id: "a8",
    name: "牛乳",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "乳製品はプリン体がゼロで、含まれるカゼインやホエイが腎臓での尿酸の再吸収を抑制し、体外への排出を強力にサポート（尿酸値を下げる効果）します。毎日1杯飲むのが推奨されます。",
    alternatives: [],
    portion: "1杯 (200ml)"
  },
  {
    id: "a9",
    name: "緑茶 / 麦茶",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "最高の水分補給源です。1日2リットル以上の尿量を保つため、のどが渇く前にこまめに飲みましょう。ノンカフェインの麦茶などは特に推奨されます。",
    alternatives: [],
    portion: "200ml"
  },
  {
    id: "a10",
    name: "地ビール（クラフトビール）",
    category: "お酒・飲料",
    purineLevel: "HIGH",
    purineMg: 10,
    advice: "一般的なビールよりも酵母などが豊富なため、プリン体がさらに多く含まれる傾向があります（一般ビールの約2倍）。飲むのは最小限に。",
    alternatives: ["プリン体ゼロビール", "ハイボール"],
    portion: "1杯 (350ml)"
  },
  {
    id: "a11",
    name: "ブランデー",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0.1,
    advice: "蒸留酒のためプリン体はほぼゼロ。ただし、ウイスキー同様にアルコールによる脱水や、体内で分解される際の尿酸上昇には注意が必要なので量はほどほどに。",
    alternatives: ["炭酸水"],
    portion: "1杯 (30ml)"
  },
  {
    id: "a12",
    name: "低脂肪乳",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "乳製品の尿酸排出促進効果は、低脂肪・無脂肪乳の方がより高いという研究データがあります。痛風対策として毎日飲む習慣をつけたいドリンクです。",
    alternatives: [],
    portion: "1杯 (200ml)"
  },
  {
    id: "a13",
    name: "ほうじ茶",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "カフェインが少なめで胃に優しく、水分補給に最適。温かくして飲むことで、体を冷やさずに代謝を促し尿酸排出を助けます。",
    alternatives: [],
    portion: "200ml"
  },
  {
    id: "a14",
    name: "炭酸水（無糖）",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "ビールの代わりに飲むことで、禁酒をスマートにサポート。プリン体もアルコールもゼロで、かつ爽快感を得られる最強の健康ドリンクです。",
    alternatives: [],
    portion: "1本 (500ml)"
  },
  {
    id: "a15",
    name: "トマトジュース（無塩）",
    category: "お酒・飲料",
    purineLevel: "LOW",
    purineMg: 12,
    advice: "カリウムが豊富で、尿のアルカリ化を促します。無塩のものを選ぶことで、血圧上昇を抑えながら健康的に尿酸対策ができます。",
    alternatives: [],
    portion: "1本 (200ml)"
  },

  // === 主食 ===
  {
    id: "s1",
    name: "白米（ご飯）",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 25,
    advice: "主食としてのプリン体量は非常に低く安全です。ただし、炭水化物の摂りすぎによる肥満は尿酸の過剰生産を招くため、適量を心がけましょう。",
    alternatives: ["玄米", "麦ご飯"],
    portion: "1杯 (150g)"
  },
  {
    id: "s2",
    name: "食パン",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 15,
    advice: "安全で非常にプリン体の少ない主食です。ジャムなどの糖分をのせすぎると果糖が尿酸値を上げるため、プレーンやチーズトーストなどがおすすめです。",
    alternatives: [],
    portion: "1枚 (60g)"
  },
  {
    id: "s3",
    name: "うどん",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 20,
    advice: "うどん自体は非常に低プリン体です。ただし、鰹節などのだしが利いた「つゆ」にはプリン体が溶け出しているため、つゆは飲み干さずに残すのが痛風管理のコツです。",
    alternatives: [],
    portion: "1玉 (200g)"
  },
  {
    id: "s4",
    name: "ラーメン",
    category: "主食",
    purineLevel: "MEDIUM",
    purineMg: 70,
    advice: "麺自体は低プリン体ですが、豚骨や鶏ガラ、煮干しなどから何時間も抽出された「スープ」には強烈な量のプリン体と塩分が溶け込んでいます。絶対にスープを飲まないでください。",
    alternatives: ["お蕎麦（つゆを飲まない）"],
    portion: "1杯"
  },
  {
    id: "s5",
    name: "パスタ（スパゲッティ）",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 20,
    advice: "小麦由来のパスタ麺は低プリン体です。ミートソースやカルボナーラも適量なら安心ですが、魚介ふんだんのペスカトーレは少しプリン体が増えます。",
    alternatives: [],
    portion: "100g (乾麺)"
  },
  {
    id: "s6",
    name: "玄米",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 35,
    advice: "白米よりも食物繊維やミネラルが豊富です。プリン体はごくわずかに増えますが、血糖値の急上昇を抑え、肥満を防ぐためお勧めです。",
    alternatives: ["白米"],
    portion: "1杯 (150g)"
  },
  {
    id: "s7",
    name: "オートミール",
    category: "主食",
    purineLevel: "MEDIUM",
    purineMg: 100,
    advice: "食物繊維が極めて豊富で健康食材ですが、精白していない穀物であるため、中等度のプリン体を含みます。朝食での食べ過ぎに注意し適量を維持しましょう。",
    alternatives: ["食パン", "白米"],
    portion: "30g (乾燥)"
  },
  {
    id: "s8",
    name: "クロワッサン",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 20,
    advice: "小麦粉自体は低プリン体ですが、バター（脂質）が非常に多いため、肥満対策としては食パンやバゲット、ライ麦パンの方が優秀です。",
    alternatives: ["食パン", "フランスパン"],
    portion: "1個 (40g)"
  },
  {
    id: "s9",
    name: "日本そば",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 20,
    advice: "蕎麦自体は低プリン体です。ルチンなどのポリフェノールも豊富で健康的ですが、魚介だしのきいた温かい「つゆ」の飲み干しは厳禁です。",
    alternatives: [],
    portion: "1玉 (200g)"
  },
  {
    id: "s10",
    name: "中華麺",
    category: "主食",
    purineLevel: "LOW",
    purineMg: 30,
    advice: "麺自体は低プリン体です。冷やし中華のように、スープをほとんど飲まないメニューであればラーメンよりも圧倒的に低プリン体に抑えられます。",
    alternatives: ["うどん", "日本そば"],
    portion: "1玉 (120g)"
  },

  // === その他・おつまみ ===
  {
    id: "o1",
    name: "ちくわ",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 40,
    advice: "魚を原料としていますが、水に晒して製造する過程でほとんどのプリン体が洗い流されているため、非常に低プリン体です。おつまみとして大活躍します。",
    alternatives: [],
    portion: "1本 (80g)"
  },
  {
    id: "o2",
    name: "ヨーグルト（無糖）",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "牛乳同様、プリン体はゼロ。乳酸菌と乳製品のダブル効果で尿酸の排出を助けます。デザートや朝食に毎日食べるのが理想的です。",
    alternatives: [],
    portion: "1カップ (100g)"
  },
  {
    id: "o3",
    name: "プロセスチーズ",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 5,
    advice: "乳製品ですので、プリン体はほぼ無し。塩分に注意しながら、小腹が空いた時のおやつやお酒のおつまみに最適です。",
    alternatives: ["レバーペーストの代わりにチーズ"],
    portion: "2個 (30g)"
  },
  {
    id: "o4",
    name: "ポテトチップス",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 15,
    advice: "プリン体自体は少ないですが、高脂肪・高塩分で肥満を誘発するため、痛風リスクを間接的に高めます。おやつは控えめに。",
    alternatives: ["ヨーグルト", "ナッツ類"],
    portion: "1袋 (60g)"
  },
  {
    id: "o5",
    name: "ナッツ類（アーモンド、クルミ）",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 25,
    advice: "プリン体が非常に少ない良質な健康脂質源です。ビールのおつまみをナッツに変えるだけで、痛風発作の危険性を大幅に下げられます（無塩がおすすめ）。",
    alternatives: ["唐揚げ（高プリン）の代わり"],
    portion: "1掴み (25g)"
  },
  {
    id: "o6",
    name: "煮干し",
    category: "その他・おつまみ",
    purineLevel: "HIGH",
    purineMg: 746,
    advice: "100gあたりなんと約750mgという驚異的な超極高プリン体です。煮干し自体をそのままおつまみにムシャムシャ食べるのは非常に危険です。",
    alternatives: ["昆布だし", "かつおだし（少量）"],
    portion: "5g"
  },
  {
    id: "o7",
    name: "かまぼこ",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 30,
    advice: "ちくわと同じく、水に晒して製造されるためプリン体は極小。おせちやおつまみのタンパク質源として非常に優秀です。",
    alternatives: [],
    portion: "1板 (100g)"
  },
  {
    id: "o8",
    name: "かつお節",
    category: "その他・おつまみ",
    purineLevel: "HIGH",
    purineMg: 496,
    advice: "だし汁に少し使う程度なら問題ありませんが、100gあたりのプリン体は極めて高いため、かつお節自体をトッピングとして大量に食べるのは避けましょう。",
    alternatives: ["昆布（極めて低プリン）"],
    portion: "5g"
  },
  {
    id: "o9",
    name: "モッツァレラチーズ",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 3,
    advice: "フレッシュチーズも牛乳由来のため、プリン体はほぼゼロ。オリーブオイルとトマトと合わせたカプレーゼは、低プリン体・尿のアルカリ化に最高の一皿です。",
    alternatives: [],
    portion: "50g"
  },
  {
    id: "o10",
    name: "バター",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 1,
    advice: "牛乳の脂肪分から作られるためプリン体は皆無に近いです。ただし、高脂質・高カロリーなため過剰摂取は肥満につながり、結果的に尿酸値を上げる原因になります。",
    alternatives: ["オリーブオイル"],
    portion: "1かけ (10g)"
  },
  {
    id: "o11",
    name: "はちみつ",
    category: "その他・おつまみ",
    purineLevel: "LOW",
    purineMg: 0,
    advice: "プリン体はありませんが、主成分が果糖（フルクトース）であるため、過剰摂取は体内で尿酸合成を急増させ、尿酸値を高めてしまいます。甘味料としての多用は禁物です。",
    alternatives: [],
    portion: "大さじ1 (20g)"
  },
  {
    id: "o12",
    name: "サラミ",
    category: "その他・おつまみ",
    purineLevel: "MEDIUM",
    purineMg: 120,
    advice: "お肉の加工品として、脂質と塩分が非常に高く、プリン体も中程度あります。お酒が進みやすく脱水を招きやすいので極力控えましょう。",
    alternatives: ["プロセスチーズ", "ちくわ"],
    portion: "5枚 (20g)"
  }
];

export const getPurineLevelBadgeColor = (level: "LOW" | "MEDIUM" | "HIGH") => {
  switch (level) {
    case "LOW":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "MEDIUM":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "HIGH":
      return "bg-rose-100 text-rose-800 border-rose-200";
  }
};

export const getPurineLevelJapanese = (level: "LOW" | "MEDIUM" | "HIGH") => {
  switch (level) {
    case "LOW":
      return "低（安全）";
    case "MEDIUM":
      return "中（控えめに）";
    case "HIGH":
      return "高（危険・要注意）";
  }
};
