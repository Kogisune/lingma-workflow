# Workflow Generator Module - 工作流文档生成器

**版本**: 1.0  
**最后更新**: 2026-03-19  
**职责**: 封装所有与工作流文档生成相关的逻辑，提供标准化的模板体系

---

## 📋 模块概述

本模块的核心目标是将工作流文档生成逻辑与具体项目业务完全解耦，提供一套可复用的模板系统，使 `lingma-workflow` 技能能够为任何配套项目独立、一致地生成符合规范的工作流文档。

### 核心原则

1. **分离关注点**: 模板只包含通用结构，不包含具体业务内容
2. **配置化**: 通过占位符和变量实现灵活配置
3. **可扩展**: 支持自定义模板和插件
4. **一致性**: 确保所有生成的文档遵循统一的格式和规范

---

## 🎯 核心功能

### 1. 模板管理

- ✅ 提供标准化的文档模板集合
- ✅ 管理模板版本和兼容性
- ✅ 支持模板继承和组合

### 2. 变量替换

- ✅ 识别和处理模板中的占位符
- ✅ 支持嵌套变量和条件表达式
- ✅ 提供默认值和验证机制

### 3. 文档生成

- ✅ 基于模板生成完整的文档
- ✅ 自动处理交叉引用和链接
- ✅ 生成目录和索引

### 4. 质量检查

- ✅ 验证生成文档的完整性
- ✅ 检查链接和引用的有效性
- ✅ 确保格式一致性

---

## 🔧 使用方式

### 在主技能中调用

```markdown
## Step X: 生成工作流文档

调用模块：`modules/workflow-generator-module.md`

执行流程:
1. 加载必要模板
   → load_template('entry')
   → load_template('guidelines')
   → load_template('workflow')
   
2. 准备上下文数据
   → context = prepare_context(project_info)
   
3. 生成文档
   → generate_document(template, context)
   
4. 质量检查
   → validate_document(generated_doc)
   
5. 输出结果
   → save_to_file(generated_doc, target_path)
```

### API 接口

```pseudo
// 模板加载
load_template(template_name: string) → Template
load_all_templates() → Array<Template>

// 文档生成
generate_document(template: Template, context: Context) → Document
generate_all_documents(project_config: Config) → GenerationReport

// 变量处理
replace_variables(content: string, variables: Map) → string
validate_variables(template: Template) → ValidationResult

// 质量检查
validate_document(document: Document) → QualityReport
check_cross_references(documents: Array<Document>) → ReferenceReport
```

---

## 📊 模板体系

### 模板分类

#### 1. 核心模板（必需）

这些模板是工作流的基础，每个项目都必须生成：

| 模板名称 | 文件 | 用途 |
|---------|------|------|
| `template-entry.md` | LINGMA.md | 工作流入口文件 |
| `template-guidelines.md` | project_guidelines.md | 协作规范 |
| `template-workflow.md` | WORKFLOW.md | 执行流程 |
| `template-readme.md` | README.md | 目录说明 |
| `template-status.md` | project_status.md | 项目状态 |
| `task-breakdown.md` | task_breakdown.md | 任务分解 |

#### 2. 扩展模板（可选）

根据项目需要选择性生成：

| 模板名称 | 文件 | 用途 |
|---------|------|------|
| `template-analysis.md` | ANALYSIS_AND_OPTIMIZATION.md | 分析报告 |
| `template-implementation.md` | IMPLEMENTATION_GUIDE.md | 实施指南 |
| `template-dashboard.md` | HEALTH_DASHBOARD.md | 健康仪表板 |
| `template-skill-spec.md` | skill_specs.md | 技能规格说明 |

---

## 📝 详细模板设计

### 模板设计原则

1. **使用占位符**: 所有具体内容都用 `{variable}` 表示
2. **提供默认值**: 每个变量都有合理的默认值
3. **支持条件**: 使用 `{?variable}...{/}` 语法
4. **类型安全**: 明确变量的类型和约束

