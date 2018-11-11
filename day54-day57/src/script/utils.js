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
     */
    coordinateReduction (x, y) {
        if (x <= 262.5 && x >= -262.5 && y <= 170 && y >= -170) {
            x = x + 312.5
            y = y + 220
        }  else {
            throw new Error("坐标" + x + "," + y + "已超出球场实际范围，无法还原为网页坐标")
        }
        return {
            x, 
            y,
        }
    }

    /**
     * 计算两点之间的角度
     * @param {Object} A A点的平面直角坐标系坐标
     * @param {Object} B B点的平面直角坐标系坐标
     * @return {Number} 返回角度数值，正数则为顺时针旋转，负数则为逆时针旋转。
     * 只有当A点的x大于B点的x的时候，才需要进行逆时针旋转。逆时针旋转时当B点的y大于a点的y时需要在角度上额外增加90度。顺时针旋转时，当b点的y小于a点的y时需要
     * 在角度上额外增加90度
     */
    calculatingAngle (A, B) {
        let x1 = A.x
        let y1 = A.y
        let x2 = B.x
        let y2 = B.y
        let angle = Math.round(180 / Math.PI * Math.acos((y1 - y2) / Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))))
        
        return angle
    }


}