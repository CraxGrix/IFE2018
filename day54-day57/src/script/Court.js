export default class Court {
    constructor(config) {
        
        this.config = config || {
            size: [0, 0, 700, 550],
            type: 'site',
            fillStyle: 'green',
            strokeStyle: 'white',
            lineWidth: 2,
        }
    }
    /** 
    drawCourt() {
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
    */
}