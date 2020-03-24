import areaLists from './areaList'

const TArea = function (options) {
    this.arealists = areaLists
    this.defalutArea = options.defalutArea || []
    this.dealData = {
        province: areaLists.province_list,
        city: areaLists.city_list,
        county: areaLists.county_list
    }
    this.checkProvince = {}
    this.checkCity = {}
    this.checkCounty = {}
    this.SelectCon = document.querySelector('#areaSelectCon')
    this.init()
}

TArea.prototype = {
    init: function () {
        this.initCheck()
        this.addListener()
    },
    initCheck: function () {
        if (this.defalutArea.length > 0) {
            let selectItems = Array.prototype.slice.call(this.SelectCon.querySelectorAll('.area-placeholder'))
            this.defalutArea.map((item, index) => {
                switch (index) {
                    case 0:
                        this.checkProvince = item || {}
                        if (selectItems[0]) {
                            selectItems[0].innerText = item.name
                            selectItems[0].style.color = '#333'
                        }
                        break;
                    case 1:
                        this.checkCity = item || {}
                        if (selectItems[1]) {
                            selectItems[1].innerText = item.name
                            selectItems[1].style.color = '#333'
                            if (item.code.substr(0, 1) === '9') {
                                selectItems[2].innerText = '暂无选项'
                            }
                        }
                        break;
                    case 2:
                        this.checkCounty = item || {}
                        if (selectItems[2]) {
                            selectItems[2].innerText = item.name
                            selectItems[2].style.color = '#333'
                        }
                        break;
                }
            })
        }
    },
    renderListFunc: function (target, value) {
        let renderString = ''
        if (value instanceof Object) {
            Object.keys(value).map(key => {
                renderString += '<div class="area-list-item" data-area=' + key + '>' + value[key] + '</div>'
            })
        }
        target.innerHTML = renderString
        target.style.display = 'block'
    },
    clearAreaList: function () {
        let areaListNode = Array.prototype.slice.call(this.SelectCon.querySelectorAll('.area-list-con'))
        areaListNode.map(item => {
            item.style.display = 'none'
        })
    },
    addListener: function () {
        let that = this
        this.SelectCon.addEventListener('click', function (e) {
            var el = e.target
            while (el && el.className.indexOf('area-list-item') < 0 && el.className.indexOf('area-placeholder') < 0) {
                if (el === this) {
                    el = null
                    break
                }
                el = el.parentNode
            }
            if (el && el.className.indexOf('area-list-item') >= 0) {
                that.triggerCheck(el)
            } else if (el && el.className.indexOf('area-placeholder') >= 0) {
                if (el.parentNode.querySelector('.area-list-con').style.display !== 'block') {
                    that.clearAreaList()
                    that.triggerInput(el)
                } else {
                    that.clearAreaList()
                }
            }
        })
    },
    triggerCheck(el) {
        let parentTarget = el.parentNode.parentNode
        let dataType = parentTarget.attributes['data-area-type'].value
        let selectedCode = el.attributes['data-area'].value
        parentTarget.querySelector('.area-placeholder').innerText = this.dealData[dataType][selectedCode]
        parentTarget.querySelector('.area-placeholder').style.color = '#333'
        el.parentNode.style.display = 'none'
        switch (dataType) {
            case 'province':
                this.checkProvince.code = selectedCode
                this.checkProvince.name = this.dealData[dataType][selectedCode]
                document.querySelector('.area-city').innerText = '请选择市或地区'
                document.querySelector('.area-city').style.color = '#999'
                document.querySelector('.area-county').innerText = '请选择区或地区'
                document.querySelector('.area-county').style.color = '#999'
                this.checkCity = {}
                this.checkCounty = {}
                break;
            case 'city':
                this.checkCity.code = selectedCode
                this.checkCity.name = this.dealData[dataType][selectedCode]
                if (this.checkCity.code.substr(0, 1) === '9') {
                    document.querySelector('.area-county').innerText = '暂无选项'
                    document.querySelector('.area-county').style.color = '#999'
                } else {
                    document.querySelector('.area-county').innerText = '请选择区或地区'
                    document.querySelector('.area-county').style.color = '#999'
                }
                this.checkCounty = {}
                break;
            case 'county':
                this.checkCounty.code = selectedCode
                this.checkCounty.name = this.dealData[dataType][selectedCode]
                break;
        }

    },
    triggerInput(el) {
        let areaData = {},
            areaType = el.parentNode.attributes['data-area-type'].value;
        switch (areaType) {
            case 'province':
                areaData = this.dealData.province;
                break;
            case 'city':
                if (this.checkProvince.code) {
                    let areaCity = this.dealData.city
                    let cityCode = this.checkProvince.code.substr(0, 2)
                    Object.keys(areaCity).filter(code => code.indexOf(cityCode) === 0).map(code => {
                        areaData[code] = areaCity[code]
                    })
                } else {
                    alert('请先选择省或地区')
                }
                break;
            case 'county':
                if (this.checkCity.code) {
                    if (this.checkCity.code.substr(0, 1) !== '9') {
                        let areaCounty = this.dealData.county
                        let cityCode = this.checkCity.code.substr(0, 4)
                        Object.keys(areaCounty).filter(code => code.indexOf(cityCode) === 0).map(code => {
                            areaData[code] = areaCounty[code]
                        })
                    }
                } else {
                    alert('请先选择市或地区')
                }
                break;
        }
        if (JSON.stringify(areaData) !== '{}') {
            this.renderListFunc(el.parentNode.querySelector(".area-list-con"), areaData)
        }
    },
    outPut() {
        if (!this.checkProvince.code) {
            alert('请先选择省或地区')
            return
        }
        if (!this.checkCity.code) {
            alert('请先选择市或地区')
            return
        }
        if (!this.checkCounty.code && this.checkCity.code.substr(0, 1) !== '9') {
            alert('请先选择区或地区')
            return
        }
        let outPutData = [
            this.checkProvince,
            this.checkCity
        ]
        if (JSON.stringify(this.checkCounty) !== '{}') {
            outPutData.push(this.checkCounty)
        }
        return outPutData
    }
}

export default TArea
