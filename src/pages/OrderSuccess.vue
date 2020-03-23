<template>
  <div>
    <div>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png"
                 alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：{{orderId}}</span>
              <span>Order total：{{orderTotal |currency('$') }}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link to="/cart"
                             class="btn btn--m">Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link to="/"
                             class="btn btn--m">Goods List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OrderSuccess',
  data () {
    return {
      orderId: '',
      orderTotal: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      let orderId = this.$route.query.orderId
      if (!orderId) {
        return;
      }
      let { data: { status, msg, result } } = await this.axios.get('/users/orderDetail', {
        params: {
          orderId: orderId
        }
      })
      if (status === 0) {
        this.orderId = result.result
        this.orderTotal = result.orderTotal
      } else {
        alert(msg)
      }
    }
  }
}
</script>