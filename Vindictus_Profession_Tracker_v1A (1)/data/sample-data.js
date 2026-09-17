window.VINDICTUS_DATA = {
  professions: [
    { id:"alchemy", name:"Alchemy", icon:"🧪", maxSkill:300, description:"Potions, elixirs, flasks and transmutations." },
    { id:"blacksmithing", name:"Blacksmithing", icon:"⚒️", maxSkill:300, description:"Weapons, armor and metal components." },
    { id:"enchanting", name:"Enchanting", icon:"✨", maxSkill:300, description:"Weapon and armor enchants, rods and materials." },
    { id:"engineering", name:"Engineering", icon:"⚙️", maxSkill:300, description:"Devices, gadgets, explosives and utility." },
    { id:"leatherworking", name:"Leatherworking", icon:"🦴", maxSkill:300, description:"Leather and mail armor, kits and specialty crafts." },
    { id:"tailoring", name:"Tailoring", icon:"🧵", maxSkill:300, description:"Cloth armor, bags, specialty cloth and gear." },
    { id:"cooking", name:"Cooking", icon:"🍲", maxSkill:300, description:"Food, buffs and specialty dishes." }
  ],
  members: [
    { id:"m1", discordName:"Jonathan", mainCharacter:"Aeiry", role:"Core Raider", avatar:"J", professions:[
      { profession:"tailoring", character:"Aeiry", skill:300, specialization:"Mooncloth", recipes:["mooncloth","robe-of-the-archmage","bottomless-bag"] },
      { profession:"enchanting", character:"Aeiry", skill:300, specialization:"", recipes:["enchant-weapon-crusader","enchant-weapon-spell-power","enchant-chest-major-health"] }
    ]},
    { id:"m2", discordName:"Zynborne", mainCharacter:"Zynborne", role:"Veteran", avatar:"Z", professions:[
      { profession:"blacksmithing", character:"Zynborne", skill:300, specialization:"Weaponsmith → Axesmith", recipes:["arcanite-reaper","dark-iron-reaver"] },
      { profession:"engineering", character:"Zynborne", skill:290, specialization:"Gnomish Engineering", recipes:["arcanite-dragonling","goblin-sapper-charge"] }
    ]},
    { id:"m3", discordName:"Mira", mainCharacter:"Miralune", role:"Member", avatar:"M", professions:[
      { profession:"alchemy", character:"Miralune", skill:300, specialization:"", recipes:["flask-supreme-power","greater-arcane-elixir","transmute-arcanite"] },
      { profession:"cooking", character:"Miralune", skill:300, specialization:"", recipes:["smoked-desert-dumplings","dirges-kickin-chimaerok-chops"] }
    ]},
    { id:"m4", discordName:"Thorn", mainCharacter:"Thornhide", role:"Flag Officer", avatar:"T", professions:[
      { profession:"leatherworking", character:"Thornhide", skill:300, specialization:"Tribal Leatherworking", recipes:["devilsaur-leggings","hide-of-the-wild"] },
      { profession:"alchemy", character:"Thornhide", skill:300, specialization:"", recipes:["flask-supreme-power","greater-arcane-elixir"] }
    ]},
    { id:"m5", discordName:"Cinder", mainCharacter:"Cinderforge", role:"Member", avatar:"C", professions:[
      { profession:"blacksmithing", character:"Cinderforge", skill:300, specialization:"Armorsmith", recipes:["lionheart-helm","dark-iron-helm"] },
      { profession:"enchanting", character:"Cinderforge", skill:265, specialization:"", recipes:["enchant-weapon-crusader"] }
    ]}
  ],
  recipes: [
    {id:"flask-supreme-power", name:"Flask of Supreme Power", profession:"alchemy", category:"Flasks", icon:"🧪", details:"A powerful caster flask.", learned:"2026-09-16T17:20:00"},
    {id:"greater-arcane-elixir", name:"Greater Arcane Elixir", profession:"alchemy", category:"Elixirs", icon:"🧪", details:"Increases spell damage.", learned:"2026-09-15T21:10:00"},
    {id:"transmute-arcanite", name:"Transmute: Arcanite", profession:"alchemy", category:"Transmutations", icon:"🔶", details:"Transmutes Thorium into Arcanite.", learned:"2026-09-11T19:00:00"},
    {id:"lionheart-helm", name:"Lionheart Helm", profession:"blacksmithing", category:"Armor", icon:"🪖", details:"High-end crafted plate helm.", learned:"2026-09-16T19:35:00"},
    {id:"arcanite-reaper", name:"Arcanite Reaper", profession:"blacksmithing", category:"Weapons", icon:"🪓", details:"Two-handed axe.", learned:"2026-09-14T22:40:00"},
    {id:"dark-iron-reaver", name:"Dark Iron Reaver", profession:"blacksmithing", category:"Weapons", icon:"⚔️", details:"Dark Iron weapon craft.", learned:"2026-09-10T18:00:00"},
    {id:"dark-iron-helm", name:"Dark Iron Helm", profession:"blacksmithing", category:"Armor", icon:"🪖", details:"Dark Iron plate helm.", learned:"2026-09-13T16:30:00"},
    {id:"enchant-weapon-crusader", name:"Enchant Weapon - Crusader", profession:"enchanting", category:"Weapon Enchants", icon:"✨", details:"Powerful melee weapon enchant.", learned:"2026-09-16T18:05:00"},
    {id:"enchant-weapon-spell-power", name:"Enchant Weapon - Spell Power", profession:"enchanting", category:"Weapon Enchants", icon:"✨", details:"Powerful caster weapon enchant.", learned:"2026-09-12T20:15:00"},
    {id:"enchant-chest-major-health", name:"Enchant Chest - Major Health", profession:"enchanting", category:"Armor Enchants", icon:"✨", details:"Adds health to chest armor.", learned:"2026-09-09T20:15:00"},
    {id:"arcanite-dragonling", name:"Arcanite Dragonling", profession:"engineering", category:"Devices", icon:"🐉", details:"Mechanical combat companion.", learned:"2026-09-15T23:15:00"},
    {id:"goblin-sapper-charge", name:"Goblin Sapper Charge", profession:"engineering", category:"Explosives", icon:"💣", details:"Goblin explosive device.", learned:"2026-09-08T21:00:00"},
    {id:"devilsaur-leggings", name:"Devilsaur Leggings", profession:"leatherworking", category:"Armor", icon:"🦖", details:"Devilsaur leather leggings.", learned:"2026-09-15T20:05:00"},
    {id:"hide-of-the-wild", name:"Hide of the Wild", profession:"leatherworking", category:"Armor", icon:"🧥", details:"High-end healing cloak.", learned:"2026-09-13T20:05:00"},
    {id:"mooncloth", name:"Mooncloth", profession:"tailoring", category:"Specialty Cloth", icon:"🌙", details:"Specialty cloth cooldown.", learned:"2026-09-16T16:55:00"},
    {id:"robe-of-the-archmage", name:"Robe of the Archmage", profession:"tailoring", category:"Armor", icon:"🥋", details:"High-end mage robe.", learned:"2026-09-14T19:50:00"},
    {id:"bottomless-bag", name:"Bottomless Bag", profession:"tailoring", category:"Bags", icon:"🎒", details:"Large crafted bag.", learned:"2026-09-10T22:00:00"},
    {id:"smoked-desert-dumplings", name:"Smoked Desert Dumplings", profession:"cooking", category:"Food", icon:"🥟", details:"Strength food buff.", learned:"2026-09-15T18:00:00"},
    {id:"dirges-kickin-chimaerok-chops", name:"Dirge's Kickin' Chimaerok Chops", profession:"cooking", category:"Food", icon:"🍖", details:"High-end food buff.", learned:"2026-09-12T18:00:00"},
    {id:"titanic-leggings", name:"Titanic Leggings", profession:"blacksmithing", category:"Armor", icon:"🦵", details:"High-end plate leggings.", learned:null},
    {id:"flask-distilled-wisdom", name:"Flask of Distilled Wisdom", profession:"alchemy", category:"Flasks", icon:"🧪", details:"Powerful mana flask.", learned:null}
  ]
};