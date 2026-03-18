---
name: lingma-workflow
description: 基于项目标准化工作流进行开发协作，自动参考 .lingma/workflow 目录下的关键文档（README.md、project_guidelines.md、WORKFLOW.md、task_breakdown.md），确保执行过程符合项目阶段定位与交付标准。当用户提及工作流、项目规范、阶段检查或需要遵循标准化流程时自动触发。
---

# Lingma Workflow Skill

## ⚖️ 铁律约束（必须遵守）

**以下三条是使用本技能的“法律”，必须在每次任务执行前强制验证：**

### 铁律 1：入口文件验证（智能检测与自举）

✅ **优先使用 `.lingma/LINGMA.md`，支持自动创建和多入口识别**

#### 核心原则

1. **默认首选**：`.lingma/LINGMA.md` 是标准入口文件
2. **自动创建**：如果不存在，主动引导用户创建或提供模板
3. **智能识别**：允许在特定条件下识别项目中的其他标准入口点
4. **自举能力**：确保工作流能够从最小配置启动

#### 处理流程（详细逻辑见 [modules/entry-file-handler.md](modules/entry-file-handler.md)）

**三层检测机制**：

```yaml
第一层：标准入口检查
  IF .lingma/LINGMA.md 存在
    → 验证内容完整性
    → 直接使用 ✅
    
第二层：替代入口扫描
  ELSE IF 标准入口不存在
    → 扫描可能的替代入口
    → 评估内容质量
    → 发现替代品 🔍
    
第三层：用户确认与创建
    → 提供选择（使用替代/创建新的/手动指定）
    → 根据选择执行
    → 记录日志 📝
```

**支持的入口类型**：

| 入口路径 | 优先级 | 置信度 | 说明 |
|---------|--------|--------|------|
| `.lingma/LINGMA.md` | ⭐⭐⭐⭐⭐ | 1.0 | 标准入口（首选） |
| `.lingma/workflow/README.md` | ⭐⭐⭐⭐ | 0.8 | 工作流说明文档 |
| `LINGMA.md` (根目录) | ⭐⭐⭐ | 0.7 | 历史遗留项目 |
| `.lingma/workflow/index.md` | ⭐⭐ | 0.6 | 索引式入口 |

#### 错误处理策略

| 场景 | 处理方式 | 用户提示 |
|------|----------|----------|
| 标准入口存在且有效 | ✅ 直接使用 | 无提示 |
| 标准入口存在但内容为空 | ⚠️ 提示补充内容 | "入口文件内容为空，需要我帮您填充吗？" |
| 标准入口不存在，有替代品 | 🔍 提供选择 | "发现可能的入口文件，是否使用？" |
| 标准入口不存在，无替代品 | 📝 自动创建 | "正在为您创建入口文件..." |
| 用户拒绝所有选项 | ❌ 记录原因 | "已记录，稍后提醒" |

#### 完整实现

详细的处理逻辑、模板定义和验证算法请查看：
- **主模块**: [modules/entry-file-handler.md](modules/entry-file-handler.md)
- **升级指南**: [../../guide/01-entry-file-upgrade-guide.md](../../guide/01-entry-file-upgrade-guide.md)
- **命令行工具**: [bootstrap-entry.js](bootstrap-entry.js)

### 铁律 2：路径约束

✅ **工作流生成的路径必须在工作空间根目录下的 `.lingma/workflow` 内**

- 所有工作流相关文件的生成、修改、读取操作都限制在此目录内
- 禁止在 `.lingma/workflow` 之外的任何地方创建工作流文档
- 如果检测到目标路径超出此范围，**拒绝执行**

**允许的路径示例：**
- ✅ `.lingma/workflow/README.md`
- ✅ `.lingma/workflow/project_guidelines.md`
- ✅ `.lingma/workflow/WORKFLOW.md`
- ✅ `.lingma/workflow/task_breakdown.md`
- ✅ `.lingma/workflow/任意子目录/文件.md`

**禁止的路径示例：**
- ❌ `src/workflow/xxx.md`
- ❌ `docs/workflow/xxx.md`
- ❌ `.lingma/other/workflow/xxx.md`

