
const DEV = false
export default {
    data() {
        return {
            inMMApp:false,
            inAppType:'',//在客户端的类型
            apps: [],
            packagename:"",
            appStatusId:''
        }
    },
    async mounted() {

    },
    methods:{
        getAppStatusId(app){
            try {
                this.appStatusId =  window.mmutil.getAppStatusId (app.packagename, app.ver, app.url)
            } catch (e) {
                // console.log(e)
            }
        },
        initApp(){
            this.$nextTick(()=>{
                const m = this.$refs.comh5btn[0]
                m.initApp() 
            })
        },
        openInApp(APP){
            try {
                window.androidmm.openApp(APP.packagename)
            } catch (e) {
                console.log(e)
            }
           
        },
        downLoadAppInMm(app){
            try {
                window.androidmm.download(app.title,app.url,app.icon, '',app.packagename,app.size,
                    '0',false)
            } catch (error) {
                console.log(error)
            }    
        },
        downLoadAppInBaip(app){
            try {
                const size = Number(app.size)
                window.androidmm.download(app.title,app.url,app.icon, '',app.packagename,size,
                    '0',false,'',app.ver)
            } catch (error) {
                console.log(error)
            }   
            //白牌多两个参数的
            // try {
            //     window.androidmm.download('tasktag','durl','iconurl', 'reporturl','packagename','filesize',
            //         'price', 'canorder')
            //     this.inMMApp = true
            //     this.inAppType = 'BAIPAI'
            //     this.$nextTick(()=>{
            //         const m = this.$refs.comh5btn[0]
            //         m.initApp() 
            //     })
            // } catch (error) {
            //     console.log(error)
            // }
            // try {
            //     window.androidmm.download('tasktag','durl','iconurl', 'reporturl','packagename',10,
            //         'price', 'canorder','detailurl','version')
            //     this.inMMApp = true
            //     this.inAppType = 'BIBEI'
            //     this.$nextTick(()=>{
            //         const m = this.$refs.comh5btn[0]
            //         m.initApp() 
            //     })
            // } catch (error) {
            //     console.log(error)
            // }  
        },
        checkInAppType(isInMM){
            console.log('isInMM==',isInMM)
            //前置条件一定要排查是否是mm的
            if(!isInMM){
                try {
                    // 通过里面的appname的值是不是CMAS开头来区分是不是白牌，如果有，就是白牌
                    const ua = window.mmutil.getCustomHttpHeaders("")
                    const tag = ua.indexOf('CMAS')>-1
                    if(tag){
                        this.inAppType = 'BAIPAI'
                    }else{
                        this.inAppType = 'BIBEI'
                    }
                } catch (error) {
                    // console.log(error)
                }
                try {
                    const ua = navigator.userAgent
                    const tag = ua.indexOf('MMAssistant')>-1
                    if(tag){
                        this.inAppType = 'YDJX'
                    }
                } catch (error) {
                    // console.log(error)
                }
            }
            // try {//判断是否是白牌和必备（前置条件一定要排查是否是mm的-备选方案）
            //     window.mmlog.showSource('param')
            //     this.inAppType = 'BAIPAI'
            //     alert(this.inAppType)
            // } catch (error) {
            //     this.inAppType = 'BIBEI'
            //     console.log('this.inAppType=',this.inAppType)
            // }
        }
    }
}
