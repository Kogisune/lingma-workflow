# lingma-workflow

**Lingma IDE 标准化工作流技能**  
**版本**: 2.0 (智能自举模式)  
**更新日期**: 2026-03-18

[![Validation](https://img.shields.io/badge/validation-passing-brightgreen)](guide/02-implementation-guide.md)
[![Phase](https://img.shields.io/badge/phase-1--3-blue)](guide/02-implementation-guide.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 项目概述

`lingma-workflow` 是 Lingma IDE 中用于确保智能体在处理项目任务时自动遵循标准化的工作流 skill，本项目由 Lingma IDE 智能体辅助开发。

### 核心价值

- 🤖 **智能自举** - 入口文件不存在时自动创建，无需手动配置
- 🔍 **智能检测** - 支持多入口识别和自动对齐
- ⚖️ **铁律约束** - 三条核心规则保证工作流一致性
- 📊 **健康监控** - 自动生成仪表板，实时追踪文档健康度
- 🔧 **模块化设计** - 高可维护性和扩展性

### 适用场景

- ✅ 新项目快速启动（1 分钟内完成配置）
- ✅ 现有项目标准化改造
- ✅ 团队协作规范统一
- ✅ 代码与文档一致性保障

---

## 🚀 核心功能

### 1. 铁律验证系统

在任何操作前自动验证三条"铁律"：

| 铁律 | 描述 | 验证内容 |
|------|------|----------|
| 🔴 **铁律 1** | 入口文件验证 | 优先使用 `.lingma/LINGMA.md`，支持智能检测和自举 |
| 🔴 **铁律 2** | 路径约束 | 所有操作必须在 `.lingma/workflow` 范围内 |
| 🔴 **铁律 3** | Guidelines 优先 | 必须包含 7 个核心章节 |

**验证失败 → 立即停止并返回错误信息**

### 2. 智能入口处理（v2.0 新增）

#### 支持的入口文件类型

| 入口路径 | 优先级 | 置信度 | 说明 |
|---------|--------|--------|------|
| `.lingma/LINGMA.md` | ⭐⭐⭐⭐⭐ | 1.0 | 标准入口（首选） |
| `.lingma/workflow/README.md` | ⭐⭐⭐⭐ | 0.8 | 工作流说明 |
| `LINGMA.md` (根目录) | ⭐⭐⭐ | 0.7 | 历史遗留项目 |
| `.lingma/workflow/index.md` | ⭐⭐ | 0.6 | 索引式入口 |

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

### 4. 文档对齐能力

自动读取并对齐以下关键文档：

```text
.lingma/
├── LINGMA.md                    # 工作流入口
└── workflow/
    ├── README.md                # 目录说明
    ├── project_guidelines.md    # 协作规范（核心）
    ├── WORKFLOW.md              # 执行流程
    └── task_breakdown.md        # 任务分解
```

---

## 📦 项目结构

```text
lingma-workflow/
├── .lingma/
│   ├── LINGMA.md                      # 工作流入口文件
│   ├── skills/
│   │   └── lingma-workflow/
│   │       ├── SKILL.md               # 技能主文件
│   │       ├── README.md              # 技能使用说明
│   │       ├── laws.yaml              # 铁律配置
│   │       ├── validate.js            # 验证脚本
│   │       ├── bootstrap-entry.js     # 自举脚本
│   │       ├── modules/               # 模块化组件
│   │       │   ├── entry-file-handler.md
│   │       │   └── ...
│   │       └── examples.md            # 使用示例
│   └── workflow/
│       ├── project_guidelines.md      # 协作规范
│       └── HEALTH_DASHBOARD.md        # 健康仪表板
├── guide/
│   ├── 01-entry-file-upgrade-guide.md # 升级指南
│   ├── 02-implementation-guide.md     # 实施指南
│   └── 03-modular-refactor-report.md  # 重构报告
├── skills/lingma-workflow/            # 技能目录（同上）
├── LICENSE                            # MIT 许可证
└── README.md                          # 本文件
```

---

## 🎯 使用方法

### 快速开始（5 分钟）

#### Step 1: 安装依赖

```bash
cd .lingma/skills/lingma-workflow
npm install js-yaml
```

#### Step 2: 配置铁律

```bash
# 从示例模板复制配置
cp laws.yaml.example laws.yaml

# 根据项目实际情况调整
code laws.yaml
```

#### Step 3: 运行验证

```bash
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

```bash
# 自动安装预提交钩子
node validate.js --install-hook
```

### 在 Lingma IDE 中使用

#### 自动触发

当对话中包含以下关键词时，技能会自动触发：

- "工作流"、"流程"、"规范"
- "按照项目标准"
- "下一步做什么"
- "创建新 X"（功能、组件、文档等）
- "检查是否符合"

#### 手动触发

```
使用 /lingma-workflow 命令
或明确要求"请按照项目工作流处理"
```

### 使用示例

#### 示例 1：新功能开发

**用户**: 我们需要添加一个新的订单导出功能

**技能响应**:
```markdown
## 事实依据
- 项目当前处于订单管理模块完善阶段（project_status.md）
- 已有订单列表和详情组件（代码库确认）

## 建议方案
1. 新增订单导出按钮到列表页
2. 调用现有的订单 API 接口
3. 使用项目标准的 Excel 导出工具

## 待确认项
- 导出字段范围需要确认
- 是否需要支持批量导出

## 进度追踪
- [ ] 已记录到 task_breakdown.md
```

#### 示例 2：入口文件不存在

**用户**: 开始工作流任务

**技能响应**:
```text
🤖 未找到标准入口文件 .lingma/LINGMA.md

正在启动自举流程...

请选择模板类型：
1. 📄 基础模板（最小化配置，50 行）
2. 📊 完整模板（包含所有推荐章节，200 行）
3. 🎯 智能生成（分析项目后定制）

→ 等待用户选择 → 创建文件 → 继续执行
```

---

## 🧩 模块说明

### 核心模块

| 模块 | 职责 | 位置 |
|------|------|------|
| **Entry File Handler** | 入口文件检测、验证和自举 | `modules/entry-file-handler.md` |
| **Path Guardian** | 路径合法性验证 | `modules/path-guardian.md` |
| **Guidelines Checker** | 协作规范完整性检查 | `modules/guidelines-checker.md` |
| **Doc Aligner** | 文档对齐和一致性维护 | `modules/doc-aligner.md` |

### 工具模块

| 工具 | 功能 | 说明 |
|------|------|------|
| `validate.js` | 铁律验证脚本 | 支持 CLI 和编程调用 |
| `bootstrap-entry.js` | 入口文件自举 | 交互式引导创建 |
| `dashboard-generator.js` | 健康仪表板生成 | 自动生成 HTML/MD 报告 |

### 模块索引

详细模块文档见：[skills/lingma-workflow/modules/README.md](skills/lingma-workflow/modules/README.md)

---

## ⚙️ 配置方式

### laws.yaml - 铁律配置

**位置**: `.lingma/skills/lingma-workflow/laws.yaml`

**核心配置项**:

```yaml
# 铁律配置
iron_laws:
  - id: "LAW_001_V2"
    name: "入口文件约束（智能版）"
    description: "优先使用 .lingma/LINGMA.md，支持自动创建和多入口识别"
    
    condition:
      type: "smart_entry_detection"
      primary_entry: ".lingma/LINGMA.md"
      
      alternative_entries:
        - path: ".lingma/workflow/README.md"
          required_keywords: ["工作流", "workflow", "Lingma"]
          min_size: 100
          confidence: 0.8
    
    bootstrap_flow:
      enabled: true
      templates:
        basic: "templates/basic.md"
        complete: "templates/complete.md"
        
    on_violation:
      action: "auto_fix"
      log_creation: true

  - id: "LAW_002"
    name: "路径约束"
    description: "工作流生成的路径必须在 .lingma/workflow 内"
    
    condition:
      type: "path_prefix"
      allowed_prefix: ".lingma/workflow"
      
  - id: "LAW_003"
    name: "Guidelines 完整性"
    description: "必须包含 7 个核心章节"
    
    required_sections:
      - "智能体角色定义"
      - "优先事项"
      - "避免事项"
      - "响应规则"
      - "术语规范"
      - "交付标准"
      - "Workflow 完善建议"
```

### 配置示例

查看完整配置模板：[skills/lingma-workflow/laws.yaml.example](skills/lingma-workflow/laws.yaml.example)

### 自定义配置

```yaml
# 添加自定义规则
custom_rules:
  - name: "术语一致性检查"
    enabled: true
    check_frequency: "on_save"
    
# 调整验证策略
validation_strategy:
  strict_mode: false  # false = 智能模式，true = 严格模式
  auto_fix_threshold: 0.9  # 置信度>90% 自动修复
```

---

## 📚 相关指南

### 入门指南

- **[实施指南](guide/02-implementation-guide.md)** - 完整的 Phase 1-3 实施路径
  - 快速开始（5 分钟）
  - 基础加固（1 周）
  - 模块化重构（2 周）
  - 自动化闭环（2 周）

- **[入口文件升级指南](guide/01-entry-file-upgrade-guide.md)** - v1.0 → v2.0 升级详解
  - 变更概述
  - 智能检测逻辑
  - 自举流程说明
  - 效果对比

### 技术文档

- **[模块化重构报告](guide/03-modular-refactor-report.md)** - 架构优化详解
  - 拆分策略
  - 模块职责
  - 性能提升

- **[技能使用说明](skills/lingma-workflow/README.md)** - 详细的功能和示例
  - 铁律约束详解
  - 使用示例
  - 最佳实践

### 参考资源

- [js-yaml 官方文档](https://github.com/nodeca/js-yaml)
- [Git Hooks 官方文档](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [VSCode Extension API](https://code.visualstudio.com/api)

---

## 📊 成功指标

### 定量指标

| 指标 | 基线 | Phase 1 目标 | Phase 3 目标 |
|------|------|--------------|--------------|
| 铁律违规次数/周 | 5+ | <2 | <0.5 |
| Guidelines 完整性 | 71% | 85% | 100% |
| 文档更新延迟 | 7 天 | <3 天 | <1 天 |
| 自动化覆盖率 | 0% | 40% | 80% |

### 定性指标

- ✅ 用户反馈"技能更智能了"
- ✅ 新成员能快速理解工作流
- ✅ 文档与代码保持一致
- ✅ 减少重复沟通成本

---

## 🔧 故障排查

### 常见问题

#### Q1: 验证脚本无法运行？

**症状**:
```text
$ node validate.js
Error: Cannot find module 'js-yaml'
```

**解决方案**:
```bash
npm install js-yaml
```

#### Q2: Git Hook 不生效？

**检查清单**:
```bash
# 1. 检查执行权限
ls -l .git/hooks/pre-commit

# 2. 添加权限
chmod +x .git/hooks/pre-commit

# 3. 验证内容
cat .git/hooks/pre-commit
```

#### Q3: Guidelines 评分过低？

**解决方案**:
```bash
# 查看详细评分
node validate.js --verbose

# 根据报告补全章节
code .lingma/workflow/project_guidelines.md
```

更多故障排查见：[guide/02-implementation-guide.md](guide/02-implementation-guide.md#故障排查)

---

## 🤝 贡献指南

### 开发环境设置

```bash
# 克隆项目
git clone https://github.com/your-org/lingma-workflow.git

# 安装依赖
cd lingma-workflow
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

---

## 📜 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 📞 联系方式

- **项目主页**: https://github.com/lingma-workflow
- **问题反馈**: https://github.com/lingma-workflow/issues
- **讨论区**: https://github.com/lingma-workflow/discussions

---

*最后更新：2026-03-18*
