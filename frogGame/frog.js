let imagescale = 1;
let health = 5;
let difficulty = 1;
let difficultyMultiplier = (difficulty+1)/2
let energy = 5;
let score = 0;
let mainCharacter = [];
let difficultyList = ["Easy", "Normal", "Hard"]
const c = document.getElementById("screen");
const ctx = c.getContext("2d");

// 🔹 HIGH-DPI FIX
const dpr = window.devicePixelRatio || 1;
const rect = c.getBoundingClientRect();

c.width = rect.width * dpr;
c.height = rect.height * dpr;
ctx.scale(dpr, dpr);

// 🔹 PIXEL ART SETTINGS
ctx.imageSmoothingEnabled = false;

// 🔹 CACHED CALCULATIONS (Optimization #8)
const rectWidth = rect.width;
const rectHeight = rect.height;
const rectWidthHalf = rectWidth / 2;
const rectHeightHalf = rectHeight / 2;
const rectHeightThird = rectHeight / 3;
const rectHeightTwoThirds = rectHeight * 2 / 3;
let imagescaleHalf = imagescale / 2;

// Loading Screen Variables
let assetsLoaded = 0;
let totalAssets = 0;
let gameStarted = false;
let assetsFullyLoaded = false;
let blinkTimer = 0;

let fireflyPool = [];

function initFireflyPool() {
    // Create pool of 15 fireflies (max we'll ever need)
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * rectWidth;
        const y = rectHeightThird + Math.random() * rectHeightTwoThirds;
        fireflyPool.push(new Firefly(x, y, fireflyBase));
    }
    // Activate only first 10
    for (let i = 10; i < 15; i++) {
        fireflyPool[i].active = false;
    }
}

function spawnFirefly() {
    // Find an inactive firefly from the pool
    const inactive = fireflyPool.find(f => !f.active);
    if (inactive) {
        const x = Math.random() * rectWidth;
        const y = rectHeightThird + Math.random() * rectHeightTwoThirds;
        inactive.reset(x, y);
        return inactive;
    }
    return null;
}

function drawLoadingScreen() {
    ctx.clearRect(0, 0, rectWidth, rectHeight);
    ctx.fillStyle = "#7aa4ff";
    ctx.fillRect(0, 0, rectWidth, rectHeight);
    
    const progress = totalAssets > 0 ? assetsLoaded / totalAssets : 0;
    const barWidth = rectWidth * 0.5;
    const barHeight = 10;
    const barX = (rectWidth - barWidth) / 2;
    const barY = rectHeight / 2;
    
    // Loading bar background
    ctx.fillStyle = "#000000";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Loading bar fill
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);
    
    // Loading text
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    
    if (assetsFullyLoaded) {
        // Blinking "Press any key to continue" text
        blinkTimer++;
        if (Math.floor(blinkTimer / 30) % 2 === 0) { // Blink every 30 frames (about 0.5 seconds)
            ctx.fillText("Press any key to continue", rectWidthHalf, barY - 20);
        }
        ctx.font = "18px Arial";
        ctx.fillText("Click buttons below for rules and feedback", rectWidthHalf, barY + barHeight + 40);
        ctx.fillText(`Difficulty: ${difficultyList[difficulty-1]}`, rectWidthHalf, barY + barHeight + 60);
    } else {
        ctx.fillText(`Loading... ${Math.floor(progress * 100)}%`, rectWidthHalf, barY - 20);
    }
}

function checkAssetsLoaded() {
    if (assetsLoaded >= totalAssets && !assetsFullyLoaded) {
        assetsFullyLoaded = true;
        // Start animation loop for blinking text
        loadingAnimationLoop();
    }
    
    if (!gameStarted) {
        drawLoadingScreen();
    }
}

function loadingAnimationLoop() {
    if (!gameStarted) {
        drawLoadingScreen();
        requestAnimationFrame(loadingAnimationLoop);
    }
}

function startGame() {
    if (assetsFullyLoaded && !gameStarted) {
        gameStarted = true;
        initGame();
        gameclock = setInterval(gameTick, 20);
    }
}

// Add event listener for "press any key to continue"
document.addEventListener('keydown', function startGameOnKeyPress(event) {
    if (assetsFullyLoaded && !gameStarted) {
        startGame();
        document.removeEventListener('keydown', startGameOnKeyPress);
    }
}, { once: false });
// Load Images with loading tracking
const greenFrog = new Image();
greenFrog.src = './images/frog.png';
greenFrog.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
totalAssets++;

const legRearLeft = new Image();
legRearLeft.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
legRearLeft.src = './images/legRearLeft.png';
totalAssets++;

const legRearRight = new Image();
legRearRight.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
legRearRight.src = './images/legRearRight.png';
totalAssets++;

const fullHeart = new Image();
fullHeart.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
fullHeart.src = './images/fullHeart.png';
totalAssets++;

const emptyHeart = new Image();
emptyHeart.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
emptyHeart.src = './images/emptyHeart.png';
totalAssets++;

const frogTounge = new Image();
frogTounge.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
frogTounge.src = './images/tounge.png';
totalAssets++;

const fullHunger = new Image();
fullHunger.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
fullHunger.src = './images/fullHunger.png';
totalAssets++;

const emptyHunger = new Image();
emptyHunger.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
emptyHunger.src = './images/emptyHunger.png';
totalAssets++;

const halfHunger = new Image();
halfHunger.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
halfHunger.src = './images/halfHunger.png';
totalAssets++;

const fireflyBase = new Image();
fireflyBase.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
fireflyBase.src = './images/fireflyBase.png';
totalAssets++;

const fireflyGreen = new Image();
fireflyGreen.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
fireflyGreen.src = './images/fireflyGreen.png';
totalAssets++;

const fireflyYellow = new Image();
fireflyYellow.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
fireflyYellow.src = './images/fireflyYellow.png';
totalAssets++;

const slimeInner = new Image();
slimeInner.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
slimeInner.src = './images/slimeInner.png';
totalAssets++;

const slimeOuter = new Image();
slimeOuter.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
slimeOuter.src = './images/slimeOuter.png';
totalAssets++;

const magmaInner = new Image();
magmaInner.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
magmaInner.src = './images/magmaCubeInner.png';
totalAssets++;

const magmaOuter = new Image();
magmaOuter.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
magmaOuter.src = './images/magmaCubeOuter.png';
totalAssets++;

const goatBody = new Image();
goatBody.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
goatBody.src = './images/goatBody.png';
totalAssets++;
const goatFur = new Image();
goatFur.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
goatFur.src = './images/goatFur.png';
totalAssets++;
const goatHead = new Image();
goatHead.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
goatHead.src = './images/goatHead.png';
totalAssets++;
const goatHorn = new Image();
goatHorn.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
goatHorn.src = './images/goatHorn.png';
totalAssets++;
const goatLeg = new Image();
goatLeg.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
goatLeg.src = './images/goatLeg.png';
totalAssets++;
const goatBackLeg = new Image();
goatBackLeg.onload = () => { assetsLoaded++; checkAssetsLoaded(); };
goatBackLeg.src = './images/goatBackLeg.png';
totalAssets++;

// Start showing loading screen immediately
drawLoadingScreen();

