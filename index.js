const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionmap = []
for (let i = 0; i < collision.length; i += 90) {
    collisionmap.push(collision.slice(i, 70 + i))
}

const boundraies = []

const offset = {
    x: -30,
    y: -850
}

collisionmap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol != 0) {
            boundraies.push(
                new boundary({
                    position: {
                        x: j * boundary.width + offset.x,
                        y: i * boundary.height + offset.y
                    }
                })
            )
        }
    })
})


const image = new Image()
image.src = './source pics/island buliding.png'

const foreground_image = new Image()
foreground_image.src = './source pics/foreground.png'

const playerdownImage = new Image()
playerdownImage.src = './source pics/playerDown.png'

const playerupImage = new Image()
playerupImage.src = './source pics/playerUp.png'

const playerleftImage = new Image()
playerleftImage.src = './source pics/playerLeft.png'

const playerrightImage = new Image()
playerrightImage.src = './source pics/playerRight.png'

//image.onload =()=>{to load mage}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foreground_image
})

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,//cordinate of player's starting position
    },
    image: playerdownImage,
    frame: { max: 4 },
    sprites:{
        up:playerupImage,
        down:playerdownImage,
        left:playerleftImage,
        right:playerrightImage
    }
})

const keys = {
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

const moveable = [background, ...boundraies,foreground]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y);
}

function anime() {
    window.requestAnimationFrame(anime)

    background.draw()

    boundraies.forEach(boundary => {
        boundary.draw()
    })

    player.draw()

    foreground.draw()

    let moving = true
    player.moving=false
    if (keys.w.pressed && lastkey === 'w') {
        player.moving=true
        player.image=player.sprites.up
        for (let i = 0; i < boundraies.length; i++) {
            const boundary = boundraies[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            moveable.forEach(
                (moveable) => { moveable.position.y += 3 }
            )
    }
    else if (keys.a.pressed && lastkey === 'a') {
        player.moving=true
        player.image=player.sprites.left
        for (let i = 0; i < boundraies.length; i++) {
            const boundary = boundraies[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x +3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        moveable.forEach(
            (moveable) => { moveable.position.x += 3 }
        )
    }
    else if (keys.s.pressed && lastkey === 's') {
        player.moving=true
        player.image=player.sprites.down
        for (let i = 0; i < boundraies.length; i++) {
            const boundary = boundraies[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        moveable.forEach(
            (moveable) => { moveable.position.y -= 3 }
        )
    }
    else if (keys.d.pressed && lastkey === 'd') {
        player.moving=true
        player.image=player.sprites.right
        for (let i = 0; i < boundraies.length; i++) {
            const boundary = boundraies[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x -3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        moveable.forEach(
            (moveable) => { moveable.position.x -= 3 }
        )
    }
}
anime()
//event listner
let lastkey = ''
window.addEventListener('keydown', (e) => {
    // console.log('e.key') gives exact key pressed in console
    switch (e.key) {
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }
})