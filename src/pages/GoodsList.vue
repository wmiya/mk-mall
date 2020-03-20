<template>
  <div>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <!--nav filter -->
        <nav-filter @showFilterPop='handleClick'
                    @sort='handleSort' />
        <div class="accessory-result">
          <!--price filter -->
          <filter-price :class="{'filterby-show':filterBy}"
                        @setPriceFilter='setPriceFilter' />
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodList"
                    :key="item.productId">
                  <div class="pic">
                    <a :href="item.productUrl">
                      <img v-lazy="'static/'+item.productImage"
                           alt="">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">${{item.salePrice }}</div>
                    <div class="btn-area">
                      <a href="javascript:;"
                         @click="addCart(item.productId)"
                         class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="view-more-normal"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="20">
              <img src="../assets/loading-spinning-bubbles.svg"
                   v-show="loading">
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal v-bind:mdShow="mdShow"
           v-on:close="closeModal">
      <template v-slot:message>
        <p>
          请先登录,否则无法加入到购物车中!
        </p>
      </template>
      <template v-slot:btnGroup>
        <div>
          <a class="btn btn--m"
             href="javascript:;"
             @click="mdShow = false">关闭</a>
        </div>
      </template>
    </modal>
    <modal v-bind:mdShow="mdShowCart"
           v-on:close="closeModal">

      <template v-slot:message>
        <p>
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成!</span>
        </p>
      </template>
      <template v-slot:btnGroup>
        <div>
          <a class="btn btn--m"
             href="javascript:;"
             @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red"
                       href="javascript:;"
                       to="/cart">查看购物车</router-link>
        </div>
      </template>

    </modal>
    <div class="md-overlay"
         v-show="overLayFlag"
         @click.stop="closePop"></div>
  </div>
</template>
<script>

import NavBread from '@/components/NavBread'
import NavFilter from '@/components/GoodsList/NavFilter'
import FilterPrice from '@/components/GoodsList/FilterPrice'
export default {
  name: 'GoodsList',
  components: {
    NavBread,
    NavFilter,
    FilterPrice,
  },
  data () {
    return {
      goodList: [],
      filterBy: false,
      overLayFlag: false,
      page: 1,
      pageSize: 8,
      sortFlag: true,
      busy: true,
      priceChecked: 'all',
      loading: false,
      mdShow: false,
      mdShowCart: false
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList (flag) {
      this.loading = true
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      let { data: { status, result } } = await this.axios('/goods/list', {
        params: params
      })
      if (status === 0) {
        this.loading = false
        if (flag) {
          this.goodList = this.goodList.concat(result.list)
          this.busy = result.count === 0 ? true : false
        } else {
          this.goodList = result.list
          this.busy = false
        }
      } else {
        this.goodList = []
      }
    },
    handleClick () {
      this.filterBy = true
      this.overLayFlag = true

    },
    handleSort () {
      this.page = 1;
      this.sortFlag = !this.sortFlag
      this.getGoodsList()
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 500);
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.page = 1;
      this.getGoodsList()
    },
    // 加入购物车逻辑
    async  addCart (productId) {
      let { data: { status } } = await this.axios.post('/goods/addCart', {
        productId: productId
      })
      if (status === 0) {
        this.mdShowCart = true
      } else {
        this.mdShow = true

      }
    },
    closeModal () {
      this.mdShow = false
      this.mdShowCart = false;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/css/product.css";
</style>