// Load Audio
const croak1 = new Audio('./sounds/croak1.ogg');
const croak2 = new Audio('./sounds/croak2.ogg');
const croak3 = new Audio('./sounds/croak3.ogg');
const croak4 = new Audio('./sounds/croak4.ogg');
const croak5 = new Audio('./sounds/croak5.ogg');
const croak6 = new Audio('./sounds/croak6.ogg');
const croak7 = new Audio('./sounds/croak7.ogg');
const croak = [croak1, croak2, croak3, croak4, croak5, croak6, croak7];
const hurt1 = new Audio('./sounds/hurt1.ogg');
const hurt2 = new Audio('./sounds/hurt2.ogg');
const hurt3 = new Audio('./sounds/hurt3.ogg');
const hurt4 = new Audio('./sounds/hurt4.ogg');
const hurt5 = new Audio('./sounds/hurt5.ogg');
const hurt = [hurt1, hurt2, hurt3, hurt4, hurt5];
const jump1 = new Audio('./sounds/jump1.ogg');
const jump2 = new Audio('./sounds/jump2.ogg');
const jump3 = new Audio('./sounds/jump3.ogg');
const jump4 = new Audio('./sounds/jump4.ogg');
const jump = [jump1, jump2, jump3, jump4];
const eat1 = new Audio('./sounds/eat1.ogg');
const eat2 = new Audio('./sounds/eat2.ogg');
const eat3 = new Audio('./sounds/eat3.ogg');
const eat4 = new Audio('./sounds/eat4.ogg');
const eat = [eat1, eat2, eat3, eat4];
const firefly1 = new Audio('./sounds/firefly1.ogg');
const firefly2 = new Audio('./sounds/firefly2.ogg');
const firefly3 = new Audio('./sounds/firefly3.ogg');
const firefly = [firefly1, firefly2, firefly3];
const burp = new Audio('./sounds/burp.ogg');
const crunch1 = new Audio('./sounds/crunch1.ogg');
const crunch2 = new Audio('./sounds/crunch2.ogg');
const crunch3 = new Audio('./sounds/crunch3.ogg');
const crunch = [crunch1, crunch2, crunch3];
const slimeJump1 = new Audio('./sounds/big1.ogg');
const slimeJump2 = new Audio('./sounds/big2.ogg');
const slimeJump3 = new Audio('./sounds/big3.ogg');
const slimeJump = [slimeJump1, slimeJump2, slimeJump3];
const magmaJump1 = new Audio('./sounds/magma1.ogg');
const magmaJump2 = new Audio('./sounds/magma2.ogg');
const magmaJump3 = new Audio('./sounds/magma3.ogg');
const magmaJump = [magmaJump1, magmaJump2, magmaJump3];
const goatHurt1 = new Audio('./sounds/screaming_hurt1.ogg');
const goatHurt2 = new Audio('./sounds/screaming_hurt2.ogg');
const goatHurt3 = new Audio('./sounds/screaming_hurt3.ogg');
const goatHurt = [goatHurt1, goatHurt2, goatHurt3];
const goatCharge1 = new Audio('./sounds/screaming_pre_ram1.ogg')
const goatCharge2 = new Audio('./sounds/screaming_pre_ram2.ogg')
const goatCharge3 = new Audio('./sounds/screaming_pre_ram3.ogg')
const goatCharge = [goatCharge1, goatCharge2, goatCharge3]
const click = new Audio('./sounds/click.ogg')
/* =========================
   PARENT CLASS: SPRITE
   ========================= */
class Sprite {
    constructor(posX, posY, sprite) {
        this.posX = posX; // Now center X
        this.posY = posY; // Now center Y
        this.velocityX = 0;
        this.velocityY = 0;
        this.rotation = 0;
        this.falling = true;
        this.rotationSpeed = 5;
        this.sprite = sprite;
        this.width = 100;
        this.height = 100;
    }

    gravity() {
        if (this.velocityY < 18) this.velocityY += 2;
        if (this.velocityY > 18) this.velocityY = 18;
    }

    updateMovement() {
        this.posX += this.velocityX;
        this.posY += this.velocityY;

        this.rotation += this.rotationSpeed;
        this.rotation %= 360;
        this.rotationSpeed %= 360;
    }

    boundaryCheck() {
        const theta = this.rotation * Math.PI / 180;
        const w = this.width * imagescale;
        const h = this.height * imagescale;

        // posX and posY are already at center
        const centerX = this.posX;
        const centerY = this.posY;

        // Rotated AABB half extents
        const halfExtentX = (Math.abs(Math.cos(theta)) * w + Math.abs(Math.sin(theta)) * h) / 2;
        const halfExtentY = (Math.abs(Math.cos(theta)) * h + Math.abs(Math.sin(theta)) * w) / 2;

        const leftX   = centerX - halfExtentX;
        const rightX  = centerX + halfExtentX;
        const topY    = centerY - halfExtentY;
        const bottomY = centerY + halfExtentY;

        /* ---------- BOTTOM ---------- */
        if (bottomY >= rect.height) {
            this.posY = rect.height - halfExtentY;
            this.rotationSpeed /= 2;
            this.velocityX /= 2;

            if (this.velocityX < 6) this.velocityX = 0;

            if (this.velocityY >= 8) this.velocityY = -this.velocityY * 0.8;
            else this.falling = false;

            if (Math.abs(this.rotationSpeed) <= 20) {
                this.rotationSpeed = 0;
                this.rotation = Math.round(this.rotation / 90) * 90;
            }
        }

        /* ---------- TOP ---------- */
        if (topY <= 0) {
            this.posY = halfExtentY;
            this.velocityY = -this.velocityY * 0.8;
            this.rotationSpeed /= 2;
        }

        /* ---------- LEFT ---------- */
        if (leftX <= 0) {
            this.posX = halfExtentX;
            this.velocityX = -this.velocityX * 0.8;
            this.rotationSpeed /= 2;
        }

        /* ---------- RIGHT ---------- */
        if (rightX >= rect.width) {
            this.posX = rect.width - halfExtentX;
            this.velocityX = -this.velocityX * 0.8;
            this.rotationSpeed /= 2;
        }
    }

    update() {
        if (this.falling) this.gravity();
        this.updateMovement();
        this.boundaryCheck();
    }

    draw(ctx) {
        const drawX = Math.round(this.posX);
        const drawY = Math.round(this.posY);

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.sprite, -(this.width * imagescale) / 2, -(this.height * imagescale) / 2, this.width * imagescale, this.height * imagescale);
        ctx.restore();
    }
}

/* =========================
   CHILD CLASS: LEG
   ========================= */
class Limb extends Sprite {
    constructor(color, sprite, relativeX, relativeY) {
        super(0, 0, sprite);
        this.color = color;
        this.width = 24;
        this.height = 24;
        this.relativeX = relativeX;
        this.relativeY = relativeY;
        this.hitboxRadius = 12; // Circular hitbox
    }

    joint(hero) {
        const theta = hero.rotation * Math.PI / 180;
        // Hero's posX and posY are already at center
        const heroCenterX = hero.posX;
        const heroCenterY = hero.posY;

        const rX = this.relativeX * Math.cos(theta) - this.relativeY * Math.sin(theta);
        const rY = this.relativeX * Math.sin(theta) + this.relativeY * Math.cos(theta);

        this.posX = heroCenterX + rX;
        this.posY = heroCenterY + rY;

        this.rotation = hero.rotation;
    }

