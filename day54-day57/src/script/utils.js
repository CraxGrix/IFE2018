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



}