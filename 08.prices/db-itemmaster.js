
ItemMaster = function(){};
exports.ItemMaster = ItemMaster;

var unused = function(){};

unused.old_materialTypes = [
    'Basic Crafting Material'
  , 'Fine Crafting Material'
  , 'Rare Crafting Material'
];

unused.subtype_armorslot = [ 'Boots','Coat','Gloves','Helm','Leggings','Shoulders' ];
unused.subtype_armorslot2 = [ 'Chest','Feet','Legs','Breathing Apparatus' ];
unused.subtype_armorclass = [ 'Heavy','Light','Medium' ];
unused.subtype_consumable = [ 'Blueprint','Boost','Food','Potion','Tonic' ];
unused.subtype_container = [ 'Unidentified Dye' ];
unused.subtype_currency = [ 'Coin','Gems','Glory','Influence','Karma','Skill Points','Supply','Tokens' ];
unused.subtype_equipment = [ 'Accessory','Armor','Gathering Tool','Town Clothing','Toy','Underwater Equipment','Weapon' ];

ItemMaster.types = [ 'Armor','Bag','Consumable','Container','Crafting Material','Gemstone','Gizmo','Minipet','Salvage Item','Trinket','Trophy','Upgrade','Weapon' ];

unused.subtype_unusedBasicCraftingMaterial = [ 'Spool of Thread','Alloying Lump' ];
ItemMaster.subtype_basicCraftingMaterial = [ 'Cloth Scrap','Bolt of Cloth','Ore','Ingot','Leather Section','Leather Square','Log','Plank' ];
ItemMaster.subtype_fineCraftingMaterial = [ 'Bones','Claws','Dust','Fangs','Scales','Totems','Venom Sacs','Vials of Blood' ];
ItemMaster.subtype_rareCraftingMaterial = [ 'Essence','Onyx','Molten','Glacial','Destroyer','Crystal','Corrupted','Charged' ];
ItemMaster.subtype_miscCraftingMaterial = [ 'Accessory','Ingredient','Inscription','Insignia','Rune of Holding' ];
unused.subtype_craftingMaterial = [].concat(
    ItemMaster.subtype_basicCraftingMaterial
  , ItemMaster.subtype_fineCraftingMaterial
  , ItemMaster.subtype_rareCraftingMaterial
  , ItemMaster.subtype_miscCraftingMaterial
);

ItemMaster.subtype_gemstone_low = [ 'Amber','Garnet','Malachite','Pearl','Tigers Eye','Turqoise' ];
ItemMaster.subtype_gemstone_mid = [ 'Amethyst','Carnelian','Lapis','Peridot','Spinel','Sunstone','Topaz' ];
ItemMaster.subtype_gemstone_high = [ 'Beryl','Chrysocola','Coral','Emerald','Opal','Ruby','Sapphire ' ];
unused.subtype_gemstone = [].concat(
    ItemMaster.subtype_gemstone_low
  , ItemMaster.subtype_gemstone_mid
  , ItemMaster.subtype_gemstone_high
);

ItemMaster.subtype_upgrade = [ 'Jewel','Rune','Sigil' ];

unused.subtypes = [].concat(
    unused.subtype_craftingMaterial
  , unused.subtype_gemstone
  , unused.subtype_upgrade
);

ItemMaster.rarities = {
    'Junk'	: {color:'Gray',	hexcolor:'#808080',	rank:1,	rarity:'Junk'}
  , 'Basic'	: {color:'White',	hexcolor:'#fff',	rank:2,	rarity:'Basic'}
  , 'Fine'	: {color:'Blue',	hexcolor:'#00f',	rank:3,	rarity:'Fine'}
  , 'Masterwork': {color:'Green',	hexcolor:'#008000',	rank:4,	rarity:'Masterwork'}
  , 'Rare'	: {color:'Yellow',	hexcolor:'#ff0',	rank:5,	rarity:'Rare'}
  , 'Exotic'	: {color:'Gold',	hexcolor:'#ffd700',	rank:6,	rarity:'Exotic'}
  , 'Legendary'	: {color:'Red',		hexcolor:'#f00',	rank:7,	rarity:'Legendary'}
  , 'Mystic'	: {color:'Purple',	hexcolor:'#800080',	rank:8,	rarity:'Mystic'}
};

ItemMaster.craftingDisciplines = [ 'Armorsmith','Artificer','Chef','Huntsman','Jeweler','Leatherworker','Tailor','Weaponsmith' ];

ItemMaster.tiers = [ 1,2,3,4,5,6 ];
ItemMaster.values = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 ];

ItemMaster.attributes = [ 'Power','Precision','Toughness','Vitality' ];
unused.secondaryAttributes = [ 'Boon Duration','Condition Damage','Condition Duration','Critical Damage','Healing Power' ];

ItemMaster.statics = {
    attributes: ItemMaster.attributes
  , craftingDisciplines: ItemMaster.craftingDisciplines
  , rarities: ItemMaster.rarities
  // , subtypes: ItemMaster.subtypes
  // , subtype_craftingMaterial: ItemMaster.subtype_craftingMaterial
  , subtype_basicCraftingMaterial: ItemMaster.subtype_basicCraftingMaterial
  , subtype_fineCraftingMaterial: ItemMaster.subtype_fineCraftingMaterial
  , subtype_rareCraftingMaterial: ItemMaster.subtype_rareCraftingMaterial
  , subtype_miscCraftingMaterial: ItemMaster.subtype_miscCraftingMaterial
  // , subtype_gemstone: ItemMaster.subtype_gemstone
  , subtype_gemstone_low: ItemMaster.subtype_gemstone_low
  , subtype_gemstone_mid: ItemMaster.subtype_gemstone_mid
  , subtype_gemstone_high: ItemMaster.subtype_gemstone_high
  , subtype_upgrade: ItemMaster.subtype_upgrade
  , tiers: ItemMaster.tiers
  , types: ItemMaster.types
  , values: ItemMaster.values
};

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/prices');



// notes : { type:String }

ItemMaster.schema = mongoose.Schema({
    name	: { type:String, required:true, index:true, unique:true }
  , rarity	: { type:String, required:true, index:true }
  , tier	: { type:Number,                index:true }
  , type	: { type:String, required:true, index:true }
  , subtype	: { type:String,                index:true }
  , value	: { type:Number }
  , value_gems	: { type:Number }
  , value_karma	: { type:Number }
  , usedby	: { type:String }
  , level	: { type:Number }
  , aquisition	: { type:String }
});

ItemMaster.model = mongoose.model('ItemMaster',ItemMaster.schema);

unused.prototypetest = function() {
  var item = new ItemMaster.model;
  item.name = 'Amber Pebble';
  item.rarity = 'Fine';
  item.tier = '1';
  item.type = 'Gemstone';
  item.subtype = 'Amber';
  item.value = 8;
  item.usedby = 'Jeweler';
  item.aquisition = 'Harvested from Saplings';
  item.save(function(err) {
    console.log(err);
  });
  return(new Date());
};
