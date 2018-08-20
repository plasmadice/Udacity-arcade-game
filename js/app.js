// Enemy to be avoided
class Enemy {
    constructor(x, y, speed) {
        // position of the sprite
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    (this.x < 505) ? this.x += (this.speed * dt) : this.x = -90;

    // If the enemy and the player collide.
    if (this.x < player.x + 30 
        && this.x + 60 > player.x 
        && this.y < player.y + 60 
        && this.y + 40 > player.y) {
        player.reset();
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    update() {
        // If the player wins the game by reaching the water
        player.y < 20 ? player.reset() : null;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Prevents the player from running off the board
    // And moves them using the appropriate input
    handleInput(input) {
        (input === 'left' && this.x > 0) ? this.x -= 100
            : (input === 'right' && this.x < 400) ? this.x += 100
            : (input === 'up' && this.y > 3) ? this.y -= 60
            : (input === 'down' && this.y < 380) ? this.y += 60
            : null;
    }

    // Reset position of the player
    reset() {
        this.x = 200;
        this.y = 380;
    }
}

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
// Now instantiate your objects.
(function spawnEnemies() {
    let x = [];
    let y = [60, 60, 140, 225];
    const setSpeed = () => {
        const baseSpeed = 100;

        // if true (>0) return random speed, else return base speed
        // essentially gives 10% chance for base speed
        if (Math.floor(Math.random() * 10)) {
            return Math.floor(Math.random() * 400 + baseSpeed);
        } else {
            return baseSpeed;
        }
    }


    // sets closer spawns
    for (i = 0; i < 2; i++) {
        x.push(Math.floor(Math.random() * 100 ) - 200);
    }
    // sets further spawns
    for (i = 0; i < 2; i++) {
        x.push(Math.floor(Math.random() - 200 ) - Math.floor(Math.random() * 500));
    }
    // populates allEnemies array with Enemy objects
    for (i = 0; i < 4; i++) {
        allEnemies.push(new Enemy(x.pop(), y.pop(), setSpeed()));
    }
})()

// Randomize which character is selected each time game starts
// had to add characters to resources to make this work
const randomCharacter = () => {
    let characters = [
        'cat-girl',
        'boy',
        'horn-girl',
        'pink-girl',
        'princess-girl'
    ];

    return `images/char-${characters[Math.floor(Math.random() * 5)]}.png`;
}

// Place the player object in a variable called player
const player = new Player(200, 380, randomCharacter());



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    // Tried using keydown here for a moment
    // Made for a hilariously fast game
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
