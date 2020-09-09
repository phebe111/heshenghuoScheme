<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <appSchemeBtn ref="appSchemeCom" :apps="apps" :in-m-m-app="inMMApp"
      @callAppInH5="callAppInH5Handler"
      @close="closeAppScheme"
      @downAppEventInMMApp="downAppEventInMMAppHandler">
    </appSchemeBtn>
  </div>
</template>

<script>
import appSchemeBtn from '@/components/appSchemeBtn'
import appSchemeMixin from '@/mixins/appScheme.js'
export default {
  name: 'HelloWorld',
  mixins:[appSchemeMixin],
  data () {
    return {
      msg: '和生活调起下载测试',
      apps:[]
    }
  },
  components:{
    appSchemeBtn
  },
  methods: {
    closeAppScheme(){
    this.shareByClientTag=false
    },
    callAppInH5Handler(){
    //结合自己的业务修改
    this.callAppInH5()
    },
    downAppEventInMMAppHandler(){
    this.downAppEvent()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
