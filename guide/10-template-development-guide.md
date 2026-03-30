# 模板开发最佳实践指南

**版本**: 2.2  
**日期**: 2026-03-30
**类型**: 最佳实践  
**目标**: 提供设计和开发可复用文档模板的完整指南

---

## 📋 引言

### 为什么需要模板？

在 `lingma-workflow` 项目中，我们发现：
- ❌ 每个新项目都要重复编写相似的文档
- ❌ 文档质量参差不齐
- ❌ 术语和格式难以统一
- ❌ 维护成本高，更新不同步

**解决方案**: 使用模板化、配置化的方式生成文档

### 模板开发的目标

1. **可复用性**: 一套模板可用于多个项目
2. **一致性**: 所有生成的文档遵循统一的格式
3. **易维护**: 修改一处，全局生效
4. **低门槛**: 非技术人员也能使用和修改

---

## 🎯 核心设计原则

### 原则 1: 业务解耦（最重要）

**定义**: 模板不包含任何具体项目的业务细节

**反例**（❌ 错误示范）:
```markdown
## 订单管理模块

订单列表页面位于 `src/views/orders/` 目录下。

物流追踪功能集成高德地图 SDK。
```

**正例**（✅ 正确示范）:
```markdown
## {core_module_name}

{core_module_description}

技术栈：{tech_stack.framework} + {tech_ui}
```

**效果**: 
- ✅ 同一套模板可用于物流、电商、金融等项目
- ✅ 模板维护成本降低 80%

### 原则 2: 单一职责

**定义**: 每个模板只负责一种类型的文档

**示例**:
```
template-entry.md      → LINGMA.md（入口文件）
template-guidelines.md → project_guidelines.md（协作规范）
template-workflow.md   → WORKFLOW.md（工作流程）
```

**好处**:
- ✅ 职责清晰，易于维护
- ✅ 可以独立修改某个模板
- ✅ 便于测试和验证

### 原则 3: 配置驱动

**定义**: 所有内容通过配置文件注入

**配置层次**:
```yaml
Level 1: 项目信息 (project.*)
Level 2: 技术栈 (tech_*)
Level 3: 阶段信息 (stage_*)
Level 4: 文档配置 (doc_*)
Level 5: 自定义变量 (custom_*)
```

**优势**:
- ✅ 修改配置即可调整内容
- ✅ 支持多项目差异化
- ✅ 配置版本化，易回滚

### 原则 4: 渐进式复杂度

**定义**: 从简单开始，逐步增加复杂度

**设计思路**:
```
简单变量替换 → 条件块 → 列表块 → 嵌套结构 → 计算变量
```

**好处**:
- ✅ 新手可以快速上手
- ✅ 高级用户可以扩展功能
- ✅ 保持向后兼容

---

## 📝 模板语法规范

### 基础语法

#### 1. 简单变量

**语法**: `{variable_name}`

**示例**:
```markdown
# {proj_name} - 项目文档

**版本**: {proj_version}
**框架**: {tech_framework}
```

**处理逻辑**:
```javascript
content = content.replace(/{proj_name}/g, 'my-project');
```

**最佳实践**:
- ✅ 使用有意义的变量名
- ✅ 使用下划线分隔单词
- ✅ 使用命名空间前缀（proj_, tech_）

#### 2. 条件块

**语法**:
```markdown
{?variable_name}
当变量存在时显示的内容
{/variable_name}
```

**示例**:
```markdown
# 项目阶段

当前：{stage_current}

{?stage_previous}
上一阶段：{stage_previous}
{/stage_previous}

{?stage_next}
下一阶段：{stage_next}
{/stage_next}
```

**处理逻辑**:
```javascript
// 伪代码
if (context['stage_previous']) {
  // 保留这部分内容
} else {
  // 移除这部分内容
}
```

**最佳实践**:
- ✅ 用于可选内容
- ✅ 保持条件块简洁
- ✅ 避免嵌套过深（最多 2 层）

#### 3. 列表块

**语法**:
```markdown
{#variable_list}
- {item}
{/variable_list}
```

**示例**:
```markdown
## 核心功能

{#core_features}
- ✅ {item}
{/core_features}
```

**渲染结果**:
```markdown
## 核心功能

- ✅ 功能 1
- ✅ 功能 2
- ✅ 功能 3
```

**最佳实践**:
- ✅ 用于重复内容
- ✅ 保持列表项格式一致
- ✅ 可以包含其他变量

#### 4. 嵌套变量

**语法**: `{object.property}`

