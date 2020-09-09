import request from '@/utils/request'

export default class goodsApi {
    // 商品详情接口
    static getdetail  = (params) => {
        return request({
            url: '/mall/goods/getdetail',
            method: 'post',
            data: params,
        })
    }
    // 商品收藏
    static doCommodityCcollection  = (params) => {
        return request({
            url: '/mall/collect/goods/do',
            method: 'post',
            data: params,
        })
    }
     // 商品收藏取消
     static quitCommodityCcollection  = (params) => {
         return request({
             url: '/mall/collect/goods/quit',
             method: 'post',
             data: params,
         })
     }
     // 商品收藏状态查询接口
     static getCommodityCcollectionStatus  = (params) => {
         return request({
             url: '/mall/collect/goods/getstatus',
             method: 'post',
             data: params,
         })
     }
      // 商品收藏列表
      static getCommodityCollectionList  = (params) => {
          return request({
              url: '/mall/collect/goods/list',
              method: 'post',
              data: params,
          })
      }
       // 2.1库存实时查询接口
       static querybyskuid  = (params) => {
           return request({
               url: '/mall/stock/querybyskuid',
               method: 'post',
               data: params,
           })
       }
        // 3.1立即购买接口 2020-3-16修改
        static orderBuynow  = (params) => {
            return request({
                url: '/mall/order/do',
                method: 'post',
                data: params,
            })
        }
        //权益中心支付 开发中
        static orderPowerBuynow  = (params,backUrl) => {
            if(!backUrl){
                return request({
                    url: '/mall/order/buynow',
                    method: 'post',
                    data: params,
                })
            }else{
                return request({
                    url: '/mall/order/buynow?'+backUrl,
                    method: 'post',
                    data: params,
                })
            }
        }
        //权益中心支付 ，支持活动类型购买
        static yqxfOrderBuynow  = (data,activityId) => {
            return request({
                url: '/mall/order/buynow?activityId='+activityId,
                method: 'post',
                data:data
            })
        }
        //3.2结算接口
        static orderDopay  = (params) => {
            return request({
                url: '/mall/order/dopay',
                method: 'post',
                data: params,
            })
        }
        // 3.7支付结果查询接口
        static getPaystatus  = (params) => {
            return request({
                url: '/mall/order/getpaystatus',
                method: 'post',
                data: params,
            })
        }
        // 获取aes密匙
        static getAesKeys  = () => {
            return request({
                url: '/login/getPubKey',
                method: 'get',
            })
        }
         // 单点登录接口
         static singleSignOn  = (params) => {
             return request({
                 url: '/convergence/getTicket',
                 method: 'get',
                 params: params,
             })
         }
    //查询产品是否过期 是否是会员
     static getQueryMember = (params) => {
         return request({
             url: '/mall/m5glife/queryMember',
             method: 'post',
             data: params,
         })
     }
     //查询产品是否购买
     static getQuerybypid = (params) => {
         return request({
             url: '/mall/m5glife/order/status/querybypid',
             method: 'post',
             data:params,
         })
     }
     //查询产品是否购买
     static getUnsubscribe = (params) => {
         return request({
             url: '/mall/order/tpct/unsubscribe',
             method: 'post',
             data:params,
         })
     }
    // 3.4我的订单详情
    static getorderDetail  = (params) => {
        return request({
            url: '/mall/order/getdetail',
            method: 'post',
            data: params,
        })
    }
    // 获取栏目资源接口
    static getColumnAndRes  = (params) => {
        return request({
            url: '/columnRes/getColumnAndRes/isIncludeParea/2/portalType/1/regionId/1/column/'+params,
            method: 'get',
        })
    }
    //埋点统计
    static clickReport  = (data) => {
        return request({
            url: '/AppClientServer/service/v6c/res/clickReport',
            method: 'post',
            data:data
        })
    }
    //渠道分包
    static getDownloadUrl  = (data) => {
        return request({
            url: '/getDownloadUrl',
            method: 'post',
            data:data
        })
    }
}