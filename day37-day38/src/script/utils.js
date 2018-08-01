/**
 * 返回节点数组Checked总数
 * @param {NodeList} nodeList 当前种类CheckBox的节点数组，不包含All。
 */
function check(nodeList) {
  let j = 0
  for (let i = 1; i < nodeList.length; i++) {
    if (nodeList[i].checked === true) {
      j++
    }
  }
  return j
}
/**
 *
 * 两个Option种类的Checked数相减取绝对值+1得出rowspan的值
 * @param {Number} regionNum region option 已选中数量
 * @param {Number} productNum product option 已选中数量
 *
 */
function rowSpanCount(regionNum, productNum) {
  if (regionNum === 0 || productNum === 0) {
    return 1
  } else if (regionNum === productNum) {
    return regionNum
  } else {
    return Math.abs(regionNum - productNum) + 1
  }
}

function getElementLeft(element) {　　　　
  var actualLeft = element.offsetLeft;　　　　
  var current = element.offsetParent;

  　　　　
  while (current !== null) {　　　　　　
    actualLeft += current.offsetLeft;　　　　　　
    current = current.offsetParent;　　　　
  }

  　　　　
  return actualLeft;　　
}

　　
function getElementTop(element) {　　　　
  var actualTop = element.offsetTop;　　　　
  var current = element.offsetParent;

  　　　　
  while (current !== null) {　　　　　　
    actualTop += current.offsetTop;　　　　　　
    current = current.offsetParent;　　　　
  }

  　　　　
  return actualTop;　　
}

export {
  check,
  rowSpanCount,
  getElementLeft,
  getElementTop
}