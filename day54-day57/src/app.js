import Court from './script/Court'
import Footballer from './script/Footballer'
import Ball from './script/Ball'

const log = console.log.bind(console)
// TODO 移动至Utils类
const COURSESPECIFICATION = {
    site: {
        type: 'site',
        fillStyle: 'green',
        size: [0, 0, 700, 550],
    },
    wh: {
        size: [50, 50, 105 * 5, 68 * 5],
        type: 'rectangular',
    },
    leftHalf: {
        type: 'rectangular',
        size: [50, 50, 262.5, 340],
    },
    topLeftCornerFlagArc: {
        type: 'circle',
        size: [50, 50, 5, 0.5 * Math.PI, 2 * Math.PI, true],
    },
    leftPenaltyArc: {
        type: 'circle',
        size: [105, 220, 45.75, 0.3 * Math.PI, 1.7 * Math.PI, true],
    },
    bottomLeftCornerFlagArc: {
        type: 'circle',
        size: [50, 390, 5, 1.5 * Math.PI, 0 * Math.PI, false],
    },
    leftPenaltyArea: {
        type: 'rectangular',
        size: [50, 119.25, 82.5, 201.5],
    },
    leftGoal: {
        type: 'rectangular',
        size: [38, 201.75, 2.4 * 5, 7.3 * 5],
    },
    leftGoalMouth: {
        type: 'rectangular',
        size: [50, 174.25, 27.5, 91.5],
    },
    topRightCornerFlagArc: {
        type: 'circle',
        size: [575, 50, 5, 0.5 * Math.PI, 1 * Math.PI, false],
    },
    rightPenaltyArc: {
        type: 'circle',
        size: [520, 220, 45.75, 1.3 * Math.PI, 0.7 * Math.PI, true],
    },
    bottomRightCornerFlagArc: {
        type: 'circle',
        size: [575, 390, 5, 1.5 * Math.PI, 1 * Math.PI, true],
    },
    rightPenaltyArea: {
        type: 'rectangular',
        size: [492.5, 119.25, 82.5, 201.5],
    },
    rightGoal: {
        type: 'rectangular',
        size: [575, 201.75, 2.4 * 5, 7.3 * 5]
    },
    rightGoalMouth: {
        type: 'rectangular',
        size: [547.5, 174.25, 27.5, 91.5],
    },
    kickoffCircle: {
        type: 'circle',
        size: [312.5, 221.25, 45.75, 0.5 * Math.PI, 2.5 * Math.PI, false],
    },
}




class Game {
    constructor() {
        this.canvas = document.getElementById("canvas-bg")
        this.context = this.canvas.getContext("2d")
        // 高分屏Canvas显示优化 TODO 移动至Utils类
        this.ratio = (window.devicePixelRatio || 1) / (this.context.backingStorePixelRatio ||
            this.context.webkitBackingStorePixelRatio ||
            this.context.mozBackingStorePixelRatio ||
            this.context.msBackingStorePixelRatio ||
            this.context.oBackingStorePixelRatio ||
            this.context.backingStorePixelRatio || 1)
        this.canvas.style.width = this.canvas.width + 'px'
        this.canvas.style.height = this.canvas.height + 'px'
        this.canvas.width = this.canvas.width * this.ratio
        this.canvas.height = this.canvas.height * this.ratio
        this.context.scale(this.ratio, this.ratio)
        this.drawStrategies = (function (context) {
            return {
                'site': function (obj) {
                    context.fillStyle = obj.fillStyle
                    context.fillRect(...obj.size)
                },
                'rectangular': function (obj) {
                    context.strokeStyle = 'white'
                    context.lineWidth = 2
                    context.strokeRect(...obj.size)
                },
                'circle': function (obj) {
                    context.strokeStyle = 'white'
                    context.lineWidth = 2
                    context.beginPath()
                    context.arc(...obj.size)
                    context.stroke()
                    context.closePath()
                },
                'solid': function (obj) {
                    context.beginPath()
                    context.fillStyle = 'red'
                    //console.log(obj.x)
                    context.arc(obj.x, obj.y, 7, 0, 2 * Math.PI)
                    context.fill()
                    context.closePath()
                },
                'ball': function (obj) {
                    context.beginPath()
                    context.fillStyle = 'white'
                    context.arc(obj.x, obj.y, 4, 0, 2 * Math.PI)
                    context.fill()
                    context.closePath()
                }
            }
        })(this.context)
    }

    draw(obj) {
        this.drawStrategies[obj.type](obj)
    }
    
    clear() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

}

let g = new Game()
// TODO 将这个绘制球场的循环放进Court类里面
for (let i in COURSESPECIFICATION) {
    g.draw(COURSESPECIFICATION[i])
}

let man = new Footballer(100, 100, 50, 50, 50, 'bob')
let ball = new Ball(200, 250)
g.ball = ball

let myCanvas = document.getElementById("canvas-bg")
myCanvas.addEventListener("click", event => {
    g.ball.updata(event.offsetX, event.offsetY)
    
})

setInterval(() => {
    g.clear()
    for (let i in COURSESPECIFICATION) {
        g.draw(COURSESPECIFICATION[i])
    }
    man.run(g)
    g.ball.move()
    g.draw(man)
    g.draw(ball)
    
    
}, 1000/30)






