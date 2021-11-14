export class MainScene extends Phaser.Scene{
    constructor(){
        super({ key: "game" });
    }

    init(){
        this.block = null;
        this.box = null;
        this.rockets = null;
        this.groundInf = null;
        this.groundTop = null;
        this.jumpCount = 0;
        this.balas = null;
        // this.timeBalas = 0;
        this.counterLife = 100;
        this.counterLifeText = "";
        // this.completed = true;
        // this.blocks = null;
        // this.spikes1 = null;
        // this.blocks1 = null;
        this.enemyLife = 100;
        this.enemyText = "";
        this.damegeEnemy = 30;
        this.damageRocket = 20;
        this.damagePlayer = 40;
        this.explode = null;
        this.band = true;
        this.mov=true;
    }

    preload(){
        this.load.image('box', 'assets/box.png');
        this.load.image('block', 'assets/block.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('groundbottom', 'assets/groundBottom.png');
        this.load.image('groundtop', 'assets/groundTop.png');
        this.load.audio('explosion', 'src/sounds/explosion.mp3');
    }

    create(){
        this.box = this.physics.add.sprite(400, 450, 'box');
        this.block = this.physics.add.image(500, 450, 'block').setImmovable(true);
        this.groundTop = this.physics.add.image(0, 0, "groundtop").setOrigin(0, 0).setImmovable(true);
        this.groundInf = this.physics.add.image(0, 600, "groundbottom").setOrigin(0, 1).setImmovable(true);
        this.balas = this.physics.add.sprite('rocket');

        this.counterLifeText = this.add.text(this.sys.game.canvas.width / 2 - 80, 0, 'Energía: ' + this.counterLife, { fontStyle: 'strong', font: '25px Arial', fill: '#6368BC' });
        this.counterLifeText.setDepth(1);

        this.enemyText = this.add.text(this.sys.game.canvas.width / 2 + 80, 0, 'Energía: ' + this.enemyLife, { fontStyle: 'strong', font: '25px Arial', fill: '#6368BC' })

        this.groundInf.body.allowGravity = false
        this.groundTop.body.allowGravity = false

        this.box.body.gravity.y = 1000;

        this.physics.add.collider(this.box, this.groundInf);
        this.physics.add.collider(this.box, this.groundTop);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.block, this.groundInf);
        this.physics.add.collider(this.box, this.block, this.hacerDaño());
        this.physics.add.collider(this.block, this.box, this.recibirDaño());
        this.physics.add.collider(this.balas, this.block, this.disparando());

        this.box.body.setCollideWorldBounds();

        this.block.setVelocityX(-100); 
        
        this.balas = this.physics.add.group();
    }

    update(){
        if(this.cursors.left.isDown){
            // this.block.setVelocityX(200);
            this.mov = false;
            this.box.x -= 5;
            // this.box.setVelocityX(-200);
            //DISPARAR
            if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
                this.disparar(false);
            }
            if(this.cursors.up.isDown){
                this.jump();
            }
        }else if(this.cursors.right.isDown){
            // this.block.setVelocityX(-200); 
            this.mov = true;
            // this.box.setVelocityX(200);
            this.box.x += 5;
            //DISPARAR
            if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
                this.disparar();
            }
            if(this.cursors.up.isDown){
                this.jump();
            }
        }else if(this.cursors.up.isDown){
            this.jump();
        }else if(this.cursors.shift.isDown){
            this.box.body.stop;
            this.block.setVelocityX(0);
        }

        if(this.box.body.touching.down){
            this.jumpCount = 0;
        }

        //movimiento de 1 enemigo
        // if(this.block.x < 450 && this.band == true){
        //     this.block.x += 1;
        // }else{
        //     if(this.block.x == 450){
        //         this.band = false;
        //     }
        // }
        // if(this.block.x > 300 && this.band == false){
        //     this.block.x -= 1;
        // }else{
        //     if(this.block.x == 300){
        //         this.band = true;
        //     }
        // }
        //FIN

        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.disparar();
        }
    }

    jump(e=-400){
        if(this.jumpCount >= 1){
            return;
        }

        this.box.body.velocity.y = e;

        this.jumpCount++;
    }

    hacerDaño(){
        //MATAR ENEMIGO SALTANDO POR ENCIMA
        if(this.block.body.touching.up){
            this.box.body.velocity.y = -300;
            if(this.jumpCount <= 1){
                this.counterLife += 20;
                this.counterLifeText.setText('Energia: ' + this.counterLife);
                this.enemyLife -= 40;
                this.enemyText.setText('Energia: ' + this.enemyLife);
            }else{
                return;
            }
            if(this.enemyLife <= 0){
                this.block.destroy(true);
                this.enemyText.setVisible(false);
            }
        }

        //Disparando a un enemigo
        // if(this.balas != undefined){
        //     console.log(this.balas.body.touching.right && this.block.body.touching.left);
        //     if(this.balas.body.touching.right && this.block.body.touching.left){
        //     // if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
        //         this.counterLife += 20;
        //         this.counterLifeText.setText('Energia: ' + this.counterLife);
        //         this.enemyLife -= 30;
        //         this.enemyText.setText('Energia: ' + this.enemyLife);
        //     // }
        //     }else if(this.balas.touching.left && this.block.body.touching.right){
        //         console.log(this.balas.touching.left && this.block.body.touching.right);
        //         this.counterLife += 20;
        //         this.counterLifeText.setText('Energia: ' + this.counterLife);
        //         this.enemyLife -= 30;
        //         this.enemyText.setText('Energia: ' + this.enemyLife);
        //     }
        // }
    }

    recibirDaño(){
        if(this.block.body.touching.left || this.block.body.touching.right){
            if(this.box.x > this.block.x){
                console.log(this.box.x > this.block.x)
                this.box.x += 60;    
                this.counterLife -= this.damegeEnemy;
                this.counterLifeText.setText('Energia: ' + this.counterLife);
            }else if(this.box.x < this.block.x){
                this.box.x -= 60;    
                this.counterLife -= this.damegeEnemy;
                this.counterLifeText.setText('Energia: ' + this.counterLife);
            }
        }
        // this.box.x += 60;    
        // this.counterLife -= this.damegeEnemy;
        // this.counterLifeText.setText('Energia: ' + this.counterLife);
        // this.endGame();
    }

    disparando(){
        this.balas.setVisible(false);
        this.counterLife += 20;
        this.counterLifeText.setText('Energia: ' + this.counterLife);
        this.enemyLife -= 30;
        this.enemyText.setText('Energia: ' + this.enemyLife);
    }

    disparar(){
        if(this.mov == true){
            // console.log(this.balas);
            // this.balas.enableBody = true;
            // this.balas.physicsBodyType = Phaser.Physics.Arcade;
            // this.balas.createMultiple(20, 'rocket');
            // console.log(this.balas);
            // this.balas.setAll('anchor.x', 0.5);
            // this.balas.setAll('anchor.y', 1);
            // this.balas.outOFBoundsKill(true);
            // this.balas.checkWorldBounds(true);
            // var bala;
            // var bala = this.create(this.box.x, this.box.y, 'rocket');
            // if (bala) {
            //     bala.setActive(true)
            //         .setVisible(true)
            //         .setDepth(2)
            //         .body.velocity.y = -200;
            // }
            // bala.outOfBoundsKill = true;
            // this.shotSound.play();
            // var roc = this.physics.add.sprite(this.box.x+30, this.box.y, 'rocket');
            var roc = this.balas.create(this.box.x+30, this.box.y, 'rocket');
            if(roc){
                roc.setActive(true)
                    .setVisible(true)
                    .setVelocityX(200);
                    // .body.velocity.x = 500;
            }        
            // roc.outOfBoundsKill = true;

            this.counterLife -= 15;
            this.counterLifeText.setText('Energía: ' + this.counterLife);
            this.endGame();
        }else{
            var roc = this.balas.create(this.box.x-30, this.box.y, 'rocket');
            if(roc){
                roc.setActive(true)
                    .setVisible(true)
                    .setVelocityX(-200);
                    // .body.velocity.x = -500;
            }        
            roc.outOfBoundsKill = true;

            this.counterLife -= 15;
            this.counterLifeText.setText('Energía: ' + this.counterLife);
            this.endGame();
        }
    }
        
    endGame() {
        if(this.counterLife <= 0){
            this.scene.start('gameover');
        }
        // this.explode.play();
    }

    congrats(){
        this.scene.start('congratulations');
    }

}