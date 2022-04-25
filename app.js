// Zone d'affichage du jeu 
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Boucle dans fichier json et récupère les points de collision afin que le joueur ne puisse pas dépasser ces points
const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, i + 70)
    )
}

const boundaries = []
const offset = {
    x: -640,
    y: -665
}
 
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new boundary({
                    position: {
                        x: j * boundary.width + offset.x,
                        y: i * boundary.height + offset.y
                    }
                })
        )
    })
})

// Taille de la fenêtre de jeu 
canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

// Image de la map ( zoomé a x% )
const image = new Image()
image.src = './img/map.png'

// Image PNJ
const PNJplayerDownImage = new Image()
PNJplayerDownImage.src = './img/EnemyIdleDown.png' 

//image du joueur
const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png' 

// Image objet à récuperer
const plan = new Image()
plan.src = './img/coffre.png' 

// Image du monstre
const monstre = new Image()
monstre.src = './img/perso1.png' 

const monstre2 = new Image()
monstre2.src = './img/monstre.png' 

// Image de la princesse 
const queen = new Image()
queen.src = './img/vide.png' 

// Images du joueur en mouvement 
const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png' 

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png' 

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png' 

const playerIdleDownImage = new Image()
playerIdleDownImage.src = './img/playerIdleDown.png'

const playerAttackImage = new Image ()
playerAttackImage.src = './img/playerAttack.png'

let inventaire = []


// Sprite du joueur
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerIdleDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage,
        idledown: playerIdleDownImage,
        attack: playerAttackImage

    }
})

// Sprite PNJ
const PNJ = new Sprite({
    position: {
        x: canvas.width / 2 - 1500 / 4 / 2,
        y: canvas.height / 2 + 140 / 2
    },
    image: PNJplayerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        // idledown: PNJplayerDownImage
    }
})

// Création de l'objet à ramasser
const coffre = new Sprite({
    position: {
        x: canvas.width / 2 +5000 / 4 / 2,
        y: canvas.height / 2 + 1200 / 2
    },
    image: plan,
    frames: {
        max: 1
    },
    sprites: {
        // idledown: PNJplayerDownImage
    }
})

// Création d'un monstre
const MONSTRE = new Sprite({
    position: {
        x: canvas.width / 2 +5000 / 4 / 2,
        y: canvas.height / 2 + 1000 / 2
    },
    image: monstre,
    frames: {
        max: 4
    },
    sprites: {
        // idledown: PNJplayerDownImage
    }
})


const MONSTRE2 = new Sprite({
    position: {
        x: canvas.width / 2 +8000 / 4 / 2,
        y: canvas.height / 2 - 1200 / 2
    },
    image: monstre2,
    frames: {
        max: 1
    },
    sprites: {
        // idledown: PNJplayerDownImage
    }
})

// Création de la princesse
const princesse = new Sprite({
    position: {
        x: canvas.width / 2 +12000 / 4 / 2,
        y: canvas.height / 2 - 1200 / 2
    },
    image: queen,
    frames: {
        max: 1
    },
    sprites: {
        // idledown: PNJplayerDownImage
    }
})


// Backgroud par défaut quand le personnage arrive
const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: image,
})

// Touche de déplacement qui sont pas défaut non préssé
const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }, 
    r: {
        pressed: false
    },
    e: {
        pressed: false
    },
    b: {
        pressed: false
    },
    n: {
        pressed: false
    }
}
 
// Array qui définie ce qui doit bouger lorsque le joueur se déplace
const movables = [background, ...boundaries, PNJ, coffre,MONSTRE,MONSTRE2,princesse]

// Rectangle = player | rectangle2 = boundary
function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}



