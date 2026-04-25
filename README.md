# 3D 简历 - Cosmic Resume

一个沉浸式 3D 宇宙主题个人简历，通过游戏互动的方式展示个人信息、工作经历和项目作品。

## 预览

![3D Resume](docs/preview.png)

## 功能特性

### 游戏化体验
- **3D 宇宙场景**：在星空、行星、星云构建的宇宙中探索
- **角色控制**：支持 WASD/方向键移动、跳跃、攻击
- **特殊区域互动**：站在指定区域触发内容展示（名字、图片）
- **可破坏方块**：攻击场景中的方块会破碎

### 内容展示
- **个人信息**：姓名、职位、邮箱
- **工作经历**：5 段工作经验，自动滚动展示
- **项目作品**：4 个项目详细介绍
- **联系方式**：邮箱、GitHub、博客

### 技术亮点
- **物理引擎**：基于 Cannon.js 的真实物理碰撞
- **粒子系统**：文字转为粒子动画，支持聚集/散射效果
- **移动端适配**：虚拟摇杆、攻击/跳跃按钮

## 操作说明

### PC 端
| 按键 | 功能 |
|------|------|
| W / ↑ | 前进 |
| S / ↓ | 后退 |
| A / ← | 向左 |
| D / → | 向右 |
| 空格 / K / 鼠标右键 | 跳跃 |
| J / 鼠标左键 | 攻击 |

### 移动端
- **左侧虚拟摇杆**：控制移动方向（按住区域即可移动）
- **× 按钮**：攻击
- **↑ 按钮**：跳跃

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
```

## 构建

```bash
npm run build
```

## 项目结构

```
src/
├── components/          # 组件
│   ├── ui/             # UI 组件（IntroOverlay、MobileControls）
│   ├── Character.ts    # 角色控制
│   ├── Platform.ts     # 平台
│   ├── ParticleText.ts # 粒子文字系统
│   ├── PhysicsWorld.ts # 物理世界
│   ├── Sun.ts          # 太阳
│   ├── Earth.ts        # 地球
│   └── ...
├── data/
│   └── resumeData.ts   # 简历数据
├── utils/
│   └── device.ts       # 设备检测
├── Game.ts             # 游戏主类
└── App.vue             # 应用入口
```

## 技术栈

- **Three.js** - 3D 渲染引擎
- **Cannon-es** - 物理引擎
- **Vue 3** - 框架
- **TypeScript** - 类型
- **Vite** - 构建工具

## 关于作者

- **黄凯** - 前端工程师
- 邮箱：huangkaiking@126.com
- 博客：https://www.kai666666.com
- GitHub：https://github.com/KaiOrange

## License

MIT