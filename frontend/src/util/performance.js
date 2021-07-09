// 防抖函数
const debounce = (fn, delay) => {
    let timer = null
    return function() {
        let context = this
        let args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
};

export default debounce;