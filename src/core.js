/*
 * We hold all the entity classes... yay!
 */
var entities = {

}

'use strict';
/*
 * App
 * Handles lifetime
 */

 var Core = {
   init: function(){
     console.log('Story Core Initializing...');
     Gui.init();
   }
 };

/*
 * We're the base entity class
 * Nobody should ever use us directly,
 * but our properties are inherited by EVERYONE
 */
entities.Base = function(config){
  this.id = _.uniqueId('ent_');
  
  if(!config){
    throw Error('Failed to configure '+this.id);
    return false;
  }

  this.name = config.name || 'Generic Thing';
  this.description = config.description || 'A pure white smooth block.'; //static text, no template
  this.weight = config.weight || 0;
}
//Set a new name
entities.Base.prototype.rename = function(newName){
  if(!newName){
    return false;
  }
  this.name = newName;
  return true;
};
//Set a new description
entities.Base.prototype.describe = function(text){
  if(!text){
    return false;
  }
  this.description = text;
  return true;
};
//Get weight
entities.Base.prototype.getWeight = function(){
  return this.weight;
};
//Normally just return a description, but can be over-ridden for funsies
entities.Base.prototype.look = function(){
  return this.description;
};

/*
 * We're an entity with a weight, and a value, and some stats and types
 */

entities.Item = function(config){
  this.prototype = new entities.Base(config);
  this.stackable = false; //can this be allowed to stack?
};

/*
 * Base character class for everything from enemies to the player
 */

 var self = this;

entities.Character = function(config){
  entities.Base.call(this, config);
  // PROPS
  this.gender = Gender.neuter; //We always need a gender
  this.species = 'human'; //TODO make species configurable
  this.weight = config.weight || 75; //Yes, we have a weight, and yes, it's in kg. We override here to give ourselves a sane default.
  this.height = config.height || 180; //Yes, it's in cm
  this.health = config.health || 100; //Our current health
  this.max_health = config.max_health || 100; //Our max health at any given point
  // STATS - 10 is a normal human, 5 is a child, 100 is a god.
  this.strength = config.strength || 10; //How much melee damage you do and how much weight you move
  this.clever = config.clever || 10; //Your ability to fuck with things, like magical devices
  this.persuade = config.persuade || 10; //Your ability to talk or haggle
  this.fast = config.fast || 10; //How fast you move
  this.luck = config.luck || 10; //Everything and nothing, because why not - also gambling
  // BODY PARTS
  this.arms = config.arms || {
    left: [
      {holding: null, armor: null}
    ],
    right: [
      {holding: null, armor: null}
    ]
  }; //Usually, we just have two arms.. usually.
  //If you're dumb enough to screw with this, you get to pass in a whole arms thing. - @kyros
  //I see no value to fucking with leg amounts.. @kyros
  this.legs = config.legs || {
    description: 'two normal assed legs'
  }
  //TODO torso, chest
  //TODO hair
  //TODO face - ears, nose, lips
};

entities.Character.prototype = Object.create(entities.Base.prototype);

entities.Character.prototype.setGender = function(Gender){
  this.gender = Gender;
  //TODO have this update your stats maybe
};

entities.Container = function(config){
  entities.Item.call(this, config);
}

entities.Container.prototype = Object.create(entities.Item.prototype);

//return our entire weight including contents
entities.Container.prototype.getWeight = function(){
  return this.weight + this.inventory.getWeight();
}

/*
 * We're the gender object! We handle stuff like Gender!
 */

window.Gender = {
  male: 'male',
  female: 'female',
  neuter: 'neuter',
  herm: 'herm',
  default: this.neuter,
  possible: [this.male, this.female, this.neuter, this.herm], //currently, possible random draws
  random: function(){ //Mostly used for generating enemies probs
    return this.possible[_random(this.possible.length)]; //give them a possible draw
  }
};

/*
 * Responsible for rendering the view and fucking with scenes
 */
var GuiManager = function(){
  //Our active scene reference
  this.activeScene = null;
  this.configs = [];
}

/*
 * Initialize a new scene, where a scene is some interaction,
 * whether it be a battle or a conversation
 */