    // Limb collision with boundaries
    limbBoundaryCheck(hero) {
        const legCenterX = this.posX;
        const legCenterY = this.posY;
        const r = this.hitboxRadius;

        this.collided = false;
        let pushX = 0;
        let pushY = 0;

        // Bottom boundary
        if (legCenterY + r >= rect.height) {
            const overlap = (legCenterY + r) - rect.height;
            pushY -= overlap;
            this.collided = true;
            
            // Only dampen hero velocity on ground contact if not actively jumping
            if (hero.rightJumpDuration === 0 && hero.leftJumpDuration === 0) {
                if (hero.velocityY > 0) {
                    hero.velocityY *= 0.5;
                }
            }
        }

        // Top boundary
        if (legCenterY - r <= 0) {
            const overlap = r - legCenterY;
            pushY += overlap;
            this.collided = true;
            
            // Only dampen if not actively jumping
            if (hero.rightJumpDuration === 0 && hero.leftJumpDuration === 0) {
                if (hero.velocityY < 0) {
                    hero.velocityY *= 0.5;
                }
            }
        }

        // Left boundary
        if (legCenterX - r <= 0) {
            const overlap = r - legCenterX;
            pushX += overlap;
            this.collided = true;
            
            // Only dampen if not actively jumping
            if (hero.rightJumpDuration === 0 && hero.leftJumpDuration === 0) {
                if (hero.velocityX < 0) {
                    hero.velocityX *= 0.5;
                }
            }
        }

        // Right boundary
        if (legCenterX + r >= rect.width) {
            const overlap = (legCenterX + r) - rect.width;
            pushX -= overlap;
            this.collided = true;
            
            // Only dampen if not actively jumping
            if (hero.rightJumpDuration === 0 && hero.leftJumpDuration === 0) {
                if (hero.velocityX > 0) {
                    hero.velocityX *= 0.5;
                }
            }
        }

        // Apply push to hero while maintaining limb attachment
        if (this.collided) {
            hero.posX += pushX * 0.3; // Reduced strength to keep attachment stable
            hero.posY += pushY * 0.3;
        }

        return this.collided;
    }

    draw(ctx) {
        const drawX = Math.round(this.posX) - 12;
        const drawY = Math.round(this.posY) - 12;

        ctx.save();
        ctx.translate(drawX + (this.width * imagescale) / 2, drawY + (this.height * imagescale) / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.sprite, -(this.width * imagescale) / 2, -(this.height * imagescale) / 2, this.width * imagescale, this.height * imagescale);
        ctx.restore();
    }

    update(hero) {
        this.joint(hero);
        this.limbBoundaryCheck(hero);
        this.draw(ctx);
    }
}

class Tounge extends Limb {
    constructor(color) {
        super(color, frogTounge, 0, 4); 
        this.width = 32;
        this.height = 0;
        this.extentionDuration = 0;
        this.cooldown = 0;
    }
    
    beginExtend(rotation){
        if(this.cooldown == 0){
            this.extentionDuration = 20;
            this.cooldown = 10;
            this.height = 0;
            this.relativeY = 4;
            console.log(hero.rotation)
            if(rotation==0){
                energy-=1
                console.log("asd")
            }
        }
    }
    
    extend(){
        if(this.extentionDuration > 10){
            this.height += 32;
            this.relativeY -= 16;
        }
        else if(this.extentionDuration <= 10 && this.height > 0){
            this.height -= 32;
            this.relativeY += 16;
            hero.falling = true;
        }
    }
    
    draw(ctx) {
        if(this.height <= 0) return;
        
        const drawX = Math.round(this.posX) - 16;
        const drawY = Math.round(this.posY) - this.height/2;

        ctx.save();
        ctx.translate(drawX + (this.width * imagescale) / 2, drawY + (this.height * imagescale) / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.sprite, -(this.width * imagescale) / 2, -(this.height * imagescale) / 2, this.width * imagescale, this.height * imagescale);
        ctx.restore();
    }
    
    update(hero) {
        super.update(hero);
        if(this.extentionDuration > 0){
            this.extend();
            this.extentionDuration -= 1;
        }
        if(this.cooldown > 0){
            this.cooldown -= 1;
        }
        if(this.height < 0) {
            this.height = 0;
        }
    }
}


/* =========================
   CHILD CLASS: FROG
   ========================= */
class Frog extends Sprite {
    constructor(color, posX, posY, sprite) {
        super(posX, posY, sprite);
        this.color = color;
        this.width = 56;
        this.height = 56;
        this.legs = [];
        this.leftJumpMultiplier = [];
        this.rightJumpMultiplier = [];
        this.rightJumpDuration = 0;
        this.leftJumpDuration = 0;
        this.cooldown = 0;
        this.playingSound = 200;
    }

    towardRightJump() {
        if (this.rightJumpDuration >= 20) {
            this.falling = false;
        } else {
            this.falling = true;
        }
        this.rotationSpeed = 3;

        const theta = (this.rightJumpDuration) * 3 * Math.PI / 180;
        const accelerationStrength = (this.rightJumpDuration) / 15;
        
        if (this.rightJumpDuration == 30) {
            if (this.rotation == 0) {
                this.rightJumpMultiplier = [20, 0.4, -3];
            } else if (this.rotation == 180) {
                this.rightJumpMultiplier = [20, 0.7, -1];
            } else {
                this.rightJumpMultiplier = [30, 0.3, -2];
            }
            if(!leftRearLeg.collided){
                this.rightJumpMultiplier[1]/=2;
                this.rightJumpMultiplier[2]/=3;
            }
        }

        const accelX = this.rightJumpMultiplier[1] * accelerationStrength * Math.sin(theta);
        const accelY = this.rightJumpMultiplier[2] * accelerationStrength * Math.cos(theta);

        this.velocityX += accelX;
        this.velocityY += accelY;

        // Leg animation
        if (this.rightJumpDuration > 25) {
            this.legs[0].relativeY += 1;
        } else if (this.rightJumpDuration < 25 && this.rightJumpDuration >= 20) {
            this.legs[0].relativeY -= 1;
        }
    }

    activateRightJump() {
        if (this.cooldown == 0) {
            jump[Math.floor(Math.random() * jump.length)].play();
            this.rightJumpDuration = 30;
            this.cooldown = 20;
            energy -= 1;
        }
    }

    towardLeftJump() {
        this.rotationSpeed = -3;

        const theta = (this.leftJumpDuration) * 3 * Math.PI / 180;
        const accelerationStrength = (this.leftJumpDuration) / 15;
        
        if (this.leftJumpDuration == 30) {
            if (this.rotation == 0) {
                this.leftJumpMultiplier = [20, 0.4, -3];
            } else if (this.rotation == 180) {
                this.leftJumpMultiplier = [20, 0.7, -1];
            } else {
                this.leftJumpMultiplier = [30, 0.3, -2];
            }
            if(!rightRearLeg.collided){
                this.leftJumpMultiplier[1]/=2;
                this.leftJumpMultiplier[2]/=3;
            }
        }
        
        if (this.leftJumpDuration >= 20) {
            this.falling = false;
        } else {
            this.falling = true;
        }

        const accelX = -this.leftJumpMultiplier[1] * accelerationStrength * Math.sin(theta);
        const accelY = this.leftJumpMultiplier[2] * accelerationStrength * Math.cos(theta);

        this.velocityX += accelX;
        this.velocityY += accelY;

        // Leg animation (fixed to use leftJumpDuration)
        if (this.leftJumpDuration > 25) {
            this.legs[1].relativeY += 1;
        } else if (this.leftJumpDuration < 25 && this.leftJumpDuration >= 20) {
            this.legs[1].relativeY -= 1;
        }
    }

    activateLeftJump() {
        if (this.cooldown == 0) {
            jump[Math.floor(Math.random() * jump.length)].play();
            this.leftJumpDuration = 30;
            this.cooldown = 20;
            energy -= 1;
        }
    }

