# Entry File Handler Module

**模块职责**: 处理所有入口文件相关的检测、创建和验证逻辑

**调用方式**: 由主技能按需调用此模块

---

## 📋 模块概述

本模块实现了完整的入口文件处理流程，包括：
- 智能检测标准入口和替代入口
- 自举流程（自动创建引导）
- 模板生成和管理
- 入口文件验证

---

## 🎯 核心功能

### 1. 入口检测 (Entry Detection)

```yaml
功能描述:
  检测项目中可用的入口文件，按优先级排序

检测顺序:
  1. 标准入口：.lingma/LINGMA.md
  2. 替代入口 1: .lingma/workflow/README.md
  3. 替代入口 2: LINGMA.md (根目录)
  4. 替代入口 3: .lingma/workflow/index.md

返回格式:
  success:
    type: "standard" | "alternative" | "missing"
    path?: string
    alternatives?: Array<{
      path: string
      confidence: number
      name: string
      quality: "good" | "fair" | "poor"
    }>
```

### 2. 自举流程 (Bootstrap Flow)

```yaml
触发条件:
  - 标准入口不存在
  - 用户明确请求创建入口文件
  - 工作流初始化

流程步骤:
  1. 扫描替代入口
  2. 根据扫描结果分支处理:
     - 发现替代品 → 询问用户选择
     - 未发现 → 启动模板创建
  3. 提供模板选项（基础/完整/智能）
  4. 创建入口文件
  5. 记录到 bootstrap.log
  6. 更新健康仪表板
```

### 3. 模板系统 (Template System)

**基础模板** (`basic`):
- 最小化配置（~50 行）
- 适合快速启动
- 包含核心信息

**完整模板** (`complete`):
- 所有章节完整（~200 行）
- 适合正式项目
- 包含详细指引

**智能模板** (`smart`):
- 分析项目结构
- 自动填充内容
- 最智能化

---

## 🔧 使用方式

### 在主技能中调用

```markdown
## Step 2: 加载上下文文档

### 铁律 1 验证 - 调用入口处理模块

读取模块：`modules/entry-file-handler.md`

执行逻辑:
1. 调用 `detect_entry()` 函数
2. 根据返回结果处理:
   - IF type == "standard": 直接使用
   - IF type == "alternative": 询问用户
   - IF type == "missing": 启动自举流程

3. 等待用户确认后继续
```

### 独立使用（命令行）

```bash
# 交互式引导
node bootstrap-entry.js

# 自动模式
node bootstrap-entry.js --auto

# 指定模板
node bootstrap-entry.js --template=complete

# 仅扫描
node bootstrap-entry.js --scan
```

---

## 📊 详细处理逻辑

### 第一层：标准入口检查

```pseudo
FUNCTION check_standard_entry():
  entry_path = ".lingma/LINGMA.md"
  
  IF file_exists(entry_path):
    content = read_file(entry_path)
    
    # 验证内容质量
    IF validate_content(content):
      RETURN {
        type: "standard",
        path: entry_path,
        status: "valid",
        action: "use_directly"
      }
    ELSE:
      RETURN {
        type: "standard",
        path: entry_path,
        status: "empty",
        action: "ask_to_populate"
      }
  
  RETURN null  # 不存在，进入下一层
END FUNCTION
```

### 第二层：替代入口扫描

```pseudo
FUNCTION scan_alternatives():
  candidates = [
    {
      path: ".lingma/workflow/README.md",
      required_keywords: ["工作流", "workflow", "Lingma"],
      min_size: 100,
      confidence: 0.8,
      name: "工作流说明文档"
    },
    {
      path: "LINGMA.md",
      required_keywords: ["工作流", "workflow"],
      min_size: 50,
      confidence: 0.7,
      name: "根目录入口（历史遗留）"
    },
    {
      path: ".lingma/workflow/index.md",
      required_keywords: ["入口", "entry", "index"],
      min_size: 50,
      confidence: 0.6,
      name: "索引文件"
    }
  ]
  
  found_alternatives = []
  
  FOR candidate IN candidates:
    IF file_exists(candidate.path):
      content = read_file(candidate.path)
      
      # 内容质量检查
      has_keywords = ANY(keyword IN content FOR keyword IN candidate.required_keywords)
      size_ok = length(content) >= candidate.min_size
      
      IF has_keywords AND size_ok:
        found_alternatives.push({
          ...candidate,
          quality: "good",
          last_modified: get_last_modified(candidate.path)
        })
  
  RETURN found_alternatives
END FUNCTION
```

