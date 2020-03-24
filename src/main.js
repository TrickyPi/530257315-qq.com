import TArea from './js/run.js'

//init
const tArea = new TArea({
    defalutArea: [
        { code: "330000", name: "浙江省" },
        { code: "330100", name: "杭州市" },
        { code: "330104", name: "江干区" }
    ]
})
//获得省市区三级联动的数据
// const AreaListData = tArea.outPut()