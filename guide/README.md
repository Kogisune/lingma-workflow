# 指南中心

欢迎使用 `lingma-workflow` 指南系列！这些文档专注于描述技能内部的实际功能架构设计、具体实现细节、使用方案以及升级指导。

---

## 📖 文档定位

本目录下所有文件均为**标准指南格式**，包含：
- ✅ 明确的目标和适用场景
- ✅ 详细的实施步骤和代码示例
- ✅ 最佳实践和经验总结
- ✅ 完整的验收清单
- ✅ FAQ 和相关资源链接

> 💡 **注意**: 技术报告已整合到对应指南中，不再单独维护。

## 📚 指南列表

### 入门系列

#### [实施指南](02-implementation-guide.md) ⭐⭐⭐⭐⭐

**难度**: 初级  
**时间**: 5 分钟快速开始 + 1-4 周完整实施  
**适合人群**: 所有用户

**内容**:
- ✅ 快速开始（5 分钟配置）
- ✅ Phase 1: 基础加固（1 周）
- ✅ Phase 2: 模块化重构（2 周）
- ✅ Phase 3: 自动化闭环（2 周）
- ✅ Phase 4: 文档生成器（2-3 周）
- ✅ 故障排查和 FAQ

**阅读建议**: **首次使用必读**

---

#### [入口文件升级指南](01-entry-file-upgrade-guide.md) ⭐⭐⭐⭐

**难度**: 中级  
**时间**: 30 分钟  
**适合人群**: 从 v1.0 升级到 v2.0 的用户

**内容**:
- ✅ 变更概述（严格模式 → 智能自举模式）
- ✅ 智能检测逻辑详解
- ✅ 自举流程说明
- ✅ 效果对比和迁移指南

**阅读建议**: 版本升级时参考

---

### 进阶系列

#### [模块化重构指南](05-modular-refactoring-guide.md) ⭐⭐⭐⭐

**难度**: 中级  
**时间**: 2 周  
**适合人群**: 希望优化代码结构的开发者

**内容**:
- ✅ 模块化设计原则
- ✅ 实施步骤详解
- ✅ 模块接口定义
- ✅ 性能对比和最佳实践
- ✅ 未来扩展方向

**阅读建议**: 代码重构时参考

---

#### [文档生成器指南](06-document-generator-guide.md) ⭐⭐⭐⭐⭐

**难度**: 高级  
**时间**: 2-3 周  
**适合人群**: 需要批量创建文档的团队

**内容**:
- ✅ 系统架构设计
- ✅ 核心组件实现
- ✅ 模板库建设
- ✅ 配置管理
- ✅ 质量检查机制
- ✅ 实际项目验证

**阅读建议**: 批量创建文档时参考

---

### 技术报告

> 💡 **注意**: 技术报告已整合到对应指南中，不再单独维护。
> 
> - 模块化重构详情见 [模块化重构指南](05-modular-refactoring-guide.md)
> - 文档生成器详情见 [文档生成器指南](06-document-generator-guide.md)

---

## 🎯 学习路径

### 新手路线（第 1 周）

```
Day 1: 阅读 [实施指南](02-implementation-guide.md) 的快速开始部分
       ↓
Day 2: 完成 Phase 1 基础加固
       ↓
Day 3-7: 逐步实施其他阶段
```

### 进阶路线（第 2-4 周）

```
Week 2: 阅读 [模块化重构指南](05-modular-refactoring-guide.md)
        ↓
        实施模块化改造
        
Week 3-4: 阅读 [文档生成器指南](06-document-generator-guide.md)
          ↓
          搭建文档生成系统
```

### 专家路线（深入研究）

```
1. 深入阅读所有指南
   ↓
2. 研究技能源码
   ↓
3. 根据实际需求定制和扩展
```

---

## 📖 阅读顺序建议

### 场景 1：首次使用

```
1. [实施指南](02-implementation-guide.md) - 快速开始
2. [入口文件升级指南](01-entry-file-upgrade-guide.md) - 了解智能特性
3. 开始实际使用
```

