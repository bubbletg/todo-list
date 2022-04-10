<template>
  <div class="addtodo">
    <!-- 添加标题 -->
    <div class="flex justify-between">
      <div class="addtodo_name flex justify-start align-center">
        <span class="addtodo_name_icon" />
        <input
          v-model="name"
          placeholder="准备做什么？"
        >
      </div>
      <div
        class="addtodo_add"
        @click="addTodo"
      >
        添加
      </div>
    </div>
    <!-- 添加描述 -->
    <div class="addtodo_describe">
      <Field
        v-model="describe"
        rows="1"
        autosize
        type="textarea"
        placeholder="添加描述"
        maxlength="50"
      >
        <template #right-icon>
          <i
            v-show="describe.trim() !== ''"
            class="iconfont icon-shanchu"
            @click="describe = ''"
          />
        </template>
      </Field>
    </div>
    <!-- 选择时间 -->
    <div class="addtodo_time">
      <div
        v-for="item in selectTimeList"
        :key="item"
        class="addtodo_time_btn"
        :class="isselectTime === item ? 'addtodo_time_btn-active' : ''"
        @click="selectTime(item)"
      >
        {{ item }}
      </div>
    </div>
    <!-- 添加目标 -->
    <div class="addtodo_countDown flex flex-column">
      <div
        v-show="isselectTime==='没有日期'"
        class="flex justify-between align-center"
      >
        <span
          v-for="item in list1"
          :key="item"
          class="addtodo_countDown_item"
          :class="list1V === item ? 'addtodo_countDown_item-active' : ''"
          @click="list1V = item"
        >{{ item }}</span>
      </div>
      <div class="flex justify-between align-center">
        <span
          v-for="item in list2"
          :key="item"
          class="addtodo_countDown_item list2"
          :class="list2V === item ? 'addtodo_countDown_item-active' : ''"
          @click="list2V = item"
        >{{ item }}</span>
      </div>
      <div
        v-show="list2V === '自定义'"
        class="flex justify-center align-center"
      >
        <input
          v-model="timeValue"
          placeholder="请输入"
          type="number"
        >分钟
      </div>
    </div>
    <!-- 更多 -->
    <div
      v-if="list1V != '倒计时'"
      class="addtodo_more"
    >
      <div
        v-if="isShow1"
        class="more"
      >
        <div>
          我想在<span @click="isShowCalendar = true">{{ setTarget }}</span>之前
        </div>
        <div>
          一共完成
          <input
            v-model="targetNum"
            class="targetNum"
            type="number"
            placeholder="请输入"
          >
          <input
            v-model="targetUnit"
            class="unit"
            @focus="targetUnit = ''"
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
                v-for="item in ['每天', '每周', '每月', '每年', '艾宾浩斯']"
                :key="item"
                :class="setRepetition === item ? 'active' : ''"
                @click="setRepetition = item"
              >{{ item }}</span>
            </div>
            <div
              v-if="setRepetition == '每周'"
              class="more_week_item flex justify-between align-center"
            >
              <span
                v-for="(item, index) in ['一', '二', '三', '四', '五', '六', '七']"
                :key="item"
                :class="setweek === index + 1 ? 'active' : ''"
                @click="setweek = index + 1"
              >{{ item }}</span>
            </div>
            <div
              v-if="setRepetition == '每月'"
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
          >
          <input
            v-model="targetUnit"
            class="unit"
            @focus="targetUnit = ''"
          >
        </div>
      </div>
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
import { ref, reactive, watchEffect } from '@vue/runtime-core'
import { Toast, Field, Calendar } from 'vant'
import { apiAddTodo } from '@/api/todo'

const isselectTime = ref('')
const predictStartTime = ref<string>('')
const predictEndTime = ref<string>('')
const selectTimeList = reactive(['今天', '明天', '选择日期', '没有日期'])
const isShowCalendar = ref(false)
const list1 = ref<string[]>(['倒计时', '定目标', '养习惯'])
const list1V = ref<string>('倒计时')
const list2 = ref<string[]>(['25分钟', '45分钟', '自定义', '正计时', '不计时'])
const list2V = ref<string>('25分钟')
const timeValue = ref<number>()
const isShow1 = ref(true)
const setRepetition = ref<string>('')
const setweek = ref<number>(1)
const setMonth = ref<number>()
const setTarget = ref<string>('设置目标日期')
const targetNum = ref<number>()
const targetUnit = ref<string>('次')

watchEffect(() => {
  if (isselectTime.value !== '没有日期') {
    list1V.value = '倒计时'
    list2V.value = '25分钟'
  }
})