### 铁律 3：Guidelines 优先原则

✅ **`project_guidelines.md` 是最重要的核心文档，必须谨慎维护**

在创建或更新 `project_guidelines.md` 时，必须包含且严格审查以下内容：

1. **智能体角色定义**（Role）
   - 明确 Lingma 在项目中的技术协作者定位
   - 区分与泛化聊天助手的差异

2. **优先事项**（What Lingma Should Prefer）
   - 基于现有文档补齐缺失的模板、脚本、清单
   - 维护项目上下文一致性

3. **避免事项**（What Lingma Should Avoid）
   - 假设系统已存在完整代码
   - 编造无证据的接口字段
   - 混淆商业化表达和运行时配置

4. **响应规则**（Response Rules）
   - 区分"仓库已确认事实"和"建议补充项"
   - 输出格式标准化

5. **术语规范**（Current Canonical Terms）
   - 统一项目命名和概念表达
   - 避免术语混用

6. **交付标准**（Deliverable Standard）
   - 能直接被开发或运维使用
   - 字段命名与现有文档一致
   - 可映射到阶段验收项
   - 不引入无证据的新系统边界

7. **Workflow 完善建议**（Suggested Next Deliverables）
   - 提供后续优化方向和优先级

**更新 Guidelines 的审查清单：**
```markdown
在更新 project_guidelines.md 前，必须逐项检查：
- [ ] 角色定义是否清晰且符合当前阶段？
- [ ] 优先事项是否具体可执行？
- [ ] 避免事项是否覆盖了常见错误？
- [ ] 响应规则是否有明确的格式要求？
- [ ] 术语规范是否与现有代码一致？
- [ ] 交付标准是否可以量化验证？
- [ ] 完善建议是否合理且有序号？
```

---

## 核心职责

本技能确保在执行任何项目任务时，自动对齐项目的标准化工作流和文档规范。

### 主要功能

1. **自动文档参考**：处理任务时优先读取 `.lingma/workflow` 目录下的相关文档
2. **阶段一致性维护**：基于 `project_status.md` 判断当前项目阶段，避免超前或滞后行为
3. **规范约束**：遵循 `project_guidelines.md` 中的角色定位和响应规则
4. **流程标准化**：按照 `WORKFLOW.md` 定义的步骤执行任务

## 工作流程

### Step 1: 识别任务类型

根据用户请求识别任务类型：

- **开发任务** → 参考 `task_breakdown.md` 确认优先级和范围
- **规范咨询** → 参考 `project_guidelines.md` 提供符合标准的答案
- **流程执行** → 按照 `WORKFLOW.md` 的步骤逐步执行
- **状态检查** → 参考 `project_status.md` 评估当前进展

### Step 2: 加载上下文文档

处理任务前，**必须首先验证铁律**。如入口文件验证触发白举流程，则等待完成后继续。

#### 0. 铁律验证（强制执行 + 智能自举）

```markdown
验证清单：
- [ ] 铁律 1：入口文件是否存在？如不存在，启动自举流程
- [ ] 铁律 2：所有操作路径是否在 .lingma/workflow 内？
- [ ] 铁律 3：如涉及 Guidelines，是否已包含全部 7 个核心章节？
```

**智能处理流程**：

```pseudo
# 调用入口处理模块
result = call_module('entry-file-handler', 'detect_entry')

SWITCH result.type:
  CASE "standard":
    # 标准入口存在，直接使用
    continue_execution()
    
  CASE "alternative":
    # 发现替代入口，询问用户
    display_alternatives(result.alternatives)
    choice = get_user_choice()
    process_choice(choice)
    
  CASE "missing":
    # 无任何入口，启动自举流程
    start_bootstrap_flow()
    create_entry_file()
    log_creation()
```

**模块调用说明**：

- **模块路径**: [modules/entry-file-handler.md](modules/entry-file-handler.md)
- **主要函数**: `detect_entry()`, `start_bootstrap_flow()`, `create_entry_file()`
- **详细文档**: 见模块文档第 2 节「使用方式」

#### 1. 必选文档清单

