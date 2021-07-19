
const constant = {
    enterKeyCode: 13,
    minorEnterKeyCode: 108,
    urlProcess: function(cover){
        if(cover && cover.startsWith('//'))
            cover = 'http:' + cover   
        return cover
    },
    jsonify: function(sentence){
        let arr = sentence.split('\n')
        arr = Array.from(arr)
        let res = {}
        arr.map((item)=>{
            let a = item.split('：')
            res[a[0]] = a[1]
            return ''
        })
        return res
    }
}
export default constant;