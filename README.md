<h1 align="center">Manage-System-Template</h1>

<p align="center">快速搭建中后台管理系统模板</p>

### 使用方法

```bash
git clone git@github.com:hanguihe/manage-system.git
```

---

### 布局

不再使用antd原始Layout

面包屑等其他配置项详细查看文档 -> [Ant-Design-Pro-Layout](https://github.com/ant-design/ant-design-pro-layout/blob/master/README.zh-CN.md)


### 路由

```typescript
export interface Route {
  path: string;
  routes: Array<{
    exact?: boolean;
    icon: string;
    name: string;
    path: string;
    // optional secondary menu
    children?: Route['routes'];
  }>;
}
```

### 部分依赖项

1. [axios](https://www.kancloud.cn/yunye/axios/234845)
2. redux
3. react-redux
4. redux-thunk
5. react-router-dom
6. less




