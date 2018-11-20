export default class KickBall {
    constructor() {}

    killBall(target) {
        // 踢球可以理解为 计算差值过后传递实际要到达的坐标给ball，让ball进行移动。
        let x1 = this.Footballer.x
        let y1 = this.Footballer.y
        let x2 = this.Ball.x
        let y2 = this.Ball.y
        let A = Window.utils.coordinateTransformation(x1, y1)
        let B = Window.utils.coordinateTransformation(x2, y2)
        let C = Window.utils.coordinateTransformation(this.Ball.targetX, this.Ball.targetY)
        let D = Window.utils.coordinateTransformation(target.x, target.y)
        // 判断球员是否在移动和足球是否静止
        // XXX: 可以直接使用对象的状态来进行判断
        if (this.Footballer.status && this.Ball.status) {
            let angle = Window.utils.calculatingAngleVector(A, B, C)
            this.Footballer.b = 1 + 1 / 180 * angle
            angle = Window.utils.calculatingAngleVector(A, B, D)
            let std_dev = 0.01 + (this.Footballer.technology - 1) * (0.3 / 98)
            let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
            this.Footballer.c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)
        } else if (this.Footballer.status && !this.Ball.status) {
            let angle = Window.utils.calculatingAngleVector(A, B, C)
            this.Footballer.b = 1 + 1 / 180 * angle
            // XXX: 可以直接使用对象的状态来进行判断
        } else if (!this.Footballer.status && this.Ball.status) {
            // 调用向量计算角度的函数 传入的参数为 球员期望坐标 球员当前坐标 足球期望坐标
            let angle = Window.utils.calculatingAngleVector(A, B, D)
            // 偏移量c最大值为30度 当角度达到90度时为最大，首先用90对角度取余，然后用余数乘 最大偏移量/90 得到的系数算出实际偏移量。
            // 假设技术值为1时 方差为0.3 技术为99时 方差为0.01
            let std_dev = 0.01 + (this.technology - 1) * (0.3 / 98)
            let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
            this.Footballer.c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)
        }

        let angle = Window.utils.calculatingAngle(A, B)
        let angleletiance = this.Footballer.rateDifference * angle * this.Footballer.b + this.Footballer.c
        let actualAngle = Math.round(Window.utils.getNumberInNormalDistribution(angle, angleletiance)) - angle
        let [x, y] = Window.utils.coordinateReduction(...Window.utils.rotationCoordinates(A, D, actualAngle))
        this.Ball.updata(x, y, this.Footballer.power * 5 / 30)
    }

}

class Stopping extends KickBall {
    constructor(Game, Ball, Footballer) {
        super()
        this.Game = Game
        this.Ball = Ball
        this.Footballer = Footballer
    }

    stoppingBall() {
        if (this.Ball.status && !this.Footballer.status) {
            this.Ball.updata(this.Ball.x, this.Ball.y, this.Footballer.power * 5 / 30)
        } else if (this.Ball.status && this.Footballer.status) {
            let deg = Math.atan2(this.Footballer.targetY - this.Footballer.y, this.Footballer.targetX - this.Footballer.x)
            let sin = Math.sin(deg)
            let cos = Math.cos(deg)
            let vx = this.Footballer.v * cos * 30 + this.Footballer.x
            let vy = this.Footballer.v * sin * 30 + this.Footballer.y
            let distance = Math.sqrt(Math.pow(vx - this.Footballer.x, 2) + Math.pow(vy - this.Footballer.y, 2))
            vx = distance > this.Footballer.distance ? this.Footballer.targetX : vx
            vy = distance > this.Footballer.distance ? this.Footballer.targetY : vy
            super.killBall({
                x: vx,
                y: vy
            })
        }
    }
}

class PassBall extends KickBall {
    constructor(Game, Ball, Footballer) {
        super()
        this.Game = Game
        this.Ball = Ball
        this.Footballer = Footballer
    }
    
    passBall(otherFootballer) {
        if (!otherFootballer.status) {
            super.killBall(otherFootballer)
        } else {
            // TODO 追及相遇问题
        }
    }
}