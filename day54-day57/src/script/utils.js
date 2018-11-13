export default class Utils {
    constructor() {
    }
    /**
     * 将网页坐标系转换为平面直角坐标系
     * @param {Number} x 网页坐标系的x坐标 
     * @param {Number} y 网页坐标系的y坐标
     * @return {Object} 一个包含转换为平面直角坐标系坐标的对象
     */
    coordinateTransformation(x, y) {
        if (x >= 50 && x <= 575 && y >= 50 && y <= 390) {
            x = x - 312.5
            y = 220 - y
        } else {
            throw new Error("坐标" + x +"," + y + "已超出球场实际范围，无法转换为平面直角坐标")
        }
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
     * 440 = 100 + x + 
     */
    coordinateReduction (x, y) {
        if (x <= 262.5 && x >= -262.5 && y <= 170 && y >= -170) {
            x = x < 0 ? 312.5 + x : x + 262.5 + 50 
            y = y > 0 ? 220 - y : Math.abs(y) + 220
        }  else {
            throw new Error("坐标" + x + "," + y + "已超出球场实际范围，无法还原为网页坐标")
        }
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
    calculatingAngle (A, B) {
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

    
    rotationCoordinates (A, B, angle) {
        let x1 = A.x
        let y1 = A.y
        let x2 = B.x
        let y2 = B.y
        //angle = 
        angle = angle * Math.PI / 180
        console.log(angle)
        let x3 = angle > 0 ? (x2 - x1) * Math.cos(Math.abs(angle)) + (y2 - y1) * Math.sin(Math.abs(angle)) + x1 : (x2 - x1) * Math.cos(Math.abs(angle)) - (y2 - y1)  * Math.sin(Math.abs(angle)) + x1 
        let y3 = angle > 0 ? (x2 - x1) * Math.cos(Math.abs(angle)) - (y2 - y1) * Math.sin(Math.abs(angle)) + y1 : (x2 - x1) * Math.cos(Math.abs(angle)) + (y2 - y1)  * Math.sin(Math.abs(angle)) + y1
        console.log(x3, y3)
        return [x3, y3]
    }


}