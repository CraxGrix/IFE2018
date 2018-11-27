export default class Ball {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.type = "ball"
        this.speed = 0
        this.status = false
    }
    // TODO 要有一个target坐标和this坐标的偏差校正函数，如果两个坐标太近了就直接不用运动了.
    move() {
        if (this.speed) {
            this.distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
            if (this.distance < 4) {
                this.status = false
                this.targetX = this.x
                this.targetY = this.y
            }
            let c1 = {
                x: this.x,
                y: this.y
            },
                c2 = {
                    x: this.targetX,
                    y: this.targetY
                }
            //console.log(vx, vy)
            if (typeof this.cos === 'undefined' || this.cos === 0) {
                [this.sin, this.cos] = Window.utils.getSinAndCos(c1, c2)
            }
            let vx = this.speed * this.cos,
                vy = this.speed * this.sin
            this.x += vx
            this.y += vy
            this.speed = this.speed - this.speed * 0.02
            if (this.speed < 0.0001) {
                this.speed = 0
                this.status = false
            }
            console.log(this.vx, this.vy)
        }

    }
    updata(targetX, targetY, speed) {
        this.targetX = targetX
        this.targetY = targetY
        this.speed = speed
        this.status = true
    }
}