// 通过时间组件选择日期
const onConfirm = (value: Date) => {
  isShowCalendar.value = false
  predictStartTime.value = moment(value).format('YYYY-MM-DD HH:mm:ss')
  predictEndTime.value = ''
  // 定目标 设置目标日期时候触发
  if (isShow1.value) {
    predictStartTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
    setTarget.value = moment(value).format('YYYY年MM月DD日')
    predictEndTime.value = moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
  // 养习惯 设置每年日期时候触发
  if (setRepetition.value === '每年') {
    predictStartTime.value = moment(value).format('YYYY-MM-DD HH:mm:ss')
    setTarget.value = moment(value).format('YYYY年MM月DD日')
    predictEndTime.value = moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
}
// 切换时间
const selectTime = (item: string) => {
  isselectTime.value = item
  predictStartTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
  switch (item) {
    case '今天':
      predictEndTime.value = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      break
    case '明天':
      predictEndTime.value = moment().add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      break
    case '选择日期':
      isShowCalendar.value = true
      break
    default: // 默认没有日期
      predictStartTime.value = ''
      predictEndTime.value = ''
      break
  }
}

// ----- 下面是添加todo逻辑
const emit = defineEmits(['addCallback'])
/**
 * 添加todo
 *  逻辑说明：
 * 1.用户选择了时间，并且是今天，明天，选择日期，则不需要设置倒计时，定目标，养习惯
 *    这个时候的预计开始与预计结束时间为选择的时间
 * 2.用户选择了没有日期，则需要设置倒计时，定目标，养习惯
 *    当选择定目标时候，需要设置预计开始时间为当前时间，预计结束时间为选择的目标时间
 *    当用户选择的是养习惯时候，需要设置预计开始时间为当前设置的开始时间，预计结束时间为选择的结束时间
 *
 */
const addTodo = () => {
  if (name.value.trim() === '') {
    Toast('请输入待办名称！')
    return
  }
  let timeValueType = 0

  switch (list1V.value) {
    case '倒计时':
      timeValueType = 0
      break
    case '定目标':
      timeValueType = 1
      break
    case '养习惯':
      timeValueType = 2
      break
  }
  switch (list2V.value) {
    case '25分钟':
      timeValue.value = 25
      break
    case '45分钟':
      timeValue.value = 45
      break
    case '正计时':
      timeValueType = 3
      break
    case '不计时':
      timeValueType = 4
      break
  }

  let repetitionValue: number|undefined = 0
  let repetitionType: number = 0
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
      repetitionValue = setMonth.value
      break
    case '每年':
      repetitionType = 4
      repetitionValue = 365
      break
    case '艾宾浩斯':
      repetitionType = 5
      repetitionValue = -1
      break
  }

  // 调用添加方法
  apiAddTodo({
    name: name.value,
    describe: describe.value,
    predictStartTime: predictStartTime.value,
    predictEndTime: predictEndTime.value,
    startTime: predictStartTime.value,
    endTime: predictEndTime.value,
    timeValue: timeValue.value ? timeValue.value : 0,
    timeValueType,
    repetitionType,
    repetitionValue,
    accomplishCount: targetNum.value,
    accomplishCountType: targetUnit.value
  }).then(() => {
    emit('addCallback')
  })
  // 重置
  resetValue()
}
function resetValue () {
  isselectTime.value = ''
  name.value = ''
  describe.value = ''
  list1V.value = '倒计时'
  list2V.value = '25分钟'
  timeValue.value = undefined
  setRepetition.value = ''
  setweek.value = 1
  setMonth.value = undefined
  setTarget.value = '设置目标日期'
  targetNum.value = undefined
  targetUnit.value = '次'
}
// todo 标题
const name = ref<string>('')
// 描述
const describe = ref<string>('')

watchEffect(() => {
  if (list1V.value === '定目标') {
    isShow1.value = true
  }
  if (list1V.value === '养习惯') {
    isShow1.value = false
  }
  // 打开日历
  if (setRepetition.value === '每年') {
    isShowCalendar.value = true
  }
})

</script>

<style lang="scss" scoped>
.addtodo {
  margin: 15px;
  .addtodo_name {
    height: 30px;
    &_icon {
      background-color: pink;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      margin-right: 10px;
    }
    > input {
      color: #000;
    }
  }
  .addtodo_add {
    color: $g-blue;
    margin-right: 10px;
  }
  .addtodo_describe {
    min-height: 30px;
    max-height: 90px;
    line-height: 30px;
    border-bottom: 1px solid $g-blue;
    overflow: hidden;
  }
  .addtodo_time {
    border-bottom: 1px solid $g-blue;
    &_btn {
      display: inline-block;
      margin: 10px 10px 10px 0;
      height: 20px;
      line-height: 20px;
      padding: 0 5px;
      border-radius: 4px;
      font-size: 13px;
      background-color: rgb(189, 187, 187);
      &-active {
        background-color: $g-blue;
        color: #fff;
      }
    }
  }
  .addtodo_countDown {
    div {
      margin: 10px;
    }
    &_item {
      margin: 0 9px;
      padding: 10px 5px;
      background-color: gray;
      border-radius: 10px;
      font-size: 16px;
      &-active {
        background-color: $g-blue;
        color: #fff;
      }
    }
    .list2 {
      margin: 0 8px;
      font-size: 10px;
    }
  }
  .addtodo_more {
    &_btn {
      display: inline-block;
      margin: 10px 10px 10px 0;
      height: 25px;
      line-height: 25px;
      padding: 0 5px;
      border-radius: 10px;
      font-size: 13px;
      background-color: rgb(242, 234, 234);
      color: $g-blue;
    }
    &_content {
      height: 100px;
    }
  }
}
.more {
  margin: 10px;
  > div {
    padding: 10px 0;
    span {
      display: inline-block;
      margin: 2px;
      background-color: $g-blue;
      border-radius: 4px;
      color: #fff;
    }
    .targetNum,
    .unit {
      margin: 2px;
      display: inline-block;
      color: #ccc;
      background-color: $g-blue;
      border-radius: 4px;
      width: 80px;
    }
    .unit {
      font-size: 12px;
      width: 30px;
    }
    .more_repetition {
      &_item,
      .more_week_item {
        background-color: #fff;
        border: 1px solid $g-blue;
        border-radius: 10px;
        font-size: 16px;
        span {
          padding: 5px 10px;
          display: inline-block;
          background-color: #fff;
          border-radius: 4px;
          color: black;
        }
        span.active {
          background-color: $g-blue;
          color: #fff;
        }
      }
      .more_week_item {
        background-color: #fff;
        border: none;
        font-size: 16px;
        span {
          margin-top: 10px;
          border: 1px solid $g-blue;
          border-radius: 20px;
        }
      }
      .more_month_item {
        margin-top: 10px;
        input {
          width: 50px;
          margin: 0 10px;
          background-color: $g-blue;
        }
      }
    }
  }
}
</style>
