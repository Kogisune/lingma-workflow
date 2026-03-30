# lingma-workflow 技能优化实施指南

**版本**: 2.2 
**更新日期**: 2026-03-30
**对应阶段**: Phase 1-4 完整实施路径

---

## 📋 快速开始（5 分钟）

### Step 1: 复制配置模板

```bash
cd .lingma/skills/lingma-workflow
cp laws.yaml.example laws.yaml
```

### Step 2: 安装依赖

```bash
npm install js-yaml
```

### Step 3: 运行验证

```bash
node validate.js
```

预期输出：
```
✅ 已加载铁律配置：3 条规则
🔍 开始铁律验证...
✅ 铁律 1：入口文件约束 - 验证通过
✅ 铁律 2：路径约束 - 验证通过
📋 Guidelines 完整性检查报告 - 得分：85/100
✅ 所有铁律验证通过！
```

---

## 🎯 Phase 1：基础加固（1 周）

### 目标
解决最严重的自动化问题，建立基础验证机制

### 任务清单

#### ✅ 1.1 创建配置文件

**文件位置**: `.lingma/skills/lingma-workflow/laws.yaml`

**操作**:
```bash
# 从示例模板开始
cp laws.yaml.example laws.yaml

# 根据项目实际情况调整配置
code laws.yaml
```

**关键配置项**:
- 入口文件路径（默认：`.lingma/LINGMA.md`）
- 允许的路径模式（默认：`.lingma/workflow/**`）
- Guidelines 必需章节（7 个核心章节）

**验收标准**:
- [ ] 配置文件语法正确
- [ ] 所有路径和文件名符合项目实际
- [ ] Guidelines 章节定义与现有文档一致

---

#### ✅ 1.2 实现验证脚本

**文件位置**: `.lingma/skills/lingma-workflow/validate.js`

**操作**:
```bash
# 从模板开始
cp validate.js.template validate.js

# 测试运行
node validate.js --verbose
```

**功能要求**:
- [ ] 验证铁律 1（入口文件）
- [ ] 验证铁律 2（路径约束）
- [ ] 验证铁律 3（Guidelines 完整性）
- [ ] 生成健康仪表板
- [ ] 返回正确的退出码（0=通过，1=失败）

---

#### ✅ 1.3 集成 Git Hook

**文件位置**: `.git/hooks/pre-commit`

**操作**:
```bash
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

echo "🔍 运行工作流铁律验证..."

# 检查工作流文档是否变更
if git diff --cached --name-only | grep -q ".lingma/workflow/"; then
  echo "检测到工作流文档变更"
  
  # 运行验证脚本
  node .lingma/skills/lingma-workflow/validate.js
  
  if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 铁律验证失败，禁止提交"
    echo "请先修复上述问题"
    exit 1
  fi
  
  echo "✅ 铁律验证通过"
fi

exit 0
EOF

chmod +x .git/hooks/pre-commit
```

**测试方法**:
```bash
# 尝试提交一个无效的 Guidelines 修改
echo "# Invalid content" >> .lingma/workflow/project_guidelines.md
git add .lingma/workflow/project_guidelines.md
git commit -m "Test: 触发验证"

# 应该看到验证失败
```

**验收标准**:
- [ ] 工作流文档变更时自动触发验证
- [ ] 验证失败时阻止提交
- [ ] 验证通过时正常提交

---

#### ✅ 1.4 生成健康仪表板

**文件位置**: `.lingma/workflow/HEALTH_DASHBOARD.md`

**自动生成**: 验证脚本会自动生成

**手动刷新**:
```bash
node validate.js --refresh-dashboard
```

**包含内容**:
- 整体状态（🟢/🟡/🔴）
- 铁律合规性表格
- 文档新鲜度统计
- 待处理问题列表
- 建议操作

**验收标准**:
- [ ] 仪表板数据准确
- [ ] 更新及时
- [ ] 建议可执行

---

### Phase 1 交付物

```
.lingma/skills/lingma-workflow/
├── laws.yaml              ✨ 新增：铁律配置
├── validate.js            ✨ 新增：验证脚本
└── HEALTH_DASHBOARD.md    ✨ 新增：健康仪表板

.git/
└── hooks/
    └── pre-commit         ✨ 新增：Git Hook
```

---

## 🚀 Phase 2：模块化重构（2 周）

### 目标
提升可维护性和扩展性，拆分单体 SKILL.md

### 任务清单

#### 🔨 2.1 创建模块目录

```bash
cd .lingma/skills/lingma-workflow
mkdir -p modules rules tools
```

#### 🔨 2.2 拆分验证逻辑

**modules/entry-validator.md**:
```markdown
# Entry Validator Module

## 职责
验证入口文件的合法性和存在性

## 输入
- user_entry: 用户指定的入口文件路径（可选）
- config: 从 laws.yaml 加载的配置

## 验证流程
1. 如果未指定入口 → 使用默认值
2. 如果指定了入口 → 验证是否匹配
3. 检查文件是否存在
4. 返回验证结果

## 输出格式
{
  valid: boolean,
  path?: string,
  error?: {
    code: string,
    message: string,
    suggestion: string
  }
}
```