```markdown
必选文档清单：
- `.lingma/LINGMA.md` - 工作流入口文件（标准入口，如不存在则使用替代方案）
- `.lingma/workflow/project_guidelines.md` - 协作规范（铁律 3 核心文档）
- `.lingma/workflow/README.md` - 目录说明
- `.lingma/workflow/WORKFLOW.md` - 执行流程
- `.lingma/workflow/task_breakdown.md` - 任务分解

**注**：如果入口文件是通过自举流程创建的，首次执行时会额外加载：
- `.lingma/workflow/bootstrap.log` - 自举日志
- 入口文件模板备份
```

### Step 3: 执行约束检查

在提供任何解决方案前，检查是否符合：

- [ ] 铁律 1：入口文件验证通过
- [ ] 铁律 2：路径约束验证通过
- [ ] 铁律 3：Guidelines 完整性验证通过（如适用）
- [ ] 与当前项目阶段一致（不过度设计）
- [ ] 遵循现有命名规范和术语
- [ ] 不引入无证据的系统边界假设
- [ ] 输出可直接用于开发或运维

### Step 4: 输出标准化响应

响应格式应包含：

```markdown
## 事实依据
明确说明哪些内容来自现有文档

## 建议方案
基于工作流规范的可执行方案

## 待确认项
如有缺失信息，列出需要补充的内容

## 进度追踪
如适用，更新 `task_breakdown.md` 中的状态
```

## 关键原则

### 应该做的事情（优先）

- ✅ 基于现有文档补齐缺失的模板、脚本、清单
- ✅ 维护项目上下文一致性
- ✅ 将需求转化为可执行的开发任务
- ✅ 约束需求范围，防止在 M1 前发散
- ✅ 区分"仓库已确认事实"和"建议补充项"

### 应该避免的事情

- ❌ 假设系统已经存在完整前后端代码
- ❌ 把商业化表达和运行时配置混用
- ❌ 在没有接口证据时编造返回字段
- ❌ 引入与当前阶段不符的复杂设计
- ❌ 忽略工作流文档自行其是

## 文档协同机制

### 读取顺序

当处理新任务时：

1. 首先读取 `.lingma/LINGMA.md` 了解入口指引
2. 并行读取 `workflow/` 目录下的所有文档
3. 根据任务类型选择重点参考文档
4. 建立完整的上下文理解

### 更新规则

如需更新工作流文档：

1. 确保更新内容与现有结构一致
2. 保持文档间的引用关系正确
3. 在 `task_breakdown.md` 中记录变更
4. 使用统一的术语和格式

## 触发场景

本技能应在以下场景自动触发：

- 用户询问"如何处理 X 任务"
- 用户要求遵循项目规范
- 用户提到工作流、流程、标准
- 用户要求检查任务进度
- 用户需要生成符合规范的文档
- 用户要求基于现有模式创建新资产

## 示例用法

### 示例 1：处理新功能开发

**用户**：我们需要添加一个新的订单导出功能

**Lingma 应用此技能后的响应**：

1. 先读取 `task_breakdown.md` 查看是否有相关任务
2. 检查 `project_guidelines.md` 确认交付标准
3. 基于现有订单模块的代码模式设计实现方案
4. 输出包含事实依据、建议方案、待确认项的完整计划

### 示例 2：流程咨询

**用户**：这个项目现在处于什么阶段？下一步做什么？

**Lingma 应用此技能后的响应**：

1. 读取 `project_status.md` 获取当前阶段信息
2. 读取 `task_breakdown.md` 获取任务完成情况
3. 基于 `WORKFLOW.md` 说明下一步标准流程
4. 提供符合当前阶段的建议

### 示例 3：规范检查

**用户**：帮我检查这个组件是否符合项目规范

**Lingma 应用此技能后的响应**：

1. 参考 `project_guidelines.md` 第 6 条（交付物标准）
2. 检查是否能直接使用、命名是否一致
3. 确认是否可以映射到阶段验收项
4. 给出具体的合规性评估和改进建议

## 进度追踪

处理任务时应同步更新进度：

