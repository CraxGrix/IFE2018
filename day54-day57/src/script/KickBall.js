import { throws } from "assert";
export class KickBall {
    constructor(Game, Ball, Footballer) {
        this.Game = Game
        this.Ball = Ball
        this.Footballer = Footballer
    }

    killBall(target=null) {
        // 踢球可以理解为 计算差值过后传递实际要到达的坐标给ball，让ball进行移动。
        let x1 = this.Footballer.x
        let y1 = this.Footballer.y
        let x2 = this.Ball.x
        let y2 = this.Ball.y
        let A = Window.utils.coordinateTransformation(x1, y1)
        let B = Window.utils.coordinateTransformation(x2, y2)
        let C = Window.utils.coordinateTransformation(this.Ball.targetX, this.Ball.targetY)
        let D = this.Footballer.kx ? Window.utils.coordinateTransformation(this.Footballer.kx, this.Footballer.ky) : target ?  Window.utils.coordinateTransformation(target.x, target.y) : null
        if (D === null) {
            throw new Error("足球落点数值异常")
        }
        // 判断球员是否在移动和足球是否静止
        // XXX: 可以直接使用对象的状态来进行判断
        if (this.Footballer.status && this.Ball.status) {
            console.log("11")
            let angle = Window.utils.calculatingAngleVector(A, B, C)
            this.Footballer.b = 1 + 1 / 180 * angle
            angle = Window.utils.calculatingAngleVector(A, B, D)
            let std_dev = 0.01 + (this.Footballer.technology - 1) * (0.3 / 98)
            let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
            this.Footballer.c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)
        } else if (this.Footballer.status && !this.Ball.status) {
            console.log("22")

            let angle = Window.utils.calculatingAngleVector(A, B, D)
            this.Footballer.b = 1 + 1 / 180 * angle
            // XXX: 可以直接使用对象的状态来进行判断
        } else if (!this.Footballer.status && this.Ball.status) {
            console.log("33")

            // 调用向量计算角度的函数 传入的参数为 球员期望坐标 球员当前坐标 足球期望坐标
            let angle = Window.utils.calculatingAngleVector(A, B, C)
            // 偏移量c最大值为30度 当角度达到90度时为最大，首先用90对角度取余，然后用余数乘 最大偏移量/90 得到的系数算出实际偏移量。
            // 假设技术值为1时 方差为0.3 技术为99时 方差为0.01
            let std_dev = 0.01 + (this.technology - 1) * (0.3 / 98)
            let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
            this.Footballer.c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)
        }

        let angle = Window.utils.calculatingAngle(A, D)
        let angleletiance = this.Footballer.rateDifference * angle * this.Footballer.b + this.Footballer.c
        let actualAngle = Math.round(Window.utils.getNumberInNormalDistribution(angle, angleletiance)) - angle
        let [x, y] = Window.utils.coordinateReduction(...Window.utils.rotationCoordinates(A, D, actualAngle))
        this.Ball.updata(x, y, this.Footballer.power * 5 / 30)
    }

}

export class Stopping extends KickBall {
    constructor(Game, Ball, Footballer) {
        super(Game, Ball, Footballer)
        this.Game = Game
        this.Ball = Ball
        this.Footballer = Footballer
    }

    stoppingBall() {
        console.log(this.Game, this.Ball, this.Footballer)
        if (this.Ball.status && !this.Footballer.status) {
            this.Ball.updata(this.Ball.x, this.Ball.y, this.Footballer.power * 5 / 30)
        } else {
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

export class PassBall extends KickBall {
    constructor(Game, Ball, Footballer) {
        super()
        this.Game = Game
        this.Ball = Ball
        this.Footballer = Footballer
    }
    
    passBall(otherFootballer, ball) {
        if (!otherFootballer.status) {
            super.killBall(otherFootballer)
        } else {
            console.log(Window.utils.getPredictedCoordinates(otherFootballer, ball))
            super.killBall(Window.utils.getPredictedCoordinates(otherFootballer, ball))
        }
    }
}

/**
 * export default class KickBall {
    constructor() {
        this.strategy = {
            'MAM': (A, B, C, D) => {
                let angle = Window.utils.calculatingAngleVector(A, B, D)
                let b = 1 + 1 / 180 * angle
                angle = Window.utils.calculatingAngleVector(A, B, C)
                // TODO FIX technology数值应为随着调用者的数值
                let std_dev = 0.01 + (window.g.man.technology - 1) * (0.3 / 98)
                let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
                let c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)
                return [b, c]
            },
            "MAS": (A, B, D) => {
                let angle = Window.utils.calculatingAngleVector(A, B, D)
                let b = 1 + 1 / 180 * angle
                return [b]
            },
            "SAM": (A, B, C) => {
                // 调用向量计算角度的函数 传入的参数为 球员期望坐标 球员当前坐标 足球期望坐标
                let angle = Window.utils.calculatingAngleVector(A, B, C)
                // 偏移量c最大值为30度 当角度达到90度时为最大，首先用90对角度取余，然后用余数乘 最大偏移量/90 得到的系数算出实际偏移量。
                // 假设技术值为1时 方差为0.3 技术为99时 方差为0.01
                // TODO FIX technology数值应为随着调用者的数值
                let std_dev = 0.01 + (window.g.man.technology - 1) * (0.3 / 98)
                let offsetCoefficient = Window.utils.getNumberInNormalDistribution(1, std_dev)
                let c = ((angle % 90) * (30 / 90)) * Math.abs(1 - offsetCoefficient)
                return [c]
            },
            "SAS": () => {
                return [1, 0]
            }
        }
    }
    /**
     * 
     * @param {String} status 足球运动员和足球的状态简称
     * @param {Object} A 球员网页坐标对象
     * @param {Object} B 足球落点网页坐标对象
     * @param {Object} C 足球网页坐标对象
     * @param {Object} D 球员运动终点网页坐标对象
     */
    /** 
    killBall(status, A, B, C, D) {
        let C1 = Window.utils.coordinateTransformation(A.x, A.y)
        let C2 = Window.utils.coordinateTransformation(B.x, B.y)
        let C3 = typeof C !== "undefined" ? Window.utils.coordinateTransformation(C.x, C.y) : NaN
        let C4 = typeof D !== "undefined" ? Window.utils.coordinateTransformation(D.x, D.y) : NaN
        let [b = 1, c = 0] = this.strategy[status](C1, C2, C3, C4)
        let angle = Window.utils.calculatingAngle(A, B)
        let angleletiance = this.Footballer.rateDifference * angle * b + c
        let actualAngle = Math.round(Window.utils.getNumberInNormalDistribution(angle, angleletiance)) - angle
        let [x, y] = Window.utils.coordinateReduction(...Window.utils.rotationCoordinates(A, D, actualAngle))
        this.Ball.updata(x, y, this.Footballer.power * 5 / 30)
        this.Footballer.capture = false
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
            // 传入新的足球运动员super.killBall(Window.utils.getPredictedCoordinates())
        }
    }
}
 */