/*
 * Base character class for everything from enemies to the player
 */

 var self = this;

entities.Character = function(config){
  if(!config){
    config = {};
  }
  this.prototype = entities.Base;
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

entities.Character.prototype.setGender = function(Gender){
  this.gender = Gender;
  //TODO have this update your stats maybe
};