**modules/path-guardian.md**:
```markdown
# Path Guardian Module

## 职责
验证目标路径是否在允许范围内

## 验证步骤
1. 规范化路径（解析 .. 和 .）
2. 解析符号链接
3. 检查前缀匹配
4. 检查白名单模式
5. 检查黑名单模式

## 安全防护
- 防止 .. 绕过
- 防止符号链接跳转
- 防止大小写混淆
```

#### 🤖 2.2 简化 SKILL.md（已在 v2.2 完成）✅

**目标**: 从 464 行减少到约 100 行（减少 78%）

**已实施**:
1. 移除冗余伪代码和重复示例
2. 将验证逻辑精简到模块文档
3. SKILL.md 只保留核心执行信息

**效果**:
```diff
- ## ⚖️ 铁律约束（必须遵守）
- （98 行详细规则定义和伪代码）
+ ## ⚖️ 铁律约束
+ 详见：[laws.yaml](laws.yaml.example)

- ### Step 2: 加载上下文文档
- （详细的验证伪代码，50+ 行）
+ ### Step 2: 加载上下文文档
+ 调用模块进行验证（详见 modules/entry-file-handler.md）
```

---

### Phase 2 交付物（v2.2 已完成）

```
.lingma/skills/lingma-workflow/
├── SKILL.md               ✅ 精简到约 100 行（原 464 行）
├── laws.yaml.example      ✅ 铁律配置示例
├── modules/               ✅ 模块目录
│   ├── README.md          ✅ 模块索引（精简）
│   ├── entry-file-handler.md  ✅ 入口处理模块（精简到约 90 行）
│   └── workflow-generator-module.md  ✅ 工作流生成模块
├── QUICK_REFERENCE.md     ✅ 快速参考（重写）
└── bootstrap-entry.js     ✅ 自举脚本（bug 修复）
```

---

## 🚀 Phase 4：文档生成系统（2 周）

### 目标
实现基于模板的自动化文档生成，完全与业务解耦

### 任务清单

#### 🔨 4.1 创建工作流生成器模块

**文件位置**: `.lingma/skills/lingma-workflow/modules/workflow-generator-module.md`

**操作**:
```bash
# 创建模块文件
touch modules/workflow-generator-module.md

# 实现核心功能
code modules/workflow-generator-module.md
```

**核心功能**:
- [ ] 模板管理（加载、版本控制、组合）
- [ ] 变量替换（简单变量、条件块、列表）
- [ ] 文档生成（基于模板生成完整文档）
- [ ] 质量检查（完整性验证、链接检查）

---

#### 🔨 4.2 建立模板体系

**目录结构**:
```
templates/
├── core/                    # 核心模板（必需）
│   ├── template-entry.md
│   ├── template-guidelines.md
│   ├── template-workflow.md
│   ├── template-readme.md
│   ├── template-status.md
│   └── task-breakdown.md
│
├── optional/                # 扩展模板（可选）
│   ├── template-analysis.md
│   └── template-implementation.md
│
└── config/                  # 配置文件
    ├── project-config.yaml.example
    └── variables-validation.yaml
```

**验收标准**:
- [ ] 6 个核心模板全部完成
- [ ] 每个模板都通过业务解耦验证
- [ ] 提供完整的配置示例
- [ ] 建立变量定义和验证规则

---

#### 🔨 4.3 实现配置化管理

**配置文件**:
```yaml
# project-config.yaml
project:
  name: "my-project"
  full_name: "My Awesome Project"
  description: "一个优秀的项目"

tech_stack:
  framework: "Vue 3"
  language: "TypeScript"

stages:
  current:
    name: "Phase 1 - MVP"
    status: "已完成"
```

**功能要求**:
- [ ] 支持环境变量覆盖配置
- [ ] 提供默认值机制
- [ ] 验证配置完整性
- [ ] 生成配置错误报告

---

#### 🔨 4.4 建立质量保证体系

**验证层次**:
```yaml
Level 1: 变量验证（类型、长度、格式）
Level 2: 文档完整性（7 章检查，权重评分）
Level 3: 交叉验证（引用、术语、阶段对齐）
```

**验收标准**:
- [ ] Guidelines 完整性检查 ≥ 85 分
- [ ] 所有交叉引用有效
- [ ] 术语使用一致
- [ ] 格式符合规范

---

### Phase 4 交付物

```
.lingma/skills/lingma-workflow/
├── modules/
│   └── workflow-generator-module.md    ✨ 新增
│
├── templates/                          ✨ 新增目录
│   ├── core/                           # 6 个核心模板
│   ├── optional/                       # 3 个扩展模板
│   └── config/                         # 配置文件
│
└── QUICK_REFERENCE.md                  ✨ 快速参考指南
```

---

## 📊 各阶段对比

### 目标
实现全方位自动化监控和自愈

### 任务清单

#### 🤖 3.1 CI/CD 集成

**文件位置**: `.github/workflows/workflow-validation.yml`

