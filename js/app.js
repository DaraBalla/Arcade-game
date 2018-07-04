/*My vocabulary:
sprite = image, 2d bitmap, nejedná se o nějakou metodu, jen slovo
render = draw image, vykreslování
drawImage() = We render the image using drawImage() method with the context (ctx) that has been established for the canvas.

*/

//Common class for Enemies and Player

class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2; //tady můžu mit obecne = x a y a specifikovat to jen u player konkrétně a u enemyto nechat dle tohoto classu a neupravovat = ať to není stejné jako ve videu 
        this.y = 5; // čísla specifikují block-movement (dle indexu)
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 80);
    }

    update(dt) {
        this.isOutOfBoundX = this.x > 5;
        this.isOutOfBoundY = this.y < 1
    }


}

//Subclasses for players and enemies

class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
    } //proč tady potom nikde nemám převzetí i funkce render a funguje to? - Asi když je nezměněna, tak platí i tak

    handleInput(input) { // za sebe vytvořit 4 různá eventlistenery s if/else?
        switch (input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
                break;
            default:
                break;
        }
    }
} 

class Enemy extends Entity {
    constructor(x, y) {
        super(x, y);
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    update(dt) { // posouvá enemies
        super.update();
        if (this.isOutOfBoundX) {
            this.x = -1; // i can make start position elsewhere
        }
        else {
            this.x += dt; // i can make a random pace with a random method
        }
         
    }
}


const player = new Player;
const allEnemies = [...Array(3)].map((_,i) => new Enemy(0,i+1)); //vytvořit různé enemies extra a manuálněje dát do array?
//const enemy = new Enemy(0.001, 1.8);

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
