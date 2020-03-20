<template>
  <div class="filter-nav">
    <span class="sortby">Sort by:</span>
    <a href="javascript:void(0)"
       class="default cur">Default</a>
    <a href="javascript:void(0)"
       @click="handleSort"
       class="price">Price <svg class="icon icon-arrow-short"
           :class="{'sort-up':!sortFlag}">
        <use xlink:href="#icon-arrow-short"></use>
      </svg></a>
    <a href="javascript:void(0)"
       class="filterby stopPop"
       @click.stop="handleClick">Filter by</a>
  </div>
</template>
<script>
export default {
  name: 'NavFilter',
  data () {
    return {
      sortFlag: true
    }
  },
  methods: {
    handleClick () {
      this.$emit('showFilterPop')
    },
    handleSort () {
      this.sortFlag = !this.sortFlag
      this.$emit('sort')
    }
  }
}
</script>
<style>
.sort-up {
  transform: rotate(180deg);
  transition: all 0.3s ease-out;
}
</style>