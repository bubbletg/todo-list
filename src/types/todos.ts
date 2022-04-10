
export interface Todo {
  id?: number;
  name: string; // 标题
  describe: string; // 描述
  predictStartTime?: string; // 预计开始时间
  predictEndTime?: string; // 预计结束时间
  startTime?: string; // 实际开始时间
  endTime?: string; // 实际结束时间
  timeValue?: number; // 时间值 倒计时
  timeValueType?: number; // 倒计时类型  0 倒计时，1定目标，2养习惯，3正向计时，4不计时
  accomplishCount?: number; // 完成次数
  accomplishCountType?: string|undefined; // 完成次数单位
  repetitionType?: number; // 重复类型 0 不重复，1 每天，2 每周，3 每月，4 每年，5 艾宾浩斯
  repetitionValue?: number; // 重复值 0 每天，每周：1星期一 2星期二...，每月，365每年，-1 艾宾浩斯
}