### 场景 2：代码重构

```
1. [模块化重构指南](05-modular-refactoring-guide.md) - 核心原则
2. 查看模块源码
3. 开始重构实施
```

### 场景 3：文档自动化

```
1. [文档生成器指南](06-document-generator-guide.md) - 完整实现
2. 开始搭建生成系统
```

### 场景 4：深入了解架构

```
1. [模块化重构指南](05-modular-refactoring-guide.md) - 实施步骤
2. 查看技能模块代码
3. 在实践中理解设计
```

---

## 🔗 快速链接

### 核心资源

- **[主 README](../README.md)** - 项目概述和快速开始
- **[技能说明](../skills/lingma-workflow/SKILL.md)** - 技能定义
- **[模块文档](../skills/lingma-workflow/modules/README.md)** - 模块导航

### 配置文件

- **[laws.yaml.example](../skills/lingma-workflow/laws.yaml.example)** - 铁律配置模板
- **[project-config.yaml.example](../skills/lingma-workflow/templates/config/project-config.yaml.example)** - 项目配置示例

### 工具脚本

- **[validate.js.template](../skills/lingma-workflow/validate.js.template)** - 验证脚本模板
- **[bootstrap-entry.js](../skills/lingma-workflow/bootstrap-entry.js)** - 自举脚本

---

## 📊 指南统计

| 指南 | 版本 | 难度 | 预计时间 | 状态 |
|------|------|------|----------|------|
| [实施指南](02-implementation-guide.md) | 2.2 | 初级 | 5 分钟 - 4 周 | 最新 |
| [入口文件升级指南](01-entry-file-upgrade-guide.md) | 2.2 | 中级 | 30 分钟 | 最新 |
| [模块化重构指南](05-modular-refactoring-guide.md) | 2.2 | 中级 | 2 周 | 最新 |
| [文档生成器指南](06-document-generator-guide.md) | 2.2 | 高级 | 2-3 周 | 最新 |
| [模板开发指南](10-template-development-guide.md) | 2.2 | 高级 | 1-2 周 | 最新 |

### 改进现有指南

如果发现指南中有错误或不清晰的地方：

1. Fork 项目
2. 创建分支 `docs/improve-guide-xxx`
3. 修改指南内容
4. 提交 Pull Request

### 添加新指南

如果你有新的主题想要分享：

1. 在 Issues 中提出建议
2. 说明指南的主题、目标和大纲
3. 社区讨论和确认
4. 编写并提交指南

### 指南格式标准

每个指南应包含：

```markdown
# 指南标题

**版本**: x.x  
**更新日期**: YYYY-MM-DD  
**难度**: 初级/中级/高级  
**预计时间**: X 小时/天/周

---

## 📋 概述

简要说明指南的目标和适用场景

## 🎯 核心原则/设计原则

指导思想和基本原则

## 🛠️ 实施步骤

详细的操作步骤和代码示例

## 📦 交付成果

预期的输出和成果

## 🧪 测试验证

如何验证实施效果

## 📊 效果评估

定量和定性的效果对比

## 🔮 未来规划

后续发展方向

## 📚 相关资源

相关的文档和外部资源

## ❓ FAQ

常见问题解答

## ✅ 验收清单

自我检查清单
```

---

## 📞 获取帮助

### 遇到问题？

1. **查看 FAQ** - 每个指南都有常见问题解答
2. **搜索 Issues** - 可能已经有人问过类似问题
3. **新建 Issue** - 如果确实没有找到答案
4. **参与讨论** - 在 Discussion 中分享经验

### 联系方式

- **项目主页**: https://github.com/Kogisune/lingma-workflow
- **问题反馈**: https://github.com/Kogisune/lingma-workflow/issues
- **讨论区**: https://github.com/Kogisune/lingma-workflow/discussions

---

## 🎉 致谢

感谢所有为这些指南做出贡献的开发者和用户！

---

*最后更新：2026-03-30*
