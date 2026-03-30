---
name: lingma-workflow
description: 基于项目标准化工作流进行开发协作，自动参考 .lingma/workflow 目录下的关键文档（README.md、project_guidelines.md、WORKFLOW.md、task_breakdown.md），确保执行过程符合项目阶段定位与交付标准。当用户提及工作流、项目规范、阶段检查或需要遵循标准化流程时自动触发。
---

# Lingma Workflow Skill

## 铁律约束（必须遵守）

### 铁律 1：入口文件验证

- 标准入口：`.lingma/LINGMA.md`，必须优先使用
- 如不存在，扫描替代入口（优先级：`.lingma/workflow/README.md` > 根目录 `LINGMA.md` > `.lingma/workflow/index.md`）
- 仍无可用入口时，主动引导用户创建（提供基础/完整/智能模板）
- **详细逻辑**: `modules/entry-file-handler.md`

### 铁律 2：路径约束

- 所有工作流文件的生成、修改、读取必须限制在 `.lingma/workflow/` 目录内
- 禁止在此目录之外创建工作流文档
- 检测到越界路径时**拒绝执行**，提示正确路径

### 铁律 3：Guidelines 优先原则

- `project_guidelines.md` 是最核心的协作文档，必须包含 7 个章节：

| # | 章节 | 最低要求 |
|---|------|---------|
| 1 | 智能体角色定义（Role） | 至少 3 条 |
| 2 | 优先事项（Prefer） | 至少 1 条 |
| 3 | 避免事项（Avoid） | 至少 1 条 |
| 4 | 响应规则（Response Rules） | 至少 1 条 |
| 5 | 术语规范（Canonical Terms） | 允许为空（警告） |
| 6 | 交付标准（Deliverable Standard） | 至少 3 条 |
| 7 | Workflow 完善建议（Next Deliverables） | 至少 1 条 |

- 更新 Guidelines 前必须检查完整性，缺失章节需先补全

---

## 工作流程

### Step 1：铁律验证

在执行任何操作前，按顺序验证：
1. 入口文件是否存在且有效（铁律 1）
2. 操作路径是否在 `.lingma/workflow/` 内（铁律 2）
3. 如涉及 Guidelines，是否包含完整 7 章（铁律 3）

任一验证失败 → 立即停止，返回错误信息并给出修正建议。

### Step 2：加载上下文文档

必读文档清单：
- `.lingma/LINGMA.md` — 入口文件（了解项目全景）
- `.lingma/workflow/project_guidelines.md` — 协作规范
- `.lingma/workflow/README.md` — 目录说明
- `.lingma/workflow/WORKFLOW.md` — 执行流程
- `.lingma/workflow/task_breakdown.md` — 任务分解与进度

读取顺序：先 LINGMA.md，再并行读取 workflow/ 下所有文档。

### Step 3：约束检查

在提供解决方案前，确认：
- 与当前项目阶段一致（不过度设计）
- 遵循现有命名规范和术语
- 不引入无证据的系统边界假设
- 输出可直接用于开发或运维

### Step 4：标准化输出

```markdown
## 事实依据
明确哪些内容来自现有文档确认

## 建议方案
基于工作流规范的可执行方案

## 待确认项
需要补充或确认的信息

## 进度追踪
更新 task_breakdown.md 中的状态（如适用）
```

---

## 触发场景

自动触发关键词：工作流、流程、规范、项目标准、阶段检查、任务进度、创建新 X

手动触发：`/lingma-workflow`

---

## 关键原则

**优先做**：
- 基于现有文档补齐缺失的模板、脚本、清单
- 维护项目上下文一致性
- 区分"仓库已确认事实"和"建议补充项"

**避免做**：
- 假设系统已存在完整代码
- 编造无证据的接口字段
- 混淆商业化表达和运行时配置
- 引入与当前阶段不符的复杂设计
- 忽略工作流文档自行其是

---

## 违规处理示例

**路径违规**：用户要求在 `docs/workflow` 创建文件 → 拒绝，建议 `.lingma/workflow/` 下正确路径

**Guidelines 不完整**：更新前检测到缺失章节 → 列出缺失项，建议先补全

**入口不存在**：无 `.lingma/LINGMA.md` → 扫描替代入口或引导创建

---

## 模块与资源

- 入口处理模块：`modules/entry-file-handler.md`
- 工作流生成器：`modules/workflow-generator-module.md`
- 自举脚本：`bootstrap-entry.js`
- 验证脚本：`validate.js.template`
- 使用示例：`examples.md`
- 指南中心：`guide/`