    update() {
        if (this.rightJumpDuration > 0) {
            this.towardRightJump(this.rightJumpDuration);
            this.rightJumpDuration -= 1;
            if (this.rightJumpDuration == 0) {
                this.falling = true;
            }
        } else {
            this.legs[0].relativeY = 24;
        }
        
        if (this.leftJumpDuration > 0) {
            this.towardLeftJump(this.leftJumpDuration);
            this.leftJumpDuration -= 1;
            if (this.leftJumpDuration == 0) {
                this.falling = true;
            }
        } else {
            this.legs[1].relativeY = 24;
        }

        if (this.cooldown > 0) {
            this.cooldown -= 1;
        }
        
        if(!document.hidden){
            if(this.rightJumpDuration == 0 && this.leftJumpDuration == 0 && this.playingSound<=0){
                this.playingSound = Math.floor(Math.random() * 50 +200);
                croak[Math.floor(Math.random() * croak.length)].play();
            }
            else{
                this.playingSound-=1;
            }
        }
        
        super.update();
        this.legs.forEach(leg => leg.update(this));
    }
}

/* =========================
   Child Class: firefly
   ========================= */


// Modified Firefly class with object pooling
class Firefly extends Sprite {
    constructor(posX, posY, sprite) {
        super(posX, posY, sprite);
        Math.random() < 0.5 ? this.color = fireflyGreen : this.color = fireflyYellow;
        this.width = 16;
        this.height = 8;
        this.lightUp = 0;
        this.rotationSpeed = 0;
        this.lightSpeed = Math.floor(Math.random() * 4)+2;
        this.caught = false;
        this.alive = true;
        this.active = true; // For object pooling
        this.falling = false;
        this.playingSound = 200;
        this.figureEightTime = 0;
        this.figureEightSpeed = Math.random() * 0.05 + 0.05; 
        this.figureEightScale = Math.random() *100 +20;
        this.centerX = posX;
        this.centerY = posY;
    }
    
    // OPTIMIZATION #1: Reset method for reusing fireflies
    reset(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.centerX = posX;
        this.centerY = posY;
        Math.random() < 0.5 ? this.color = fireflyGreen : this.color = fireflyYellow;
        this.lightUp = 0;
        this.lightSpeed = Math.floor(Math.random() * 4)+2;
        this.caught = false;
        this.alive = true;
        this.active = true;
        this.figureEightTime = 0;
        this.figureEightSpeed = Math.random() * 0.05 *(difficulty+1)/2 + 0.05;
        this.figureEightScale = Math.random() *100 +20;
        this.playingSound = 200;
    }
    
    movement() {
        this.figureEightTime += this.figureEightSpeed;
        
        const t = this.figureEightTime;
        const scale = this.figureEightScale;
        
        const denominator = 1 + Math.sin(t) * Math.sin(t);
        const x = (scale * Math.cos(t)) / denominator;
        const y = (scale * Math.sin(t) * Math.cos(t)) / denominator;
        
        this.posX = this.centerX + x;
        this.posY = this.centerY + y;
    }
    
    // OPTIMIZATION #4: Only check collision when tongue is extended
    // OPTIMIZATION #7: Use squared distance instead of Math.sqrt
    checkTongueCatch(tongue, hero) {
        if (!this.alive || this.caught) return false;
        
        // OPTIMIZATION #4: Early exit if tongue not extended
        if (tongue.height <= 0) return false;
        
        const theta = -hero.rotation * Math.PI / 180;
        const catchRadiusSquared = 400; // OPTIMIZATION #7: 20^2 = 400 (cached squared)
        
        for (let i = 0; i <= tongue.height; i += 8) {
            const checkX = tongue.posX - Math.sin(theta) * (tongue.height / 2 - i);
            const checkY = tongue.posY - Math.cos(theta) * (tongue.height / 2 - i);
            
            const dx = this.posX - checkX;
            const dy = this.posY - checkY;
            const distanceSquared = dx * dx + dy * dy; // OPTIMIZATION #7: No Math.sqrt!
            
            if (distanceSquared < catchRadiusSquared) {
                crunch[Math.random() * crunch.length | 0].play();
                this.caught = true;
                this.alive = false;
                score+=1
                this.active = false; // Mark as inactive for pooling
                return true;
            }
        }
        
        return false;
    }
    
    draw(ctx) {
        if (!this.alive || !this.active) return;
        
        const drawX = Math.round(this.posX) - 8;
        const drawY = Math.round(this.posY) - 4;
        const centerX = drawX + 8;
        const centerY = drawY + 4;

        ctx.save();
        
        if (this.lightUp > 0) {
            const alpha = this.lightUp / 100;
            
            const gradient = ctx.createRadialGradient(centerX-4, centerY, 0, centerX-4, centerY, 25);
            if (this.color === fireflyGreen) {
                gradient.addColorStop(0, `rgba(15, 230, 15, ${alpha/2})`);
            } else {
                gradient.addColorStop(0, `rgba(230, 230, 15, ${alpha/2})`);
            }
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX-4, centerY, 25, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.drawImage(this.sprite, drawX, drawY, this.width * imagescale, this.height * imagescale);
        
        if (this.lightUp > 0) {
            const alpha = this.lightUp / 100;
            ctx.globalAlpha = alpha;
            ctx.drawImage(this.color, drawX, drawY, this.width * imagescale, this.height * imagescale);
        }
        
        ctx.restore();
    }
    
    update(tongue, hero) {
        if (!this.alive || !this.active) return;
        
        this.movement();
        this.boundaryCheck();
        
        this.lightUp += this.lightSpeed;
        if (this.lightUp > 100) {
            this.lightSpeed *= -1;
            this.lightUp = 100;
        }
        if (this.lightUp <= 0) {
            this.lightSpeed *= -1;
            this.lightUp = 0;
        }
        
        if (this.checkTongueCatch(tongue, hero)) {
            energy = energy + Math.floor(Math.random()*2)+2;
        }
        
        if(!document.hidden){
            if(this.playingSound<=0){
                this.playingSound = Math.floor(Math.random() * 50 +800);
                firefly[Math.random() * firefly.length | 0].play();
            }
            else{
                this.playingSound-=1;
            }
        }
    }
}
class Slime extends Sprite {
    constructor(posX, posY) {
        super(posX, posY, slimeInner);
        this.width = Math.floor(Math.random()*6+4)*8;
        this.height = this.width;
        this.alive = true;
        this.rotationSpeed = 0;
        this.falling = true;
        this.jumpDuration = 0;
        this.jumpPower = -24;
        this.jumpDirection = Math.random() < 0.5 ? -1 : 1;
        this.cooldown = Math.floor(Math.random() * 200) + 100;
        this.facingRight = this.jumpDirection > 0;
        this.caught = false;
        this.landingSquash = 0;
    }
    
    jump() {
        if (this.cooldown <= 0 && !this.falling) {
            if(Math.random()<0.8 && !document.hidden){
                slimeJump[Math.random() * slimeJump.length | 0].play();
            }
            this.velocityY = this.jumpPower;
            
            if (this.posX<=100){
                this.jumpDirection = Math.abs(this.jumpDirection)
            }
            else if ((rectWidth-this.posX)<=100){
                this.jumpDirection = -Math.abs(this.jumpDirection)
            }
            else if(this.posX-hero.posX<500 && this.posX-hero.posX>-500){
                this.jumpDirection = this.posX<hero.posX ? -1 : 1;
            }
            else if (Math.random() > 0.7) {
                this.jumpDirection *= -1;
            }
            
            this.velocityX = this.jumpDirection * (Math.random() * 6 + 6);
            this.facingRight = this.jumpDirection > 0;
            this.falling = true;
            this.cooldown = Math.floor(Math.random() * 20) + 120;
        }
    }
    
