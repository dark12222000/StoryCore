/*
 * We're an entity with a weight, and a value, and some stats and types
 */

entities.Item = function(config){
  this.prototype = new entities.Base(config);
  this.stackable = false; //can this be allowed to stack?
};
