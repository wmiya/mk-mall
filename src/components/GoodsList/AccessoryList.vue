<template>
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
                 class="btn btn--m">加入购物车</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goodList: Array
  },
  name: 'AccessoryList'
}
</script>