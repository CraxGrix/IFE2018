export default class Footballer {
    constructor(x, y, VNum, explosiveNum, physical, name) {
        this.log = 0
        this.x = x
        this.y = y
        this.type = 'solid'
        this.name = name
        this.VMax = 3 + (VNum - 1) * (9 / 98) //7.5
        this.toMaxSpeedSecends = 4 - (explosiveNum - 1) * (3 / 98) //2.5s
        this.inMaxSpeedKeepSecends = 10 + (physical - 1) * (5 / 98)
        //console.log(this.VMax, this.toMaxSpeedSecends)
        // 此为运动员加速时每三十分之一秒所移动的像素距离
        // this.v 为每帧所递增的速度常数
        this.v = this.VMax / this.toMaxSpeedSecends * 5 / (1000 / 30)
        console.log(this.v)
        this.speed = this.v
    }
    /** 
     * 每个球员的run方法接受一个目的地座标的数组，通过球员各项身体数值的计算得出下一帧球员应该出现的位置
     * @param {Array} 目的地座标数组
     */
    run(Game) {
        console.log(this.v)

        this.targetX = Game.ball.x
        this.targetY = Game.ball.y
        let targetArr = Game.ball.calculationTrack()

        //console.log(this.x, this.y)
        // 根据勾股定理公式 c^2 = a^2 + b^2求出球员与目标之间的距离
        // TODO 移动 这个功能应抽象出来
        let distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
        console.log(distance, this.log)
        if (distance > 12.5) {
            let deg = Math.atan2(this.targetY - this.y, this.targetX - this.x)
            // console.log(targetX, targetY, this.x, this.y)
            // Math.atan2方法接收一组座标返回弧度值
            //console.log(deg)
            let sin = Math.sin(deg)
            let cos = Math.cos(deg)
            let vx = this.v * cos
            let vy = this.v * sin

            this.x += vx
            this.y += vy
            // console.log(this.x, this.y)
            // Game.draw(this)
            if (this.v < this.VMax * 5) {
                this.log++
                this.v += this.speed
                console.log(this.log)
                //console.log(this.v, this.VMax / (1000 / 30) * 5)
            } else {
                console.log(Math.sqrt(Math.pow(100 - this.x, 2) + Math.pow(100 - this.y, 2)), "起点距离")
                // 体力计时器
                // TODO Fix Bug 真实化体力耗尽所表现出来的现象 
                if (!this.physicalTimeOutId) {
                    this.physicalTimeOutId = setTimeout(() => {
                        this.v = this.speed
                        this.physicalTimeOutId = null
                    }, this.inMaxSpeedKeepSecends * 1000)
                }
            }
        } else {
            Game.ball.capture = true
            this.v = this.speed
        }

    }

    updata(targetX, targetY) {
        this.targetX = targetX
        this.targetY = targetY
    }

}