# lingma-workflow

**Lingma IDE 标准化工作流技能**  
**版本**: 2.2 (优化版)  
**更新日期**: 2026-03-30

[![Validation](https://img.shields.io/badge/validation-passing-brightgreen)](guide/02-implementation-guide.md)
[![Phase](https://img.shields.io/badge/phase-1--3-blue)](guide/02-implementation-guide.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 项目概述

`lingma-workflow` 是 Lingma IDE 中用于确保智能体在处理项目任务时自动遵循标准化的工作流 skill，本项目由 Lingma IDE 智能体辅助开发。

**核心能力**：
- 🤖 **智能自举** - 入口文件不存在时自动创建
- 🔍 **智能检测** - 支持多入口识别和路径对齐
- ⚖️ **铁律约束** - 三条规则保证工作流一致性
- 📊 **健康监控** - 自动生成仪表板追踪文档合规性
- 🔧 **模块化设计** - 高可维护性和扩展性

详细说明见 [实施指南](guide/02-implementation-guide.md)

---

## 🚀 核心功能

### 1. 铁律验证系统

在三条"铁律"验证通过前不执行任何操作：

| 铁律 | 描述 | 详情 |
|------|------|------|
| 🔴 **铁律 1** | 入口文件验证 | [智能检测和自举机制](guide/01-entry-file-upgrade-guide.md) |
| 🔴 **铁律 2** | 路径约束 | 所有操作必须在 `.lingma/workflow` 范围内 |
| 🔴 **铁律 3** | Guidelines 优先 | 必须包含 [7 个核心章节](guide/02-implementation-guide.md#12-实现验证脚本) |

**验证失败 → 立即停止并返回错误信息**

### 2. 智能入口处理（v2.0 新增）

详见 [入口文件升级指南](guide/01-entry-file-upgrade-guide.md)

#### 支持的入口文件类型

| 入口路径 | 优先级 | 置信度 |
|---------|--------|--------|
| `.lingma/LINGMA.md` | ⭐⭐⭐⭐⭐ | 1.0 |
| `.lingma/workflow/README.md` | ⭐⭐⭐⭐ | 0.8 |
| `LINGMA.md` (根目录) | ⭐⭐⭐ | 0.7 |
| `.lingma/workflow/index.md` | ⭐⭐ | 0.6 |

#### 自举流程

```text
入口不存在 → 扫描替代品 → 询问用户 → 选择模板 → 自动创建 → 继续执行
```

**模板选项**:
- 📄 **基础模板** (50 行) - 最小化配置
- 📊 **完整模板** (200 行) - 所有章节完整
- 🎯 **智能生成** - 分析项目后定制

### 3. 自动化监控

- ✅ **Git Hook** - 提交前自动验证
- ✅ **健康仪表板** - 实时显示合规状态
- ✅ **CI/CD 集成** - GitHub Actions 自动化
- ✅ **自愈机制** - 高置信度问题自动修复

详细实施路径见 [实施指南 Phase 3](guide/02-implementation-guide.md#phase-3自动化闭环 2 周)

### 4. 文档对齐能力

自动读取并对齐关键文档：

```text
.lingma/
├── LINGMA.md                    # 工作流入口
└── workflow/
    ├── project_guidelines.md    # 协作规范（核心）
    ├── WORKFLOW.md              # 执行流程
    └── task_breakdown.md        # 任务分解
```

对齐机制详见 [模块化重构指南](guide/05-modular-refactoring-guide.md)

---

## 📦 项目结构

```
lingma-workflow/
├── skills/
│   └── lingma-workflow/     # 技能主目录
│       ├── SKILL.md         # 技能定义
│       ├── laws.yaml.example # 铁律配置示例
│       ├── bootstrap-entry.js # 入口自举脚本
│       ├── validate.js.template # 验证脚本模板
│       └── modules/         # 功能模块
├── guide/                   # 指南中心
├── LICENSE
└── README.md
```

**详细文档导航**: [skills/lingma-workflow/README.md](skills/lingma-workflow/README.md)

---

## 🎯 使用方法

### 快速开始（5 分钟）

完整教程见 [实施指南 - 快速开始](guide/02-implementation-guide.md#快速开始 5 分钟)

#### Step 1: 安装依赖

```bash
cd .lingma/skills/lingma-workflow
npm install js-yaml
```

#### Step 2: 配置铁律

```bash
cp laws.yaml.example laws.yaml
```

#### Step 3: 运行验证

```bash
cp validate.js.template validate.js
node validate.js
```

**预期输出**:
```text
✅ 已加载铁律配置：3 条规则
🔍 开始铁律验证...
✅ 铁律 1：入口文件约束 - 验证通过
✅ 铁律 2：路径约束 - 验证通过
📋 Guidelines 完整性检查报告 - 得分：85/100
✅ 所有铁律验证通过！
```

#### Step 4: 集成 Git Hook

详见 [Git Hook 集成](guide/02-implementation-guide.md#13-集成-git-hook)

### 在 Lingma IDE 中使用

**自动触发关键词**：
- "工作流"、"流程"、"规范"
- "按照项目标准"
- "下一步做什么"
- "创建新 X"（功能、组件、文档等）

**手动触发**：
```
使用 /lingma-workflow 命令
```

### 使用示例

更多示例见 [技能使用说明](skills/lingma-workflow/README.md#使用示例)

---

## 🧩 模块说明

### 核心模块

| 模块 | 职责 | 位置 |
|------|------|------|
| **Entry File Handler** | 入口检测、验证和自举 | [modules/entry-file-handler.md](skills/lingma-workflow/modules/entry-file-handler.md) |
| **Workflow Generator** | 工作流文档生成和模板管理 | [modules/workflow-generator-module.md](skills/lingma-workflow/modules/workflow-generator-module.md) |

### 工具脚本

| 工具 | 功能 |
|------|------|
| `bootstrap-entry.js` | 入口文件自举向导 |
| `validate.js.template` | 铁律验证脚本模板 |

完整模块文档见 [modules/README.md](skills/lingma-workflow/modules/README.md)

---

## ⚙️ 配置方式

### laws.yaml - 铁律配置

**位置**: `.lingma/skills/lingma-workflow/laws.yaml`

完整配置模板见 [laws.yaml.example](skills/lingma-workflow/laws.yaml.example)

### 核心配置项

```yaml
iron_laws:
  - id: "LAW_001_V2"
    name: "入口文件约束（智能版）"
    condition:
      type: "smart_entry_detection"
      primary_entry: ".lingma/LINGMA.md"
    bootstrap_flow:
      enabled: true
      
  - id: "LAW_002"
    name: "路径约束"
    condition:
      type: "path_prefix"
      allowed_prefix: ".lingma/workflow"
      
  - id: "LAW_003"
    name: "Guidelines 完整性"
    required_sections:
      - "智能体角色定义"
      - "优先事项"
      - "避免事项"
      - "响应规则"
      - "术语规范"
      - "交付标准"
      - "Workflow 完善建议"
```

自定义配置详见 [实施指南 - 配置方式](guide/02-implementation-guide.md#step-2-复制配置模板)

---

## 📚 相关指南

### 核心指南

| 指南 | 内容 | 阅读时机 |
|------|------|----------|
| **[实施指南](guide/02-implementation-guide.md)** | Phase 1-4 完整实施路径 | 🚀 首次使用时必读 |
| **[入口文件升级指南](guide/01-entry-file-upgrade-guide.md)** | v1.0 → v2.0 升级详解 | 🔄 版本升级时参考 |
| **[模块化重构指南](guide/05-modular-refactoring-guide.md)** | 模块化架构设计与实施 | 🏗️ 代码重构时参考 |
| **[文档生成器指南](guide/06-document-generator-guide.md)** | 自动化文档生成系统 | 📝 批量创建文档时 |

### 技能文档

- **[技能使用说明](skills/lingma-workflow/README.md)** - 详细功能和示例
- **[模块文档](skills/lingma-workflow/modules/README.md)** - 各模块职责说明

### 参考资源

- [js-yaml 官方文档](https://github.com/nodeca/js-yaml)
- [Git Hooks 官方文档](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [VSCode Extension API](https://code.visualstudio.com/api)

---

## 📊 成功指标

详细指标定义见 [实施指南 - 成功指标](guide/02-implementation-guide.md#成功指标)

### 定量指标（Phase 3 目标）

| 指标 | 基线 | 目标 |
|------|------|------|
| 铁律违规次数/周 | 5+ | <0.5 |
| Guidelines 完整性 | 71% | 100% |
| 文档更新延迟 | 7 天 | <1 天 |
| 自动化覆盖率 | 0% | 80% |

### 定性指标

- ✅ 用户反馈"技能更智能了"
- ✅ 新成员能快速理解工作流
- ✅ 文档与代码保持一致
- ✅ 减少重复沟通成本

---

## 🔧 故障排查

完整故障排查手册见 [实施指南 - 故障排查](guide/02-implementation-guide.md#故障排查)

### 常见问题速查

#### Q1: 验证脚本无法运行？

```bash
npm install js-yaml
```

#### Q2: Git Hook 不生效？

```bash
chmod +x .git/hooks/pre-commit
```

#### Q3: Guidelines 评分过低？

```bash
node validate.js --verbose
```

更多问题见 [FAQ](guide/02-implementation-guide.md#faq)

---

## 🤝 贡献指南

### 快速开始

```bash
# 克隆项目
git clone https://github.com/Kogisune/lingma-workflow.git
cd lingma-workflow

# 安装依赖
npm install

# 运行测试
npm test
```

### 提交流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 代码规范

- 遵循现有代码风格
- 添加必要的单元测试
- 更新相关文档
- 通过所有验证检查

详细贡献指南见 [实施指南 - 贡献指南](guide/02-implementation-guide.md#贡献指南)

---

## 📜 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 📞 联系方式

- **项目主页**: https://github.com/Kogisune/lingma-workflow
- **问题反馈**: https://github.com/Kogisune/lingma-workflow/issues
- **讨论区**: https://github.com/Kogisune/lingma-workflow/discussions
