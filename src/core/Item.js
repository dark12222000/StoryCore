/*
 * We're an entity with a weight, and a value, and some stats and types
 */

entities.Item = function(config){

  if(!config){
    throw Error('Failed to configure item!');
    return false;
  }

  this.stackable = false; //can this be allowed to stack?
};

entities.Item.prototype = entities.Base;
