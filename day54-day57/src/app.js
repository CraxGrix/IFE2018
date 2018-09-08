import Court from './script/Court'
import Footballer from './script/Footballer'

const log = console.log.bind(console)
const COURSESPECIFICATION = {
    wh: {
        size: [50, 50, 105 * 5, 68 * 5],
        type: 'rectangular',
    },
    leftHalf: {
        type: 'rectangular',
    }[50, 50, 262.5, 340],
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
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext("2d")
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
        this.drawStrategies = {
            'site': function(obj) {
                console.log(this.context)
                // TODO FIX this指向可能出错
                this.context.fillStyle = obj.config.fillStyle
                this.context.strokeStyle = obj.config.strokeStyle
                this.context.fillRect(...obj.config.size)
            },
            'rectangular': function(obj) {
                this.context.strokeStyle = 'white'
                this.context.lineWidth = 2
                this.context.strokeRect(...obj.size)
            },
            'circle': function(obj) {
                this.context.strokeStyle = 'white'
                this.context.lineWidth = 2
                this.context.beginPath()
                this.context.arc(...obj.size)
                this.context.stroke()
                this.context.closePath()
            },
            'solid': function(obj) {
                this.context.fillStyle = obj.config.fillStyle
                this.context.beginPath()
                this.context.arc(...obj.config.size)
                this.context.fill()
                this.context.closePath()
            }
        }
    }
    
    draw(obj) {
        this.drawStrategies[obj.config.type](obj)
    }

}

let g = new Game()
let court = new Court()
g.draw(court)
for(let i in COURSESPECIFICATION) {
    g.draw(COURSESPECIFICATION[i])
}

//let court = new Court(ctx, COURSESPECIFICATION, ratio)
//court.drawCourt()
//let man = new Footballer(100, 100, 50)

/** 
myCanvas.addEventListener("click", event => {
    man.run(ctx, [event.offsetX, event.offsetY])
})
*/
