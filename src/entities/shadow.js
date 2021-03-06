game.ShadowEntity = me.ObjectEntity.extend({
  init: function(){
    var settings = new Object();
    settings.image = "shadow";
    settings.spritewidth = 96;
    settings.spriteheight = 96;

    var x = game.sam.pos.x;
    var y = game.sam.pos.y;
    this.parent(x,y,settings);

    this.origVelocity = new me.Vector2d(3.0, 3.0);
    this.setVelocity(this.origVelocity.x, this.origVelocity.y);
    this.setFriction(0.1, 0.1);


    this.collidable = false;
    this.type = me.game.SHADOW;

    game.shadow = this;
  },
  bum: function(){
    me.audio.play("bum",false);
    var bomb = new game.BombEntity(this.pos.x+this.width/4,this.pos.y+this.height/4);
    me.game.add(bomb,game.config.BOMB_LEVEL);
    me.game.sort();
    for (var i = 0, len = game.comrads.length; i < len; ++i){
      if (!game.comrads[i].inViewport){
        game.comrads[i].die();
      }
    }

    return bomb;
  },

  checkMovement: function () {
    var dist = this.distanceTo(game.sam);
    var distX = Math.cos(this.angleTo(game.sam)) * dist;
    var distY = Math.sin(this.angleTo(game.sam)) * dist;
    if (Math.abs(distX) > 0) {
        this.vel.x += (distX > 0.0) ? this.accel.x * me.timer.tick : -this.accel.x * me.timer.tick;
    }
    if (Math.abs(distY) > 0) {
        this.vel.y += (distY > 0.0) ? this.accel.y * me.timer.tick : -this.accel.y * me.timer.tick;
    }
    this.directionString = game.sam.directionString;
  },

  update: function(){
    if (game.timerPaused){
      return false;
    }
    this.checkMovement();

    this.updateMovement();
    this.parent(true);
    return true;
  }
});