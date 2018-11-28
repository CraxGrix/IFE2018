export default class Utils {
    constructor() {}
    /**
     * 将网页坐标系转换为平面直角坐标系
     * @param {Number} x 网页坐标系的x坐标 
     * @param {Number} y 网页坐标系的y坐标
     * @return {Object} 一个包含转换为平面直角坐标系坐标的对象
     */
    coordinateTransformation(x, y) {
        x = x - 312.5
        y = 220 - y
        /** 
        if (x >= 50 && x <= 575 && y >= 50 && y <= 390) {
            x = x - 312.5
            y = 220 - y
        } else {
            throw new Error("坐标" + x + "," + y + "已超出球场实际范围，无法转换为平面直角坐标")
        }
        */
        return {
            x,
            y,
        }
    }

    /**
     * 将平面直角坐标系转换为网页直角坐标系
     * @param {Number} x 平面直角坐标系的x坐标
     * @param {Number} y 平面直角坐标系的y坐标
     * @return {Object} 一个包含转换为网页坐标系坐标的对象
     */
    coordinateReduction(x, y) {
        x = x < 0 ? 312.5 + x : x + 262.5 + 50
        y = y > 0 ? 220 - y : Math.abs(y) + 220
        /** 
        if (x <= 262.5 && x >= -262.5 && y <= 170 && y >= -170) {
            x = x < 0 ? 312.5 + x : x + 262.5 + 50
            y = y > 0 ? 220 - y : Math.abs(y) + 220
        } else {
            throw new Error("坐标" + x + "," + y + "已超出球场实际范围，无法还原为网页坐标")
        }
        */
        return [
            x,
            y,
        ]
    }

    /**
     * 计算两点之间的角度
     * @param {Object} A A点的平面直角坐标系坐标
     * @param {Object} B B点的平面直角坐标系坐标
     * @return {Number} 返回角度数值，正数则为顺时针旋转，负数则为逆时针旋转。
     * 假设x1 为0，0
     * 如果x2.x < x1.x and x2.y > x1.y, 角度
     * 如果x2.x < x1.x and x2.y < x1.y, 90-角度
     * 如果x2.x > x1.x and x2.y < x1.y, 角度
     * 如果x2.x > x1.x and x2.y > x1.y, 90-角度
     */
    calculatingAngle(A, B) {
        let x1 = A.x
        let y1 = A.y
        let x2 = B.x
        let y2 = B.y
        let x = (x1 > x2) ? x1 - x2 : x2 - x1
        let y = (y1 > y2) ? y1 - y2 : y2 - y1
        let angle = Math.round(Math.atan2(y, x) / (Math.PI / 180))
        angle = (x2 < x1 && y2 < y1) || (x2 > x1 && y2 > y1) ? 90 - angle : angle
        return angle
    }

    /**
     * 根据向量来求出三点夹角的角度
     * @param {Object} A A点的平面直角坐标系坐标对象
     * @param {Object} B B点的平面直角坐标系坐标对象
     * @param {Object} C C点的平面直角坐标系坐标对象
     * @return {Number} 角度值
     * 公式如下：
     * AB=(b.x-a.x, b.y-a.y) 
     * AC=(c.x-a.x, c.y-a.y)
     * cosA = (AB*AC)/(|AB|*|AC|)
     */
    calculatingAngleVector(A, B, C) {
        let AB = (B.x - A.x, B.y - A.y),
            AC = (C.x - A.x, C.y - A.y),
            cos = (AB * AC) / (Math.abs(AB) * Math.abs(AC))
        return cos
    }

    /**
     * 接受两个含有两点坐标的对象，返回点B根据点A进行angle值旋转后的坐标
     * @param {Object} A 原点坐标对象
     * @param {Object} B B点坐标对象
     * @param {Number} angle 角度值，以度为单位
     * @return {Array} 旋转过后的x, y坐标，可直接解构赋值
     */
    rotationCoordinates(A, B, angle) {
        let x1 = A.x,
            y1 = A.y,
            x2 = B.x,
            y2 = B.y,
            radians = angle * (Math.PI / 180),
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x2 - x1)) + (sin * (y2 - y1)) + x1,
            ny = (cos * (y2 - y1)) - (sin * (x2 - x1)) + y1
        return [nx, ny]
    }
    /**
     * 计算正态分布随机数
     * @return {Number} 返回一个在1-0之间符合正态分布规律的随机数
     */
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
     * @param {Number} expectedValue 运动员的期望值
     * @param {Number} std_dev 方差
     * @return {Number} 返回一个符合正态分布规律的角度值
     */
    getNumberInNormalDistribution(expectedValue, std_dev) {
        return expectedValue + (this.randomNormalDistribution() * std_dev)
    }

    /**
     * 生成随机的网页坐标
     * @return {Object} 坐标对象
     */
    randomCoordinateGeneration() {
        let x = Math.random() * (575 - 50) + 50,
            y = Math.random() * (390 - 50) + 50
        return {
            x: x,
            y: y,
        }
    }
    /**
     * 获取运动员的运动路径坐标
     * @param {Object} Footballer 运动员对象
     * @returns {Array} 包含运动员网页坐标x, y,帧数timer的二维数组
     */
    _getMotionPath(Footballer) {
        // TODO FIX 未考虑运动员体力因素
        let targetX = Footballer.targetX,
            targetY = Footballer.targetY,
            x = Footballer.x,
            y = Footballer.y,
            distance = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2)),
            pathArray = new Array(),
            timer = 0
        while (distance > 12.5) {
            pathArray.push([x, y, timer])
            let deg = Math.atan2(targetY - y, targetX - x),
                sin = Math.sin(deg),
                cos = Math.cos(deg),
                vx = Footballer.VMax * 5 / (1000 / 30) * cos,
                vy = Footballer.VMax * 5 / (1000 / 30) * sin
            timer++
            x += vx
            y += vy
            distance = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2))
        }
        return pathArray
    }

    /**
     * 根据运动员的行进轨迹预判足球落点
     * @param {Object} Footballer 运动员对象
     * @param {Object} Ball 足球对象
     * @returns {Array} 足球落点的网页坐标数组，包含x, y, timer
     */
    getPredictedCoordinates(Footballer, Ball) {
        let pathArray = this._getMotionPath(Footballer)
        console.log(pathArray)
            pathArray.map((value, index, array) => {
                let speed = Footballer.power * 5 / 30,
                    c1 = {
                        x: Ball.x,
                        y: Ball.y
                    },
                    c2 = {
                      x: value[0],
                      y: value[1]  
                    }
                for (let i = 0; i < value[2]; i++) {
                    let vx, vy = this.getMovementAmount(c1, c2, speed)
                    c1.x += vx
                    c1.y += vy
                    speed = speed - speed * 0.02
                }
                return c1
            }).findIndex((element, index, array) => {
                let c2 = {
                    x: pathArray[index][0],
                    y: pathArray[index][1]
                }
                return Window.Utils.getDistance(c1, c2) < 12.5 ? true : false
            })
    }
    /**
     * 获取两点之间的距离
     * @param {Object} c1 坐标对象
     * @param {Object} c2 坐标对象
     * @returns {Number} 距离数值
     */
    getDistance(c1,c2) {
        return Math.sqrt(Math.pow(c2.x-c1.x, 2) + Math.pow(c2.y - c1.y, 2))
    }
    /**
     * 获取每帧移动的网页坐标常量
     * @param {Object} c1 坐标对象 
     * @param {Object} c2 坐标对象
     * @param {Number} v 速度
     * @returns {Number} 两个轴的坐标运动常量
     */
    getMovementAmount(c1, c2, v) {
        let x1 = c1.x,
            y1 = c1.y,
            x2 = c2.x,
            y2 = c2.y,
            deg = Math.atan2(y2 - y1, x2 - x1),
            sin = Math.sin(deg),
            cos = Math.cos(deg),
            vx = v * cos,
            vy = v * sin

        return [vx, vy]  

    }
       /**
     * 获取两点之间的sin和cos值
     * @param {Object} c1 坐标对象
     * @param {Object} c2 坐标对象
     * @returns 包含sin和cos的数组
     */
    getSinAndCos(c1, c2) {
        let x1 = c1.x,
            y1 = c1.y,
            x2 = c2.x,
            y2 = c2.y,
            deg = Math.atan2(y2 - y1, x2 - x1),
            sin = Math.sin(deg),
            cos = Math.cos(deg)
        return [sin, cos]
    }
    /**
     * 获取状态的字符简称
     * @param {Object} Footballer 运动员对象
     * @param {Object} Ball 足球对象
     * @returns 字符简称
     */
    getStatus(Footballer, Ball) {
        let s1 = Footballer.status
        let s2 = Ball.status
        let str = s1 && s2 ? "RAR" : s1 && !s2 ? "RAS" : !s1 && s2 ? "SAR" : "SAS"
        return str
    }


    


}