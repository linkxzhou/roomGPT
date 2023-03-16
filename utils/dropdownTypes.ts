export type themeType =
  | "现代|Modern"
  | "复古|Vintage"
  | "中式|Chinese"
  | "极简主义|Minimalist"
  | "专业|Professional"
  | "北欧|Nordic"
  | "波西米亚|Bohemia"
  | "热带风格|Tropical";

export type roomType =
  | "客厅|Living Room"
  | "餐厅|Dining Room"
  | "卧室|Bedroom"
  | "浴室|Bathroom"
  | "办公室|Office"
  | "厨房|Kitchen"
  | "游戏室|Gaming Room"
  | "书房|Study Room";


export type colorType =
  | "默认|"
  | "白色|White"
  | "天蓝色|SkyBlue"
  | "橙色|Orange"
  | "浅粉色|LightPink"
  | "粉色|Pink"
  | "浅绿色|LightGreen"
  | "绿色|Green"
  | "浅灰色|LightGrey"
  | "珊瑚色|Coral"
  | "小麦色|Wheat";

export const themes: themeType[] = [
  "现代|Modern",
  "复古|Vintage",
  "中式|Chinese",
  "极简主义|Minimalist",
  "专业|Professional",
  "北欧|Nordic",
  "波西米亚|Bohemia",
  "热带风格|Tropical",
];

export const rooms: roomType[] = [
  "客厅|Living Room",
  "餐厅|Dining Room",
  "卧室|Bedroom",
  "浴室|Bathroom",
  "办公室|Office",
  "厨房|Kitchen",
  "游戏室|Gaming Room",
  "书房|Study Room",
];

export const colors: colorType[] = [
  "默认|",
  "白色|White",
  "天蓝色|SkyBlue",
  "橙色|Orange",
  "浅粉色|LightPink",
  "粉色|Pink",
  "浅绿色|LightGreen",
  "绿色|Green",
  "浅灰色|LightGrey",
  "珊瑚色|Coral",
  "小麦色|Wheat",
];