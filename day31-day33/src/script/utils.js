function check(nodeList) {
    let j = 0
    for (let i = 1; i < nodeList.length; i++) {
        if (nodeList[i].checked === true) {
            j++
        }
    }
    return j
}
function rowSpanCount(regionNum, productNum) {
    if (regionNum === 0 || productNum === 0){
        return 1
    }
    else if (regionNum === productNum) {
        return regionNum
    } else {
        return Math.abs(regionNum - productNum) + 1
    }
}

export {
    check,
    rowSpanCount
}