**示例**:
```markdown
## 技术栈

框架：{tech_stack.framework}
语言：{tech_stack.language}
UI: {tech_stack.ui_library}
```

**配置**:
```yaml
tech_stack:
  framework: "Vue 3"
  language: "TypeScript"
  ui_library: "Naive UI"
```

**最佳实践**:
- ✅ 用于结构化数据
- ✅ 层级不超过 3 层
- ✅ 提供默认值

---

## 🔧 模板设计流程

### Step 1: 分析需求

**问题清单**:
1. 这个模板用于生成什么文档？
2. 文档的目标读者是谁？
3. 文档必须包含哪些章节？
4. 哪些内容是变化的？
5. 哪些内容是不变的？

**示例分析**（以 LINGMA.md 为例）:

**不变的内容**（模板结构）:
- 文档标题格式
- 章节顺序
- 导航链接结构

**变化的内容**（使用变量）:
- 项目名称
- 技术栈
- 当前阶段
- 文档路径

### Step 2: 设计结构

**标准结构**:
```markdown
# {proj_name} - {doc_type}

## 🎯 快速开始

{quick_start_content}

## 📁 关键文档导航

{navigation_links}

## ⚖️ 铁律约束

{iron_laws}

## 🚀 常用命令

{common_commands}

## 📊 项目概览

{project_overview}

## 🎯 下一步行动

{next_steps}

## 📞 维护信息

{maintenance_info}
```

**设计原则**:
- ✅ 从概要到详细
- ✅ 从重要到次要
- ✅ 符合读者阅读习惯

### Step 3: 定义变量

**变量清单**:
```yaml
必需变量:
  - proj_name: 项目简称
  - proj_full_name: 项目全称
  - tech_framework: 主要框架
  
可选变量:
  - stage_previous: 上一阶段
  - stage_next: 下一阶段
  - custom_sections: 自定义章节
```

**变量命名规范**:
```yaml
命名格式：{category_name}

分类前缀:
- proj_: 项目相关
- tech_: 技术栈
- stage_: 阶段信息
- doc_: 文档相关
- meta_: 元数据
```

### Step 4: 编写模板

**编写技巧**:

1. **先写静态框架**
   ```markdown
   # 项目文档
   
   ## 第一章：介绍
   
   ## 第二章：快速开始
   
   ## 第三章：详细说明
   ```

2. **再添加变量**
   ```markdown
   # {proj_name} 文档
   
   ## 第一章：介绍
   
   {proj_description}
   
   ## 第二章：快速开始
   
   {quick_start_guide}
   ```

3. **最后添加条件**
   ```markdown
   # {proj_name} 文档
   
   {?proj_description}
   ## 第一章：介绍
   
   {proj_description}
   {/proj_description}
   ```

### Step 5: 测试验证

**测试清单**:
- [ ] 所有变量都能正确替换
- [ ] 条件块逻辑正确
- [ ] 列表块渲染正常
- [ ] 生成的文档格式正确
- [ ] 交叉引用有效
- [ ] 没有失效的链接

**测试方法**:
```bash
# 1. 准备测试配置
cat > test-config.yaml << EOF
project:
  name: "test-project"
  full_name: "Test Project"
EOF

# 2. 生成文档
generator generate entry --config test-config.yaml

# 3. 检查输出
cat .lingma/LINGMA.md

# 4. 验证质量
generator validate
```

---

## 📦 模板组织

### 目录结构

```
templates/
├── core/                    # 核心模板（必需）
│   ├── template-entry.md
│   ├── template-guidelines.md
│   └── ...
│
├── optional/                # 扩展模板（可选）
│   ├── template-analysis.md
│   └── ...
│
├── partials/                # 局部模板
│   ├── _header.md
│   ├── _footer.md
│   └── ...
│
└── config/                  # 配置文件
    ├── project-config.yaml.example
    └── variables-validation.yaml
```

### 模板命名规范

**规则**:
```
template-{type}.md           # 主模板
_{partial-name}.md          # 局部模板
```

**示例**:
```
template-entry.md            # 入口文件模板
template-guidelines.md       # Guidelines 模板
_header.md                   # 文档头部
_changelog.md                # 变更记录
```

### 模板版本控制

**版本格式**: `MAJOR.MINOR.PATCH`

- **MAJOR**: 不兼容的变更
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修复

**版本记录**:
```markdown
<!-- 在模板文件头部 -->
**版本**: 1.0
**最后更新**: 2026-03-19
```

