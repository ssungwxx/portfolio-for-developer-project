<template>
  <div class="box">
    <span class="prev arrow" @click="handlePrev"></span>
    <span class="next arrow" @click="handleNext"></span>
    <transition-group name="list" class="list" tag="ul" :style="`height: ${itemOptions.maxSize}px`">
      <slot></slot>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    reduce: {
      type: Number,
      default: 20
    },
    visibleItem: {
      type: Number,
      default: 7,
    }
  },
  data() {
    return {
      itemOptions: {
        maxSize: '100px',
      },
      activeIndex: Math.floor(this.visibleItem / 2),
      showList: [],
      list: 0
    }
  },
  mounted() {
    if (this.isLessShowNum) { // 如果实际展示list小于visibleItem, 将list的长度重置为visibleItem, 并改变activeIndex的计算基准为实际list的长度
      this.activeIndex = Math.floor(this.getChildrenLength / 2)
      this.list = this.visibleItem; 
    } else this.list = this.getChildrenLength;
    this.getMaxSize();
  },

  computed: {
    isLessShowNum() {
      return  this.getChildrenLength < this.visibleItem;
    },
    getChildrenLength() {
      return this.$children[0].$children.length;
    }
  },

  methods: {
    getMaxSize() {
      const {visibleItem, reduce} = this;

      const ulWidth = document.querySelector('.list').clientWidth;
      let total = 0;
      for(let i = 1; i <= Math.floor(visibleItem / 2); i++) {
        total += i * reduce * 2;
      }
      if (visibleItem % 2 === 0 || (this.isLessShowNum && this.getChildrenLength % 2 === 0)) { // 如果展示个数为偶数，则所有item一样大小
        this.itemOptions.maxSize = (ulWidth - (visibleItem - 1) * 5) / visibleItem;
      } else {
        this.itemOptions.maxSize = (ulWidth - (visibleItem - 1) * 5 + total) / visibleItem; //(visibleItem - 1) * 5: 中间margin-right： 5px
      }

      this.updateShowList();
    },
    updateShowList() {
      const { reduce, list, itemOptions, visibleItem } = this;
      for (let i = 0; i < list; i ++) { // 默认填充为0
        this.showList.splice(i, 1, 0);
      }

      if (visibleItem % 2 === 0 || (this.isLessShowNum && this.getChildrenLength % 2 === 0)) {
        this.$set(this.showList, this.activeIndex, itemOptions.maxSize);
        this.$set(this.showList, this.activeIndex + 1, itemOptions.maxSize);
        for (let i = 1; i <= Math.floor(visibleItem / 2) - 1; i++) { // Math.floor(visibleItem / 2) - 1: 减去中间已经设置好的两张
          this.$set(this.showList, this.activeIndex - i, Math.floor(itemOptions.maxSize));
          this.$set(this.showList, this.activeIndex + i + 1, Math.floor(itemOptions.maxSize));
        }
      } else {
        this.$set(this.showList, this.activeIndex, itemOptions.maxSize);
        for (let i = 1; i <= Math.floor(visibleItem / 2); i++) {
          this.$set(this.showList, this.activeIndex - i, Math.floor(itemOptions.maxSize - i * reduce));
          this.$set(this.showList, this.activeIndex + i, Math.floor(itemOptions.maxSize - i * reduce));
        }
      }
      
    },
    handleNext() {
      if (this.showList[this.showList.length - 1]) {
        return false;
      } else {
        this.activeIndex = this.activeIndex + 1;
        this.updateShowList();
      }
    },
    handlePrev() {
      if (this.showList[0]) {
        return false;
      } else {
        this.activeIndex = this.activeIndex - 1;
        this.updateShowList();
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  position: relative;
  padding: 0 20px;
}
.arrow {
  position: absolute;
  border: 6px solid transparent;
  border-top-color: #bbb;
  top: 50%;
  margin-top: -6px;
}
.prev {
  left: 0;
  transform: rotate(90deg);
}
.next {
  right: 0;
  transform: rotate(-90deg);
}
ul {
  list-style: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