### 变量命名规范

```yaml
命名格式：{category_name}

分类前缀:
- proj_: 项目相关信息（如 {proj_name}）
- tech_: 技术栈信息（如 {tech_framework}）
- stage_: 阶段信息（如 {stage_current}）
- doc_: 文档引用（如 {doc_guidelines}）
- meta_: 元数据（如 {meta_version}）

示例:
- {proj_name} - 项目名称
- {tech_stack} - 技术栈列表
- {stage_current} - 当前阶段
- {doc_workflow} - WORKFLOW.md 的路径
```

---

## 🗂️ 标准模板库

### Template 1: Entry File (LINGMA.md)

**文件**: `templates/template-entry.md`

```markdown
# {proj_name} - LINGMA Workflow Entry

**项目**: {proj_full_name}  
**框架**: {tech_framework} + {tech_language}  
**工作流版本**: {meta_version}  
**最后更新**: {meta_date}  

---

## 🎯 快速开始

欢迎使用本项目的 Lingma 工作流！本指南将帮助你快速了解项目状态和协作规范。

### 当前阶段

**{stage_current}** ✅ {stage_status}

{?stage_previous}
- {stage_previous}: {stage_previous_status}
{/stage_previous}
{?stage_next}
- {stage_next}: {stage_next_status}
{/stage_next}

### 核心成果

{proj_core_achievements}

---

## 📁 关键文档导航

### 必读文档（按顺序）

1. **[{doc_guidelines_title}]({doc_guidelines_path})** - {doc_guidelines_desc}
2. **[{doc_tasks_title}]({doc_tasks_path})** - {doc_tasks_desc}
3. **[{doc_workflow_title}]({doc_workflow_path})** - {doc_workflow_desc}
4. **[{doc_readme_title}]({doc_readme_path})** - {doc_readme_desc}

{?proj_additional_docs}
### 其他文档

{proj_additional_docs}
{/proj_additional_docs}

---

## ⚖️ 铁律约束

使用本工作流前，必须验证以下三条铁律：

### 铁律 1：入口文件验证
✅ 标准入口：`{entry_file_path}`（本文件）

### 铁律 2：路径约束
✅ 所有工作流文档必须在 `{workflow_dir}` 内

### 铁律 3：Guidelines 优先
✅ `{guidelines_file}` 是最核心的协作文档

---

## 🚀 常用工作流命令

### 触发技能

```bash
# 自动触发（当提到以下关键词时）
{skill_trigger_keywords}
```

### 典型使用场景

{skill_usage_scenarios}

---

## 📊 项目概览

### 技术栈

{proj_tech_stack}

### 核心功能模块

{proj_core_modules}

### 项目结构

{proj_structure}

---

## 🎯 下一步行动

{proj_next_steps}

---

## 📞 协作指南

{collaboration_guide}

---

## 🔗 附加资源

{additional_resources}

---

## 📝 变更日志

{changelog}

---

**最后更新**: {meta_date}  
**维护者**: {meta_maintainer}  
**反馈渠道**: {feedback_channel}
```

**变量说明**:

```yaml
必需变量:
- proj_name: 项目简称
- proj_full_name: 项目全称
- tech_framework: 主要框架
- tech_language: 编程语言
- meta_version: 工作流版本号
- meta_date: 更新日期
- stage_current: 当前阶段名称
- stage_status: 状态标识（已完成/进行中/待开始）

可选变量:
- stage_previous: 上一阶段
- stage_next: 下一阶段
- proj_core_achievements: 核心成果列表
- proj_tech_stack: 技术栈详情
- proj_core_modules: 功能模块列表
- proj_structure: 目录结构
- proj_next_steps: 下一步计划
- collaboration_guide: 协作指南
- additional_resources: 附加资源
- changelog: 变更记录
```

---

