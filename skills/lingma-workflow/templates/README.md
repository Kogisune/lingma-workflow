# Workflow Templates - 工作流文档生成模板

**版本**: 1.0  
**最后更新**: 2026-03-19  
**用途**: 存放所有用于生成工作流文档的标准模板

---

## 📂 模板目录结构

```
templates/
├── core/                    # 核心模板（必需）
│   ├── template-entry.md           # LINGMA.md 入口文件模板
│   ├── template-guidelines.md      # project_guidelines.md 协作规范模板
│   ├── template-workflow.md        # WORKFLOW.md 工作流程模板
│   ├── template-readme.md          # README.md 目录说明模板
│   ├── template-status.md          # project_status.md 项目状态模板
│   └── task-breakdown.md           # task_breakdown.md 任务分解模板
│
├── optional/                # 扩展模板（可选）
│   ├── template-analysis.md        # ANALYSIS_AND_OPTIMIZATION.md
│   ├── template-implementation.md  # IMPLEMENTATION_GUIDE.md
│   ├── template-dashboard.md       # HEALTH_DASHBOARD.md
│   └── template-skill-spec.md      # skill_specs.md
│
├── partials/                # 局部模板（可复用片段）
│   ├── _header.md                  # 文档头部
│   ├── _footer.md                  # 文档尾部
│   ├── _changelog.md               # 变更记录片段
│   └── _navigation.md              # 导航片段
│
└── config/                  # 配置文件
    ├── variables.yaml              # 变量定义和默认值
    ├── validation-rules.yaml       # 验证规则
    └── examples.yaml               # 使用示例
```

---

## 🎯 模板设计原则

### 1. 业务解耦

模板中**不包含**任何具体项目的业务细节：

❌ **错误示例**（包含业务细节）:
```markdown
## 订单管理模块

订单列表页面位于 `src/views/orders/` 目录下。
```

✅ **正确示例**（通用描述）:
```markdown
## {core_module_name}

{core_module_description}
```

### 2. 占位符规范

所有可变内容使用统一的占位符格式：

```yaml
简单变量：{variable_name}
条件块：{?variable}...{/}
列表块：{#items}...{/items}
嵌套变量：{item.name}
```

### 3. 提供默认值

每个变量都应有合理的默认值或说明：

```yaml
variables:
  proj_name:
    type: string
    required: true
    description: "项目简称"
    example: "my-project"
    
  stage_current:
    type: string
    required: true
    description: "当前阶段名称"
    default: "Phase 1 - 基础建设"
```

---

## 📝 核心模板详解

### Template 1: Entry File (LINGMA.md)

**位置**: `templates/core/template-entry.md`

**用途**: 生成工作流入口文件，提供项目全景视图

**关键章节**:
1. 快速开始（当前阶段、核心成果）
2. 关键文档导航
3. 铁律约束说明
4. 项目概览（技术栈、功能模块）
5. 下一步行动
6. 协作指南

**变量数量**: ~25 个必需变量，~15 个可选变量

**生成示例**:
```bash
generator generate entry \
  --config project-config.yaml \
  --output .lingma/LINGMA.md
```

---

### Template 2: Guidelines (project_guidelines.md)

**位置**: `templates/core/template-guidelines.md`

**用途**: 生成协作规范，定义 Lingma 的角色和行为准则

**7 个核心章节**:
1. Role - 角色定义
2. What Lingma Should Prefer - 优先事项
3. What Lingma Should Avoid - 避免事项
4. Response Rules - 响应规则
5. Current Canonical Terms - 术语规范
6. Deliverable Standard - 交付标准
7. Suggested Next Deliverables - 完善建议

**验证规则**:
- 第 1-4、6-7 章必须存在且非空
- 第 5 章允许为空但会警告
- 每章至少包含指定数量的条目

**生成示例**:
```bash
generator generate guidelines \
  --validate-chapters \
  --min-items 3 \
  --output .lingma/workflow/project_guidelines.md
```

---

### Template 3: Workflow (WORKFLOW.md)

**位置**: `templates/core/template-workflow.md`

**用途**: 生成标准工作流程，定义执行步骤

**标准结构**:
1. Goal - 目标
2. Current Status - 当前状态
3. Prerequisites - 前置条件
4. Step 1 - 第一步（健康检查）
5. Step 2 - 第二步（任务执行）
6. Step 3 - 第三步（文档更新）
7. Troubleshooting - 故障排查
8. Progress Tracking - 进度追踪

**特点**: 支持自定义步骤数量和名称

---

### Template 4: README (README.md)

**位置**: `templates/core/template-readme.md`

**用途**: 生成工作流目录说明

**内容**:
- 目录作用和定位
- 当前阶段判断
- 目录结构说明
- 快速使用指南
- 适用边界

