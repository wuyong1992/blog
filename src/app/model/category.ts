//分类



export class Category {
  id: number;
  parentId: number;      //父分类，上级分类id ，空表示该分类为一级分类
  name: string;           //分类名称
  status: number;         //分类状态，是否启用 0表示启用  1表示禁用
  sortOrder: number;      //排序字段
  createTime: Date;
  updateTime: Date;
}
