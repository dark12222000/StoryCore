Story Core
========

An HTML5/JS Text based game engine with powerful support for dynamic content

#Setup#

1. `npm install`
2. `bower install`
3. `gulp prep`

If you don't have bower or gulp, then do the appropriate `sudo npm install -g bower` or `sudo npm install -g gulp`
If you don't have npm installed, see (https://github.com/npm/npm)[here].

#Test#

`gulp test`

#Build#

##Core##

The Core represents the core engine. If you're changing default behaviors, this is likely what you'll fuss with.  To rebuild the core, use,

`gulp core`

##Scenes##

If you're building or modifying Scenes, then you'll need to rebuild this fellow, via:

`gulp scene`

#Testing#

You can test from the src directory with:

`gulp serve`

#Bits#

The hierarchy of SC is spelled out in some other high level documents, but the basics are this:

+ Runtime is controlled via Core. You'll use it to kick off the app with `Core.init()` and you'll use it to save and load.
+ Most abstract objects live in the EntityManager, accessible via window.Entities
+ There's a high level tool for dealing with Gender and pronouns, accessible via Gender
+ The base Entity tree starts at Entities.base
+ The Player object exists at the Window level, and inherits from Entities.Character
+ window.Gui which comes from GuiManager is responsible for loading and handling scenes, which are stored in the SceneLibrary. The initial scene should be set via SceneLibrary.init