```yaml
name: Workflow Validation

on:
  push:
    paths:
      - '.lingma/workflow/**'
  pull_request:
    paths:
      - '.lingma/workflow/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install Dependencies
        run: npm install js-yaml
        
      - name: Validate Iron Laws
        run: node .lingma/skills/lingma-workflow/validate.js
        
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: workflow-validation-report
          path: .lingma/workflow/HEALTH_DASHBOARD.md
```

#### 🤖 3.2 VSCode 插件开发

**目录结构**:
```
vscode-extension/
├── package.json
├── src/
│   ├── extension.ts
│   ├── validator.ts
│   └── diagnostics.ts
└── README.md
```

**核心功能**:
- 实时诊断（保存时验证）
- Hover 提示（显示章节完整性）
- 快捷命令（一键修复）
- 状态栏指示器

#### 🤖 3.3 自愈机制

**配置位置**: `laws.yaml` 的 `self_healing` 部分

**自愈规则示例**:
```yaml
self_healing:
  rules:
    - name: "auto_fix_terminology"
      trigger: "terminology_inconsistent"
      confidence_threshold: 0.9
      action: |
        检测到术语不一致：${inconsistent_terms}
        统一为：${canonical_term}
        已修正 ${count} 处引用
        
      require_confirmation: false  # 高置信度无需确认
```

---

### Phase 3 交付物

- ✅ GitHub Actions 工作流
- ✅ VSCode 插件（内部版）
- ✅ 自愈规则引擎
- ✅ 持续监控系统

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

### 问题 1：验证脚本无法运行

**症状**:
```bash
$ node validate.js
Error: Cannot find module 'js-yaml'
```

**解决方案**:
```bash
npm install js-yaml
# 或
pnpm add js-yaml
```

---

### 问题 2：Git Hook 不生效

**症状**: 提交时没有触发验证

**检查清单**:
```bash
# 1. 检查 Hook 是否有执行权限
ls -l .git/hooks/pre-commit
# 应该是：-rwxr-xr-x

# 2. 如果没有权限，添加权限
chmod +x .git/hooks/pre-commit

# 3. 检查 Hook 内容是否正确
cat .git/hooks/pre-commit
```

---

### 问题 3：Guidelines 评分过低

**症状**: 验证显示分数低于 70 分

**解决方案**:
```bash
# 查看详细评分报告
node validate.js --verbose

# 根据报告补全缺失章节
code .lingma/workflow/project_guidelines.md
```

**快速补全模板**:
```markdown
## 5. Current Canonical Terms

本项目使用的术语规范：

- **订单 (Order)**: 客户购买行为的记录单元
- **运单 (Shipment)**: 物流配送的基本单位
- **包裹 (Package)**: 物理包装的独立单元

## 7. Suggested Next Deliverables

后续完善建议：

1. 添加代码审查规范
2. 完善 API 接口文档模板
3. 建立自动化测试规范
```

---

## 📚 参考资源

### 配套文件

- `laws.yaml.example` - 铁律配置模板
- `validate.js.template` - 验证脚本模板
- `bootstrap-entry.js` - 入口自举脚本

### 相关文档

- `.lingma/LINGMA.md` - 工作流入口文件
- `.lingma/workflow/project_guidelines.md` - 协作规范
- `skills/lingma-workflow/SKILL.md` - 技能主文件

### 工具链接

- [js-yaml 文档](https://github.com/nodeca/js-yaml)
- [Git Hooks 官方文档](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [VSCode Extension API](https://code.visualstudio.com/api)

---

## ❓ FAQ

### Q1: 能否跳过某个阶段？

**A**: 不建议。每个阶段都建立在前一阶段的基础上：
- Phase 1 提供基础验证能力
- Phase 2 提升可维护性
- Phase 3 实现自动化

跳过会导致技术债务累积。

### Q2: 是否需要一次性实施所有优化？

**A**: 不需要。建议：
1. 优先完成 Phase 1（解决最严重问题）
2. 根据团队资源逐步推进
3. 每个阶段都有独立价值

### Q3: 如果项目结构调整怎么办？

**A**: 配置化方案的优势就体现出来了：
```yaml
# 只需修改 laws.yaml
path_constraints:
  prefix: ".new_workflow_dir"  # 改这里
```

无需修改技能代码。

### Q4: 如何回滚更改？

**A**: 
```bash
# Git Hook 回滚
rm .git/hooks/pre-commit

# 配置回滚
git checkout .lingma/skills/lingma-workflow/laws.yaml

# 完全清理
rm -rf .lingma/skills/lingma-workflow/{modules,rules,tools}
```

---

## 🎉 总结

本指南提供了从当前版本升级到优化版本的完整路径：

**短期（本周）** → Phase 1：基础加固  
**中期（1 个月）** → Phase 2：模块化重构  
**长期（3 个月）** → Phase 3：自动化闭环

每个阶段都有明确的交付物和验收标准，确保渐进式改进而不影响现有工作流。

**立即开始**：
```bash
# 5 分钟快速体验
cp .lingma/skills/lingma-workflow/laws.yaml.example \
   .lingma/skills/lingma-workflow/laws.yaml
node .lingma/skills/lingma-workflow/validate.js
```

---

*本指南最后更新于 2026-03-30 (v2.2)*
