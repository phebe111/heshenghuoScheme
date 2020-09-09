/**
 * 是否是空json对象
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
    return !obj || Object.keys(obj).length === 0
}

/**
 * 检验url是否合法
 * @param str_url
 * @returns {boolean}
 */
export function isUrl(strUrl) {
    // ftp的user@
    /* eslint-disable no-useless-escape */
    let strRegex = '^((https|http|ftp|rtsp|mms)?://)' + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
        // IP形式的URL- 199.194.52.184
        '(([0-9]{1,3}\.){3}[0-9]{1,3}' +
        // 允许IP和DOMAIN（域名）
        '|' +
        // 域名- www.
        "([0-9a-z_!~*'()-]+\.)*" +
        // 二级域名
        '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' +
        // first level domain- .com or .museum
        '[a-z]{2,6})' +
        // 端口- :80
        '(:[0-9]{1,4})?' +
        // a slash isn't required if there is no file name
        '((/?)|' +
        "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
    let re = new RegExp(strRegex)
    return re.test(strUrl)
}

/**
 * 从拼接字段获取pageId,跳转
 * @param url
 * @returns {string}
 */
export function redirectByPageIdOrUrl(url, isNav = false) {
    let pageUrl = concatPagePath(url)
    if (pageUrl !== '') {
        if (isUrl(url)) {
            location.href = pageUrl
        } else {
            if (!isNav) {
                location.hash = pageUrl
            } else {
                location.replace(`#${pageUrl}`)
            }
        }
    }
}

/**
 * 从拼接字段获取pageId
 * @param url
 * @returns {string}
 */
export function concatPagePath(url) {
    if (url) {
        if (isUrl(url)) {
            return url
        } else {
            let urlArr = url.split('://')
            if (urlArr.length > 1) {
                let route = urlArr[1].split('_')
                let pageId = route[route.length - 1]
                return `/page${pageId}`
            }
        }
    }
    return ''
}

/**
 * 获取连接上面参数
 * @param name
 * @returns {*}
 */
export function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}
export function GetUrlParam(paraName) {
    var url = document.location.toString()
    var arrObj = url.split("?")
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&")
        var arr
 
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=")
 
            if (arr != null && arr[0] == paraName) {
                return arr[1]
            }
        }
        return ""
    }
    else {
        return ""
    }
}
/**
 * 获取指定连接上面参数
 * @param name
 * @returns {*}
 */
export function getQueryStringByUrl(url,paraName) {
    var arrObj = url.split("?")
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&")
        var arr
 
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=")
 
            if (arr != null && arr[0] == paraName) {
                return arr[1]
            }
        }
        return ""
    }
    else {
        return ""
    }
}
/*二位数组item内容反转反转
* [[1,2],[3,4]] => [[2,1],[4,3]]
* */
export function reverse(a){
    return a.map(([key, val]) => {
        return [val, key]
    })
}


