/**
 *  TODO:
 *  设置参数可视化面板以便于调节更加真实的参数
 *  可将球场正中心设为直角座标系的原点，然后减去数值进行实际的坐标。
 *  那么原点的坐标则为球场长度与宽度各除于2得出原点坐标(262.5, 170)，则球场的范围在(50, 50) (575, 50) (50, 390), (575, 390)这四个坐标之内。
 *  则球场的第一象限范围在(262.5, 50)~(575, 220)，第二象限范围在(50, 50)~(262.5, 220)之内,第三象限范围在(50, 220)~(262.5, 390)之内,第四象限范围在(262.5, 170)~(575, 390)之内
 *  这样就把球场还原为整个平面直角座标系
 */
export default class Footballer {
    constructor(x, y, VNum, explosiveNum, physical, power, technology, name) {
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
        // this.VMax * 5 / (1000 / 30)此为每帧所奔跑的最大速度
        // toMaxSpeedSecends * 1000 / (1000 / 30) 
        // this.v 为每帧所递增的速度
        /**
         * 首先假设技术为1时，差值达到最大，即期望值的百分之五十。技术为99时，差值为期望值的百分之五。平均值则为期望值，超出期望值的数据则以期望值减去超出的差值。
         * 方差应为实际角度值的技术半分比。
         */
        this.v = (this.VMax * 5 / (1000 / 30)) / (this.toMaxSpeedSecends * 1000 / (1000 / 30))
        this.speed = this.v
        // 此为差值百分比
        this.technology = (50 - (technology - 1) * (45 / 98)) / 100
        this.power = 5 + (power - 1) * (45 / 98)
        this.powerletiance = this.power * this.technology
        //this.angleletiance = 
    }
    /** 
     * 每个球员的run方法接受一个目的地座标的数组，通过球员各项身体数值的计算得出下一帧球员应该出现的位置
     * @param {Array} 目的地座标数组
     */
    run(Game) {
        console.log(this.v)

        this.targetX = Game.ball.x
        this.targetY = Game.ball.y
        //let targetArr = Game.ball.calculationTrack()
        //console.log(targetArr)

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
            if (this.v < this.VMax * 5 / (1000 / 30)) {
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

    randomNormalDistribution() {
        let u = 0.0,
            v = 0.0,
            w = 0.0,
            c = 0.0
        do {
            u = Math.random() * 2 - 1.0
            v = Math.random() * 2 - 1.0
            w = u * u + v * v
        } while (w == 0.0 || w >= 1.0) {
            c = Math.sqrt((-2 * Math.log(w)) / w)
        }
        return u * c
    }
    /**
     * 
     * @param {Number} expectedValue 运动员的期望值
     * @param {Number} std_dev 方差
     */
    getNumberInNormalDistribution(expectedValue, std_dev) {
        return expectedValue + (this.randomNormalDistribution() * std_dev)
    }

    kick(Game) {
        let x1 = this.x
        let y1 = this.y
        let x2 = 575
        let y2 = 220
        /** 
        let x = x1 > x2 ? x1 - x2 : x2 - x1
        let y = y1 > y2 ? y1 - y2 : y2 - y1
        let angle = Math.round(Math.atan2(y, x) / (Math.PI / 180))
        */
        let angle = this.getAngle({
            x: x1,
            y: y1
        }, {
            x: x2,
            y: y2
        })
        let angleletiance = this.technology * 90
        let actualAngle = Math.round(this.getNumberInNormalDistribution(angle, angleletiance)) + angleletiance
        
        let A = Window.utils.coordinateTransformation(x1, y1)
        let B = Window.utils.coordinateTransformation(x2, y2)
        console.log(A, B)
        angle = Window.utils.calculatingAngle(A, B)
        console.log(angle)
        /**
         * 
         * 接下来可以根据座标系旋转变换公式
         * 
         * 逆时针:
         * x3 = (x2 - x1) * Math.cos((Math.PI / 180 * angle)) - (y2 - y1) * Math.sin(Math.PI / 180 * angle) + x1
         * y3 = (x2 - x1) * Math.sin((Math.PI / 180 * angle)) + (y2 - y1) * Math.cos(Math.PI / 180 * angle) + y1
         * 顺时针
         * x3 = 
         * 得出偏差值过后旋转变换的期望座标，然后往这个方向以偏差过后的期望速度进行移动并加上速度衰减公式。 
         */
        //x = (x2 * Math.cos((Math.PI / 180 * 6))) - ((y2 * Math.sin(Math.PI / 180 * 6)))
        //y = (y2 * Math.cos((Math.PI / 180 * 6))) + ((x2 * Math.sin(Math.PI / 180 * 6)))
        //x = (x2 - x1) * Math.cos((Math.PI / 180 * 6)) - (y2 - y1) * Math.sin(Math.PI / 180 * 6) + x1
        //y = (x2 - x1) * Math.sin((Math.PI / 180 * 6)) + (y2 - y1) * Math.cos(Math.PI / 180 * 6) + y1
        //console.log(x, y)
    }

    getAngle(A, B) {
        let x1 = A.x;
        let y1 = A.y;
        let x2 = B.x;
        let y2 = B.y;

        let a = Math.abs(x1 - x2);
        let b = Math.abs(y1 - y2);

        if (a === 0 || b === 0) {
            throw new Error('该两点相交的直线无法与水平轴或垂直轴构成三角形');
        }

        let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        let randianToAngle = function (scale) {
            let radian = Math.acos(scale);

            let angle = 180 / Math.PI * radian;

            return Math.round(angle);
        }

        let angleA = randianToAngle(b / c);
        let angleB = randianToAngle(a / c);

        return {
            A: angleA,
            B: angleB,
            C: 90
        }
    }


}