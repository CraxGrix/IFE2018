export default class Ball {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.type = "ball"
        this.v = 1
        this.capture = false
        this.routeArr = []
        this.rx = this.x
        this.ry = this.y
    }

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
            let vx = this.v * cos
            let vy = this.v * sin
            this.x += vx
            this.y += vy
        }
    }
    /** 
    calculationTrack() {
        while(this.distance > 1) {
            let deg = Math.atan2(this.targetY - this.y, this.targetX - this.x)
            let sin = Math.sin(deg)
            let cos = Math.cos(deg)
            let vx = this.v * cos
            let vy = this.v * sin
            this.rx += vx
            this.ry += vy 
            this.routeArr.push([this.rx, this.ry])
        }
        return this.routeArr
    }
    */
    updata(targetX, targetY) {
        this.targetX = targetX
        this.targetY = targetY
    }
}