# Modules Index - 模块化组件索引

**用途**: 管理 `lingma-workflow` 技能的所有模块化组件，实现按需加载和调用

---

## 📂 模块列表

### 1. Entry File Handler (入口文件处理器)

**文件**: [`entry-file-handler.md`](./entry-file-handler.md)  
**版本**: 1.0  
**职责**: 处理所有入口文件相关的检测、创建和验证逻辑

**提供功能**:
- ✅ 智能入口检测（标准入口 + 替代入口）
- ✅ 自举流程（自动创建引导）
- ✅ 模板生成和管理
- ✅ 入口文件验证

**相关工具**:
- [`bootstrap-entry.js`](../bootstrap-entry.js) - 命令行实现

---

### 2. Workflow Generator (工作流生成器)

**文件**: [`workflow-generator-module.md`](./workflow-generator-module.md)  
**版本**: 1.0  
**职责**: 封装所有与工作流文档生成相关的逻辑，提供标准化的模板体系

**核心功能**:
- ✅ 模板管理（加载、版本控制、组合）
- ✅ 变量替换（简单变量、条件块、列表）
- ✅ 文档生成（基于模板生成完整文档）
- ✅ 质量检查（完整性验证、链接检查）

**提供模板**:
- 📄 `template-entry.md` - LINGMA.md 入口文件模板
- 📄 `template-guidelines.md` - project_guidelines.md 协作规范模板
- 📄 `template-workflow.md` - WORKFLOW.md 工作流程模板
- 📄 `template-readme.md` - README.md 目录说明模板
- 📄 `template-status.md` - project_status.md 项目状态模板
- 📄 `task-breakdown.md` - task_breakdown.md 任务分解模板

**调用方式**:
```markdown
## 在主技能中调用

读取模块：`modules/workflow-generator-module.md`

执行流程:
1. 加载必要模板 → load_template('entry')
2. 准备上下文数据 → context = prepare_context(project_info)
3. 生成文档 → generate_document(template, context)
4. 质量检查 → validate_document(generated_doc)
5. 输出结果 → save_to_file(generated_doc, target_path)
```

**API 接口**:
```pseudo
load_template(template_name) → Template
generate_document(template, context) → Document
replace_variables(content, variables) → string
validate_document(document) → QualityReport
```

**相关配置**:
- [`templates/README.md`](../templates/README.md) - 模板索引和使用说明
- [`templates/config/project-config.yaml.example`](../templates/config/project-config.yaml.example) - 配置示例
- [`templates/config/variables-validation.yaml`](../templates/config/variables-validation.yaml) - 变量定义和验证规则

**使用示例**:
```bash
# 生成完整工作流
generator generate all --config project-config.yaml --output-dir .lingma/workflow

# 生成单个文档
generator generate guidelines --output project_guidelines.md --validate-chapters
```

**特点**:
- 🎯 **业务解耦**: 模板不包含具体业务细节，完全通用化
- 🔧 **配置驱动**: 通过 YAML 配置文件控制生成过程
- 📊 **质量保证**: 内置完整性检查和验证机制
- 🌐 **可扩展**: 支持自定义模板和插件系统

---

### 2. Path Guardian (路径守卫) - 🔧 开发中

**文件**: `path-guardian.md`  
**版本**: 0.1 (规划中)  
**职责**: 验证和管理所有文件操作的路径合法性

**计划功能**:
- ⏳ 路径规范化（解析 .. 和 .）
- ⏳ 符号链接解析
- ⏳ 白名单/黑名单检查
- ⏳ 路径权限管理

**预计 API**:
```pseudo
validate_path(target_path) → ValidationResult
normalize_path(path) → string
is_within_workflow_dir(path) → boolean
```

---

### 3. Guidelines Checker (Guidelines 完整性检查器) - 🔧 开发中

**文件**: `guidelines-checker.md`  
**版本**: 0.1 (规划中)  
**职责**: 检查和验证 project_guidelines.md 的完整性

**计划功能**:
- ⏳ 7 个核心章节检测
- ⏳ 内容质量评分
- ⏳ 术语一致性检查
- ⏳ 交叉引用验证

**预计 API**:
```pseudo
check_completeness(content) → CompletenessReport
calculate_quality_score(content) → number
find_missing_chapters(content) → Array<string>
```

---

### 4. Doc Aligner (文档对齐器) - 🔧 规划中

**文件**: `doc-aligner.md`  
**版本**: 0.0 (概念阶段)  
**职责**: 确保多个工作流文档之间的一致性和同步

**计划功能**:
- ⏳ 跨文档引用检查
- ⏳ 术语一致性验证
- ⏳ 阶段信息同步
- ⏳ 冲突检测与解决

**预计 API**:
```pseudo
sync_documents(doc_paths) → SyncReport
detect_conflicts(docs) → ConflictReport
resolve_conflict(conflict, strategy) → Resolution
```

---

### 5. Conflict Detector (冲突检测器) - 🔧 规划中

**文件**: `conflict-detector.md`  
**版本**: 0.0 (概念阶段)  
**职责**: 检测工作流文档中的矛盾和冲突

**计划功能**:
- ⏳ 术语冲突检测
- ⏳ 流程矛盾识别
- ⏳ 阶段信息冲突检查
- ⏳ 优先级仲裁机制

