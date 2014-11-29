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
