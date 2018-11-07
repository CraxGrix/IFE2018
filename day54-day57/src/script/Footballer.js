export default class Footballer {
    constructor(x, y, VNum, explosiveNum, physical, name) {
        this.x = x
        this.y = y
        this.type = 'solid'
        this.name = name
        this.VMax = 3 + (VNum - 1) * (9 / 98)
        this.toMaxSpeedSecends = 4 - (explosiveNum - 1) * (3 / 98)
        this.inMaxSpeedKeepSecends = 10 + (physical - 1) * (5 / 98)
        //console.log(this.VMax, this.toMaxSpeedSecends)
        // 此为运动员加速时每三十分之一秒所移动的像素距离
        // 每秒最大速度除于帧数乘以px倍数的值除于
        this.v = (this.VMax / (1000 / 30) * 5) / (this.toMaxSpeedSecends * (1000 / 30))
        this.speed = this.v
    }
    /** 
     * 每个球员的run方法接受一个目的地座标的数组，通过球员各项身体数值的计算得出下一帧球员应该出现的位置
     * @param {Array} 目的地座标数组
     */
    run(Game) {
        //console.log(this.x, this.y)
        // 根据勾股定理公式 c^2 = a^2 + b^2求出球员与目标之间的距离
        let distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
        //console.log(distance)
        if (distance > 1) {
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
            //Game.draw(this)
            if (this.v < this.VMax / (1000 / 30) * 5) {
                this.v += this.speed
                //console.log(this.v, this.VMax / (1000 / 30) * 5)
            } else {
                // 体力计时器
                if (!this.physicalTimeOutId) {
                    this.physicalTimeOutId = setTimeout(() => {
                        this.v = this.speed
                        this.physicalTimeOutId = null
                    }, this.inMaxSpeedKeepSecends * 1000)
                }
            }
        } else {
            this.v = this.speed
        }

    }

    updata(targetX, targetY) {
        this.targetX = targetX
        this.targetY = targetY
    }

}