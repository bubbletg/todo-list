<template>
  <div
    v-if="isShow1"
    class="more"
  >
    <div>
      我想在<span @click="isShowCalendar=true">{{ setTarget }}</span>之前
    </div>
    <div>
      一共完成
      <input
        v-model="targetNum"
        class="targetNum"
        type="number"
        placeholder="请输入"
        @focus="targetNum=''"
      >
      <input
        v-model="targetUnit"
        class="unit"
        @focus="targetUnit=''"
      >
    </div>
  </div>
  <div
    v-else
    class="more"
  >
    <div>
      <div class="more_repetition">
        <div class="more_repetition_item flex justify-between align-center">
          <span
            v-for="item in ['每天','每周','每月','每年','艾宾浩斯']"
            :key="item"
            :class="setRepetition === item?'active':''"
            @click="setRepetition = item"
          >{{ item }}</span>
        </div>
        <div
          v-if="setRepetition=='每周'"
          class="more_week_item flex justify-between align-center"
        >
          <span
            v-for="(item,index) in ['一','二','三','四','五','六','七']"
            :key="item"
            :class="setweek === index+1?'active':''"
            @click="setweek = index+1"
          >{{ item }}</span>
        </div>
        <div
          v-if="setRepetition=='每月'"
          class="more_month_item flex justify-center align-center"
        >
          每月<input
            v-model="setMonth"
            type="number"
            placeholder="请输入"
          >号
        </div>
      </div>
    </div>
    <div>
      完成
      <input
        v-model="targetNum"
        class="targetNum"
        type="number"
        placeholder="请输入"
        @focus="targetNum=''"
      >
      <input
        v-model="targetUnit"
        class="unit"
        @focus="targetUnit=''"
      >
    </div>
  </div>
  <Calendar
    v-model:show="isShowCalendar"
    :show-confirm="false"
    @confirm="onConfirm"
  />
</template>
<script lang="ts" setup>
import moment from 'moment'
import { ref, watchEffect } from 'vue'
import { Calendar } from 'vant'
const props = defineProps({
  list1V: {
    type: String,
    default: ''
  }
})
const isShow1 = ref(true)
watchEffect(() => {
  if (props.list1V === '定目标') {
    isShow1.value = true
  }
  if (props.list1V === '养习惯') {
    isShow1.value = false
  }
})

const setRepetition = ref<string>('')
const setweek = ref<number>(1)
const setMonth = ref<number>()
const setTarget = ref<string>('设置目标日期')
const targetNum = ref<string>('填写完成量')
const targetUnit = ref<string>('次')
const isShowCalendar = ref<boolean>(false)

const emit = defineEmits(['outputData'])
watchEffect(() => {
  if (setRepetition.value === '每年') {
    isShowCalendar.value = true
  }
  let repetitionValue: number|undefined = 0
  let repetitionType: number = 0
  let repetitionValueTime: Date |null = null
  let targetTime:Date |null = new Date(setTarget.value)
  let targetTimeDesc = setTarget.value
  switch (setRepetition.value) {
    case '每天':
      repetitionValue = 0
      repetitionType = 1
      break
    case '每周':
      repetitionValue = setweek.value
      repetitionType = 2
      break
    case '每月':
      repetitionType = 3
      repetitionValue = setMonth.value !== undefined && setMonth.value !== null ? setMonth.value : 0
      break
    case '每年':
      repetitionType = 4
      repetitionValue = 365
      targetTime = null
      targetTimeDesc = ''
      repetitionValueTime = new Date(setTarget.value)
      break
    case '艾宾浩斯':
      repetitionType = 5
      repetitionValue = -1
      repetitionValueTime = new Date()
      break
  }
  emit('outputData', {
    repetitionType: repetitionType,
    repetitionValue: Number(repetitionValue),
    targetTime,
    targetTimeDesc,
    repetitionValueTime
  })
})

// 通过时间组件选择日期
const onConfirm = (value: Date) => {
  isShowCalendar.value = false
  // 定目标 设置目标日期时候触发
  if (isShow1.value) {
    setTarget.value = moment(value).format('YYYY年MM月DD日')
  }
  // 养习惯 设置每年日期时候触发
  if (setRepetition.value === '每年') {
    setTarget.value = moment(value).format('YYYY年MM月DD日')
  }
}
</script>

<style lang="scss" scoped>
.more{
  margin:10px;
  > div{
    padding:10px 0;
    span{
      display:inline-block;
      margin:2px;
      background-color:$g-blue;
      border-radius: 4px;
      color:#fff;
    }
    .targetNum,
    .unit{
      margin:2px;
      display:inline-block;
      color:#ccc;
      background-color:$g-blue;
      border-radius: 4px;
      width:80px;
    }
    .unit{
      font-size:12px;
      width:30px;
    }
    .more_repetition {
      &_item,
      .more_week_item{
        background-color:#fff;
        border: 1px solid $g-blue;
        border-radius: 10px;
        font-size:16px;
        span{
          padding:5px 10px;
          display:inline-block;
          background-color:#fff;
          border-radius: 4px;
          color:black;
        }
        span.active {
          background-color:$g-blue;
          color:#fff;
        }
      }
      .more_week_item{
        background-color:#fff;
        border:none;
        font-size:16px;
        span{
          margin-top: 10px;
          border: 1px solid $g-blue;
          border-radius: 20px;
        }
      }
      .more_month_item {
        margin-top: 10px;
        input {
          width:50px;
          margin:0 10px;
          background-color:$g-blue;
        }
      }

    }
  }
}
</style>
