# Lingma Workflow Skill - 使用指南

## 铁律约束（必须遵守）

### 铁律 1：入口文件验证

- 默认使用 `.lingma/LINGMA.md` 作为标准入口
- 不存在时自动扫描替代入口（`.lingma/workflow/README.md` > 根目录 `LINGMA.md` > `.lingma/workflow/index.md`）
- 仍无可用入口时，提供基础/完整/智能三种模板引导创建
- 详细逻辑见 `modules/entry-file-handler.md`

### 铁律 2：路径约束

- 工作流文件必须在 `.lingma/workflow/` 内
- 越界路径被拒绝执行

### 铁律 3：Guidelines 优先原则

- `project_guidelines.md` 必须包含 7 个核心章节
- 更新前检查完整性，缺失则先补全
- 章节要求见 `SKILL.md`

---

## 技能概述

本技能确保智能体处理项目任务时自动遵循标准化工作流和文档规范。

## 核心能力

### 1. 自动文档对齐

自动读取并参考 `.lingma/workflow/` 下的关键文档：LINGMA.md、project_guidelines.md、README.md、WORKFLOW.md、task_breakdown.md

### 2. 阶段一致性检查

根据 `project_status.md` 调整建议，避免过度设计、滞后行为或范围发散

### 3. 标准化输出

所有响应包含：事实依据、建议方案、待确认项、进度追踪

---

## 触发场景

**自动触发**：工作流、流程、规范、项目标准、阶段检查、任务进度、创建新 X、符合规范

**手动触发**：`/lingma-workflow`

---

## 使用示例

### 示例 1：新功能开发

**用户**：按照项目规范，帮我设计订单筛选功能

**技能执行**：
1. 读取 `task_breakdown.md` 确认优先级
2. 检查 `project_guidelines.md` 确认交付标准
3. 分析现有代码模式
4. 输出：事实依据 + 建议方案 + 待确认项 + 进度追踪

### 示例 2：代码审查

**用户**：帮我审查这个组件是否符合项目规范

**技能执行**：
1. 参考 Guidelines 交付标准
2. 检查命名、结构、样式规范
3. 输出合规性评估和改进建议

### 示例 3：流程咨询

**用户**：这个项目现在应该做什么？

**技能执行**：
1. 读取 `project_status.md` 获取阶段
2. 读取 `task_breakdown.md` 获取进度
3. 基于 WORKFLOW.md 说明下一步

---

## 最佳实践

1. **提供清晰上下文**：说明背景、目标、约束
2. **明确阶段**：提及当前阶段（M1/M2/M3）
3. **引用规范**：使用"按照项目规范"等表述
4. **具体描述**：避免模糊需求

---

## 技能文件结构

```
skills/lingma-workflow/
├── SKILL.md              # 技能定义（核心）
├── README.md             # 本文件
├── QUICK_REFERENCE.md    # 快速参考
├── examples.md           # 使用示例
├── bootstrap-entry.js    # 入口文件自举脚本
├── validate.js.template  # 铁律验证脚本模板
├── laws.yaml.example     # 铁律配置示例
├── modules/              # 功能模块
│   ├── entry-file-handler.md       # 入口处理模块
│   └── workflow-generator-module.md # 工作流生成器
└── templates/            # 文档模板
    └── config/           # 模板配置
```

---

## 版本历史

- **v2.2** (2026-03-30)：文档精简，对齐新版特性
- **v2.1** (2026-03-30)：精简 SKILL.md，修复 bootstrap-entry.js bug
- **v2.0** (2026-03-18)：智能自举模式，支持多入口识别
- **v1.0** (2026-03-18)：初始版本
