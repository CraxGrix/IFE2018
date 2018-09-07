import Court from './script/Court'
import Footballer from './script/Footballer'

const log = console.log.bind(console)
const COURSESPECIFICATION = {
    wh: [50, 50, 105 * 5, 68 * 5],
    leftHalf: [50, 50, 262.5, 340],
    topLeftCornerFlagArc: [50, 50, 5, 0.5 * Math.PI, 2 * Math.PI, true],
    leftPenaltyArc: [105, 220, 45.75, 0.3 * Math.PI, 1.7 * Math.PI, true],
    bottomLeftCornerFlagArc: [50, 390, 5, 1.5 * Math.PI, 0 * Math.PI, false],
    leftPenaltyArea: [50, 119.25, 82.5, 201.5],
    leftGoal: [38, 201.75, 2.4 * 5, 7.3 * 5],
    leftGoalMouth: [50, 174.25, 27.5, 91.5],
    topRightCornerFlagArc: [575, 50, 5, 0.5 * Math.PI, 1 * Math.PI, false],
    rightPenaltyArc: [520, 220, 45.75, 1.3 * Math.PI, 0.7 * Math.PI, true],
    bottomRightCornerFlagArc: [575, 390, 5, 1.5 * Math.PI, 1 * Math.PI, true],
    rightPenaltyArea: [492.5, 119.25, 82.5, 201.5],
    rightGoal: [575, 201.75, 2.4 * 5, 7.3 * 5],
    rightGoalMouth: [547.5, 174.25, 27.5, 91.5],
    kickoffCircle: [312.5, 221.25, 45.75, 0.5 * Math.PI, 2.5 * Math.PI, false],
}
let myCanvas = document.getElementById("canvas")
let ctx = document.getElementById('canvas').getContext("2d")
var getPixelRatio = function (ctx) {
    var backingStore =  ctx.backingStorePixelRatio ||
         ctx.webkitBackingStorePixelRatio ||
         ctx.mozBackingStorePixelRatio ||
         ctx.msBackingStorePixelRatio ||
         ctx.oBackingStorePixelRatio ||
         ctx.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};
var ratio = getPixelRatio(ctx);
myCanvas.style.width = myCanvas.width + 'px';
myCanvas.style.height = myCanvas.height + 'px';
myCanvas.width = myCanvas.width * ratio;
myCanvas.height = myCanvas.height * ratio;

new Court(ctx, COURSESPECIFICATION, ratio).drawCourt()
let man = new Footballer(50)
man.init(ctx, [100, 100])

myCanvas.addEventListener("click", event => {
    man.run(ctx, [event.offsetX, event.offsetY])
})