// Permet de selection le bon sprite de déplacement ainsi que de faire défiler le background pour donner un effet de déplacement
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()

    let moving = true
    player.moving = false

     
 
    if (keys.z.pressed && lastKey === 'z') {
        player.moving = true
        player.image = player.sprites.up
        
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            )   {
 
                moving = false
                break
            }    
        }

        
        if(moving)
        movables.forEach(movables => {movables.position.y += 3})}


    else if (keys.q.pressed && lastKey === 'q') {
        // PNJ.style.display = 'none'
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            )   {
    
                moving = false
                break
            }    
        }
        
        if(moving)
        movables.forEach(movables => {movables.position.x += 3})}

    
        else if(keys.b.pressed){
            player.moving = true
            player.image = player.sprites.attack
             
        }

     
    else if (keys.s.pressed && lastKey === 's') {
     
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            )   {
 
                moving = false
                break
            }    
        }

        if(moving)
        movables.forEach(movables => {movables.position.y -= 3})}
    else if (keys.d.pressed && lastKey === 'd') {
 
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y 
                    }}
                })
            )   {
 
                moving = false
                break
            }    
        }
        if(moving)
        movables.forEach(movables => {movables.position.x -= 3})}
    

        PNJ.draw() 
        coffre.draw()
        MONSTRE.draw()
        MONSTRE2.draw()
        princesse.draw()
 
 
    
    }
    
animate()

// Permet lorsque la touche est préssé de changé sa valeur en true
let lastKey = ''
window.addEventListener('keydown', (e) => {

    // Permet de trouver la position du joueur par rapport à un repère donné
    // Permet une réaction en fonction d'une zonée donnée
    
   let position = Math.hypot(PNJ.position.x - player.position.x, PNJ.position.y - player.position.y)
   if (position <= 80) {
       const text = document.getElementById("text")
       text.style.display = "block"
       setTimeout(() => {
        text.style.display = "none"
       },10000)
       
   } 
    //
    console.log(position)
    switch (e.key) {
        case 'z':
            keys.z.pressed = true
            // lasKey permet de prendre en compte uniquement la dernière touche préssé pour le déplacement
            lastKey = 'z'
            break
        case 'q':
            keys.q.pressed = true
            lastKey = 'q'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'r':
            if(position >= 890 && position <= 1000) {
                plan.src = './img/vide.png'
                inventaire.push("coffre")
                console.log(inventaire)
    
            }
            keys.r.pressed = true
            lastKey = 'r'
            break
        case 'e':
             if(inventaire.length != 0 && position > 1800) {
                image.src = './map2/map2.png' 
                PNJplayerDownImage.src ='img/vide.png'
                monstre.src ='img/vide.png'
                monstre2.src ='img/vide.png'
                queen.src = './img/princesse.png'
                const text2 = document.getElementById("text_2")
                text2.style.display = "block"
        
            }

            keys.e.pressed = true
            lastKey = 'e'
            break
        case 'b':
            if(position >= 850 && position <= 970)
            {   
                monstre.src ='img/vide.png'

            }
            else if(position >= 1365 && position <= 1430)
            {   
                monstre2.src ='img/vide.png'

            }
            
            keys.b.pressed = true
            lastKey = 'b'
            break
    
            
    }
})
// lorsque la touche n'est pas préssé redevien false pour arrêter/empêcher le déplacement
window.addEventListener('keyup', (e) => {
   
    switch (e.key) {
        
        case 'z' :
            keys.z.pressed = false
            player.image = player.sprites.idledown
            PNJ.Image = PNJ.sprites.idledown
            break
        case 'q' :
            keys.q.pressed = false
            player.image = player.sprites.idledown
            break
        case 's' :
            keys.s.pressed = false
            player.image = player.sprites.idledown
            break
        case 'd' :
            keys.d.pressed = false
            player.image = player.sprites.idledown
            break
        case 'r' :
            keys.r.pressed = false
            player.image = player.sprites.idledown
            break
        case 'e' :
            keys.e.pressed = false
            player.image = player.sprites.idledown
            break
        case 'b' :
            keys.b.pressed = false
            player.image = player.sprites.idledown
            break
        case 'n' :
            keys.n.pressed = false
            player.image = player.sprites.idledown
            break

    }
})

 