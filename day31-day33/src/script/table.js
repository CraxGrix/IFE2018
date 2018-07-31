import sourceData from './../assets/data.js'
import {
    rowSpanCount
} from './utils.js'

export default function updataTable() {
    let optionArr = document.querySelectorAll("input[class = 'option']")
    let optionCheckedArr = {}
    let productChecked = 0
    let regionChecked = 0
    for (let i = 0; i < optionArr.length; i++) {
        if (optionArr[i].checked) {
            if (optionArr[i].name === 'product') {
                productChecked++
            } else {
                regionChecked++
            }
            let value = optionArr[i].value
            if (Array.isArray(optionCheckedArr[optionArr[i].name])) {
                optionCheckedArr[optionArr[i].name].push(value)
            } else {
                optionCheckedArr[optionArr[i].name] = []
                optionCheckedArr[optionArr[i].name].push(value)
            }
        }
    }
    let data = getData(optionCheckedArr)
    renderTable(data, productChecked, regionChecked)
}

function getData(keyObj) {
    let data = JSON.parse(JSON.stringify(sourceData))
    let keyNameArr = Object.keys(keyObj)
    for (let keyName of keyNameArr) {
        data = data.filter(value => {
            for (let key of keyObj[keyName]) {
                if (value[keyName] === key) {
                    return true
                }
            }
            return false
        })
    }
    return data
}


function renderTable(data, productNum, regionNum) {
    let cross = rowSpanCount(regionNum, productNum)
    let arr = []
    let wrapper = document.getElementById('table-wrapper')
    arr.push('<table border=1><tbody>')
    arr.push('<tr>')
    let tableHeader = regionNum != 1 ? '<tr><th>商品</th><th>地区</th><th>一月</th><th>二月</th><th>三月</th><th>四月</th><th>五月</th><th>六月</th><th>七月</th><th>八月</th><th>九月</th><th>十月</th><th>十一月</th><th>十二月</th></tr>' : '<tr><th>地区</th><th>商品</th><th>一月</th><th>二月</th><th>三月</th><th>四月</th><th>五月</th><th>六月</th><th>七月</th><th>八月</th><th>九月</th><th>十月</th><th>十一月</th><th>十二月</th></tr>'
    arr.push(tableHeader)
    arr.push('</tr>')
    for (let index in data) {
        arr.push('<tr>')
        arr.push(
            index === 0 || index % cross === 0 ? (regionNum != 1 ? '<td rowspan=' + rowSpanCount(regionNum, productNum) + '>' + data[index].product + '</td>' + '<td>' + data[index].region + '</td>' : '<td rowspan=' + rowSpanCount(regionNum, productNum) + '>' + data[index].region + '</td>' + '<td>' + data[index].product + '</td>') : (regionNum != 1 ? '<td>' + data[index].region + '</td>' : '</td>' + '<td>' + data[index].product + '</td>')
        )
        for (let num of data[index].sale) {
            arr.push('<td>' + num + '</td>')
        }
        arr.push('</tr>')
    }
    //end
    arr.push('</tbody><table>');
    wrapper.innerHTML = arr.join('')
}