export default class Ball {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.type = "ball"
        this.speed = 1
        this.status = false
    }
    // TODO 要有一个target坐标和this坐标的偏差校正函数，如果两个坐标太近了就直接不用运动了.
    move() {
        if (this.status) {
            this.distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
            //console.log(this.distance)
            if (this.distance < 4) {
                this.status = false
                this.targetX = this.x
                this.targetY = this.y
            }
            let deg = Math.atan2(this.targetY - this.y, this.targetX - this.x)
            let sin = Math.sin(deg)
            let cos = Math.cos(deg)
            let vx = this.speed * cos
            let vy = this.speed * sin
            this.x += vx
            this.y += vy
            this.speed = this.speed - this.speed * 0.02
            console.log(this.speed)
        }

    }
    updata(targetX, targetY, speed) {
        this.targetX = targetX
        this.targetY = targetY
        this.speed = speed
        this.status = true
    }
}



