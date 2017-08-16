/**
 * Created by 坚果
 * on 2017/7/15.
 * 博客类
 */

export class Blog {
  id: number;                 //id
  title: string;              //标题
  imgUrl: string;             //图片链接
  intro: string;              //简介
  content: string;            //内容
  authorId: number;           //所属作者id
  authorName: string;         //所属作者姓名
  categoryId: number;         //所属分类id
  categoryName: string;       //所属分类名称
  createTime: Date;           //创建时间
  updateTime: Date;           //更新时间
}
