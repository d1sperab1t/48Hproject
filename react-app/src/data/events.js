// tMinus = hours remaining when this event unlocks
// unlock happens when elapsed >= (48 - tMinus) hours

export const DAYS = [
  {
    id: 'day1',
    label: 'DAY 01 · 7月3日',
    accentClass: 'day3',
    banner: { num: '48', unit: '小时', sub: 'COUNTDOWN BEGINS · T-MINUS 48:00' },
    events: [
      {
        tMinus: 48, accentColor: '#E8FF00', countColor: '#E8FF00',
        phase: 'ARRIVAL / 抵达', nameLines: ['入住酒店', '探路者大礼包'], time: '14:00 · 倒计时正式开始',
        highlight: 'yellow',
      },
      {
        tMinus: 47, accentColor: '#E8FF00', countColor: '#E8FF00',
        phase: 'MISSION / 解密', nameLines: ['任务卡解密', '寻找莫干山传承人'], time: '15:00 · 领取大礼包',
      },
      {
        tMinus: 42, accentColor: '#1a1a1a', countColor: '#E8FF00',
        phase: 'DESIGN / 规划', nameLines: ['自主线路设计'], time: '20:00 · 夜间工作坊',
      },
      {
        tMinus: 40, accentColor: '#1a1a1a', countColor: '#E8FF00',
        phase: 'REST / 晚安', nameLines: ['晚安礼'], time: '22:00 · 夜间恢复',
      },
    ],
  },
  {
    id: 'day2',
    label: 'DAY 02 · 7月4日',
    accentClass: 'day4',
    banner: { num: '29', unit: '小时', sub: 'RACE DAY · T-MINUS 29:00', color: 'orange' },
    events: [
      {
        tMinus: 29, accentColor: '#FF4D1C', countColor: '#FF4D1C',
        phase: 'TRAINING / 训练', nameLines: ['山野视觉教学课程'], time: '09:00 · 专业技能强化',
      },
      {
        tMinus: 25, accentColor: '#FF4D1C', countColor: '#FF4D1C',
        phase: 'HYPOXIA / 训练', nameLines: ['被动训练', '高低氧循环'], time: '13:00 · 体能极限激活',
      },
      {
        tMinus: 22, accentColor: '#FF4D1C', countColor: '#FF4D1C',
        phase: 'RACE / 赛事', nameLines: ['落日追光跑'], time: '16:00 · 正式赛事开始',
        highlight: 'yellow',
      },
      {
        tMinus: 19, accentColor: '#1a1a1a', countColor: '#FF4D1C',
        phase: 'CEREMONY / 晚宴', nameLines: ['篝火晚会 · 晚宴', '分享会'], time: '19:00 · 故事交流夜',
      },
      {
        tMinus: 17, accentColor: '#1a1a1a', countColor: '#FF4D1C',
        phase: 'RECOVERY / 恢复', nameLines: ['运动恢复', '晚安礼'], time: '21:00 · 深度恢复',
      },
    ],
  },
  {
    id: 'day3',
    label: 'DAY 03 · 7月5日',
    accentClass: 'day5',
    banner: { num: '05', unit: '小时', sub: 'FINAL DAY · T-MINUS 05:00', color: 'blue' },
    events: [
      {
        tMinus: 5, accentColor: '#00C4FF', countColor: '#00C4FF',
        phase: 'TRIAL / 试跑', nameLines: ['设计路线试跑'], time: '09:00 · 实地验证',
      },
      {
        tMinus: 1, accentColor: '#00C4FF', countColor: '#00C4FF',
        phase: 'AWARD / 颁奖', nameLines: ['证书颁发', '认证总结会'], time: '13:00 · 毕业典礼',
      },
      {
        tMinus: 0, accentColor: '#00C4FF', countColor: '#00C4FF',
        phase: 'COMPLETE / 结束', nameLines: ['倒计时结束', '各自回程'], time: '14:00 · 任务完成',
        highlight: 'blue',
      },
    ],
  },
]