### 第三层：用户确认与选择

```pseudo
FUNCTION ask_user(alternatives):
  IF alternatives IS NOT EMPTY:
    best_match = MAX_BY(alternatives, confidence)
    
    DISPLAY_MESSAGE("""
      ⚠️ 未找到标准入口文件 `.lingma/LINGMA.md`
      
      但我发现了以下可能的入口文件：
      ${format_alternatives(alternatives)}
      
      请选择如何处理：
      1. ✅ 使用 ${best_match.path} 作为临时入口（推荐）
      2. 📝 立即创建标准入口文件 `.lingma/LINGMA.md`
      3. 📋 从模板生成入口文件
      4. 🔧 手动指定其他入口路径
    """)
    
    user_choice = GET_USER_INPUT()
    
    RETURN process_user_choice(user_choice, alternatives)
  
  ELSE:
    # 无替代品，直接启动创建
    RETURN start_bootstrap_flow()
END FUNCTION
```

### 第四层：创建或确认

```pseudo
FUNCTION create_or_confirm(choice):
  SWITCH choice.type:
    CASE "use_alternative":
      # 临时使用替代入口
      log_usage(choice.path)
      RETURN {
        status: "success",
        entry_type: "temporary",
        path: choice.path,
        warning: "建议尽快创建标准入口"
      }
    
    CASE "create_from_template":
      # 选择模板类型
      template_type = SELECT_TEMPLATE()
      
      # 生成内容
      content = GENERATE_TEMPLATE(template_type)
      
      # 确保目录存在
      ensure_directory(".lingma/")
      
      # 备份已有文件（如果有）
      IF file_exists(".lingma/LINGMA.md"):
        backup_file(".lingma/LINGMA.md")
      
      # 写入新文件
      write_file(".lingma/LINGMA.md", content)
      
      # 记录日志
      log_bootstrap("create", template_type)
      
      RETURN {
        status: "success",
        entry_type: "standard",
        path: ".lingma/LINGMA.md",
        template_used: template_type
      }
    
    CASE "manual_specify":
      # 用户手动指定路径
      custom_path = GET_USER_INPUT("请输入入口文件路径：")
      
      # 验证路径合法性
      IF NOT is_valid_path(custom_path):
        RETURN {
          status: "error",
          message: "无效的路径",
          suggestion: "请使用 .lingma/ 目录下的路径"
        }
      
      RETURN create_or_confirm({ type: "create_from_template", path: custom_path })
END FUNCTION
```

---

## 🗂️ 模板定义

### 基础模板

```markdown
# Lingma Workflow Entry

## Project Info
- **Name**: {{project_name}}
- **Stage**: {{current_stage}}
- **Last Updated**: {{date}}

## Quick Start
使用 `/lingma-workflow` 命令启动标准化工作流。

## Key Documents
- `.lingma/workflow/project_guidelines.md` - 协作规范
- `.lingma/workflow/WORKFLOW.md` - 执行流程
- `.lingma/workflow/task_breakdown.md` - 任务分解

---

*此文件由 lingma-workflow 技能自动生成，最后更新：{{date}}*
```

### 完整模板

