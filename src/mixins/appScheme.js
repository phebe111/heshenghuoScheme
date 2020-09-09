import myEncryption from '@/utils/myencryption.js'
import utility from "@/utils/utility.js"
import {GetUrlParam } from "@/utils/utils.js"
import goodsApi from '@/api/goods.js'
import mmappMixin from '@/mixins/mmapp.js'
const USERTYPE = 'heLifeAppId'
const CALLBACKFUN = ()=>{
    console.log('tiemout end')
}
export default {
    data() {
        return {
            isAndroid:false,
            isiOS:false,
            isWeixin:false,
            inMMApp:false,
            isAlipayClient:false,
            apps:[],
            packagename:'',
            androidUlr:  'http://img.wxcs.cn/getfile/hlifeapp/~hlifeapp/5GLife_5.1.0_release_online_online_20200825093836_200001.apk'
        }
    },
    mixins: [
        mmappMixin
    ],
    created() {
        // const app = this.$store.getters.myUserAgent
        this.isAndroid = app['android']
        this.isiOS = app['ios']
        this.isWeixin = app['weixin']
        this.isAlipayClient = app['isAlipayClient']
        this.getAppInfoInMmApp()
    },
    methods:{
        getAesEncrypt(scheme){
            //ios key
            const aeskey = '9AF36BFBD87BCA192A2E4DDBFF12E21E'
            const enData =  myEncryption.aesEncrypt128(scheme,aeskey)
            const str =enData +"\n"+"\n"+'打开和生活(5G版）-畅享移动新生活'
            // const str ='打开和生活(5G版）-畅享移动新生活'+"\n" +"\n"+enData 
            // console.log(str)
            return str 
        }, 
        iosCopy(scheme){
            const  enscheme = this.getAesEncrypt(scheme)
            this.$copyText(enscheme).then(function(e) {
                console.log(e)
                window.location.href = 'https://itunes.apple.com/cn/app/id626162542?mt=8'
            }, function(e) {
                console.log('Can not copy')
                var range = document.createRange()
                range.selectNode(document.getElementById('ios-copy-node-ele'))

                var selection = window.getSelection()
                if(selection.rangeCount > 0){
                    selection.removeAllRanges()
                } 
                selection.addRange(range)
                document.execCommand('copy')
                
                window.location.href = 'https://itunes.apple.com/cn/app/id626162542?mt=8'
                console.log(e)
            })
        },
        openHome(){
            if(this.isAndroid){
                console.log('isAndroid')
                this.callAppByScheme('life://main',CALLBACKFUN)
            }else if(this.isiOS){
                this.callAppByScheme('cmicity://')
            }
        },
        openH5(obj){
            const {androidScheme,iosScheme,calback} = {...obj}
            if(this.isAndroid){
                this.callAppByScheme(androidScheme,calback)
            }else if(this.isiOS){
                this.callAppByScheme(iosScheme,calback)
            }
        },
        // unopenHome(){
        //     const androidUlr = this.androidUlr
        //     if(this.isAndroid){
        //         const scheme = `${androidUlr}?life=main`
        //         console.log('isAndroid')
        //         window.location.href = scheme
        //     }else if(this.isiOS){
        //         //https://www.cnblogs.com/sherlock-Ace/p/10803961.html
        //         let scheme = 'cmicity://'
        //         this.iosCopy(scheme)
        //     }
        // },
        openTDiy(obj){
            const {androidScheme,iosScheme,calback} = {...obj}
            if(this.isAndroid){
                console.log('isAndroid')
                this.callAppByScheme('life://main?cid=1814',calback)
            }else if(this.isiOS){
                this.callAppByScheme('cmicity://rootColumn?columnId=-1814',calback)
            }
        },
        async unopenH5Mixin(obj){
            try {
                let url= await this.getDownloadUrlHandler()
                const diyDownUrl = GetUrlParam('diyDownUrl')
                if(diyDownUrl){
                    url = decodeURIComponent(diyDownUrl)
                }
                this.androidUlr =  url.replace('/FD/','/FD/~hlifeapp/')
            } catch (e) {
                console.log(e)
            }
            const androidUlr = this.androidUlr
            const {androidBackUrl,iosdBackUrl} = {...obj}
            if(this.isAndroid){
                console.log('isAndroid')
                const scheme = `${androidUlr}?life=browser&url=${androidBackUrl}`
                window.location.href = scheme
            }else if(this.isiOS){
                let scheme = `cmicity://columnDetail?url=${iosdBackUrl}&showShare=1`
                this.iosCopy(scheme)
            }
        },
        unopenTDiy(){
            const androidUlr = this.androidUlr
            if(this.isAndroid){
                const scheme = `${androidUlr}?life=main&cid=1814`
                console.log('isAndroid')
                window.location.href = scheme
            }else if(this.isiOS){
                let scheme = 'cmicity://rootColumn?columnId=-1814'
                this.iosCopy(scheme)
             
            }
        },
        //点击尝试唤起客户端，如果失败传callback
        callAppByScheme(scheme,callback = ()=>{}){
            const that = this
            var d = new Date()
            var t0 = d.getTime()
            if(that.openApp(scheme)){
                that.openApp(scheme)
            }else{
                var delay = setInterval(function(){
                    var d = new Date()
                    var t1 = d.getTime()
                    if( t1-t0<3000 && t1-t0>2000){
                        callback()
                    }
                    if(t1-t0>=3000){
                        clearInterval(delay)
                    }
                },1000)
            }
        },
        openApp(src){
            // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
            // 否则打开a标签的href链接
            var ifr = document.createElement('iframe')
            ifr.src = src
            ifr.style.display = 'none'
            document.body.appendChild(ifr)
            window.setTimeout(function(){
                document.body.removeChild(ifr)
            },2000)
        },
        callAppInH5(){
            if(this.isWeixin){
                this.$toast('请点击右上角，选择"浏览器中打开"')
                return
            }
            let url = window.location.href
            url = url.replace(/&shareByClient=2/,'')
            url = url.replace(/&shareByClient=1/,'')
            const a = encodeURIComponent(url)
            //按最新的5.1，resType=1的应用资源和resType=3的商品资源，都会默认展示分享和收藏按钮
            const res = '?resType=3' + '&url='+a
            const aiso = encodeURIComponent(url)
            const that = this
            const obj = {
                androidScheme:'life://browser'+res,
                iosScheme:'cmicity://columnDetail?url='+aiso+'&showCollect=1&showShare=1',
                calback:that.unopenH5Callback()
            }
            this.openH5(obj)
        },
        unopenH5Callback(){
            let a = window.location.href
            a = a.replace(/&shareByClient=2/,'')
            a = a.replace(/&shareByClient=1/,'')
            a = encodeURIComponent(a)
            const obj = {
                androidBackUrl:a,
                iosdBackUrl:a
            }
            this.unopenH5Mixin(obj)
        },
        downAppEvent(e){
            const durl = "http://odp.fr18.mmarket.com/t.do?requestid=app_order&payMode=1&goodsid=999100007430508100001910989300002797930&MD5="
            this.clickReportInApp(durl)
        },
        //app端内下载埋点
        async clickReportInApp(downUrl){
            let heTime = utility.getCurrentTimeInfo()
            heTime = heTime.year + heTime.month + heTime.date + heTime.hour + heTime.min + heTime.second
            const signitrue = this.getSignitrue(heTime)
            const sourceid = GetUrlParam('sourceid') || '001065'
            //终端用户标识
            let userAppId = utility.getSessionStorage(USERTYPE)
            if (!userAppId) {
                const value = utility.getUUId()
                userAppId = value
                utility.setSessionStorage(USERTYPE, value)
            }
            const meUrl = window.location.href
            const obj = {
                "portalType": "1",
                "userId": -1,
                "mobile": this.mobile,
                "columnCode": "1483_2214",//写死
                "resType": 101,
                "columnPath": '1483_2214_101',
                "resName": downUrl,//
                "timestamp": heTime,
                "accountTypeTag": sourceid,
                "signitrue": signitrue,
                "sessionid":userAppId
            }
            try {
                const res = await goodsApi.clickReport(obj)
                return new Promise((resove,reject)=>{
                    resove(res)
                })
            } catch (error) {
                return new Promise((resove,reject)=>{
                    reject(false)
                })
            }
        },
        getAppInfoInMmApp(){
            this.packagename="com.whty.wicity.china"
            const durl = "http://odp.fr18.mmarket.com//t.do?requestid=app_order&payMode=1&goodsid=999100007430508100001910989300002797930&MD5="
            const app = {
                packagename:"com.whty.wicity.china",
                url:durl,
                contentId:"300002797930",
                ver:"2100",
                size: "9258",
                title: "和生活",
                icon: "http://u5.fr18.mmarket.com//rs//gcenter2//data//300002797930//100//202004220273708_300002797930//logo.png"
            }
            this.apps.push(app)
            try {
                //传空置 否则会在7.3版本报解析错误 和提示播放流量的问题
                window.androidmm.openMusic('', '', 1)
                this.inAppType = 'MM'
            } catch (error) {
                // console.log(error)
            }
            this.checkInAppType(this.inAppType=='MM')
            // try {
            //     // const a = {}
            //     // window. external.call("installApp",a,"")
            //     const appinfo = window.external.getAppStatusId(app.packagename, app.ver,durl)
            //     console.log('appinfo=',appinfo)
            // } catch (error) {
            //     console.log(error)
            // }
            //获取安装应用的状态
            this.getAppStatusId(app)
            //获取到安装与否的状态
            if(this.appStatusId){
                this.inMMApp = true
                this.$nextTick(()=>{
                    const m = this.$refs.appSchemeCom
                    m.initAppInCom()
                })
            } 
        },
        async getDownloadUrlHandler(){
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '下载中...',
            })
            const that = this
            const areaid = utility.getcookie('areaID') || "440100"
            const channelId = GetUrlParam('channelId')
            let obj = {'platform':'Android','areaid': areaid,'channelId':''}
            if(this.isAndroid){
                obj.platform = 'Android'
                // 安卓要拼接渠道id
                if(channelId){
                    obj['channelId']=channelId
                }
            }else if(this.isIOS){
                obj.platform = 'iPhone'
            }
            try {
                const res = await goodsApi.getDownloadUrl(obj)
                that.$toast.clear()
                var downUrl = res
                console.log(res)
                //埋点解耦 不和返回url搭上关系
                const cress = await that.clickReportInApp()
                if(res.returnCode=='001000'){
                    downUrl = downUrl.data.clientVersion.download_url
                    return new Promise((resove,reject)=>{
                        //统计埋点成功
                        resove(downUrl)
                    })
                   
                }
                
            } catch (error) {
                console.log(error)
            }
           
        },
        getSignitrue(timestamp){
            var AppKey = '11616936CF66A4582085F76E9870B842'
            var requestUrl = '/AppClientServer/service/v6c/res/clickReport'
            var str = AppKey + '#' + timestamp + '#' + requestUrl
            return myEncryption.md5encode(str)
        }
    }
}
