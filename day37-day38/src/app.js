import updataTable from './script/table'
import {check, getElementLeft, getElementTop} from './script/utils'

const log = console.log.bind(console)
// 用该值来存储input内修改后的内容
let curValue = ""
function addLoadEvent (func) {
  var oldonload = window.onload
  if (typeof window.onload !== 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      oldonload()
      func()
    }
  }
}

function registrationCheckBoxEvent () {
  let regionWrapper = document.getElementById('region-radio-wrapper')
  let productWrapper = document.getElementById('product-radio-wrapper')
  regionWrapper.onclick = event => {
    checkboxSelect(event, 'region')
    updataTable()
  }
  productWrapper.onclick = event => {
    checkboxSelect(event, 'product')
    updataTable()
  }

  function checkboxSelect (event, name) {
    let regionCheckBox = document.getElementsByName(name)
    if (event.target.type === 'checkbox') {
      if (event.target.id === 'all') {
        if (event.target.checked === true) {
          for (let i = 1; i < regionCheckBox.length; i++) {
            regionCheckBox[i].checked = regionCheckBox[0].checked
          }
        } else if (event.target.checked === false) {
          event.target.checked = true
        }
      } else {
        if (check(regionCheckBox) === 3) {
          regionCheckBox[0].checked = true
        } else if (check(regionCheckBox) === 0) {
          event.target.checked = true
        } else {
          regionCheckBox[0].checked = false
        }
      }
    }
  }
}

addLoadEvent(registrationCheckBoxEvent)
addLoadEvent(selectAll)
addLoadEvent(registrationEditEvent)

function selectAll() {
  let inputNodeList = document.getElementsByTagName("input")
  for(let i = 0; i < inputNodeList.length; i++) {
    if(inputNodeList[i].id === "all") {
      inputNodeList[i].click()
    }
  }
}

function registrationEditEvent () {
  let tableNode = document.getElementById("table")
  tableNode.onclick = event => {
    if(document.getElementById("edit-wrapper") && !(event.target.getAttribute("class") === "sale-number")) {
      hideEditButtion()
    }
    if(event.target.getAttribute("class") === "sale-number") {
      let tdNode = event.target
      let input = document.createElement('input')
      log(event.target)
      input.style.width = tdNode.offsetWidth + "px"
      input.style.height = tdNode.offsetHeight + "px"
      input.style.position = "relative"
      input.value = tdNode.innerText
      input.addEventListener("focus", event => {
        if(document.getElementById("edit-wrapper")) {
          hideEditButtion()
        }
        showEditButton(event.target)
        
      })
      input.addEventListener("blur", event => {
        input.parentNode.replaceChild(tdNode, input)
      })
      input.addEventListener("click", event => {
        event.stopPropagation()
      })
      input.addEventListener("change", event => {
        curValue = event.target.value
      })
      /**input.addEventListener("click", (event) => {
        event.target.firstChild.focus()
        //let editWrapperNode = document.getElementById("edit-wrapper")
        //editWrapperNode.parentNode.removeChild(editWrapperNode)
        //fromNode.parentNode.replaceChild(tdNode, fromNode)
      })
      //input.addEventListener("focus", (event) => {
        //showEditButton(event.target)
      //})
      */
      
      tdNode.parentNode.replaceChild(input, tdNode)
      input.focus()
    }
  }
}
function showEditButton (inputNode) {
  let editWrapper = document.createElement("div")
  editWrapper.setAttribute("id", "edit-wrapper")
  let determineBtn = document.createElement("button")
  determineBtn.addEventListener("click", (event) => {
    // TODO尚未解决丢失焦点后无法获取td节点的问题
    log(event.target.parentNode)
  })
  determineBtn.style.display = "block"
  determineBtn.innerHTML = "保存"
  let cancelBtn = document.createElement("button")
  cancelBtn.style.display = "block"
  cancelBtn.innerHTML = "取消"
  cancelBtn.addEventListener("click", event => {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
    curValue = ""
  })
  editWrapper.appendChild(determineBtn)
  editWrapper.appendChild(cancelBtn)
  editWrapper.style.position = "fixed"
  editWrapper.style.left = (getElementLeft(inputNode) + inputNode.offsetWidth) +  "px"
  editWrapper.style.top = getElementTop(inputNode) - inputNode.offsetHeight / 4 + "px"
  if(inputNode.nextSibling) {
    inputNode.parentNode.insertBefore(editWrapper, inputNode.nextSibling)
  } else {
    inputNode.parentNode.appendChild(editWrapper)
  }
}

function hideEditButtion() {
  curValue = ""
  let node = document.getElementById("edit-wrapper")
  node.parentNode.removeChild(node)
}