```markdown
# Lingma Workflow Entry

## 1. Project Overview

### 基本信息
- **项目名称**: {{project_name}}
- **技术栈**: Vue 3 + TypeScript + Vite
- **当前阶段**: M1 - 核心功能开发
- **启动日期**: {{date}}

### 项目简介
{{project_description}}

## 2. Current Stage

**阶段**: M1 - 核心功能开发

**主要目标**:
- ✅ 建立基础项目结构
- ✅ 实现核心业务逻辑
- 🔄 完善工作流文档
- ⏳ 准备 M2 阶段

**时间线**:
- Start: {{date}}
- Target End: {{target_date}}

## 3. Workflow Structure

### 核心文档
| 文档 | 路径 | 状态 |
|------|------|------|
| 入口文件 | `.lingma/LINGMA.md` | ✅ 已创建 |
| 协作规范 | `.lingma/workflow/project_guidelines.md` | 🔄 进行中 |
| 执行流程 | `.lingma/workflow/WORKFLOW.md` | ⏳ 待完善 |
| 任务分解 | `.lingma/workflow/task_breakdown.md` | ⏳ 待完善 |

### 技能配置
- **主技能**: `lingma-workflow`
- **配置文件**: `.lingma/skills/lingma-workflow/laws.yaml`
- **验证脚本**: `.lingma/skills/lingma-workflow/validate.js`

## 4. Quick Commands

### 常用命令
```bash
# 启动工作流
/lingma-workflow

# 查看状态
/lingma-workflow --status

# 健康检查
/lingma-workflow --health

# 重新生成入口文件
node .lingma/skills/lingma-workflow/bootstrap-entry.js
```

### Git Hooks
```bash
# 安装预提交钩子
node .lingma/skills/lingma-workflow/setup-git-hooks.js
```

## 5. Team Info

### 角色分工
- **Tech Lead**: TBD
- **PM**: TBD
- **Dev Team**: TBD

### 沟通渠道
- 每日站会：待定
- 周会：待定
- 文档：`.lingma/workflow/`

## 6. Next Steps

### 本周任务
1. [ ] 完善 project_guidelines.md
2. [ ] 创建 WORKFLOW.md 详细流程
3. [ ] 更新 task_breakdown.md

### 近期目标
- [ ] M1 阶段验收准备
- [ ] 自动化测试覆盖率达到 60%
- [ ] CI/CD 流水线搭建

---

## Appendix

### 版本历史
- v1.0 ({{date}}) - 初始版本，基础入口文件

### 相关链接
- [Lingma 文档](https://lingma.dev/docs)
- [工作流指南](.lingma/workflow/IMPLEMENTATION_GUIDE.md)

---

*此文件由 lingma-workflow 技能智能生成，最后更新：{{date}}*
```

---

## 🔍 验证逻辑

### 内容验证

```pseudo
FUNCTION validate_content(content):
  # 基本检查
  IF length(content) < 50:
    RETURN false
  
  # 关键词检查
  required_keywords = ["工作流", "workflow", "Lingma"]
  has_keywords = COUNT(kw IN content FOR kw IN required_keywords) >= 1
  
  IF NOT has_keywords:
    RETURN false
  
  # 结构检查
  has_title = REGEX_MATCH(content, "^#.*[Ww]orkflow|[Ww]ork 流")
  has_sections = COUNT(SECTION_MARKERS) >= 2
  
  RETURN has_title AND has_sections
END FUNCTION
```

### 质量评分

```pseudo
FUNCTION calculate_quality_score(content, metadata):
  score = 0
  
  # 长度分（30 分）
  IF length(content) > 200:
    score += 30
  ELSE IF length(content) > 100:
    score += 20
  ELSE IF length(content) > 50:
    score += 10
  
  # 关键词分（30 分）
  keyword_count = COUNT(keywords IN content)
  score += MIN(30, keyword_count * 10)
  
  # 结构分（20 分）
  section_count = COUNT(sections)
  score += MIN(20, section_count * 5)
  
  # 时效分（20 分）
  days_since_update = DAYS_BETWEEN(metadata.last_modified, NOW)
  IF days_since_update < 7:
    score += 20
  ELSE IF days_since_update < 30:
    score += 10
  
  RETURN score
END FUNCTION
```

---

## 📝 日志记录

### Bootstrap Log 格式

