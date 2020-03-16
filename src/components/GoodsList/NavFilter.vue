<template>
  <div class="filter-nav">
    <span class="sortby">Sort by:</span>
    <a href="javascript:void(0)"
       class="default cur">Default</a>
    <a href="javascript:void(0)"
       class="price">Price <svg class="icon icon-arrow-short">
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
  methods: {
    handleClick () {
      this.$emit('showFilterPop')
    }
  }
}
</script>