**变更日志**:
```markdown
## 变更日志

### 1.0 (2026-03-19)
- 初始版本
- 包含 6 个核心模板
```

---

## 🧪 模板测试

### 测试类型

#### 1. 单元测试

测试单个功能点：

```javascript
describe('Template Variables', () => {
  test('should replace simple variable', () => {
    const template = 'Project: {proj_name}';
    const context = { proj_name: 'MyProject' };
    const result = generate(template, context);
    
    expect(result).toBe('Project: MyProject');
  });
  
  test('should process conditional block', () => {
    const template = '{?var}Has value{/var}';
    
    // 有值的情况
    expect(generate(template, { var: 'test' }))
      .toBe('Has value');
    
    // 无值的情况
    expect(generate(template, {}))
      .toBe('');
  });
});
```

#### 2. 集成测试

测试完整的生成流程：

```javascript
describe('Full Generation Flow', () => {
  test('should generate complete document', async () => {
    const config = loadConfig('test-config.yaml');
    const generator = new WorkflowGenerator(config);
    
    const document = await generator.generate('entry');
    
    // 验证文档完整性
    expect(document).toContain('# ');
    expect(document).toContain('## ');
    expect(document.length).toBeGreaterThan(100);
  });
});
```

#### 3. 边界测试

测试极端情况：

```javascript
test('should handle empty variables', () => {
  const template = 'Value: {empty_var}';
  const result = generate(template, {});
  
  // 应该保留占位符或显示默认值
  expect(result).toMatch(/Value: /);
});

test('should handle very long text', () => {
  const longText = 'A'.repeat(10000);
  const template = '{long_desc}';
  const result = generate(template, { long_desc: longText });
  
  expect(result).toBe(longText);
});
```

---

## 💡 最佳实践

### 1. 模板设计

✅ **应该做的**:
- 保持模板简洁，只包含必要的结构
- 使用有意义的变量名
- 为所有变量提供文档说明
- 包含验证规则
- 提供默认值和回退机制

❌ **不应该做的**:
- 不要在模板中包含具体业务逻辑
- 不要使用模糊的变量名（如 {a}, {b}）
- 不要假设变量的值一定存在
- 不要创建过于复杂的嵌套结构

### 2. 变量管理

✅ **应该做的**:
- 使用命名空间前缀（proj_, tech_）
- 集中管理变量定义
- 验证变量类型和格式
- 记录变量依赖关系

❌ **不应该做的**:
- 不要混用不同的命名风格
- 不要在运行时动态添加变量
- 不要使用未定义的变量

### 3. 文档生成

✅ **应该做的**:
- 生成前备份现有文件
- 生成后运行验证
- 提供差异对比
- 允许用户审查和修改

❌ **不应该做的**:
- 不要直接覆盖重要文件
- 不要跳过验证步骤
- 不要隐藏错误信息

### 4. 版本控制

✅ **应该做的**:
- 模板版本与主版本同步
- 记录每次模板变更
- 提供迁移脚本
- 保持向后兼容

❌ **不应该做的**:
- 不要破坏已有的配置
- 不要随意更改变量名
- 不要删除已废弃的功能而不通知

---

## 🔮 高级主题

### 1. 模板继承

**概念**: 子模板继承父模板的结构

**示例**:
```markdown
<!-- base.md -->
# {title}

{#content}
{/content}

---
Generated on {date}
```

```markdown
<!-- child.md -->
extends: base.md

title: "My Project"
content: |
  This is my project description.
```

### 2. 模板组合

**概念**: 将多个模板组合成一个文档

**示例**:
```javascript
const document = combine(
  load('_header.md'),
  load('template-entry.md'),
  load('_footer.md')
);
```

### 3. 自定义函数

**概念**: 在模板中使用自定义函数

**示例**:
```markdown
当前日期：{{ formatDate(now(), 'YYYY-MM-DD') }}

项目成员数量：{{ count(team_members) }}
```

---

## 📞 总结

模板开发的核心要点：

1. **坚持业务解耦** - 这是模板可复用的关键
2. **使用配置驱动** - 让非技术人员也能维护
3. **建立质量标准** - 确保生成的文档符合要求
4. **提供完善文档** - 帮助用户快速上手
5. **持续优化改进** - 根据反馈不断迭代

**记住**: 好的模板系统应该是"无形"的，用户感受不到它的存在，但却能高效地生成高质量的文档。

---

**版本**: 2.2  
**最后更新**: 2026-03-30  
**维护者**: lingma-workflow skill team

---

*本指南最后更新于 2026-03-30 (v2.2)*
