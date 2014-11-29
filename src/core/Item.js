/*
 * We're an entity with a weight, and a value, and some stats and types
 */

entities.Item = function(config){
  this.weight = config.weight || 0; //Always in kg
  this.stackable = false; //can this be allowed to stack?
};

entities.Item.prototype = entities.Base;
