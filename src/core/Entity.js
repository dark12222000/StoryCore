/*
 * We're the base entity class
 * Nobody should ever use us directly,
 * but our properties are inherited by EVERYONE
 */
entities.Base = function(config){
  this.name = config.name || 'Generic Thing';
  this.description = config.description || 'A pure white smooth block.'; //static text, no template
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
//Normally just return a description, but can be over-ridden for funsies
entities.Base.prototype.look = function(){
  return this.description;
};