    // OPTIMIZATION #4: Only check collision when tongue is extended
    // OPTIMIZATION #7: Use squared distance instead of Math.sqrt
    checkTongueCatch(tongue, hero) {
        if (!this.alive || this.caught) return false;
        
        // OPTIMIZATION #4: Early exit if tongue not extended
        if (tongue.height <= 0) return false;
        
        const theta = -hero.rotation * Math.PI / 180;
        const catchRadiusBase = 4 + this.width/2;
        const catchRadiusSquared = catchRadiusBase * catchRadiusBase; // OPTIMIZATION #7: Cache squared
        
        for (let i = 0; i <= tongue.height; i += 12) {
            const checkX = tongue.posX - Math.sin(theta) * (tongue.height / 2 - i);
            const checkY = tongue.posY - Math.cos(theta) * (tongue.height / 2 - i);
            
            const dx = this.posX - checkX;
            const dy = this.posY - checkY;
            const distanceSquared = dx * dx + dy * dy; // OPTIMIZATION #7: No Math.sqrt!
            
            if (distanceSquared < catchRadiusSquared) {
                crunch[Math.random() * crunch.length | 0].play();
                this.caught = true;
                this.alive = false;
                score+=2;
                return true;
            }
        }
        
        return false;
    }
    
    update(tongue, hero) {
        const wasInAir = this.falling;
        
        if(this.posX-hero.posX<200 && this.posX-hero.posX>-200){
            this.cooldown-=20
        }
        else if(this.posX-hero.posX<100 && this.posX-hero.posX>-100){
            this.cooldown-=50
        }
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        } else {
            this.jump();
        }
        
        super.update();
        
        if (wasInAir && !this.falling) {
            this.landingSquash = 8;
        }
        
        if (this.landingSquash > 0) {
            this.landingSquash -= 1;
        }

        if (this.checkTongueCatch(tongue, hero)) {
            energy = energy + Math.floor(Math.random()*2)+3-Math.floor(difficultyMultiplier);
        }
    }
    
    draw(ctx) {
        if (!this.alive) return;
        
        const drawX = Math.round(this.posX);
        const drawY = Math.round(this.posY);

        ctx.save();
        ctx.translate(drawX, drawY);
        
        let squashX = 1;
        let squashY = 1;
        
        if (this.landingSquash > 0) {
            const squashAmount = this.landingSquash / 8;
            squashY = 1 - (squashAmount * 0.4);
            squashX = 1 + (squashAmount * 0.4);
        }
        else if (this.falling) {
            squashY = 1 + (this.velocityY * 0.025);
            squashX = 1 / squashY;
        }
        
        if (this.facingRight) {
            ctx.scale(-1, 1);
        }
        
        ctx.scale(squashX, squashY);
        
        ctx.drawImage(this.sprite, -(this.width * imagescale) / 2, -(this.height * imagescale) / 2, this.width * imagescale, this.height * imagescale);
        ctx.drawImage(slimeOuter, -(this.width * imagescale) / 2, -(this.height * imagescale) / 2, this.width * imagescale, this.height * imagescale);
        ctx.restore();
    }
}
class Magma extends Sprite {
    constructor(posX, posY) {
        super(posX, posY, magmaInner);
        this.width = Math.floor(Math.random()*4+6)*8;
        this.height = this.width;
        this.alive = true;
        this.rotationSpeed = 0;
        this.falling = true;
        this.jumpDuration = 0;
        this.jumpPower = -35; // Initial upward velocity
        this.jumpDirection = Math.random() < 0.5 ? -1 : 1; // Random left/right
        this.cooldown = Math.floor(Math.random() * 150) + 100;
        this.facingRight = this.jumpDirection > 0;
        this.caught = false;
        this.heightscale = 1;
        this.landingSquash = 0; // Timer for landing squash effect
    }
    
    jump() {
        if (this.cooldown <= 0 && !this.falling) {
            if(Math.random()<0.8 && !this.hidden){
            magmaJump[Math.floor(Math.random() * magmaJump.length)].play();}
            // Set upward velocity for parabolic jump
            this.velocityY = this.jumpPower;
            
            // 60% chance to continue last direction, 40% chance to switch

            if (this.posX<=100){
                this.jumpDirection = Math.abs(this.jumpDirection)
            }
            else if ((rect.width-this.posX)<=100){
                this.jumpDirection = -Math.abs(this.jumpDirection)
            }
            else if(this.posX-hero.posX<300 && this.posX-hero.posX>-300){
                this.jumpDirection = this.posX<hero.posX ? -1 : 1;
            }
            else if (Math.random() > 0.7) {
                this.jumpDirection *= -1;
            }
            
            // Add horizontal velocity
            this.velocityX = this.jumpDirection * (Math.random() * 10 + 6);
            
            // Update facing direction
            this.facingRight = this.jumpDirection > 0;
            
            // Mark as falling so gravity takes over
            this.falling = true;
            
            // Reset cooldown
            this.cooldown = Math.floor(Math.random() * 20) + 140;
        }
    }
    boundaryCheck() {
        const theta = this.rotation * Math.PI / 180;
        const w = this.width * imagescale;
        const h = this.height * this.heightscale* imagescale;

        // posX and posY are already at center
        const centerX = this.posX;
        const centerY = this.posY;

        // Rotated AABB half extents
        const halfExtentX = (Math.abs(Math.cos(theta)) * w + Math.abs(Math.sin(theta)) * h) / 2;
        const halfExtentY = (Math.abs(Math.cos(theta)) * h + Math.abs(Math.sin(theta)) * w) / 2;

        const leftX   = centerX - halfExtentX;
        const rightX  = centerX + halfExtentX;
        const topY    = centerY - halfExtentY;
        const bottomY = centerY + halfExtentY;

        /* ---------- BOTTOM ---------- */
        if (bottomY >= rect.height) {
            this.posY = rect.height - halfExtentY;
            this.rotationSpeed /= 2;
            this.velocityX /= 2;

            if (this.velocityX < 10) this.velocityX = 0;

            if (this.velocityY >= 10) this.velocityY = -this.velocityY * 0.2;
            else this.falling = false;

            if (Math.abs(this.rotationSpeed) <= 20) {
                this.rotationSpeed = 0;
                this.rotation = Math.round(this.rotation / 90) * 90;
            }
        }

        /* ---------- TOP ---------- */
        if (topY <= 0) {
            this.posY = halfExtentY;
            this.velocityY = -this.velocityY * 0.8;
            this.rotationSpeed /= 2;
        }

        /* ---------- LEFT ---------- */
        if (leftX <= 0) {
            this.posX = halfExtentX;
            this.velocityX = -this.velocityX * 0.8;
            this.velocityY-=this.velocityX
            this.rotationSpeed /= 2;
        }

        /* ---------- RIGHT ---------- */
        if (rightX >= rect.width) {
            this.posX = rect.width - halfExtentX;
            this.velocityX = -this.velocityX * 0.8;
            this.velocityY-=this.velocityX
            this.rotationSpeed /= 2;
        }
    }
    checkTongueCatch(tongue, hero) {
        if (!this.alive || this.caught) return false;
        
        // Check if tongue is extended
        if (tongue.height <= 0) return false;
        
        const theta = -hero.rotation * Math.PI / 180;
        
        // Check multiple points along the tongue for collision
        for (let i = 0; i <= tongue.height; i += 12) {
            const checkX = tongue.posX - Math.sin(theta) * (tongue.height / 2 - i);
            const checkY = tongue.posY - Math.cos(theta) * (tongue.height / 2 - i);
            
            const dx = this.posX - checkX;
            const dy = this.posY - checkY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const catchRadius = 4 + this.width/2;
            
            if (distance < catchRadius) {
                crunch[Math.floor(Math.random() * eat.length)].play();
                this.caught = true;
                this.alive = false;
                score+=3;
                return true;
            }
        }
        
        return false;
    }
    