### Template 2: Guidelines (project_guidelines.md)

**文件**: `templates/template-guidelines.md`

```markdown
# {proj_name} Collaboration Guidelines

## 1. Role

Lingma 在本项目中的角色不是泛化聊天助手，而是面向交付的技术协作者。当前阶段的主要职责是：

{role_responsibilities}

## 2. What Lingma Should Prefer

优先做这些事情：

{prefer_actions}

## 3. What Lingma Should Avoid

当前阶段避免直接做这些事情：

{avoid_actions}

## 4. Response Rules

当 Lingma 处理本项目任务时，输出应遵守以下规则：

{response_rules}

## 5. Current Canonical Terms

{canonical_terms}

## 6. Deliverable Standard

一个合格的新增资产，至少需要满足以下要求：

{deliverable_standards}

## 7. Suggested Next Deliverables

如果后续继续完善 `{workflow_dir}`，建议按这个顺序继续增加：

{suggested_deliverables}
```

**变量说明**:

```yaml
必需变量:
- role_responsibilities: 职责列表（至少 3 条）
- prefer_actions: 优先事项列表（至少 1 条）
- avoid_actions: 避免事项列表（至少 1 条）
- response_rules: 响应规则列表
- canonical_terms: 术语规范（可为空，但会警告）
- deliverable_standards: 交付标准列表（至少 3 条）
- suggested_deliverables: 完善建议列表

验证规则:
- role_responsibilities.min_items: 3
- prefer_actions.min_items: 1
- avoid_actions.min_items: 1
- deliverable_standards.min_items: 3
- canonical_terms.allow_empty: true (with warning)
```

---

### Template 3: Workflow (WORKFLOW.md)

**文件**: `templates/template-workflow.md`

```markdown
# {proj_name} Workflow

## Goal

{workflow_goal}

## Current Status

**当前阶段**: {stage_current} {stage_status_icon} {stage_status_text}  
**下一阶段**: {stage_next}  
**最后更新**: {meta_date}

## Prerequisites

{workflow_prerequisites}

## Step 1: {step1_name}

{step1_content}

## Step 2: {step2_name}

{step2_content}

{?additional_steps}
## Step {step_number}: {step_name}

{step_content}
{/additional_steps}

## Troubleshooting

{troubleshooting_guide}

## Progress Tracking

{progress_tracking}

详细任务分解与进度见 [`{doc_tasks_basename}`]({doc_tasks_path})。
```

**变量说明**:

```yaml
必需变量:
- workflow_goal: 工作流程目标
- stage_current: 当前阶段
- stage_status_icon: 状态图标（✅/⏸️/🔲等）
- stage_status_text: 状态描述
- stage_next: 下一阶段
- meta_date: 更新日期
- workflow_prerequisites: 前置条件清单
- step1_name: 第一步名称
- step1_content: 第一步详细内容
- step2_name: 第二步名称
- step2_content: 第二步详细内容
- troubleshooting_guide: 故障排查指南
- progress_tracking: 进度追踪模板
- doc_tasks_basename: 任务文档文件名（不含路径）
- doc_tasks_path: 任务文档完整路径
```

---

### Template 4: README (README.md)

**文件**: `templates/template-readme.md`

```markdown
# {workflow_dir_name}

{workflow_dir_description}

## 当前判断

基于当前仓库内容与 {meta_date} 的工作流自检结果，项目目前处于 **{stage_current}** 的阶段：

{stage_details}

因此，这个目录的作用是 {directory_purpose}。

## 目录结构

{directory_structure}

## 快速使用

{quick_start_guide}

## 适用边界

{usage_boundaries}
```

---

### Template 5: Status (project_status.md)

**文件**: `templates/template-status.md`

