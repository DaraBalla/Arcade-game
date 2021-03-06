/*My personal vocabulary:
sprite = image, 2d bitmap, not a method, just word
render = draw image, vykreslování
drawImage() = We render the image using drawImage() method with the context (ctx) that has been established for the canvas.
*/

/*
 *
 * Common class for Enemies and Player
 *   
 */

class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2; //tady můžu mit obecne = x a y a specifikovat to jen u player konkrétně a u enemyto nechat dle tohoto classu a neupravovat = ať to není stejné jako ve videu 
        this.y = 5; // čísla specifikují block-movement (dle indexu)
    }

    // Draw the image on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    update(dt) {
        this.isOutOfBoundX = this.x > 5;
        this.isOutOfBoundY = this.y < 1
    }

    checkCollisions(playerOrEnemy) {
        if (this.y === playerOrEnemy.y) {
            if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) { //the number means the high of sensitivity, how near/far the collision is
                return true;
            }
        }
        else {
            return false;
        }
    }

}

/*
 *
 * Subclasses for players and enemies
 * 
 */


// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images

class Enemy extends Entity {
    constructor(x, y) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    update(dt) { // move the enemies
        super.update();
        if (this.isOutOfBoundX) {
            this.x = Math.random() * (-4); 
        }
        else {
            this.x += dt * 2;
        }
         
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.moving = false;
        this.win = false;
    } //proč tady potom nikde nemám převzetí i funkce render a funguje to? - Asi když je nezměněna, tak platí i tak

    update(dt) {
        super.update();
        if (this.isOutOfBoundY && !this.moving) {
            alert("CONGRATULATION! YOU HAVE WON! If you want to play again, just press ENTER! If you don't want to play again, just close the current website :P");
            this.win = true;
            this.resetGame()
        }
    }

    resetGame() {
        this.x = 2; //tady můžu mit obecne = x a y a specifikovat to jen u player konkrétně a u enemyto nechat dle tohoto classu a neupravovat = ať to není stejné jako ve videu 
        this.y = 5;
    }

    render() {
        super.render();
        this.moving = false;
    }

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
        this.moving = true;
    }
} 



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const allEnemies = [...Array(3)].map((_,i) => new Enemy(Math.random()*i*(-2),i+1)); //vytvořit různé enemies extra a manuálněje dát do array?
const player = new Player;


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
