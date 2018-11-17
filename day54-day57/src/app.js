import Court from './script/Court'
import Footballer from './script/Footballer'
import Ball from './script/Ball'
import Utils from './script/utils'

const log = console.log.bind(console)
Window.utils = new Utils()
let execute,
    key
// TODO 移动至config配置文件当中
const COURSESPECIFICATION = {
    site: {
        // 球场面积换算为像素则为625*440，其余100为绿边。
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
const TEXTARRAY = ['球员在球场中心向球门踢出足球', '球员从小禁区向球场中心踢出足球', '球员从角球区向点球点踢出足球', '球员从大禁区角附近，向球门踢出足球', '球员从本方禁区附近向对方半场边线踢出足球']
/**
 * 球场中心：262.5, 170 右球门：575, 220 右小禁区：560, 220 右上角球区： 567, 57 右点球区：505, 235  右上大禁区角：505, 138 边线:272, 50
 */
const POSITIONCOORDINATES = {
    centerMark: [262.5, 170],
    leftGoalPost: [575, 220],
    leftGoalArea: [560, 220],
    leftCornerArc: [567, 57],
    leftPenaltyMark: [505, 235],
    leftPenaltyAreaAngle: [505, 138],
    sideLine: [272, 50]
}

const POLICYARRAY = [
    [POSITIONCOORDINATES.centerMark, POSITIONCOORDINATES.leftGoalPost],
    [POSITIONCOORDINATES.leftGoalArea, POSITIONCOORDINATES.centerMark],
    [POSITIONCOORDINATES.leftCornerArc, POSITIONCOORDINATES.leftPenaltyMark],
    [POSITIONCOORDINATES.leftPenaltyAreaAngle, POSITIONCOORDINATES.leftGoalPost],
    [POSITIONCOORDINATES.leftPenaltyArea, POSITIONCOORDINATES.sideLine],

]

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
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

let g = new Game()
// TODO 将这个绘制球场的循环放进Court类里面
for (let i in COURSESPECIFICATION) {
    g.draw(COURSESPECIFICATION[i])
}



let myCanvas = document.getElementById("canvas-bg")
myCanvas.addEventListener("click", event => {
    console.log(event.offsetX, event.offsetY)
    man.kick(g, {
        x: event.offsetX,
        y: event.offsetY,
    })
})

let id = setInterval(() => {
    g.clear()
    for (let i in COURSESPECIFICATION) {
        g.draw(COURSESPECIFICATION[i])
    }
    if (g.ball && g.man) {
        console.log("11")
        g.ball.move()
        g.man.run(g)
        g.draw(g.man)
        g.draw(g.ball)
    }


}, 1000 / 30)

let stop = document.getElementById("stopbutton")
stop.addEventListener('click', () => {
    clearInterval(id)
})
let fire = document.getElementById("firebutton")
fire.addEventListener('click', () => {
    man.kick(g)
})
let submit = document.getElementById("submit")
submit.addEventListener("click", (event) => {
    let optionArr = document.querySelectorAll("input")
    key = document.querySelector("input[name='name']").value

    if (window.sessionStorage) {
        if (key) {
            let obj = {}
            optionArr.forEach((v, i) => {
                obj[v.name] = v.value
                let regex = /[\s\S]*/
                //v = v.outerHTML.replace(regex, "<p>Hello</p>")
                let parent = v.parentNode
                let el = document.createElement("span")
                el.innerHTML = v.value
                el.id = v.name
                parent.removeChild(v)
                parent.appendChild(el)
                parent.className = "text-info"

            })
            // TODO 完成球员生成面板的功能
            obj = JSON.stringify(obj)
            window.sessionStorage.setItem(key, obj)
            let data = window.sessionStorage.getItem(key)
            console.log(JSON.parse(data))
            //console.log(window.sessionStorage.key())
            let panelNode = submit.parentNode
            panelNode.removeChild(submit)
            let select = document.createElement("select")
            panelNode.appendChild(select)
            TEXTARRAY.forEach((currentValue, index) => {
                let option = document.createElement('option')
                option.value = index
                option.innerHTML = currentValue
                select.appendChild(option)
            })
            let execute = document.createElement("button")
            execute.innerHTML = "执行"
            execute.className = "execute"
            execute.addEventListener("click", (event) => {
                let index = document.getElementsByTagName("select")[0].selectedIndex
                if (g.ball && g.man) {

                } else {
                    let data = JSON.parse(window.sessionStorage.getItem(key))
                    for (let i in data) {
                        data[i] = parseInt(data[i])
                    }
                    let {x,
                        y,
                        speed,
                        explosiveNum,
                        physical,
                        power,
                        technology,
                        name} = data
                    g.ball = new Ball(...POLICYARRAY[index][0])
                    g.man = new Footballer(x,
                        y,
                        speed,
                        explosiveNum,
                        physical,
                        power,
                        technology,
                        name)
                }
            })
            panelNode.appendChild(execute)
        } else {
            throw new Error("请输入球员姓名")
        }
    } else {
        throw new Error("浏览器不支持sessionStorage存储")
    }

})