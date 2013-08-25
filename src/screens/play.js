game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {

        me.game.addHUD(0, 0, 960, 480);
        // add a new HUD item
        me.game.HUD.addItem("secondsToDie", new game.SecondsRemainsHUD(600,10));
        me.game.HUD.setItemValue("secondsToDie", 10);

        me.game.HUD.addItem("grenadesRemains", new game.GranadesRemainsHUD(500,10));
        me.game.HUD.setItemValue("grenadesRemains", game.nGranades);

//        me.game.HUD.addItem("grenadesRemainsIcon", new game.GranadesRemainsHUD(450,10));

        me.game.HUD.addItem("dialogHUD", new game.DialogHUD(0, 320, "test_character", "WELCOME, COMMRAD!\nPREPARE TO HELL!"));
        //me.game.HUD.addItem("panel-top", new me.SpriteObject(0, 0, me.loader.getImage("panel-top")));
       //me.game.HUD.addItem("lol", new game.panel());
        //me.game.HUD.addItem("score2", new game.ScoreObject(300, 10));
        //me.game.HUD.updateItemValue("secondToDie", 8.8);

        //me.game.HUD.addItem("ui", new game.UI());
        //me.game.HUD.add(new game.HUD_Heart(0,0));

        // make sure everything is in the right order
        me.game.sort();
        me.levelDirector.loadLevel("area1");

        var names = [];
        //alert(game.comrads[0]);
        for( var i=0; i<game.comrads.length;i++){
            names.push(game.comrads[i].nickname.toUpperCase());
        }
        //alert(names);
        panel.setPayload(names);
        panel.kill('PABLO');
        panel.draw();
        //FIXME: call timeToDie

        setInterval(function (){
            var remains = parseFloat(me.game.HUD.getItemValue("secondsToDie"));
//            console.log(typeof  remains);
//            console.log(remains);
            remains -= 1;
            if(remains < 0){
                // call timeToDie!;
                remains = 10;
            }
            console.log(remains.length);
            console.log(remains);

            me.game.HUD.setItemValue("secondsToDie", remains);
            //me.game.HUD.updateItemValue("secondsToDie", -0.1);
        },1000);
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        ; // TODO
        // remove the HUD
        me.game.disableHUD();
    }
});
