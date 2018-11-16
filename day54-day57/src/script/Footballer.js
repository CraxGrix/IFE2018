import Ball from "./Ball";

/**
 *  TODO:
 *  设置参数可视化面板以便于调节更加真实的参数
 *  可将球场正中心设为直角座标系的原点，然后减去数值进行实际的坐标。
 *  那么原点的坐标则为球场长度与宽度各除于2得出原点坐标(262.5, 170)，则球场的范围在(50, 50) (575, 50) (50, 390), (575, 390)这四个坐标之内。
 *  则球场的第一象限范围在(262.5, 50)~(575, 220)，第二象限范围在(50, 50)~(262.5, 220)之内,第三象限范围在(50, 220)~(262.5, 390)之内,第四象限范围在(262.5, 170)~(575, 390)之内
 *  这样就把球场还原为整个平面直角座标系.
 *  关于正态分布的方差该如何设置？假设点o与期望值a的角度为x，则方差=x*方差百分比
 *  直角坐标系中，如果想让两点按角度旋转的话应平移至原点后再进行旋转。
 */
export default class Footballer {
    constructor(x, y, VNum, explosiveNum, physical, power, technology, name) {
        this.log = 0
        // 影响因子
        this.b = 1
        // 偏移量
        this.c = 0
        this.x = x
        this.y = y
        this.type = 'solid'
        this.status = true
        this.name = name
        this.VMax = 3 + (VNum - 1) * (9 / 98) //7.5
        this.toMaxSpeedSecends = 4 - (explosiveNum - 1) * (3 / 98) //2.5s
        this.inMaxSpeedKeepSecends = 10 + (physical - 1) * (5 / 98)
        //console.log(this.VMax, this.toMaxSpeedSecends)
        // 此为运动员加速时每三十分之一秒所移动的像素距离
        // this.VMax * 5 / (1000 / 30)此为每帧所奔跑的最大速度
        // toMaxSpeedSecends * 1000 / (1000 / 30) 
        // this.v 为每帧所递增的速度
        /**
         * 首先假设技术为1时，差值达到最大，即期望值的百分之30。技术为99时，差值为期望值的百分之五。平均值则为期望值，超出期望值的数据则以期望值减去超出的差值。
         * 方差应为实际角度值的技术半分比。
         */
        this.v = (this.VMax * 5 / (1000 / 30)) / (this.toMaxSpeedSecends * 1000 / (1000 / 30))
        this.speed = this.v
        // 此为差值百分比
        this.technology = technology
        this.rateDifference = (30 - (this.technology - 1) * (25 / 98)) / 100
        this.power = 5 + (power - 1) * (45 / 98)
        this.powerletiance = this.power * this.rateDifference
        
    }
    /** 
     * 每个球员的run方法接受一个目的地座标的数组，通过球员各项身体数值的计算得出下一帧球员应该出现的位置
     * @param {Array} 目的地座标数组
     */
    run(Game) {
        //console.log(this.v)

        this.targetX = Game.ball.x 
        this.targetY = Game.ball.y
        //let targetArr = Game.ball.calculationTrack()
        //console.log(targetArr)

        //console.log(this.x, this.y)
        // 根据勾股定理公式 c^2 = a^2 + b^2求出球员与目标之间的距离
        // TODO 移动 这个功能应抽象出来
        let distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
        console.log(distance)
        //
        //console.log(distance, this.log)
        if (distance > 12.5) {
            //this.status = true
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
            if (this.v < this.VMax * 5 / (1000 / 30)) {
                this.log++
                this.v += this.speed
                //console.log(this.log)
                //console.log(this.v, this.VMax / (1000 / 30) * 5)
            } else {
                //console.log(Math.sqrt(Math.pow(100 - this.x, 2) + Math.pow(100 - this.y, 2)), "起点距离")
                // 体力计时器
                // TODO Fix Bug 真实化体力耗尽所表现出来的现象 
                if (!this.physicalTimeOutId) {
                    this.physicalTimeOutId = setTimeout(() => {
                        this.v = this.speed
                        this.physicalTimeOutId = null
                    }, this.inMaxSpeedKeepSecends * 1000)
                }
            }
        } else if(this.status) {
            this.kick(Game, Window.utils.randomCoordinateGeneration())
            this.status = false
            //Game.ball.capture = true
            this.v = this.speed
        }

    }

    updata(targetX, targetY) {
        this.targetX = targetX
        this.targetY = targetY
    }

    // 可以将踢球的行为简化为，根据球员的位置来计算最后给予的足球速度和目标位置。
    // 静止地踢运动的球，可以直接拿ball的target坐标和球员的当前坐标来计算期望方向的夹角。如果球的target坐标和它的当前坐标相差为0的话则判断球的状态是
    // 静止的。抑或是增加一个布尔值来表示足球的状态。
    kick(Game, coordinate) {
        let x1 = this.x
        let y1 = this.y
        let x2 = Game.ball.x
        let y2 = Game.ball.y
        let A = Window.utils.coordinateTransformation(x1, y1)
        let B = Window.utils.coordinateTransformation(x2, y2)
        let C = Window.utils.coordinateTransformation(Game.ball.x, Game.ball.y)
        let D = Window.utils.coordinateTransformation(coordinate.x, coordinate.y)
        // 判断球员是否在移动和足球是否静止
        // XXX: 可以直接使用对象的状态来进行判断
        if (this.status && Game.ball.status) {
            let angle = Window.utils.calculatingAngleVector(A, B, C)
            this.b = 1 + 1 / 180 * angle
            angle = Window.utils.calculatingAngleVector(A, B, D)
            let std_dev = 0.01 +　(this.technology - 1) * (0.3 / 98)
            let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
            this.c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)        
        }
        else if (this.status && !Game.ball.status) {
            let angle = Window.utils.calculatingAngleVector(A, B, C)
            this.b = 1 + 1 / 180 * angle
            // XXX: 可以直接使用对象的状态来进行判断
        } else if (!this.status && Game.ball.status) {
            // 调用向量计算角度的函数 传入的参数为 球员期望坐标 球员当前坐标 足球期望坐标
            let angle = Window.utils.calculatingAngleVector(A, B, D)
            // 偏移量c最大值为30度 当角度达到90度时为最大，首先用90对角度取余，然后用余数乘 最大偏移量/90 得到的系数算出实际偏移量。
            // 假设技术值为1时 方差为0.3 技术为99时 方差为0.01
            let std_dev = 0.01 +　(this.technology - 1) * (0.3 / 98)
            let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
            this.c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)
        }
        let angle = Window.utils.calculatingAngle(A, B)
        let angleletiance = this.rateDifference * angle * this.b + this.c
        let actualAngle = Math.round(Window.utils.getNumberInNormalDistribution(angle, angleletiance)) - angle
        let [x, y] = Window.utils.coordinateReduction(...Window.utils.rotationCoordinates(A, D, actualAngle))
        console.log(x, y)
        Game.ball.updata(x, y, this.power * 5 / 30)
        // TODO 重置相关系数
    }

}