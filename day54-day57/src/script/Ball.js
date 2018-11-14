export default class Ball {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.type = "ball"
        this.capture = false
        this.routeArr = []
        this.speed = 0
        this.rx = this.x
        this.ry = this.y
    }
    // TODO 要有一个target坐标和this坐标的偏差校正函数，如果两个坐标太近了就直接不用运动了.
    move () {
        if(this.capture) {
            this.targetX = this.x
            this.targetY = this.y
        }
        this.distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
        console.log(this.distance)
        if (this.distance > 1) {
            let deg = Math.atan2(this.targetY - this.y, this.targetX - this.x)
            let sin = Math.sin(deg)
            let cos = Math.cos(deg)
            let vx = this.speed * cos
            let vy = this.speed * sin
            this.x += vx
            this.y += vy
        }
    }
    updata(targetX, targetY, speed) {
        this.targetX = targetX
        this.targetY = targetY
        this.speed = speed
    }
}