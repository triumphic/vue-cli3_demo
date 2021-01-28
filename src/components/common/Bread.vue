<template>
  <ul class="cli-bread">
    <li v-for="(item, index) in breadcrumbArr" :key="index">
      <router-link
        class="elli"
        replace
        :to="item.path"
        v-text="item.name"
        v-title
      ></router-link>
      <ArrowRight class="cli-bread-curm" v-if="isLast(index)" />
    </li>
  </ul>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import ArrowRight from 'meri-design/lib/static/iconSvg/arrow_right.svg'
export default {
  data () {
    return {}
  },
  components: { ArrowRight },
  computed: {
    ...mapState(['breadcrumbArr'])
  },
  methods: {
    ...mapMutations(['changeBreadcrumb']),
    isLast (index) {
      return index !== this.breadcrumbArr.length - 1
    }
  }
}
</script>

<style lang="less">
.cli-bread {
  word-break: keep-all;
  display: flex;
  align-items: center;
  height: 24px;
  line-height: 24px;
  width: 100%;
  overflow: hidden;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: #8d9399;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100px;
      display: inline-block;
      &:not(:last-child):hover {
        color: #0091ff;
      }
      &:last-child {
        cursor: default;
        color: #1f2429;
      }
    }
  }
  &-curm {
    margin-left: 4px;
    margin-right: 4px;
    vertical-align: middle;
    width: 8px;
    height: 14px;
    margin-bottom: 2px;
  }
}
</style>