**预计 API**:
```pseudo
detect_terminology_conflicts(docs) → Array<Conflict>
detect_process_conflicts(docs) → Array<Conflict>
suggest_resolution(conflict) → Suggestion
```

---

## 🔧 模块开发规范

### 标准结构

每个模块应包含以下部分：

```markdown
# Module Name

**模块职责**: 清晰描述模块的职责范围

**版本**: X.Y  
**最后更新**: YYYY-MM-DD

---

## 📋 模块概述

简要说明模块的用途和核心价值

## 🎯 核心功能

列出模块提供的主要功能

## 🔧 使用方式

如何在主技能或其他地方调用此模块

## 📊 详细实现

具体的算法、流程和数据结构

## 🧪 测试用例

单元测试和集成测试示例

## 📚 相关文档

与其他模块或文档的关联关系
```

### 版本控制

- **主版本号** (X.y.z): 不兼容的 API 变更
- **次版本号** (x.Y.z): 向后兼容的功能新增
- **修订号** (x.y.Z): 向后兼容的问题修复

### 依赖管理

模块之间的依赖关系应明确记录：

```yaml
module: path-guardian
version: 1.0.0
dependencies:
  - entry-file-handler: ^1.0.0  # 依赖入口处理模块 1.0+
optional_dependencies:
  - guidelines-checker: ^0.1.0  # 可选依赖
```

---

## 📦 模块加载机制

### 按需加载

主技能根据实际需要动态加载模块：

```pseudo
FUNCTION load_module(module_name):
  module_path = "modules/" + module_name + ".md"
  
  IF file_exists(module_path):
    content = read_file(module_path)
    RETURN parse_module(content)
  ELSE:
    LOG_WARNING("模块不存在：" + module_name)
    RETURN null
END FUNCTION
```

### 缓存策略

为提高性能，已加载的模块应缓存：

```yaml
caching:
  enabled: true
  ttl_seconds: 300  # 5 分钟有效期
  max_size: 10      # 最多缓存 10 个模块
  
invalidate_on:
  - module_file_changed
  - manual_trigger
```

---

## 🎯 模块调用示例

### 示例 1：在主技能中调用入口处理模块

```markdown
## Step 2: 入口文件验证

调用模块：`modules/entry-file-handler.md`

执行流程:
1. result = call_function('detect_entry')
2. SWITCH result.type:
   - CASE "standard": 
       使用标准入口
   - CASE "alternative":
       询问用户选择
   - CASE "missing":
       启动自举流程
3. 记录结果到日志
```

### 示例 2：组合多个模块

```markdown
## 完整的工作流初始化

1. 加载入口处理模块
   → 检测/创建入口文件
   
2. 加载路径守卫模块
   → 验证工作流目录结构
   
3. 加载 Guidelines 检查模块
   → 检查协作规范完整性
   
4. 加载文档对齐模块
   → 确保文档一致性
```

---

## 📊 模块状态总览

| 模块名称 | 版本 | 状态 | 负责人 | 最后更新 |
|---------|------|------|--------|----------|
| entry-file-handler | 1.0 | ✅ 已完成 | - | 2026-03-18 |
| workflow-generator | 1.0 | ✅ 已完成 | - | 2026-03-19 |
| path-guardian | 0.1 | 🔧 开发中 | - | - |
| guidelines-checker | 0.1 | 🔧 开发中 | - | - |
| doc-aligner | 0.0 | 📋 规划中 | - | - |
| conflict-detector | 0.0 | 📋 规划中 | - | - |

**图例**:
- ✅ 已完成并测试
- 🔧 开发中
- 📋 规划中
- 🧪 测试中
- ⚠️ 已废弃

---

## 🔮 未来规划

### Phase 1: 基础模块（已完成）✅
- [x] entry-file-handler (2026-03-18)
- [x] workflow-generator (2026-03-19)

### Phase 2: 验证模块（2026-Q2）🔧
- [ ] path-guardian (2026-04)
- [ ] guidelines-checker (2026-05)

### Phase 3: 协同模块（2026-Q3）📋
- [ ] doc-aligner (2026-07)
- [ ] conflict-detector (2026-08)

### Phase 4: 增强模块（2026-Q4）⏳
- [ ] performance-monitor
- [ ] auto-healer
- [ ] template-manager

---

## 📚 相关文档

- **主技能文件**: [`SKILL.md`](../SKILL.md) - 调用各模块的主入口
- **指南中心**: [../../guide/README.md](../../guide/README.md) - 所有指南类文档
  - [01-entry-file-upgrade-guide.md](../../guide/01-entry-file-upgrade-guide.md) - 入口文件升级指南
  - [02-implementation-guide.md](../../guide/02-implementation-guide.md) - 实施指南
  - [05-modular-refactoring-guide.md](../../guide/05-modular-refactoring-guide.md) - 模块化重构指南
  - [06-document-generator-guide.md](../../guide/06-document-generator-guide.md) - 文档生成器指南
- **实施指南**: [../../guide/02-implementation-guide.md](../../guide/02-implementation-guide.md) - 分阶段实施步骤

---

*本索引由 lingma-workflow 技能维护，最后更新：2026-03-18*
