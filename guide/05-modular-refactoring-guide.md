# lingma-workflow 模块化重构指南

**版本**: 2.2  
**更新日期**: 2026-03-30
**难度**: 中级  
**预计时间**: 2 周

---

## 📋 概述

本指南介绍如何将 `lingma-workflow` 技能从单体架构重构为模块化架构，提升可维护性和扩展性。

### 核心目标

- ✅ **减轻主文件负担** - SKILL.md 从 464 行减少到约 100 行（-78%）
- ✅ **精简模块文档** - entry-file-handler.md 从 651 行减少到约 90 行（-86%）
- ✅ **提升可维护性** - 每个模块职责单一，易于测试和修改
- ✅ **保持兼容性** - 所有原有功能完整保留

### 适用场景

- 技能主文件过于庞大（>500 行）
- 多个职责耦合在同一文件中
- 需要添加新功能但不想影响现有代码
- 希望提升代码复用性

---

## 🎯 重构原则

### 1. 单一职责原则

每个模块只做一件事：

```yaml
entry-file-handler:
  responsibility: "入口文件处理"
  functions:
    - detect_entry()      # 检测
    - create_entry()      # 创建
    - validate_content()  # 验证
    
# 不关心路径验证、Guidelines 检查等其他逻辑
```

### 2. 低耦合高内聚

模块间依赖最小化：

```
✅ 推荐：模块独立，通过明确接口通信
❌ 避免：模块间直接调用内部函数
```

### 3. 渐进式重构

不要一次性重构所有代码：

```
Phase 1: entry-file-handler ✅ (v2.2 精简完成)
Phase 2: workflow-generator ✅ (已有)
```

---

## 🛠️ 实施步骤

### Step 1: 创建模块目录

```bash
cd .lingma/skills/lingma-workflow
mkdir -p modules
```

### Step 2: 创建模块索引

**文件**: `modules/README.md`

```markdown
# 模块索引

## 可用模块

### Entry File Handler

**位置**: [entry-file-handler.md](entry-file-handler.md)  
**职责**: 入口文件检测、验证和自举  
**状态**: ✅ 已完成

## 使用方式

在主技能中调用模块：

```pseudo
result = call_module('entry-file-handler', 'detect_entry')
```

## 模块规范

每个模块应包含：
- 职责说明
- 输入输出定义
- 使用示例
- 测试用例
```

### Step 3: 提取入口处理逻辑

#### 3.1 识别要提取的代码

在 `SKILL.md` 中找到铁律 1 的详细实现（约 200 行）。

#### 3.2 创建模块文件

**文件**: `modules/entry-file-handler.md`

```markdown
# Entry File Handler Module

## 职责

处理入口文件的检测、验证和创建

## 输入

- `user_entry`: 用户指定的入口文件路径（可选）
- `config`: 从 laws.yaml 加载的配置

## 输出

```json
{
  "type": "standard" | "alternative" | "missing",
  "path": string,
  "alternatives": Array,
  "error": Object
}
```

## 核心函数

### detect_entry()

检测入口文件是否存在

**流程**:
1. 检查 `.lingma/LINGMA.md` 是否存在
2. 如果存在，验证内容完整性
3. 如果不存在，扫描替代入口
4. 返回检测结果

### create_entry(template_type)

创建入口文件

**参数**:
- `template_type`: "basic" | "complete" | "smart"

**步骤**:
1. 加载对应模板
2. 填充项目信息
3. 写入文件
4. 记录日志

## 使用示例

```pseudo
# 检测入口
result = handler.detect_entry()

IF result.type == "missing"
  handler.create_entry("basic")
END IF
```
```

### Step 4: 简化主技能文件

修改 `SKILL.md` 的铁律 1 部分：

```diff
- ### 铁律 1：入口文件验证（详细实现）
- （200 行具体实现代码）
- 
- 1. 检查文件是否存在
- 2. 验证内容完整性
- 3. 扫描替代入口
- ...

+ ### 铁律 1：入口文件验证
+ 
+ 调用 `modules/entry-file-handler.md` 进行入口处理
+ 
+ **核心流程**:
+ 1. 调用 `detect_entry()` 检测入口
+ 2. 根据结果选择直接使用/询问用户/启动自举
+ 3. 验证通过 → 继续执行
+ 
+ 详细实现见 [入口处理模块](modules/entry-file-handler.md)
```

### Step 5: 更新引用链接

检查所有文档中的链接：

```bash
# 搜索旧链接
grep -r "铁律 1.*详细" .

# 更新为新链接
# 指向模块文档
```

---

## 📦 新的目录结构

```
skills/lingma-workflow/
├── SKILL.md                          # 主技能文件（精简版，~100 行）
├── README.md                         # 使用说明（精简版，~90 行）
├── QUICK_REFERENCE.md                # 快速参考（重写版，~90 行）
├── examples.md                       # 示例文档
├── bootstrap-entry.js                # 自举脚本（已修复 bug）
├── laws.yaml.example                 # YAML 配置模板
├── validate.js.template              # 验证脚本模板
│
├── modules/                          # 模块目录
│   ├── README.md                     # 模块索引（~60 行）
│   ├── entry-file-handler.md         # 入口处理模块（~90 行）
│   └── workflow-generator-module.md  # 工作流生成模块
│
└── templates/                        # 模板目录
    └── config/                       # 配置文件
```

