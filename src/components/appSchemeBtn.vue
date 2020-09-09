<template>
    <div>
        <template v-if="!isOnlyBtn">
            <div class="com-appScheme-btn down-app-wrap">
                <div class="logo">
                    <!-- <van-icon size="0.6rem" color="#ccc" name="clear" @click="close" /> -->
                    <img src="../assets/logo.png" alt="" class="logo">
                    <span class="txt">和生活（5G版）</span>
                </div>
                <div v-if="!inMMApp" id="ios-copy-node-ele" size="small" type="danger" @click="callAppInH5" class="vanbutton">
                    立即打开
                </div>
                <div v-if="inMMApp" class="down-app mm-app">
                    <h5appbtn ref="comh5btn" :packagename="packagename" :apps="apps" @downEvent="downAppEvent"></h5appbtn>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-if="!inMMApp" class="startBtn" size="small" type="danger" @click="callAppInH5">
                {{ btnText }}
            </div>
            <div v-if="inMMApp" class="down-app mm-app">
                <h5appbtn ref="comh5btn" :apps="apps" @downEvent="downAppEvent"></h5appbtn>
            </div>
        </template>
    </div>
</template>

<script>
import h5appbtn from '@/components/index'
export default {
    name: "AppSchemeBtn",
    data() {
        return {
            
        }
    },
    components: {
        h5appbtn
    },
    props:{
        apps:{
            type:Array,
            default(){
                return []
            }
        },
        isOnlyBtn:{
            type:Boolean,
            default:false
        },
        inMMApp:{
            type:Boolean,
            default:false
        },
        btnText:{
            type:String,
            default:'立即打开'
        }
    },
    methods: {
        downAppEvent(){
            this.$emit('downAppEventInMMApp')
        },
        callAppInH5(){
            this.$emit('callAppInH5')
            // if(this.isWeixin){
            //     this.$toast('请点击右上角，选择"浏览器中打开"')
            //     return
            // }
            // let url = window.location.href
            // url = url.replace(/&shareByClient=2/,'')
            // url = url.replace(/&shareByClient=1/,'')
            // const a = encodeURIComponent(url)
            // //按最新的5.1，resType=1的应用资源和resType=3的商品资源，都会默认展示分享和收藏按钮
            // const res = '?resType=3' + '&url='+a
            // const aiso = encodeURIComponent(url)
            // const that = this
            // const obj = {
            //     androidScheme:'life://browser'+res,
            //     iosScheme:'cmicity://columnDetail?url='+aiso+'&showCollect=1&showShare=1',
            //     calback:that.unopenH5Callback()
            // }
            // this.openH5(obj)
        },
        initAppInCom(){
            this.$nextTick(()=>{
                const m = this.$refs.comh5btn
                m.initApp() 
            })
        },
        unopenH5Callback(){
            // let a = window.location.href
            // a = a.replace(/&shareByClient=2/,'')
            // a = a.replace(/&shareByClient=1/,'')
            // a = encodeURIComponent(a)
            // const obj = {
            //     androidBackUrl:a,
            //     iosdBackUrl:a
            // }
            // this.unopenH5Mixin(obj)
        },
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style>
 .com-appScheme-btn{
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 25px;
   height: 92px;
   background: rgba(0,0,0,0.5);
 }
 .logo{
       display: flex;
       align-items: center;
 }
 .logo img{
    width: 63px;
    height: 63px;
 }
 .txt{
           font-size: 19px;
            font-weight: 400;
            color: #ffffff;
            margin-left: 25px;
       }
       .vanbutton{
           display: flex;
       align-items: center;
        justify-content:center;
       background-color: #f6595b;
       border: 1px solid #f6595b;
       text-align: center;
        height: 50px;
        border-radius: 7px;
        padding: 0 15px;
        line-height: 50px;
        color: #ffffff;
       }
.down-app {
         width: 146px;
      }
      .down-app-wrap {
      position: relative;
      }

</style>