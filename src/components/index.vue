<template>
    <div class="comfirm-h5-app">
        222
    </div>
</template>

<script>
export default {
    name: 'App',
    props: {
        apps: {
            type: Array,
            default:()=>{
                return []
            }
        },
    },
    data() {
        return {
            downTxt:'下载',
            isClickDown:false,
            timer:null,
            packagename:''
        }
    },
    mounted() {
        this.packagename = this.apps[0].packagename
        this.timer = setInterval(()=>{
            const t = this.$refs.downTxt.innerText
            const st = this.downTxt
            if(t!=st && !this.isClickDown){
                this.$emit('downEvent')
                this.isClickDown = true
                clearInterval(this.timer)
            }
        },1000)
    },
    methods: {
        initApp(){
            const APP = this.apps
            console.log('app=',APP)
            try {
                const a =  new AppManager({
                    data: APP
                })
                console.log('a=',a)
            } catch (error) {
                console.log(error)
            }
        },
        clickApp(){

        },
        getAppStatusId(){
            
        }
    }
}
</script>