---

### Template 5: Status (project_status.md)

**位置**: `templates/core/template-status.md`

**用途**: 生成项目状态档案

**9 个核心部分**:
1. Current Stage - 当前阶段
2. Confirmed Facts - 已确认事实
3. MVP Scope - MVP 范围
4. Naming Normalization - 命名规范化
5. System Boundary - 系统边界
6. Delivery Priorities - 交付优先级
7. API Snapshot - API 快照
8. Repository Structure - 仓库结构
9. Practical Rules - 实践规则

**特点**: 最详细的项目档案文档

---

### Template 6: Task Breakdown (task_breakdown.md)

**位置**: `templates/core/task-breakdown.md`

**用途**: 生成任务分解与进度追踪文档

**内容**:
- 当前项目阶段
- 各阶段任务清单（表格形式）
- 总体进度条
- 下一步建议
- 变更记录

**特点**: 支持甘特图和进度可视化

---

## 🔧 配置文件

### project-config.yaml 示例

```yaml
# 项目基本配置
project:
  name: "{proj_name}"
  full_name: "{proj_full_name}"
  version: "1.0.0"
  description: "{proj_description}"

# 技术栈配置
tech_stack:
  framework: "{tech_framework}"
  language: "{tech_language}"
  ui_library: "{tech_ui}"
  state_management: "{tech_state}"
  routing: "{tech_routing}"
  styling: "{tech_styling}"

# 阶段配置
stages:
  current:
    id: "phase_1"
    name: "Phase 1 - 基础建设"
    status: "已完成"
    icon: "✅"
    completion: "100%"
  next:
    id: "phase_2"
    name: "Phase 2 - 功能完善"
    status: "进行中"
    icon: "⏸️"
    completion: "30%"

# 文档配置
documents:
  entry:
    path: ".lingma/LINGMA.md"
    title: "工作流入口"
    description: "快速开始和项目概览"
  guidelines:
    path: ".lingma/workflow/project_guidelines.md"
    title: "协作规范"
    description: "Lingma 角色和行为准则"
  workflow:
    path: ".lingma/workflow/WORKFLOW.md"
    title: "工作流程"
    description: "标准执行流程"
  readme:
    path: ".lingma/workflow/README.md"
    title: "目录说明"
    description: "工作流目录导航"
  status:
    path: ".lingma/workflow/project_status.md"
    title: "项目状态"
    description: "详细项目档案"
  tasks:
    path: ".lingma/workflow/task_breakdown.md"
    title: "任务分解"
    description: "任务清单和进度"

# 生成选项
generation:
  output_dir: ".lingma/workflow"
  include_optional_templates: false
  validate_on_generate: true
  backup_before_overwrite: true
  format_markdown: true
  generate_toc: true
  
# 质量检查
quality:
  min_guidelines_score: 85
  required_cross_references: true
  check_broken_links: true
  validate_yaml_syntax: true
```

---

## 🧪 使用示例

### 示例 1: 生成完整工作流

```bash
# 1. 准备配置文件
cat > my-project-config.yaml << 'EOF'
project:
  name: "my-awesome-project"
  full_name: "My Awesome Project"
  description: "一个优秀的项目"

tech_stack:
  framework: "Vue 3"
  language: "TypeScript"
  # ... 其他配置

stages:
  current:
    name: "Phase 1 - MVP"
    status: "已完成"
  next:
    name: "Phase 2 - 完善"
    status: "规划中"
EOF

# 2. 生成所有核心文档
generator generate all \
  --config my-project-config.yaml \
  --output-dir .lingma/workflow \
  --verbose

# 3. 验证生成的文档
generator validate \
  --check-links \
  --check-completeness \
  --report validation-report.md
```

### 示例 2: 生成单个文档

```bash
# 只生成 Guidelines
generator generate guidelines \
  --config my-project-config.yaml \
  --output .lingma/workflow/project_guidelines.md \
  --validate-chapters

# 只生成入口文件
generator generate entry \
  --config my-project-config.yaml \
  --output .lingma/LINGMA.md \
  --include-navigation
```

### 示例 3: 自定义模板

```bash
# 使用自定义模板
generator generate custom \
  --template ./my-templates/custom-report.md \
  --config my-project-config.yaml \
  --output reports/status-report.md
```

---

## 📊 变量参考手册

### 项目相关变量 (proj_*)

