class Sprite {
    constructor({ position, velocity, image, frame = { max: 1 },sprites }) {
        this.position = position
        this.image = image
        this.frame = { ...frame, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.height = this.image.height,
                this.width = this.image.width / this.frame.max
        }
        this.moving = false
        this.sprites =sprites
    }

    draw() {
        c.drawImage(this.image,
            this.frame.val * this.width,
            0,
            this.image.width / this.frame.max,
            this.image.height,//corp position
            this.position.x,
            this.position.y,
            this.image.width / this.frame.max,
            this.image.height//actual width and height
        );
        if (!this.moving) return
            if (this.frame.max > 1) {
                this.frame.elapsed++
            }
            if (this.frame.elapsed % 10 == 0) {
                if (this.frame.val < this.frame.max-1) {
                    this.frame.val++
                }
                else {
                    this.frame.val = 0
                }
            }
    }
}

class boundary {
    static width = 54
    static height = 54
    constructor({ position }) {
        this.position = position,
            this.width = 54,
            this.height = 54
    }
    draw() {
        c.fillStyle = 'rgb(225,0,0,0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}