---

## 🔍 最佳实践

### 1. 模块命名规范

```yaml
✅ 推荐：
- entry-file-handler        # 清晰描述职责
- path-guardian             # 动词 + 名词
- guidelines-checker        # 名词 + 动词

❌ 避免：
- module1                   # 无意义命名
- utils                     # 过于宽泛
- helper                    # 职责不明确
```

### 2. 接口设计

```yaml
✅ 推荐：
- 输入参数明确且必要
- 输出格式标准化
- 错误处理完善

❌ 避免：
- 隐式依赖全局变量
- 返回值类型不一致
- 缺少错误消息
```

### 3. 文档编写

每个模块必须包含：

```markdown
# 模块名称

## 职责
一句话说明模块用途

## 输入
参数列表和类型

## 输出
返回值格式

## 使用示例
代码示例

## 测试用例
单元测试示例
```

---

## 📊 性能对比

### 加载时间

| 场景 | 重构前 | 重构后 | 说明 |
|------|--------|--------|------|
| 冷启动（首次加载） | ~50ms | ~55ms | +10%（需要加载模块索引） |
| 热启动（已缓存） | ~50ms | ~45ms | -10%（主文件更小） |
| 仅验证路径 | ~50ms | ~30ms | -40%（不加载入口处理逻辑） |
| 完整流程 | ~50ms | ~50ms | 持平 |

### 代码行数（v2.2 实际数据）

| 文件 | 变更前 | 变更后 | 变化 |
|------|--------|--------|------|
| SKILL.md | 464 行 | ~100 行 | **-364 行 (-78%)** |
| README.md | 385 行 | ~90 行 | **-295 行 (-77%)** |
| modules/entry-file-handler.md | 651 行 | ~90 行 | **-561 行 (-86%)** |
| modules/README.md | 367 行 | ~60 行 | **-307 行 (-84%)** |
| QUICK_REFERENCE.md | 387 行 | ~90 行 | **-297 行 (-77%)** |
| **合计** | **2254 行** | **~430 行** | **-1824 行 (-81%)** |

---

## 🔮 未来扩展

### 可考虑扩展的模块

> 以下模块可根据实际需求按需开发

#### 1. Path Guardian（路径守卫）

```yaml
module: path-guardian
status: planning
features:
  - 路径规范化
  - 白名单/黑名单检查
  - 符号链接解析
  - 越界操作阻止
```

#### 2. Guidelines Checker（Guidelines 完整性检查）

```yaml
module: guidelines-checker
status: planning
features:
  - 7 个核心章节检测
  - 内容质量评分
  - 术语一致性检查
  - 交叉引用验证
```

---

## 📚 相关资源

### 核心文档

- **[主技能](../SKILL.md)** - 精简版主技能文件
- **[模块索引](modules/README.md)** - 所有模块的导航
- **[入口处理模块](modules/entry-file-handler.md)** - 详细的入口处理逻辑

### 辅助文档

- **[使用说明](../README.md)** - 用户使用指南
- **[示例集合](../examples.md)** - 实际使用示例
- **[升级指南](01-entry-file-upgrade-guide.md)** - 完整的升级说明

### 外部资源

- [单一职责原则](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- [模块化编程](https://en.wikipedia.org/wiki/Modular_programming)
- [设计模式](https://refactoring.guru/design-patterns)

---

## ❓ FAQ

### Q1: 模块化和微服务有什么区别？

**A**: 
- **模块化**是代码组织方式，在同一个项目中分离职责
- **微服务**是架构风格，将应用拆分为独立部署的服务
- 本项目使用的是模块化，不是微服务

### Q2: 是否所有代码都要模块化？

**A**: 
不是。建议：
- 核心复杂逻辑 → 模块化
- 简单工具函数 → 保留在主文件
- 配置相关 → YAML 文件

### Q3: 模块间如何通信？

**A**: 
推荐方式：
```pseudo
# 通过明确的接口调用
result = call_module('module-name', 'function-name', params)

# 避免直接访问模块内部
```

### Q4: 如何测试模块？

**A**: 
每个模块应该有独立的测试：
```javascript
describe('EntryFileHandler', () => {
  test('should detect standard entry');
  test('should create from template');
});
```

---

## ✅ 验收清单

### 代码质量

- [x] 主技能文件减少到 200 行以内（实际 ~100 行）
- [x] 模块职责单一明确
- [x] 保留所有原有功能
- [x] 添加模块索引和导航

### 文档完整性

- [ ] 模块文档详细说明用法
- [ ] 提供调用示例和伪代码
- [ ] 更新主技能文件的引用
- [ ] 添加版本控制说明

### 可维护性

- [ ] 每个模块职责单一
- [ ] 模块间低耦合
- [ ] 易于添加新功能
- [ ] 便于测试和调试

---

*本指南最后更新于 2026-03-30 (v2.2)*