```markdown
# {proj_name} Project Status

**最近更新**: {meta_date}

## 1. Current Stage

{current_stage_details}

## 2. Confirmed Repository Facts

{repo_facts}

## 3. MVP Scope

{mvp_scope}

## 4. Naming Normalization

{naming_normalization}

## 5. System Boundary

{system_boundary}

## 6. Current Delivery Priorities

{delivery_priorities}

## 7. API Snapshot

{api_snapshot}

## 8. Repository Structure

{repo_structure}

## 9. Practical Rules

{practical_rules}
```

---

### Template 6: Task Breakdown (task_breakdown.md)

**文件**: `templates/task-breakdown.md`

```markdown
# 任务分解与进度跟踪

**最近更新**: {meta_date}

---

## 📊 当前项目阶段

**阶段**: {stage_current} {stage_completion}

{stage_history}

---

{task_sections}

---

## 📈 总体进度

{overall_progress}

---

## 🎯 下一步建议

{next_suggestions}

---

## 📝 变更记录

{change_log}
```

---

## 🔧 生成器实现

### 上下文管理器

```javascript
class WorkflowGenerator {
  constructor(config) {
    this.config = config;
    this.templates = new Map();
    this.variables = new Map();
  }

  // 加载模板
  async loadTemplate(name, path) {
    const content = await fs.readFile(path, 'utf-8');
    const template = this.parseTemplate(content);
    this.templates.set(name, template);
    return template;
  }

  // 设置变量
  setVariable(key, value) {
    this.variables.set(key, value);
  }

  // 批量设置变量
  setVariables(variables) {
    for (const [key, value] of Object.entries(variables)) {
      this.variables.set(key, value);
    }
  }

  // 生成文档
  generate(templateName) {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    let content = template.raw;
    
    // 替换简单变量
    for (const [key, value] of this.variables) {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      content = content.replace(regex, value);
    }

    // 处理条件块
    content = this.processConditionals(content);

    // 处理列表
    content = this.processLists(content);

    return content;
  }

  // 处理条件块
  processConditionals(content) {
    // 处理 {?var}...{/} 语法
    const conditionalRegex = /\{\?(\w+)\}([\s\S]*?)\{\/\}/g;
    return content.replace(conditionalRegex, (match, varName, blockContent) => {
      const value = this.variables.get(varName);
      return value ? blockContent : '';
    });
  }

  // 处理列表
  processLists(content) {
    // 处理数组类型的变量
    for (const [key, value] of this.variables) {
      if (Array.isArray(value)) {
        const listRegex = new RegExp(`\\{#${key}\\}([\\s\\S]*?)\\{\\/#\\}`, 'g');
        content = content.replace(listRegex, (match, itemTemplate) => {
          return value.map(item => {
            return itemTemplate.replace(/\{item\}/g, item);
          }).join('\n');
        });
      }
    }
    return content;
  }

  // 验证文档完整性
  validateDocument(content, templateName) {
    const template = this.templates.get(templateName);
    const requiredSections = template.requiredSections || [];
    const missing = [];

    for (const section of requiredSections) {
      if (!content.includes(section)) {
        missing.push(section);
      }
    }

    return {
      valid: missing.length === 0,
      missing,
      score: ((requiredSections.length - missing.length) / requiredSections.length) * 100
    };
  }
}
```

---

## 📦 配置文件

### project-config.yaml

```yaml
# 项目基本配置
project:
  name: "my-project"
  full_name: "My Awesome Project"
  version: "1.0.0"
  description: "项目描述"

# 技术栈
tech_stack:
  framework: "Vue 3"
  language: "TypeScript"
  ui: "Naive UI"
  state_management: "Pinia"

# 阶段信息
stages:
  current:
    name: "Phase 1 - 基础建设"
    status: "已完成"
    icon: "✅"
  next:
    name: "Phase 2 - 功能完善"
    status: "进行中"
    icon: "⏸️"