```yaml
# .lingma/workflow/bootstrap.log

[2026-03-18T10:30:00Z] create: 使用 basic 模板创建入口文件
[2026-03-18T10:30:00Z] backup: 已备份原文件到 .lingma/backup/LINGMA.md.1710756600
[2026-03-18T10:30:00Z] notify: 入口文件已创建，工作流可正常使用
[2026-03-18T10:30:00Z] dashboard: 已更新 HEALTH_DASHBOARD.md
```

### 统计信息

```javascript
{
  created_at: "2026-03-18T10:30:00Z",
  template_used: "basic",
  user_confirmed: true,
  alternatives_scanned: 2,
  time_taken_ms: 1200,
  file_size_bytes: 1024
}
```

---

## 🎯 错误处理

### 错误类型与处理策略

| 错误类型 | 处理方式 | 用户提示 |
|---------|---------|---------|
| 目录无法创建 | 尝试创建父目录 | "正在创建必要的目录结构..." |
| 文件权限不足 | 提示用户手动操作 | "需要文件写入权限，请检查目录权限" |
| 模板加载失败 | 回退到基础模板 | "模板加载失败，使用基础模板代替" |
| 用户中断流程 | 保存进度，稍后继续 | "已保存进度，可随时继续" |
| 磁盘空间不足 | 立即停止 | "磁盘空间不足，请清理后重试" |

---

## 🔄 与主技能的集成

### 调用示例

```markdown
## 在主技能中使用入口处理模块

### Step 2.1: 调用入口检测

```yaml
action: "call_module"
module: "entry-file-handler"
function: "detect_entry"
parameters: {}
```

### Step 2.2: 处理检测结果

```pseudo
result = detect_entry()

SWITCH result.type:
  CASE "standard":
    log.success("使用标准入口文件")
    continue_execution()
    
  CASE "alternative":
    display_alternatives(result.alternatives)
    wait_for_user_choice()
    process_choice()
    
  CASE "missing":
    start_bootstrap_flow()
```

### Step 2.3: 记录结果

```yaml
action: "log_result"
data:
  entry_type: ${result.type}
  path: ${result.path}
  timestamp: ${now()}
  module_version: "1.0"
```
```

---

## 📦 依赖关系

### 必需依赖

```json
{
  "dependencies": {
    "js-yaml": "^4.0.0",
    "readline": "builtin"
  }
}
```

### 可选依赖

```json
{
  "optionalDependencies": {
    "chalk": "^5.0.0",  // 更好的颜色输出
    "ora": "^6.0.0"     // 加载动画
  }
}
```

---

## 🧪 测试用例

### 单元测试

```javascript
describe('EntryDetector', () => {
  test('should detect standard entry', () => {
    mockFileExists('.lingma/LINGMA.md', true);
    const result = detectEntry();
    expect(result.type).toBe('standard');
    expect(result.path).toBe('.lingma/LINGMA.md');
  });
  
  test('should scan alternatives when standard missing', () => {
    mockFileExists('.lingma/LINGMA.md', false);
    mockFileExists('.lingma/workflow/README.md', true);
    const result = detectEntry();
    expect(result.alternatives).toHaveLength(1);
  });
});
```

### 集成测试

```javascript
describe('BootstrapFlow', () => {
  test('should complete full bootstrap flow', async () => {
    mockUserInput('1'); // 选择基础模板
    const result = await bootstrapFlow();
    expect(result.status).toBe('success');
    expect(fileExists('.lingma/LINGMA.md')).toBe(true);
  });
});
```

---

## 📚 相关文档

- **主技能文件**: `SKILL.md` - 铁律 1 调用此模块
- **升级指南**: `ENTRY_FILE_UPGRADE_GUIDE.md` - 完整的升级说明
- **自举脚本**: `bootstrap-entry.js` - 命令行工具实现
- **配置示例**: `laws.yaml.example` - YAML 配置模板

---

*本模块文档由 lingma-workflow 技能维护，最后更新：2026-03-18*
