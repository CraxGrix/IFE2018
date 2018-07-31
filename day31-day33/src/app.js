import updataTable from './script/table'
import {check} from './script/utils'

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}


function registrationEvent() {
    let regionWrapper = document.getElementById("region-radio-wrapper")
    regionWrapper.onclick = event => {
        checkboxSelect(event, 'region') 
        updataTable()
    }
    let productWrapper = document.getElementById("product-radio-wrapper")
    productWrapper.onclick = event => {
        checkboxSelect(event, 'product')
        updataTable()
    }
    function checkboxSelect(event, name) {
        let regionCheckBox = document.getElementsByName(name)
        if (event.target.type === "checkbox") {
            if (event.target.id === "all") {
                if (event.target.checked === true) {
                    for (let i = 1; i < regionCheckBox.length; i++) {
                        regionCheckBox[i].checked = regionCheckBox[0].checked
                    }
                } else if (event.target.checked == false) {
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

addLoadEvent(registrationEvent())