    update(tongue, hero) {
        // Check if just landed
        const wasInAir = this.falling;
        
        // Automatic jumping behavior
        if(this.posX-hero.posX<200 && this.posX-hero.posX>-200){
                this.cooldown-=20
            }
        else if(this.posX-hero.posX<100 && this.posX-hero.posX>-100){
                this.cooldown-=50
            }
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        } else {
            // Try to jump when cooldown is ready
            this.jump();
        }
        
        // Apply physics (gravity, movement, boundaries)
        super.update();
        
        // If just landed, trigger squash effect
        if (wasInAir && !this.falling) {
            this.landingSquash = 8; // Squash for 8 frames
        }
        
        // Decrease landing squash timer
        if (this.landingSquash > 0) {
            this.landingSquash -= 1;
        }

        if (this.checkTongueCatch(tongue, hero)) {
            energy = energy + Math.floor(Math.random()*2)+4-Math.floor(difficultyMultiplier);
        }
    }
    
draw(ctx) {
    if (!this.alive) return;
    
    const drawX = Math.round(this.posX);
    const drawY = Math.round(this.posY);

    ctx.save();
    ctx.translate(drawX, drawY);
    
    let squashX = 1;
    let squashY = 1;

    // In-air squash and stretch effect (doubled from original)
    if (this.falling) {
        squashY = Math.max(1 + (this.velocityY * 0.05),1);
        squashX = 1;
    }
    
    // Flip horizontally if facing right
    if (this.facingRight) {
        ctx.scale(-1, 1);
    }
    
    // Apply squash and stretch
    this.heightscale = squashY;
    // Draw inner magma
    ctx.drawImage(
        this.sprite, 
        -(this.width * imagescale) / 2, 
        -(this.height * imagescale) / 2, 
        this.width * imagescale, 
        this.height * imagescale
    );
    
    // Draw outer magma in 8 horizontal strips
    const stripHeight = this.width / 8;
    const sourceStripHeight = magmaOuter.height / 8;
    
    for (let i = 0; i < 8; i++) {
        ctx.drawImage(
            magmaOuter,
            // Source coordinates (what part of the image to crop)
            0,                           
            i * sourceStripHeight,       
            magmaOuter.width,            
            sourceStripHeight,           
            // Destination coordinates (where to draw it)
            -(this.width * imagescale) / 2,                    
            -(this.height * imagescale) / 2 + i/8 * this.height *this.heightscale * imagescale,  
            this.width * imagescale,                           
            stripHeight * imagescale                           
        );
    }
    
    ctx.restore();
}

}
class goat extends Sprite {
    constructor(posX, posY) {
        super(posX, posY, goatBody);
        this.width = 175;
        this.height = 150;
        this.charging = false;
        this.falling = true;
        this.angry = false;
        this.walkCycle = 0;
        this.walkCycleIncrement = 0.05;
        this.rest = 0;
        this.facing = 1; // 1 for right, -1 for left
        this.target = Math.floor(Math.random() * (rectWidth-200)+200);
        this.cooldown = 0;
        this.alive = true;
        this.invincibleDuration = 100;
        
        // REMOVED: this.caught (never used)
        // velocityX and velocityY inherited from Sprite class
    }
    
    // Check collision with frog while charging
    checkFrogCollision(hero) {
        if (!this.charging) return false;
        
        // Goat's hitbox
        const goatLeft = this.posX - (this.width * imagescale) / 2;
        const goatRight = this.posX + (this.width * imagescale) / 2;
        const goatTop = this.posY - (this.height * imagescale) / 2;
        const goatBottom = this.posY + (this.height * imagescale) / 2;
        
        // Frog's hitbox (using frog's width/height)
        const frogLeft = hero.posX - (hero.width * imagescale) / 2;
        const frogRight = hero.posX + (hero.width * imagescale) / 2;
        const frogTop = hero.posY - (hero.height * imagescale) / 2;
        const frogBottom = hero.posY + (hero.height * imagescale) / 2;
        
        // AABB collision detection
        if (goatLeft < frogRight && goatRight > frogLeft &&
            goatTop < frogBottom && goatBottom > frogTop) {
            
            // Collision detected!
            hurt[Math.random() * hurt.length | 0].play();
            
            // Push frog away based on goat's charge direction
            const pushStrength = 25;
            hero.velocityX = this.velocityX > 0 ? pushStrength/3 : -pushStrength/3;
            hero.velocityY = -18; // Knock frog upward
            hero.falling = true;
            hero.rotationSpeed = this.velocityX > 0 ? 20 : -20;
            
            // Damage the frog
            health -= Math.floor(difficultyMultiplier);
            score-=10
            energy-=2;
            // Stop goat's charge
            this.charging = false;
            this.velocityX *= 0.2;
            if(difficulty<=2){
            this.angry = false}
            this.cooldown = 80*(3-difficultyMultiplier);
            
            return true;
        }
        
        return false;
    }
    
    // OPTIMIZATION #4: Only check collision when tongue is extended
    checkTongueHit(tongue, hero) {
        
        // OPTIMIZATION #4: Early exit if tongue not extended
        if (tongue.height <= 0) return false;
        
        const theta = -hero.rotation * Math.PI / 180;
        
        // Goat's hitbox boundaries (using width and height)
        const goatLeft = this.posX - (this.width * imagescale) / 2;
        const goatRight = this.posX + (this.width * imagescale) / 2;
        const goatTop = this.posY - (this.height * imagescale) / 2;
        const goatBottom = this.posY + (this.height * imagescale) / 2;
        
        // Check multiple points along the tongue for collision with rectangular hitbox
        for (let i = 0; i <= tongue.height; i += 12) {
            const checkX = tongue.posX - Math.sin(theta) * (tongue.height / 2 - i);
            const checkY = tongue.posY - Math.cos(theta) * (tongue.height / 2 - i);
            
            // Check if tongue point is inside goat's rectangular hitbox
            if (checkX >= goatLeft && checkX <= goatRight && 
                checkY >= goatTop && checkY <= goatBottom) {
                
                // Make goat angry
                this.angry = true;
                score +=5;
                this.cooldown = 90
                
                // Push goat back
                this.velocityY = -20;
                this.falling = true;
                this.invincibleDuration = 100;
                
                return true;
            }
        }
        
        return false;
    }
    
