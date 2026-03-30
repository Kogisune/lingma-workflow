# Workflow Generator 快速参考指南

**版本**: 2.0
**最后更新**: 2026-03-30

---

## 快速开始

### Step 1: 配置铁律

```bash
cd skills/lingma-workflow
cp laws.yaml.example laws.yaml
```

### Step 2: 初始化入口文件

```bash
# 交互式引导（推荐）
node bootstrap-entry.js

# 自动模式（使用默认基础模板）
node bootstrap-entry.js --auto

# 指定完整模板
node bootstrap-entry.js --template=complete
```

### Step 3: 运行验证

```bash
cp validate.js.template validate.js
node validate.js
```

---

## 文件结构

```
skills/lingma-workflow/
├── SKILL.md              # 技能定义
├── bootstrap-entry.js    # 入口自举脚本
├── validate.js.template  # 验证脚本模板
├── laws.yaml.example     # 铁律配置示例
├── modules/
│   ├── entry-file-handler.md       # 入口处理模块
│   └── workflow-generator-module.md # 生成器模块
└── templates/
    └── config/
        ├── project-config.yaml.example  # 项目配置示例
        └── variables-validation.yaml    # 变量验证规则
```

---

## 核心概念

### 入口文件

标准入口：`.lingma/LINGMA.md`

| 类型 | 路径 | 优先级 |
|------|------|--------|
| 标准 | `.lingma/LINGMA.md` | 最高 |
| 替代 | `.lingma/workflow/README.md` | 高 |
| 替代 | `LINGMA.md`（根目录） | 中 |
| 替代 | `.lingma/workflow/index.md` | 低 |

### 铁律

1. **入口文件约束**: 必须使用 `.lingma/LINGMA.md`
2. **路径约束**: 所有工作流文件必须在 `.lingma/workflow/` 内
3. **Guidelines 优先**: `project_guidelines.md` 必须包含 7 个核心章节

### 验证规则

Guidelines 7 个必需章节：

| # | 章节 | 最低条目数 | 权重 |
|---|------|-----------|------|
| 1 | Role | 3 | 1.5 |
| 2 | Prefer | 1 | 1.0 |
| 3 | Avoid | 1 | 1.0 |
| 4 | Response Rules | 1 | 1.0 |
| 5 | Canonical Terms | 0（允许空） | 0.5 |
| 6 | Deliverable Standard | 3 | 1.0 |
| 7 | Next Deliverables | 1 | 1.0 |

通过标准：加权平均分 >= 85

---

## 模板变量

项目相关（`proj_*`）: `proj_name`, `proj_full_name`, `proj_description`

技术栈（`tech_*`）: `tech_framework`, `tech_language`, `tech_ui`

阶段（`stage_*`）: `stage_current`, `stage_status`, `stage_next`

文档（`doc_*`）: `doc_guidelines_path`, `doc_workflow_path`, `doc_tasks_path`

---

## 常见问题

### Q1: 验证脚本需要 js-yaml

```bash
npm install js-yaml
```

### Q2: 入口文件不存在

运行 `node bootstrap-entry.js` 自动创建

### Q3: Guidelines 评分过低

运行 `node validate.js --verbose` 查看详细报告

---

## 相关文档

- **主技能**: `SKILL.md`
- **模块索引**: `modules/README.md`
- **配置示例**: `templates/config/project-config.yaml.example`
- **变量规则**: `templates/config/variables-validation.yaml`
