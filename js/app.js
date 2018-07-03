/*My vocabulary:
sprite = image, 2d bitmap, nejedná se o nějakou metodu, jen slovo
render = draw image, vykreslování
*/

//Common class for Enemies and Player

class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 80);
    }
}

//Subclasses for Players and enemies

class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
    }
}

class Enemy extends Entity {
    constructor(x, y) {
        super(x = 1, y);
        this.sprite += 'enemy-bug.png';
        this.x = 1;
        this.y = 5;
    }
}


const player = new Player; 
const enemy = new Enemy;

//ORIGINAL - PROVIDED CODE:

/*
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