```markdown
任务执行清单：
- [ ] 已读取 LINGMA.md 入口文件
- [ ] 已加载 workflow 目录下相关文档
- [ ] 已确认当前项目阶段
- [ ] 已检查规范符合性
- [ ] 已输出标准化响应
- [ ] 已更新 task_breakdown.md（如适用）
```

## 故障排查

### 问题：找不到工作流文档

**解决步骤**：
1. 检查工作区根目录是否正确
2. 确认 `.lingma/workflow` 目录存在
3. 如果文档缺失，提示用户需要先建立基础文档结构

### 问题：文档内容冲突

**解决步骤**：
1. 以 `LINGMA.md` 为最高优先级
2. 其次参考 `project_guidelines.md`
3. 记录冲突点并提示用户确认
4. 建议更新文档以消除冲突

## 🚫 违反铁律的处理流程

### 场景 1-3：详见实施指南

详细的违规处理示例和故障排查，请查看：
- **[../../guide/02-implementation-guide.md](../../guide/02-implementation-guide.md)** - 实施指南 - 故障排查章节
- **[../../guide/01-entry-file-upgrade-guide.md](../../guide/01-entry-file-upgrade-guide.md)** - 升级指南 - 错误处理策略

### 场景 1：用户指定了错误的入口文件

**用户输入：**
```
/lingma-workflow --entry src/workflow/entry.md
```

**正确响应：**
```markdown
⚠️ **违反铁律 1：入口文件验证失败**

根据 lingma-workflow 技能的强制约束：
- 入口文件只能是 `.lingma/LINGMA.md`
- 您指定的 `src/workflow/entry.md` 不符合要求

请修正为：
/lingma-workflow --entry .lingma/LINGMA.md

或直接使用：
/lingma-workflow
（默认使用 .lingma/LINGMA.md）
```

### 场景 2：用户要求在 workflow 外生成文件

**用户输入：**
```
帮我在 docs/workflow 目录下创建新的流程文档
```

**正确响应：**
```markdown
⚠️ **违反铁律 2：路径约束验证失败**

根据 lingma-workflow 技能的强制约束：
- 工作流生成的路径必须在工作空间根目录下的 `.lingma/workflow` 内
- 您指定的 `docs/workflow` 不符合要求

建议位置：
- `.lingma/workflow/新流程文档.md`

是否需要我在正确的位置创建？
```

### 场景 3：Guidelines 文档不完整

**用户输入：**
```
帮我更新 project_guidelines.md，添加一些新的规范
```

**正确响应：**
```markdown
📋 **铁律 3：Guidelines 完整性检查**

在更新 `project_guidelines.md` 前，我需要先检查当前文档是否包含以下核心章节：

1. 智能体角色定义（Role）
2. 优先事项（What Lingma Should Prefer）
3. 避免事项（What Lingma Should Avoid）
4. 响应规则（Response Rules）
5. 术语规范（Current Canonical Terms）
6. 交付标准（Deliverable Standard）
7. Workflow 完善建议（Suggested Next Deliverables）

当前文档状态：
- ✅ 第 1 章：角色定义 - 已包含
- ✅ 第 2 章：优先事项 - 已包含
- ✅ 第 3 章：避免事项 - 已包含
- ✅ 第 4 章：响应规则 - 已包含
- ⚠️ 第 5 章：术语规范 - 待完善
- ✅ 第 6 章：交付标准 - 已包含
- ✅ 第 7 章：完善建议 - 已包含

建议先补充第 5 章「术语规范」，然后再添加您的新规范。

您希望现在补充术语规范吗？还是直接添加新规范？
```

---

## 附加资源

- 详细的项目状态见：`.lingma/workflow/project_status.md`
- 技能输入输出规范见：`.lingma/workflow/skill_specs.md`
- 完整任务分解见：`.lingma/workflow/task_breakdown.md`
- **指南中心**: `.lingma/guide/` - 所有指南类文档
  - [01-entry-file-upgrade-guide.md](../../guide/01-entry-file-upgrade-guide.md) - 入口文件升级指南
  - [02-implementation-guide.md](../../guide/02-implementation-guide.md) - 实施指南
  - [03-modular-refactor-report.md](../../guide/03-modular-refactor-report.md) - 模块化重构报告
