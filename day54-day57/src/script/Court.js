export default class Court {
    constructor(ctx, config, ratio) {
        this.ctx = ctx
        this.ratio = ratio
        this.config = config
        this.ctx.fillStyle = 'green'
        this.ctx.strokeStyle = "white"
        this.ctx.lineWidth = 2
    }
    drawCourt() {
        this.ctx.scale(this.ratio, this.ratio)
        this.ctx.fillRect(0, 0, 700, 550)
        for (let i in this.config) {
            if (this.config[i].length === 4) {
                this.ctx.strokeRect(...this.config[i])
            } else if (this.config[i].length === 6) {
                this.ctx.beginPath()
                this.ctx.arc(...this.config[i])
                this.ctx.stroke()
            }
        }
    }
}