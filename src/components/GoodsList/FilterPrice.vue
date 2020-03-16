<template>
  <div class="filter stopPop"
       id="filter">
    <dl class="filter-price">
      <dt>Price:</dt>
      <dd><a href="javascript:void(0)"
           :class="{'cur':priceChecked=='all'}">All</a></dd>
      <dd v-for="(item,index) in priceFilter"
          :key="index">
        <a @click="handelClick(index)"
           href="javascript:void(0)"
           :class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'FilterPrice',
  data () {
    return {
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
        },
      ],
      priceChecked: 'all',
    }
  },
  methods: {
    handelClick (val) {
      this.priceChecked = val
    }
  }
}
</script>