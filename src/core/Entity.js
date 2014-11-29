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
