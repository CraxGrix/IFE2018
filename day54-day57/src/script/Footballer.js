export default class Footballer {
    constructor(x, y, runSpeed, config) {
        /**
         * 人类极限奔跑速度约一秒十米
         */
        this.x = x
        this.y = y
        this.config = config || {
            type: 'solid',
            size:[this.x, this.y, 10, 0, 2 * Math.PI],
            fillStyle: 'red'
        }
        this.runSpeed = (runSpeed / 10 * 5) / 60
        this.maxRunSpeed = 3 + (this.runSpeed - 1) * (9 / 98)
    }
    /** 
    init (ctx, location) {
        this.x = location[0]
        this.y = location[1]
        ctx.beginPath()
        ctx.arc(...location, ...this.config.args)
        ctx.fillStyle = this.config.fillStyle
        ctx.fill()
        /**
        ctx.fillStyle = "black"
        ctx.font = '13px 宋体'
        ctx.fillText("9", location[0] - 3.5, location[1] + 4)
        
        ctx.closePath();
    }
    */

    /**
     * 目的地x,y数组
     * @param {Array} coordinate 
     */
    run (ctx, coordinate) {
            if(coordinate[0] > this.x) {
                this.x += this.runSpeed
            } else if(coordinate[0] < this.x) {
                this.x -= this.runSpeed
            }
            if (coordinate[1] > this.y) {
                this.y += this.runSpeed
            } else if (coordinate[1] < this.y) {
                this.y -= this.runSpeed
            }
            ctx.beginPath();
            ctx.arc(this.x, this.y, ...this.config.args)
            ctx.fill()
            ctx.closePath() 
    }
}