GuiManager.prototype.loadScene = function(sceneKey){
  if(!SceneLibrary[sceneKey]){
    console.debug('Failed to load scene: '+sceneKey);
    return false;
  }
  //Clear our buttons and text
  $('#text').html('');
  $('#controls').html('');
  this.configs = [];
  //lookup our scene elements
  var source = SceneLibrary[sceneKey];

  //display our text
  this.text(source.template);
  if(source.buttons) {
    for(var i = 0; i < source.buttons.length; i++){
      var btn = source.buttons[i];
      $('#controls').append(this.button(
        {
          title: btn.title,
          action: btn.action,
          defaultAction: source.defaultAction,
          nextScene: source.nextScene
        }
      ));
    }
  }

};

/*
 * This adds text to the current scene template. We should probably just render
 * it and append it, as opposed to re-rendering the whole thing.
 */
GuiManager.prototype.text = function(template){
  $('#text').append('<p>'+this.render(template)+'</p>');

  $('#text').animate({ scrollTop: $('#text').prop('scrollHeight') }, "slow");
};

GuiManager.prototype.render = function(content, contextOverride){
  var context = {Player: Player};
  _.merge(context, contextOverride);
  var template = Handlebars.compile(content);
  return template(context);
};

GuiManager.prototype.button = function(config){
  Gui.configs.push(config);
  return '<button onClick="Gui.buttonHandler('+Gui.configs.length+')">'+config.title+'</button>';
};

GuiManager.prototype.buttonHandler = function(configID){
  var config = Gui.configs[configID - 1];
  if(config.action){
    try{
      config.action();
    }catch(e){
      console.debug(e);
    }
  }

  if(config.defaultAction){
    try{
      config.default();
    }catch(e){
      console.debug(e);
    }
  }

  if(config.nextScene){
    Gui.loadScene(config.nextScene);
  }
};

GuiManager.prototype.init = function(){
  this.loadScene('init');
};

var Gui = new GuiManager();

Inventory = function(config){
  if(!config){
    config = {};
  }
  this.maxWeight = config.maxWeight || 25; //default to about a small chest. Set to 0 to ignore.
  this.maxItems = config.maxItems || 10; //you can max out in either amounts or weight (or both). Set to 0 to ignore.
  this.acceptsType = config.acceptsType || entities.Item.prototype; //Use this if you want to restrict the types that can be added. Set to null to ignore.
  this.inventory = config.contents || [];
}

//return a count of items
Inventory.prototype.getItemsCount = function(){
  return this.inventory.length;
};

//get the weight of the inventory. Inventories by themselves have no weight.
Inventory.prototype.getWeight = function(){
  var weight = 0;
  for(var i = 0; i < this.inventory.length; i++){
    if(this.inventory[i] && this.inventory[i].getWeight){
      weight = weight + this.inventory[i].getWeight();
    }
  }
};

//Add an item
Inventory.prototype.addItem = function(item){
  //check type
  if(this.acceptsType && item instanceof this.acceptsType){
    //check weight
    if(this.maxWeight && ( this.getWeight() + item.getWeight() <= this.maxWeight ) ){
      //check item count
      if(this.maxItems && this.getItemsCount() < this.maxItems){
        this.inventory.push(item);
        return true;
      }
    }
  }
  return false;
};

//remove an item by id, returning the item that was removed
Inventory.prototype.removeItem = function(id){
  for(var i = 0; i < this.inventory.length; i++){
    if(this.inventory[i].id === id){
      return this.inventory.splice(i, 1);
    }
  }
  return false;
};

//remove an item from ourselves and add it to the foreign inventory if we can
Inventory.prototype.transferTo = function(itemId, Inv){
  for(var i = 0; i < this.inventory.length; i++){
    if(this.inventory[i].id === id){
      //try to add, and if that works, remove it from ourselves
      if(Inv.addItem(this.inventory[i])){
        this.removeItem(itemId);
        return true;
      }
    }
  }
  return false;
};

/*
 * We're the player. Only one of us exists, and we're responsible for making ourselves.
 * We exist outside the entityManager
 */

function PlayerProto(config){
  entities.Character.call(this, config);
  this.inventory = new Inventory(config);
}

PlayerProto.prototype = Object.create(entities.Character.prototype);

//TODO roll stats
//TODO classes?

//create ourselves
window.Player = new PlayerProto({name: 'Player', description: 'A being of pure energy'});

/*
 * SceneLibrary
 * Acts to store all scenes
 */
var SceneLibrary = {
  init: null
};

/*
 * We represent the World, and all it's places...
 * We also track the places the player knows about, and where they can go to
 */
entities.World = { //TODO basically everything
  locations: {}
};
