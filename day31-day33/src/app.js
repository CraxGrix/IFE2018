import updataTable from './script/table'

function registrationEvent() {
    let regionWrapper = document.getElementById("region-radio-wrapper")
    regionWrapper.onclick = event => {
        checkboxSelect(event, 'region') 
    }
    let productWrapper = document.getElementById("product-radio-wrapper")
    productWrapper.onclick = event => {
        checkboxSelect(event, 'product')
    }
    function checkboxSelect(event, name) {
        let regionCheckBox = document.getElementsByName(name)
        if (event.target.type === "checkbox") {
            log(event.target.id)
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
        updataTable()
    }
}

