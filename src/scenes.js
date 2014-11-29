//Very first scene
SceneLibrary.Dawn = {
  partner:null, //just us
  buttons:[ //just one option
    {title: 'Walk Forward', action: function(){
      Gui.loadScene('Gender'); //force the next scene
    }}
  ],
  template:"There is a bright light ahead of you. As you walk towards it slowly, you feel like your soul is materializing.. You sense a lot of questions if you keep moving forward... but you can't resist the adventure to come."
};

//Go ahead and configure our initial scene
SceneLibrary.init = SceneLibrary.Dawn;

SceneLibrary.Gender = {
  partner: null,
  nextScene: 'Streets',
  buttons:[
    {title: 'Male', action: function(){
      Player.setGender(Gender.male);
      Gui.text('You feel like a {{Player.gender}}!');
    }},
    {title: 'Female', action: function(){
      Player.setGender(Gender.female);
      Gui.text('You feel like a {{Player.gender}}!');
    }}
  ],
  template:"You feel yourself being forced into a gender binary. Which one is it?",
};

SceneLibrary.Streets = {
  template: "You're on a cold street, made up of concrete and asphalt. It's dark and raining outside. A few small hazily lit shops dot the sides of the street."
};
