# Workflow Generator 快速参考指南

**版本**: 1.0  
**最后更新**: 2026-03-19  

---

## 🚀 5 分钟快速开始

### Step 1: 准备配置文件

```bash
# 复制示例配置
cp .lingma/skills/lingma-workflow/templates/config/project-config.yaml.example \
   my-project-config.yaml
```

### Step 2: 编辑配置

编辑 `my-project-config.yaml`，至少提供以下必需配置：

```yaml
project:
  name: "my-project"              # 项目简称（必需）
  full_name: "My Project"         # 项目全称（必需）
  description: "一个优秀的项目"     # 项目描述（必需）

tech_stack:
  framework: "Vue 3"              # 主要框架（必需）
  language: "TypeScript"          # 编程语言（必需）

stages:
  current:
    name: "Phase 1 - MVP"         # 当前阶段（必需）
    status: "已完成"                # 状态（必需）
```

### Step 3: 生成文档

```bash
# 生成所有核心文档
generator generate all \
  --config my-project-config.yaml \
  --output-dir .lingma/workflow
```

### Step 4: 验证文档

```bash
# 验证生成的文档
generator validate \
  --config my-project-config.yaml
```

---

## 📁 文件结构

```
.lingma/skills/lingma-workflow/
├── modules/
│   ├── README.md                           # 模块索引
│   ├── entry-file-handler.md               # 入口文件处理器
│   └── workflow-generator-module.md        # ✨ 工作流生成器（新增）
│
├── templates/                              # ✨ 新增模板目录
│   ├── README.md                           # 模板索引
│   ├── core/                               # 核心模板
│   │   ├── template-entry.md
│   │   ├── template-guidelines.md
│   │   ├── template-workflow.md
│   │   ├── template-readme.md
│   │   ├── template-status.md
│   │   └── task-breakdown.md
│   │
│   └── config/                             # 配置文件
│       ├── project-config.yaml.example     # 配置示例
│       └── variables-validation.yaml       # 变量定义和验证规则
│
└── plans/
    └── Phase4_Workflow_Generator_Module_完成报告.md
```

---

## 🔧 核心概念

### 1. 模板 (Template)

模板是文档的蓝图，定义了文档的结构和格式。

```yaml
# 示例：简单的模板片段
# 项目名称：{proj_name}
# 当前阶段：{stage_current}

# 条件块示例
{?stage_previous}
上一阶段：{stage_previous}
{/stage_previous}
```

### 2. 变量 (Variable)

变量是模板中的占位符，在生成时被实际内容替换。

**变量类型**:
- 字符串：`{proj_name}`
- 数组：`{#modules}...{/modules}`
- 对象：`{tech_stack.framework}`
- 布尔值：用于条件判断

### 3. 上下文 (Context)

上下文是传递给生成器的所有变量的集合。

```yaml
context:
  proj_name: "my-project"
  stage_current: "Phase 1"
  tech_stack:
    framework: "Vue 3"
    language: "TypeScript"
```

### 4. 生成器 (Generator)

生成器负责加载模板、处理变量、生成文档。

```javascript
const generator = new WorkflowGenerator(config);
generator.setVariables(context);
const document = generator.generate('entry');
```

---

## 📊 可用模板

### 核心模板（必需）

| 模板 | 生成文件 | 用途 |
|------|---------|------|
| `template-entry.md` | LINGMA.md | 工作流入口文件 |
| `template-guidelines.md` | project_guidelines.md | 协作规范 |
| `template-workflow.md` | WORKFLOW.md | 工作流程 |
| `template-readme.md` | README.md | 目录说明 |
| `template-status.md` | project_status.md | 项目状态 |
| `task-breakdown.md` | task_breakdown.md | 任务分解 |

### 扩展模板（可选）

| 模板 | 生成文件 | 用途 |
|------|---------|------|
| `template-analysis.md` | ANALYSIS_AND_OPTIMIZATION.md | 分析报告 |
| `template-implementation.md` | IMPLEMENTATION_GUIDE.md | 实施指南 |
| `template-dashboard.md` | HEALTH_DASHBOARD.md | 健康仪表板 |

---

## ⚙️ 配置选项

### 必需配置项

```yaml
project:
  name: string        # 项目简称
  full_name: string   # 项目全称
  description: string # 项目描述

tech_stack:
  framework: string   # 主要框架
  language: string    # 编程语言

stages:
  current:
    name: string      # 当前阶段名称
    status: string    # 状态（已完成/进行中/规划中）
```

