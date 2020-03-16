<template>
  <div>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <!--nav filter -->
        <nav-filter @showFilterPop='handleClick' />
        <div class="accessory-result">
          <!--price filter -->
          <filter-price :class="{'filterby-show':filterBy}" />
          <!-- search result accessories list -->
          <accessory-list :goodList='goodList' />
          <div class="md-overlay"
               v-show="overLayFlag"
               @click.stop="closePop"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import NavBread from '@/components/NavBread'
import NavFilter from '@/components/GoodsList/NavFilter'
import AccessoryList from '@/components/GoodsList/AccessoryList'
import FilterPrice from '@/components/GoodsList/FilterPrice'
export default {
  name: 'GoodsList',
  components: {
    NavBread,
    NavFilter,
    FilterPrice,
    AccessoryList
  },
  data () {
    return {
      goodList: [],
      filterBy: false,
      overLayFlag: false,
      page: 1,
      pageSize: 8,
      sortFlag: true,
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: 'all'
      };
      let { data: { status, result } } = await this.axios.get('/goods/list', {
        params: param
      });
      if (status === 0) {
        this.goodList = result.list
      } else {
        this.goodsList = [];
      }
    },
    handleClick () {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop () {
      this.filterBy = false;
      this.overLayFlag = false;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/css/product.css";
</style>

