var utility = (function(utility) {
    //#region  设置 cookie
    /**
     * @description: 设置cookie
     * @augments: {name: cookie名, value: cookie值}
     */
    utility.setcookie = function(name, value) {
        var Days = 30
        var exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
    }
    //#endregion

    //#region  获取 cookie
    utility.getcookie = function(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"))
        if (arr != null) {
            return unescape(arr[2])
        } else {
            return ""
        }
    }
    //#endregion

    //#region  删除 cookie
    utility.delcookie = function(name) {
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getcookie(name)
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    }
    //#endregion

    utility.getUUId = function() {
        var s = []
        var hexDigits = '0123456789abcdef'
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }
        s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-'

        var uuid = s.join('')
        uuid = uuid +'-' + this.browserType() + '-'+ new Date().getTime()
        return uuid
    }
    utility.browserType = function() {
        var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
        var isIE = userAgent.indexOf('compatible') > -1
            && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
        var isEdge = userAgent.indexOf('Edge') > -1 // 判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
        var isSafari = userAgent.indexOf('Safari') > -1
            && userAgent.indexOf('Chrome') == -1 // 判断是否Safari浏览器
        var isChrome = userAgent.indexOf('Chrome') > -1
            && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器

        if (isIE) {
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
            reIE.test(userAgent)
            var fIEVersion = parseFloat(RegExp['$1'])
            if (fIEVersion == 7) {
                return 'IE7'
            } else if (fIEVersion == 8) {
                return 'IE8'
            } else if (fIEVersion == 9) {
                return 'IE9'
            } else if (fIEVersion == 10) {
                return 'IE10'
            } else if (fIEVersion == 11) {
                return 'IE11'
            } else {
                return 'IE'
            }// IE版本过低
        }
        if (isOpera) {
            return 'Opera'
        }
        if (isEdge) {
            return 'Edge'
        }
        if (isFF) {
            return 'FF'
        }
        if (isSafari) {
            return 'Safari'
        }
        if (isChrome) {
            return 'Chrome'
        }
    }
    //#region  保存本地会话
    utility.setSessionStorage = function(key, sessionStorageObj) {
        window.sessionStorage.setItem(key, JSON.stringify(sessionStorageObj))
    }
    //#endregion

    //#region  获取本地会话信息
    utility.getSessionStorage = function(key) {
        return JSON.parse(window.sessionStorage.getItem(key))
    }
    //#endregion

    // 清空本地会话信息
    utility.cleanSessionStorage = function() {
        window.sessionStorage.clear()
    }

    // 保存本地存储信息
    utility.setLocalStorage = function(key, localStorageObj) {
        window.localStorage.setItem(key, JSON.stringify(localStorageObj))
    }

    // 返回本地存储信息
    utility.getLocalStorage = function(key) {
        return JSON.parse(window.localStorage.getItem(key))
    }

    // 清空本地存储信息
    utility.cleanLocalStorage = function() {
        window.localStorage.clear()
    }

    // 去掉左右空格
    utility.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "")
    }

    //验证输入是否为空
    utility.checkLen = function(str, len) {
        let string = typeof str ==='string' ? str : str.toString()
        return string.length <= len ? true : false
    }

    //验证是否中文姓名
    utility.checkName = function(str) {
        return str.match(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/) ? true : false
    }

    //验证手机号码格式是否为手机号码
    utility.checkPhone = function(str) {
        var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/
        if (!myreg.test(str)) {
            return false
        }else{
            return true
        }     
    }
    //验证QQ号码
    utility.checkQQ = function(str) {
        // 1 首位不能是0 ^[1-9]
        // 2 必须是 [5, 11] 位的数字 \d{4, 9}
        let reg = /^[1-9][0-9]{4,9}$/gim
        if (reg.test(str)) {
            console.log('QQ号码格式输入正确')
            return true
        } else {
            console.log('请输入正确格式的QQ号码')
            return false
        }   
    }

    // 验证密码格式
    utility.checkPass = function(str) {
        return str.match(/^[a-zA-Z]\w{7,18}$/) ? true : false
    }

    //验证是否是生日
    utility.checkNumber = function(str) {
        return str.match(/^(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/) ? true : false
    }

    //验证邮箱
    utility.checkEmail = function(str) {
        console.log('str='+str)
        console.log(str.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/))
        return str.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/) ? true : false
    }

    // 验证身份证号码
    utility.checkIdentityNo = function(str) {
        var reg15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
        var reg18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        var bool = false

        if (str.length == 15 && str.match(reg15)) {
            bool = true
        } else if (str.length == 18 && str.match(reg18)) {
            bool = true
        }
        return bool
    }

    // 获取当前时间信息
    utility.getCurrentTimeInfo = function(dateInfo) {
        var nowDate = typeof dateInfo !== "undefined" ? new Date(dateInfo) : new Date()
        var year = nowDate.getFullYear() // 年
        var month = nowDate.getMonth() // 月
        var date = nowDate.getDate() // 日
        var day = nowDate.getDay()	// 星期
        var hour = nowDate.getHours() // 时
        var min = nowDate.getMinutes() // 分
        var second = nowDate.getSeconds() // 秒
        var weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

        return {
            "year": year,
            "month": month + 1,
            "date": date,
            "hour": hour,
            "min": min,
            "second": second,
            "weekDay": weekDay[day]
        }
    }

    // 把图片转换成
    utility.convertImgToBase64 = function(url, callback, outputFormat) {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image
        img.crossOrigin = 'Anonymous'
        img.onload = function() {
            canvas.height = img.height
            canvas.width = img.width
            ctx.drawImage(img, 0, 0)
            var dataURL = canvas.toDataURL(outputFormat || 'image/png')
            callback.call(this, dataURL)
            canvas = null
        }

        img.src = url
    }

    // 把时间戳转换成日期
    utility.formatDate = function(nS) {
        var timeStr = new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, ".").replace(/日/g, " ")
        var timeArr = timeStr.split(' ')[0].split('/')
        var year = parseInt(timeArr[0], 10)
        var month = parseInt(timeArr[1], 10)
        var day = parseInt(timeArr[2], 10)

        if (month < 10) {
            month = '0' + month
        }

        if (day < 10) {
            day = '0' + day
        }

        return year + "年" + month + "月" + day + "日"
    }
    // 把时间戳转换成日期
    utility.formatDateToObj = function(dateInfo) {
        var nowDate = typeof dateInfo !== "undefined" ? new Date(dateInfo) : new Date()
        var year = nowDate.getFullYear() // 年
        var month = nowDate.getMonth()+1 // 月
        var date = nowDate.getDate() // 日
        var day = nowDate.getDay()	// 星期
        var hour = nowDate.getHours() // 时
        var min = nowDate.getMinutes() // 分
        var second = nowDate.getSeconds() // 秒
        var weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        function toMore(str){
            var s = str
            s = s<10? '0'+s:s
            return s.toString()
        }
        return {
            "year":year,
            "month": toMore(month),
            "day": toMore(date),
            "h":toMore(hour) ,
            "m": toMore(min),
            "s": toMore(second),
            "weekDay": weekDay[day]
        }
    }
    // 生成随机长度的数字
    utility.generateRandomData = function(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        var res = ""
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 10)
            res += chars[id]
        }
        return res
    }
    // 地图逻辑
    utility.mapLogic = function(options) {
        var map = new options.BMap.Map(options.mapContainer)
        // 添加带有定位的导航控件
        var navigationControl = new options.BMap.NavigationControl({
            // 靠左上角位置
            anchor: options.navigation.anchor,
            // LARGE类型
            type: options.navigation.type,
            // 启用显示定位
            enableGeolocation: true
        })
        // 添加定位控件
        var geolocationControl = new options.BMap.GeolocationControl({
            // 靠左上角位置
            anchor: options.geolocation.anchor,
        })
        // 搜索
        var local = new options.BMap.LocalSearch(map, {
            renderOptions: {map: map, panel: options.panel, autoViewport: true}
        })
        geolocationControl.addEventListener("locationSuccess", function(e) {
            // 定位成功事件
            var address = ""
            address += e.addressComponent.province
            address += e.addressComponent.city
            address += e.addressComponent.district
            address += e.addressComponent.street
            address += e.addressComponent.streetNumber
        })
        geolocationControl.addEventListener("locationError", function(e) {
            // 定位失败事件
        })
        // 先重置
        map.reset()
        map.addControl(navigationControl)
        map.addControl(geolocationControl)

        local.setSearchCompleteCallback(function(searchResults) {
            var searchResult = null
            if (typeof searchResults === "undefined") {
                return
            }
            if (searchResults.length > 0) {
                searchResult = searchResults[0]
            } else {
                searchResult = searchResults
            }

            for (var i = 0; i < searchResult.getCurrentNumPois(); i++) {
                // 获得需要得到的坐标
                var poi = searchResult.getPoi(i)
                if (poi) {
                    map.centerAndZoom(poi.point, 13)
                    !!options.callback && options.callback(poi)
                    break
                }
            }
        })
        local.search(options.searchTxt)
    }
    //通过身份证计算生日
    utility.getBirthInfoByIdNo = function(idNo) {
        if (!idNo) {
            return {
                birth: '',
                age: ''
            }
        }
        if (idNo.length === 15) {
            const year = `19${idNo.substr(6, 2)}`
            const month = idNo.substr(8, 2)
            const date = idNo.substr(10, 2)

            return utility.countAge(year, month, date)
        } else if (idNo.length === 18) {
            const year = idNo.substr(6, 4)
            const month = idNo.substr(10, 2)
            const date = idNo.substr(12, 2)

            return utility.countAge(year, month, date)
        } else {
            return {
                birth: '',
                age: ''
            }
        }
    }
    //计算年龄
    utility.countAge = function(year, month, date, justYear = true) {
        const birth = `${year}-${month}-${date}`
        const thisyear = (new Date()).getFullYear()
        const thismonth = (new Date()).getMonth() + 1
        const thisdate = (new Date()).getDate()
        let age = thisyear - year

        // 只判断年
        if (justYear) {
            return {
                birth: birth,
                age: age
            }
        }

        if (Number(month) > thismonth) {
            age -= 1
        } else if (Number(month) === thismonth && Number(date) > thisdate) {
            age -= 1
        }

        return {
            birth: birth,
            age: age
        }
    }

    // 生成单例
    utility.getSingle = function(fn) {
        let instance = undefined
        return function() {
            if (!instance) {
                instance = fn.apply(this, arguments)
            }
            return instance
        }
    }
    // 获取年月日
    utility.getNowFormatDate = function(now) {
        var date = now || new Date()
        var seperator1 = "-"
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        var minute = date.getMinutes()    //获取当前时间的分钟数
        var second = date.getSeconds()    //获取当前时间的秒数
        if (month >= 1 && month <= 9) {
            month = "0" + month
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate
        }
        if (minute >= 0 && minute <= 9) {
            minute = "0" + minute
        }
        if (second >= 0 && second <= 9) {
            second = "0" + second
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate +':'+ minute +':'+ second
        return currentdate
    }

    //保留n位小数不足补0
    utility.toDecimal2 = function(x,num){
        var f = parseFloat(x)   
        if (isNaN(f)) {   
            return false   
        } 
        var power = Math.pow(10,num)
        f = Math.round(x*power)/power   
        var s = f.toString()   
        var rs = s.indexOf('.')   
        if (rs < 0) {   
            rs = s.length   
            s += '.'   
        }   
        while (s.length <= rs + num) {   
            s += '0'   
        }   
        return s   
    }

    utility.userAgent = (function(){
        const u = navigator.userAgent,
            app = navigator.appVersion
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            AlipayClient: u.indexOf('AlipayClient') > -1, //是否微信
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        }  
    })()
    return utility

}(utility || {}))

export default utility