### 常用配置项

```yaml
generation:
  output_dir: string           # 输出目录
  validate_on_generate: boolean # 生成时验证
  backup_before_overwrite: boolean # 覆盖前备份
  
quality:
  min_guidelines_score: number  # Guidelines 最低分数
  check_broken_links: boolean   # 检查失效链接
```

---

## 🧪 验证规则

### Guidelines 完整性

```yaml
验证项目：
- 第 1 章：Role（至少 3 条，权重 1.5）
- 第 2 章：Prefer（至少 1 条，权重 1.0）
- 第 3 章：Avoid（至少 1 条，权重 1.0）
- 第 4 章：Response Rules（至少 1 条，权重 1.0）
- 第 5 章：Terms（允许为空，警告，权重 0.5）
- 第 6 章：Standards（至少 3 条，权重 1.0）
- 第 7 章：Suggestions（至少 1 条，权重 1.0）

通过标准：加权平均分 ≥ 85
```

### 交叉引用

必需引用关系：
- LINGMA.md → project_guidelines.md
- LINGMA.md → WORKFLOW.md
- LINGMA.md → task_breakdown.md
- WORKFLOW.md → task_breakdown.md

---

## 💡 使用技巧

### 技巧 1: 使用环境变量

```bash
export WORKFLOW_OUTPUT_DIR="./custom/output"
export WORKFLOW_THEME="detailed"

generator generate all --config my-config.yaml
```

### 技巧 2: 只生成特定文档

```bash
# 只生成 Guidelines
generator generate guidelines \
  --config my-config.yaml \
  --output project_guidelines.md

# 只生成入口文件
generator generate entry \
  --config my-config.yaml \
  --output LINGMA.md
```

### 技巧 3: 自定义验证规则

```bash
# 指定最低分数
generator validate guidelines \
  --min-score 90 \
  --strict-mode
```

### 技巧 4: 批量生成多个项目

```bash
# 为多个项目生成文档
for config in configs/*.yaml; do
  generator generate all \
    --config "$config" \
    --output-dir "projects/$(basename "$config" .yaml)/.lingma/workflow"
done
```

---

## 🐛 常见问题

### Q1: 如何跳过验证？

```bash
generator generate all \
  --config my-config.yaml \
  --skip-validation
```

### Q2: 如何查看详细的错误信息？

```bash
generator validate \
  --config my-config.yaml \
  --verbose
```

### Q3: 如何回滚更改？

```bash
# 从备份恢复
cp .lingma/workflow/.backups/backup-*.md .lingma/workflow/
```

### Q4: 如何添加自定义变量？

在配置文件中添加：

```yaml
custom_variables:
  my_custom_var: "自定义值"
  team_name: "开发团队"
```

然后在模板中使用：`{my_custom_var}`

---

## 📚 相关文档

- **主模块**: [`modules/workflow-generator-module.md`](./modules/workflow-generator-module.md)
- **模板索引**: [`templates/README.md`](./templates/README.md)
- **配置示例**: [`templates/config/project-config.yaml.example`](./templates/config/project-config.yaml.example)
- **验证规则**: [`templates/config/variables-validation.yaml`](./templates/config/variables-validation.yaml)
- **完成报告**: [`plans/Phase4_Workflow_Generator_Module_完成报告.md`](./plans/Phase4_Workflow_Generator_Module_完成报告.md)

---

## 🔗 命令行参考

### 生成命令

```bash
# 生成所有文档
generator generate all [选项]

# 生成单个文档
generator generate <template> [选项]

选项:
  --config, -c <file>     配置文件路径
  --output, -o <path>     输出路径
  --output-dir <dir>      输出目录
  --skip-validation       跳过验证
  --verbose, -v           详细输出
```

### 验证命令

```bash
# 验证所有文档
generator validate [选项]

# 验证特定文档
generator validate <document> [选项]

选项:
  --config, -c <file>     配置文件路径
  --check-links           检查链接
  --check-completeness    检查完整性
  --min-score <number>    最低分数
  --report <file>         生成报告
```

### 配置命令

```bash
# 验证配置文件
generator validate-config <file>

# 检查配置完整性
generator check-config <file>

# 生成配置模板
generator init-config [--template <name>]
```

---

## 📞 获取帮助

```bash
# 查看所有可用命令
generator help

# 查看特定命令的帮助
generator help <command>

# 查看版本信息
generator --version
```

---

**最后更新**: 2026-03-19  
**维护者**: lingma-workflow skill team
