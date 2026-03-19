# Lingma Guide Center - 指南中心

**用途**: 集中管理 `lingma-workflow` 技能的所有指南类文档

**位置**: `.lingma/guide/`

---

## 📚 文档分类

本目录包含以下类型的指南文档：

### 1. 升级指南 (Upgrade Guides)

记录技能的重要升级和变更说明。

- **[01-entry-file-upgrade-guide.md](./01-entry-file-upgrade-guide.md)** - 入口文件处理机制升级指南
  - 版本：2.0
  - 日期：2026-03-18
  - 内容：从严格模式升级到智能自举模式的完整说明

### 2. 实施指南 (Implementation Guides)

提供分阶段的实施步骤和操作指引。

- **[02-implementation-guide.md](./02-implementation-guide.md)** - lingma-workflow 技能优化实施指南
  - 版本：1.0
  - 日期：2026-03-18
  - 内容：Phase 1-3 的详细任务清单和操作步骤

### 3. 技术报告 (Technical Reports)

记录技能架构优化和技术决策。

- **[03-modular-refactor-report.md](./03-modular-refactor-report.md)** - 模块化重构报告
  - 版本：1.0
  - 日期：2026-03-18
  - 内容：从单体结构到模块化架构的完整重构过程
  
- **[04-workflow-generator-report.md](./04-workflow-generator-report.md)** - 工作流生成器开发报告 🔥
  - 版本：1.0
  - 日期：2026-03-19
  - 内容：通用文档生成系统的完整设计与实现

### 4. 最佳实践 (Best Practices) 🔜

总结使用技能和开发模块的最佳实践。

- **[10-template-development-guide.md](./10-template-development-guide.md)** - 模板开发指南 🔥
  - 版本：1.0
  - 日期：2026-03-19
  - 状态：已完成
  - 内容：如何设计和开发可复用的文档模板

### 5. 故障排查 (Troubleshooting) 🔜

常见问题和解决方案集合。

- 状态：规划中

---

## 📋 文档编号规则

所有文档采用统一的编号格式：

```
NN-document-name.md
```

其中：
- `NN`: 两位数字编号（01, 02, 03...）
- `document-name`: 小写字母和连字符组成的描述性名称

### 编号分配

| 编号范围 | 文档类型 | 示例 |
|---------|---------|------|
| 01-09 | 升级指南 | 01-entry-file-upgrade-guide.md |
| 10-19 | 实施指南 | 10-phase2-implementation.md |
| 20-29 | 技术报告 | 20-modular-refactor-report.md |
| 30-39 | 最佳实践 | 30-module-development-best-practices.md |
| 40-49 | 故障排查 | 40-common-issues-and-solutions.md |

---

## 🔗 快速导航

### 新用户必读

1. **[02-implementation-guide.md](./02-implementation-guide.md)** - 从零开始实施工作流
2. **[01-entry-file-upgrade-guide.md](./01-entry-file-upgrade-guide.md)** - 理解入口文件机制

### 开发者参考

1. **[03-modular-refactor-report.md](./03-modular-refactor-report.md)** - 了解架构设计思路
2. **modules/README.md** - 模块开发规范

### 维护人员参考

1. 所有文档 + **laws.yaml.example** - 完整配置说明

---

## 📂 相关目录

### 技能核心文件

位于 `.lingma/skills/lingma-workflow/`:

- `SKILL.md` - 主技能文件
- `README.md` - 使用说明
- `examples.md` - 示例文档
- `modules/` - 模块化组件

### 工作流文档

位于 `.lingma/workflow/`:

- `LINGMA.md` - 项目工作流入口
- `project_guidelines.md` - 协作规范
- `WORKFLOW.md` - 执行流程
- `task_breakdown.md` - 任务分解

### 工具脚本

位于 `.lingma/skills/lingma-workflow/`:

- `bootstrap-entry.js` - 入口文件自举脚本
- `validate.js.template` - 验证脚本模板
- `laws.yaml.example` - YAML 配置模板

---

## 🎯 使用场景

### 场景 1：首次使用工作流

```markdown
阅读顺序:
1. 02-implementation-guide.md (Phase 1)
2. 按照步骤创建入口文件
3. 运行验证脚本
4. 开始使用工作流
```

### 场景 2：升级现有工作流

```markdown
阅读顺序:
1. 01-entry-file-upgrade-guide.md
2. 检查变更点
3. 应用新的配置
4. 测试验证
```

### 场景 3：开发新模块

```markdown
阅读顺序:
1. 03-modular-refactor-report.md (了解架构)
2. modules/README.md (模块规范)
3. entry-file-handler.md (参考实现)
4. 开始开发
```

---

## 📊 文档状态总览

| 文档编号 | 文档名称 | 版本 | 状态 | 最后更新 |
|---------|---------|------|------|----------|
| 01 | Entry File Upgrade Guide | 2.0 | ✅ 完成 | 2026-03-18 |
| 02 | Implementation Guide | 2.0 | ✅ 完成 | 2026-03-19 |
| 03 | Modular Refactor Report | 1.0 | ✅ 完成 | 2026-03-18 |
| 04 | Workflow Generator Report | 1.0 | ✅ 完成 | 2026-03-19 |
| 10 | Template Development Guide | 1.0 | ✅ 完成 | 2026-03-19 |
| 20+ | Technical Reports | - | 📋 规划 | - |
| 30+ | Best Practices | - | 📋 规划 | - |
| 40+ | Troubleshooting | - | 📋 规划 | - |

**图例**:
- ✅ 已完成并发布
- 📋 规划中
- 🔧 编写中
- 🧪 审核中

---

## 🔮 未来规划

### Phase 1: 基础文档（已完成）✅
- [x] 01 - 入口文件升级指南 (2026-03-18)
- [x] 02 - 实施指南 (2026-03-18)
- [x] 03 - 模块化重构报告 (2026-03-18)

### Phase 2: 扩展文档（已完成）✅
- [x] 04 - 工作流生成器开发报告 (2026-03-19)
- [x] 10 - 模板开发指南 (2026-03-19)
- [ ] 20 - 性能优化报告（移至下一阶段）

### Phase 3: 完善文档（2026-Q3）📋
- [ ] 40 - 常见问题解答
- [ ] 41 - 故障排查手册
- [ ] 21 - CI/CD集成指南

---

## 💡 贡献指南

### 添加新文档

1. 确定文档类型和编号范围
2. 选择下一个可用编号
3. 使用标准命名：`NN-document-name.md`
4. 在本文档中更新索引

### 更新现有文档

1. 更新版本文档头部信息
2. 在文档末尾添加变更日志
3. 更新本文档的状态表格

### 文档质量标准

- ✅ 结构清晰，有明确的目录
- ✅ 包含实际可用的示例
- ✅ 提供完整的代码片段
- ✅ 有相关的图表说明
- ✅ 包含故障排查部分
- ✅ 最后更新日期和版本

---

## 📞 维护信息

**当前维护者**: lingma-workflow skill team  
**最后更新**: 2026-03-19  
**反馈渠道**: 在项目 issue 中提出文档相关问题

---

*本指南中心由 lingma-workflow 技能维护，符合项目标准化工作流规范*
