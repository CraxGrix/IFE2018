export default class Footballer {
    constructor(x, y, runSpeed, name) {
        /**
         * 人类极限奔跑速度约一秒十米
    */
        this.x = x
        this.y = y
        this.type = 'solid'
        this.name = name
        // 假设人类最高奔跑速度是14米每秒
        this.speed = 14 * (runSpeed / 100) * 5
        // 这个属性为速度除于帧数
        this.runSpeed = 14 * (runSpeed / 100) * 5 / 30
        this.maxRunSpeed = 3 + (this.runSpeed - 1) * (9 / 98)
        this.canvas = document.createElement("canvas")
        this.canvas.id = this.name
        this.context = this.canvas.getContext("2d")
        this.ratio = (window.devicePixelRatio || 1) / (this.context.backingStorePixelRatio ||
            this.context.webkitBackingStorePixelRatio ||
            this.context.mozBackingStorePixelRatio ||
            this.context.msBackingStorePixelRatio ||
            this.context.oBackingStorePixelRatio ||
            this.context.backingStorePixelRatio || 1)
        this.canvas.width = 10 * this.ratio
        this.canvas.height = 10 * this.ratio
        this.canvas.style.width = this.canvas.width + 'px'
        this.canvas.style.height = this.canvas.height + 'px'
        this.context.scale(this.ratio, this.ratio)
        this.context.beginPath()
        this.context.fillStyle = 'red'
        this.context.arc(5, 5, 5, 0, 2 * Math.PI)
        this.context.fill()
        this.context.closePath()
        let site = document.getElementById('canvas-bg')
        this.windowX = site.getBoundingClientRect().left
        this.windowY = site.getBoundingClientRect().top
        this.canvas.style.left = this.windowX + this.x
        this.canvas.style.top = this.windowY + this.y

    }
    /** 
    init (ctx, location) {
        this.x = location[0]
        this.y = location[1]
        ctx.beginPath()
        ctx.arc(...location, ...this.config.args)
        ctx.fillStyle = this.config.fillStyle
        ctx.fill()
        
        ctx.fillStyle = "black"
        ctx.font = '13px 宋体'
        ctx.fillText("9", location[0] - 3.5, location[1] + 4)
        
        ctx.closePath();
    }
    */
    /** 
     * 目的地x,y数组
     * @param 
     */
    run(x, y) {
        // TODO 利用贝赛尔曲线实现特定动画行为
        console.log(x, y, this.x + this.windowX, this.y + this.windowY)
        // 求两点间距离
        let result = Math.sqrt(Math.pow((x - (this.x + this.windowX)), 2) + Math.pow((y - (this.y + this.windowY)), 2));
        let seconds = Math.ceil(result / this.speed)
        this.canvas.style.transform = "all 3s linear 0s"
        this.x = x
        this.y = y
        this.canvas.style.left = this.windowX + this.x
        this.canvas.style.top = this.windowY + this.y

    }
    
}