    draw(ctx){
        const drawX = Math.round(this.posX) - 32;
        const drawY = Math.round(this.posY) - 58;
        
        // Calculate leg rotations based on walkCycle
        const frontLegRotation = Math.sin(this.walkCycle) * 35;
        const backLegRotation = Math.sin(this.walkCycle + Math.PI) * 35;
        
        ctx.save();
        
        // Apply horizontal flip based on facing direction
        if (this.facing === -1) {
            ctx.translate(this.posX * 2, 0);
            ctx.scale(-1, 1);
        }
        if(this.cooldown<=100){        
        ctx.save();
        ctx.translate(drawX-65, drawY-35);
        ctx.drawImage(goatHorn, 56, -24, 16 * imagescale, 56 * imagescale);
        ctx.restore();
        
        ctx.save();
        ctx.translate(drawX-65, drawY+35);
        ctx.rotate((-62.45) * Math.PI / 180);
        ctx.drawImage(goatHead, 0, 0, 80 * imagescale, 56 * imagescale);
        ctx.restore();}
        else{        
        ctx.save();
        ctx.translate(drawX-80, drawY-25);
        ctx.rotate((-20) * Math.PI / 180);
        ctx.drawImage(goatHorn, 56, -24, 16 * imagescale, 56 * imagescale);
        ctx.restore();
        
        ctx.save();
        ctx.translate(drawX-60, drawY+50);
        ctx.rotate((-82.45) * Math.PI / 180);
        ctx.drawImage(goatHead, 0, 0, 80 * imagescale, 56 * imagescale);
        ctx.restore();}
        
        // Draw back front leg
        ctx.save();
        ctx.translate(drawX + 8 + 12 * imagescale, drawY + 56);
        ctx.rotate(-frontLegRotation * Math.PI / 180);
        ctx.drawImage(goatBackLeg, -12 * imagescale, 0, 24 * imagescale, 80 * imagescale);
        ctx.restore();
        
        // Draw back back leg
        ctx.save();
        ctx.translate(drawX + 88 + 12 * imagescale, drawY + 56);
        ctx.rotate(-backLegRotation * Math.PI / 180);
        ctx.drawImage(goatBackLeg, -12 * imagescale, 0, 24 * imagescale, 80 * imagescale);
        ctx.restore();
        
        // Draw front front leg
        ctx.save();
        ctx.translate(drawX + 8 + 12 * imagescale, drawY + 56);
        ctx.rotate(frontLegRotation * Math.PI / 180);
        ctx.drawImage(goatLeg, -12 * imagescale, 0, 24 * imagescale, 80 * imagescale);
        ctx.restore();
        
        // Draw front back leg
        ctx.save();
        ctx.translate(drawX + 88 + 12 * imagescale, drawY + 56);
        ctx.rotate(backLegRotation * Math.PI / 180);
        ctx.drawImage(goatLeg, -12 * imagescale, 0, 24 * imagescale, 80 * imagescale);
        ctx.restore();
        
        ctx.drawImage(this.sprite, drawX, drawY, 128 * imagescale, 88 * imagescale);
        ctx.drawImage(goatFur, drawX-8, drawY-8, 88 * imagescale, 112 * imagescale);
    
        ctx.restore();
    }
    
    boundaryCheck() {
        const w = this.width * imagescale;
        const h = this.height * imagescale;
        
        const leftX = this.posX - w / 2;
        const rightX = this.posX + w / 2;
        const topY = this.posY - h / 2;
        const bottomY = this.posY + h / 2;

        /* ---------- BOTTOM ---------- */
        if (bottomY >= rectHeight) {
            this.posY = rectHeight - h / 2;
            this.rotationSpeed /= 2;
            if (this.charging){
                this.velocityX /= 2;
                if (Math.abs(this.velocityX) < 6) this.velocityX = 0;
            }
            if (this.velocityY >= 8) this.velocityY = -this.velocityY * 0.8;
            else this.falling = false;

            if (Math.abs(this.rotationSpeed) <= 20) {
                this.rotationSpeed = 0;
                this.rotation = Math.round(this.rotation / 90) * 90;
            }
        }

        /* ---------- TOP ---------- */
        if (topY <= 0) {
            this.posY = h / 2;
            this.velocityY = -this.velocityY * 0.8;
            this.rotationSpeed /= 2;
        }

        /* ---------- LEFT ---------- */
        if (leftX <= 0) {
            this.posX = w / 2;
            this.velocityX = -this.velocityX * 0.8;
            this.rotationSpeed /= 2;
        }

        /* ---------- RIGHT ---------- */
        if (rightX >= rectWidth) {
            this.posX = rectWidth - w / 2;
            this.velocityX = -this.velocityX * 0.8;
            this.rotationSpeed /= 2;
        }
    }
    
    charge(hero) {
        this.charging = true;
        goatCharge[Math.random() * goatCharge.length | 0].play();
        
        // Calculate distance to hero
        const distanceToHero = Math.abs(this.posX - hero.posX);
        
        // Adjust charge strength based on distance
        let chargeStrength;
        if (distanceToHero < 150) {
            chargeStrength = 10; 
        } else if (distanceToHero < 300) {
            chargeStrength = 20; 
        } else if (distanceToHero < 500) {
            chargeStrength = 25; 
        } else {
            chargeStrength = 40; 
        }
        chargeStrength*=difficultyMultiplier
        
        // Upward velocity for charging motion
        this.velocityY = -15;
        
        // Charge toward hero
        if (hero.posX > this.posX) {
            this.velocityX = chargeStrength;
        } else {
            this.velocityX = -chargeStrength;
        }
        
        this.cooldown = 180; 
        this.falling = true;
        if(difficulty==1){
            this.angry=false;
        }
    }
    
    update(tongue, hero) {
        super.update();
        
        // Check frog collision while charging
        this.checkFrogCollision(hero);
        
        // Decrease cooldown
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        }
        
        // Check if should charge when angry and cooldown is ready
        if (this.angry && this.cooldown === 0) {
            const distanceToHero = Math.abs(this.posX - hero.posX);
            
            // Charge if hero is close and on ground
            if (distanceToHero < 100 && hero.posY > rectHeight - 100) {
                this.charge(hero);
            }
            // Or charge if hero just landed from a jump
            else if (hero.leftJumpDuration < 10 || hero.rightJumpDuration < 10) {
                if (distanceToHero < 400) {
                    this.charge(hero);
                }
            }
        }
        
        // Check tongue collision
        if (this.invincibleDuration > 0) {
            this.invincibleDuration -= 1;
        } else {
            if (this.checkTongueHit(tongue, hero)) {
                goatHurt[Math.random() * goatHurt.length | 0].play();
            }
        }
        
        // Update walk cycle
        if (this.walkCycle >= 1 || this.walkCycle <= -1) {
            this.walkCycleIncrement *= -1;
        }
        
        // Update facing direction based on velocity
        if (this.velocityX > 0) {
            this.facing = -1;
        } else if (this.velocityX < 0) {
            this.facing = 1;
        }
        
        // Stop charging when velocity reaches zero
        if (Math.abs(this.velocityX) < 1) {
            this.charging = false;
            this.velocityX = 0;
        }
        console.log(this.target)
        // Normal wandering behavior (only when not charging)
        if (!this.charging) {
            if (this.rest > 0) {
                this.rest -= 1;
                this.velocityX = 0;
            }
            else if (Math.abs(this.posX - this.target) < 10) {
                this.target = rectWidth / 6 * (Math.floor(Math.random() * 5 + 1));
                this.rest = Math.floor(Math.random() * 100 + 50);
                
            }
            else if (this.posX < this.target && !this.falling) {
                this.velocityX = 8;
            }
            else if (this.posX > this.target && !this.falling) {
                this.velocityX = -8;
            }
        
            // Animate walk cycle
            if (this.rest === 0) {
                this.walkCycle += this.walkCycleIncrement;
            }
            else {
                if (this.walkCycle > 0) {
                    this.walkCycle -= 0.1;
                }
                else if (this.walkCycle < 0) {
                    this.walkCycle += 0.1;
                }
                if (Math.abs(this.walkCycle) < 0.1) this.walkCycle = 0;
            }
        }
    }
}
/* =========================
   CREATE HERO & LEGS
   ========================= */