| 变量名 | 类型 | 必需 | 说明 | 示例 |
|--------|------|------|------|------|
| `{proj_name}` | string | ✅ | 项目简称 | "my-project" |
| `{proj_full_name}` | string | ✅ | 项目全称 | "My Awesome Project" |
| `{proj_description}` | string | ✅ | 项目描述 | "一个优秀的项目" |
| `{proj_version}` | string | ❌ | 版本号 | "1.0.0" |
| `{proj_core_modules}` | array | ❌ | 核心功能模块列表 | ["模块 1", "模块 2"] |
| `{proj_tech_stack}` | object | ❌ | 技术栈详情 | {framework: "Vue 3"} |

### 技术栈变量 (tech_*)

| 变量名 | 类型 | 必需 | 说明 | 示例 |
|--------|------|------|------|------|
| `{tech_framework}` | string | ✅ | 主要框架 | "Vue 3" |
| `{tech_language}` | string | ✅ | 编程语言 | "TypeScript" |
| `{tech_ui}` | string | ❌ | UI 库 | "Naive UI" |
| `{tech_state}` | string | ❌ | 状态管理 | "Pinia" |

### 阶段变量 (stage_*)

| 变量名 | 类型 | 必需 | 说明 | 示例 |
|--------|------|------|------|------|
| `{stage_current}` | string | ✅ | 当前阶段名称 | "Phase 1 - MVP" |
| `{stage_status}` | string | ✅ | 当前状态 | "已完成" |
| `{stage_next}` | string | ❌ | 下一阶段 | "Phase 2 - 完善" |
| `{stage_previous}` | string | ❌ | 上一阶段 | "Phase 0 - 原型" |

### 文档变量 (doc_*)

| 变量名 | 类型 | 必需 | 说明 | 示例 |
|--------|------|------|------|------|
| `{doc_guidelines_path}` | string | ✅ | Guidelines 路径 | "./project_guidelines.md" |
| `{doc_workflow_path}` | string | ✅ | Workflow 路径 | "./WORKFLOW.md" |
| `{doc_tasks_path}` | string | ✅ | Tasks 路径 | "./task_breakdown.md" |

---

## 🔍 验证规则

### Guidelines 完整性检查

```yaml
validation:
  guidelines:
    required_chapters:
      - id: 1
        pattern: "^##\\s*1\\.\\s*Role"
        min_length: 50
        min_items: 3
        
      - id: 2
        pattern: "^##\\s*2\\.\\s*.*Prefer"
        min_items: 1
        
      - id: 3
        pattern: "^##\\s*3\\.\\s*.*Avoid"
        min_items: 1
        
      - id: 4
        pattern: "^##\\s*4\\.\\s*Response Rules"
        min_items: 1
        
      - id: 5
        pattern: "^##\\s*5\\.\\s*Current Canonical Terms"
        allow_empty: true
        warning_if_empty: true
        
      - id: 6
        pattern: "^##\\s*6\\.\\s*Deliverable Standard"
        min_items: 3
        
      - id: 7
        pattern: "^##\\s*7\\.\\s*Suggested Next"
        min_items: 1
    
    scoring:
      chapter_1_weight: 1.5
      chapter_5_weight: 0.5
      min_passing_score: 70
```

---

## 📚 最佳实践

### 1. 模板维护

- ✅ 定期审查模板，移除过时的内容
- ✅ 保持模板简洁，避免过度复杂
- ✅ 为每个模板编写清晰的说明
- ✅ 提供多个使用示例

### 2. 变量管理

- ✅ 使用有意义的变量名
- ✅ 集中定义所有变量
- ✅ 为变量添加注释和文档
- ✅ 提供合理的默认值

### 3. 测试验证

- ✅ 为每个模板编写测试用例
- ✅ 测试边界情况（空值、超长文本等）
- ✅ 验证生成的文档语法正确
- ✅ 检查交叉引用有效性

### 4. 版本控制

- ✅ 模板版本与主版本同步
- ✅ 记录每次模板变更
- ✅ 提供迁移脚本
- ✅ 保持向后兼容

---

## 🔮 未来扩展

### 1. 国际化支持

```yaml
i18n:
  enabled: true
  default_locale: "zh-CN"
  available_locales:
    - zh-CN
    - en-US
    - ja-JP
    
# 使用示例
{proj_name_i18n}  # 自动根据语言选择
```

### 2. 主题系统

```yaml
themes:
  default: "minimal"
  available:
    - minimal     # 简洁风格
    - detailed    # 详细风格
    - formal      # 正式风格
    - casual      # 休闲风格
```

### 3. 插件系统

```javascript
// 自定义插件示例
export default {
  name: 'custom-formatter',
  hooks: {
    afterGenerate(content) {
      // 自定义格式化逻辑
      return content.toUpperCase();
    }
  }
};
```

---

## 📞 维护信息

**版本**: 1.0  
**最后更新**: 2026-03-19  
**维护者**: lingma-workflow skill team  

---

*本索引由 lingma-workflow 技能开发和维护*