# 文档配置
documents:
  guidelines:
    title: "协作规范"
    path: "./project_guidelines.md"
    description: "Lingma 协作规范"
  workflow:
    title: "工作流程"
    path: "./WORKFLOW.md"
    description: "标准执行流程"
  tasks:
    title: "任务分解"
    path: "./task_breakdown.md"
    description: "详细任务分解"

# 生成选项
generation:
  output_dir: ".lingma/workflow"
  include_optional: false
  validate_on_generate: true
  backup_before_overwrite: true
```

---

## 🧪 测试用例

### 单元测试示例

```javascript
describe('WorkflowGenerator', () => {
  let generator;

  beforeEach(() => {
    generator = new WorkflowGenerator({});
  });

  test('should replace simple variables', () => {
    generator.setVariable('proj_name', 'TestProject');
    const template = 'Project: {proj_name}';
    
    // Mock template loading
    generator.templates.set('test', { raw: template });
    
    const result = generator.generate('test');
    expect(result).toBe('Project: TestProject');
  });

  test('should process conditionals', () => {
    generator.setVariable('stage_previous', 'Phase 0');
    const template = '{?stage_previous}Previous: {stage_previous}{/}';
    
    generator.templates.set('test', { raw: template });
    
    const result = generator.generate('test');
    expect(result).toContain('Previous: Phase 0');
  });

  test('should handle missing variables gracefully', () => {
    const template = 'Value: {missing_var}';
    generator.templates.set('test', { raw: template });
    
    const result = generator.generate('test');
    expect(result).toBe('Value: {missing_var}'); // Keep placeholder
  });

  test('should validate document completeness', () => {
    const content = '# Doc\n\n## Section 1\n\n## Section 2';
    const requiredSections = ['## Section 1', '## Section 2', '## Section 3'];
    
    // Mock template with required sections
    generator.templates.set('test', { 
      raw: content,
      requiredSections 
    });
    
    const validation = generator.validateDocument(content, 'test');
    expect(validation.valid).toBe(false);
    expect(validation.missing).toEqual(['## Section 3']);
    expect(validation.score).toBeCloseTo(66.67);
  });
});
```

---

## 📚 最佳实践

### 1. 模板设计

- ✅ 保持模板简洁，只包含必要的结构
- ✅ 使用有意义的变量名
- ✅ 为所有变量提供文档说明
- ✅ 包含验证规则
- ✅ 提供默认值和回退机制

### 2. 变量管理

- ✅ 使用命名空间前缀（proj_, tech_, stage_）
- ✅ 集中管理变量定义
- ✅ 验证变量类型和格式
- ✅ 记录变量依赖关系

### 3. 文档生成

- ✅ 生成前备份现有文件
- ✅ 生成后运行验证
- ✅ 提供差异对比
- ✅ 允许用户审查和修改

### 4. 版本控制

- ✅ 模板版本与主版本同步
- ✅ 记录模板变更历史
- ✅ 提供迁移指南
- ✅ 保持向后兼容

---

## 🔮 扩展方向

### 1. 自定义模板

允许用户创建自己的模板：

```yaml
custom_templates:
  - name: "custom-report"
    path: "./templates/custom-report.md"
    output: ".lingma/reports/{{date}}.md"
```

### 2. 插件系统

支持第三方插件提供额外功能：

```javascript
// 插件示例
export default {
  name: 'termo-plugin',
  hooks: {
    beforeGenerate(context) {
      // 在生成前添加术语检查
    },
    afterGenerate(document) {
      // 在生成后添加格式化
    }
  }
};
```

### 3. 主题系统

支持不同的文档风格：

```yaml
theme:
  name: "minimal"  # 或 "detailed", "formal", "casual"
  options:
    show_toc: true
    show_changelog: false
    emoji_style: "unicode"
```

---

## 📞 维护信息

**版本**: 1.0  
**最后更新**: 2026-03-19  
**维护者**: lingma-workflow skill team  
**反馈渠道**: 在项目 issue 中提出相关问题

---

*本模块由 lingma-workflow 技能开发和维护*