function initGame() {
    // Initialize object pool
    initFireflyPool();
    
    // Create game objects
    hero = new Frog("green", 128, 128, greenFrog);
    leftRearLeg = new Limb("green", legRearLeft, -32, 24);
    rightRearLeg = new Limb("green", legRearRight, 32, 24);
    tounge = new Tounge("green");
    slime = new Slime(680, 208);
    magma = new Magma(300, 300);
    hero.legs.push(leftRearLeg, rightRearLeg);
    mainCharacter = [hero];
    goat1 = new goat(500, rectHeightThird+50);
}

function resetGame() {
    // Stop current game loop
    if (typeof gameclock !== 'undefined' && gameclock) {
        clearInterval(gameclock);
    }

    click.play()

    // Reset global variables
    health = 5;
    energy = 5;
    score = 0;
    
    // Reset hero
    hero.posX = 128;
    hero.posY = 128;
    hero.velocityX = 0;
    hero.velocityY = 0;
    hero.rotation = 0;
    hero.rotationSpeed = 0;
    hero.falling = true;
    hero.rightJumpDuration = 0;
    hero.leftJumpDuration = 0;
    hero.cooldown = 0;
    
    // Reset tongue
    tounge.height = 0;
    tounge.extentionDuration = 0;
    tounge.cooldown = 0;
    
    // Reset slime
    slime.posX = 680;
    slime.posY = 208;
    slime.velocityX = 0;
    slime.velocityY = 0;
    slime.alive = true;
    slime.caught = false;
    slime.falling = true;
    slime.cooldown = Math.floor(Math.random() * 200) + 100;
    
    // Reset magma
    magma.posX = 300;
    magma.posY = 300;
    magma.velocityX = 0;
    magma.velocityY = 0;
    magma.alive = true;
    magma.caught = false;
    magma.falling = true;
    magma.cooldown = Math.floor(Math.random() * 150) + 100; 
    
    goat1.posX = 400;
    goat1.posY = 300;
    goat1.velocityX = 0;
    goat1.velocityY = 0;
    goat1.charging = false;
    goat1.angry = false;
    goat1.falling = true;
    goat1.walkCycle = 0;
    goat1.rest = 0;
    goat1.facing = 1;
    goat1.target = Math.floor(Math.random() * (rectWidth-200)+200);
    goat1.cooldown = 0;
    goat1.alive = true;
    goat1.invincibleDuration = 100;
    
    fireflyPool.forEach((firefly, index) => {
            const x = Math.random() * rect.width;
            const y = rect.height/3 + Math.random() * rect.height * 2/3;
            firefly.reset(x, y);
            if (index >= 10) {
                firefly.active = false;
            }
        });
    
    
    // Restart game loop
    gameclock = setInterval(gameTick, 20);
}
function changeDifficulty(){
    if(difficulty>=3){
        difficulty = 1
    }
    else{
        difficulty+=1
    }
    difficultyButton = document.getElementById("difficulty")
    difficultyButton.value = `Difficulty: ${difficultyList[difficulty-1]}`
    console.log(difficulty)
    resetGame()
}
/* =========================
   GAME LOOP
   ========================= */
function gameTick() {
    if(!document.hidden){
        ctx.clearRect(0, 0, rectWidth, rectHeight);
        
        // Draw background
        ctx.beginPath();
        ctx.rect(0, 0, rectWidth, rectHeight);
        ctx.fillStyle = "#7aa4ff";
        ctx.fill();
        ctx.stroke();
        
        // Check energy/health
        if (energy <= 0) {
            hurt[Math.random() * hurt.length | 0].play();
            energy = 9-difficulty;
            health--;
        }
        if(energy>=12&&difficulty==1&&health<5){
            energy=6
            health++
            burp.play();
        }
        else if(energy>10){
            energy = 10;
            burp.play();
        }
        
        ctx.save();
        

        for (let i = 0; i < health; i++) {
            ctx.drawImage(fullHeart, 20 + 35 * i, 20, 27, 27);
        }
        for (let i = health; i < 5; i++) {
            ctx.drawImage(emptyHeart, 20 + 35 * i, 20, 27, 27);
        }
        

        for (let i = 0; i < Math.floor(energy/2) && i<5; i++) {
            ctx.drawImage(fullHunger, rectWidth - (47 + 35 * i), 20, 27, 27);
        }
        for (let i = Math.floor(energy/2); i < 5; i++) {
            ctx.drawImage(emptyHunger, rectWidth - (47 + 35 * i), 20, 27, 27);
        }
        if(energy%2){
            ctx.drawImage(halfHunger, rectWidth - (47 + 35 * Math.floor(energy/2)), 20, 27, 27);
        }
        ctx.font = "27px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`Score:${score}`, rectWidthHalf, 40);
        ctx.restore(); 
        
        // OPTIMIZATION #1: Use object pooling for fireflies
        // Spawn new firefly if needed
        if(fireflyPool.filter(f => f.active).length < 10){
            spawnFirefly();
        }
        goat1.update(tounge, hero);
        goat1.draw(ctx);
        // Update and draw game entities
        mainCharacter.forEach(sprite => {
            sprite.update();
            sprite.draw(ctx);
        });
        
        // OPTIMIZATION #1: Update only active fireflies from pool
        fireflyPool.forEach(firefly => {
            if (firefly.active) {
                firefly.update(tounge, hero);
                firefly.draw(ctx);
            }
        });
        
        slime.update(tounge, hero);
        slime.draw(ctx);
        if(slime.alive==false){
            slime.posX = Math.random()*rectWidth;
            slime.posY = rectHeightThird+Math.random()*rectHeightTwoThirds;
            slime.width = Math.floor(Math.random()*6+4)*8;
            slime.height = slime.width;
            slime.alive = true;
            slime.caught = false;
        }
        
        magma.update(tounge, hero);
        magma.draw(ctx);
        if(magma.alive==false){
            magma.posX = Math.random()*rectWidth;
            magma.posY = rectHeightThird+Math.random()*rectHeightTwoThirds;
            magma.width = Math.floor(Math.random()*6+4)*8;
            magma.height = magma.width;
            magma.alive = true;
            magma.caught = false;
        }
        
        tounge.update(hero);
        if(tounge.height>0) tounge.draw(ctx);
    

    }
    if (health <= 0) {
        clearInterval(gameclock);
        for (let i = 0; i < 5; i++) {
            ctx.drawImage(emptyHeart, 20 + 35 * i, 20, 27, 27);
        }
        for (let i = 0; i < 5; i++) {
            ctx.drawImage(emptyHunger, rectWidth - (47 + 35 * i), 20, 27, 27);
        }
        ctx.beginPath();
        ctx.rect(0, 0, rectWidth, rectHeight);
        ctx.fillStyle = "rgba(225,0,0,0.5)";

        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "white"
        ctx.font = "81px Arial";
        ctx.fillText("You Died",rectWidthHalf, rectHeightHalf)            
        }
}
document.addEventListener('keydown', function(event) {
    if(gameStarted){
    if (event.key == ' ') {
        tounge.beginExtend(hero.rotation);
        
        event.preventDefault();
        eat[Math.floor(Math.random() * eat.length)].play();
        hero.velocityX/=1.2;
        hero.velocityY/=1.2;
        slime.jump()
        magma.jump()
    } else if (event.key == 'f') {
        hero.activateRightJump();
        console.log("lol")      
    } else if (event.key == 'j') {
        hero.activateLeftJump();
        console.log("bruh")  
    }}
});


