# 使用示例

本文档提供 `lingma-workflow` 技能的实际使用示例。

---

## ⚖️ 铁律约束示例（必读）

### 示例 T1：违反铁律 1 - 错误的入口文件

#### 用户输入
```
/lingma-workflow --entry src/workflow/custom-entry.md
帮我处理这个任务
```

#### 技能触发
自动触发，但在入口文件验证阶段失败

#### Lingma 响应示例
```markdown
⛔ **任务拒绝执行：违反铁律 1**

## ❌ 验证失败

**铁律 1：入口文件验证**
- 您指定的入口文件：`src/workflow/custom-entry.md`
- 要求的入口文件：`.lingma/LINGMA.md`
- 验证结果：❌ 失败

## 📋 修正方法

请使用以下命令之一：

```bash
# 方法 1：不指定入口文件（默认使用 .lingma/LINGMA.md）
/lingma-workflow
帮我处理这个任务

# 方法 2：显式指定正确的入口文件
/lingma-workflow --entry .lingma/LINGMA.md
帮我处理这个任务
```

## ℹ️ 为什么有这个限制？

`.lingma/LINGMA.md` 是项目的标准化工作流入口文件，确保所有任务都从统一的入口开始，维护项目上下文的一致性。

请修正后重新提交任务。
```

---

### 示例 T2：违反铁律 2 - 路径超出范围

#### 用户输入
```
帮我在 `docs/workflow/processes` 目录下创建新的流程文档
```

#### 技能触发
自动触发，但在路径验证阶段失败

#### Lingma 响应示例
```markdown
⛔ **任务拒绝执行：违反铁律 2**

## ❌ 验证失败

**铁律 2：路径约束**
- 您指定的路径：`docs/workflow/processes`
- 允许的路径范围：`.lingma/workflow` 内
- 验证结果：❌ 失败

## 📋 修正建议

请在正确的位置创建文档：

```markdown
✅ 建议位置：
.lingma/workflow/processes/新流程文档.md

或者：
.lingma/workflow/新流程文档.md
```

## ℹ️ 为什么有这个限制？

工作流文档必须集中在 `.lingma/workflow` 目录下，确保：
1. 文档管理的统一性
2. 智能体可以准确定位和读取
3. 避免与其他文档系统混淆

是否需要我在 `.lingma/workflow/processes/` 下为您创建？
```

---

### 示例 T3：违反铁律 3 - Guidelines 不完整

#### 用户输入
```
帮我更新 project_guidelines.md，我想添加一些关于代码审查的规范
```

#### 技能触发
自动触发，启动 Guidelines 完整性检查

#### Lingma 响应示例
```markdown
📋 **铁律 3：Guidelines 完整性检查**

在更新 `project_guidelines.md` 前，我需要先验证当前文档的完整性。

## ✅ 当前状态检查

已包含章节：
- ✅ 第 1 章：角色定义（Role）
- ✅ 第 2 章：优先事项（What Lingma Should Prefer）
- ✅ 第 3 章：避免事项（What Lingma Should Avoid）
- ✅ 第 4 章：响应规则（Response Rules）
- ⚠️ 第 5 章：术语规范（Current Canonical Terms）- **内容为空**
- ✅ 第 6 章：交付标准（Deliverable Standard）
- ✅ 第 7 章：完善建议（Suggested Next Deliverables）

## ⚠️ 发现问题

**第 5 章「术语规范」为空**

根据铁律 3，Guidelines 必须包含完整的 7 个核心章节。当前缺少术语规范，这可能导致：
- 命名不一致
- 概念混淆
- 沟通成本增加

## 💡 建议方案

### 方案 A：先补全术语规范（推荐）
我可以帮您先补充第 5 章，然后再添加代码审查规范。

需要我现在整理项目中的术语规范吗？

### 方案 B：直接添加（不推荐）
如果您坚持现在添加，我会在后面追加，但会标记为「待补充术语规范」。

请选择方案 A 或 B。
```

---

### 示例 T4：正确使用铁律

#### 用户输入
```
/lingma-workflow
我想在 .lingma/workflow/guidelines/code-review.md 创建代码审查规范
当前项目处于 M1 阶段，需要遵循现有的交付标准
```

#### 技能触发
自动触发，铁律验证通过

#### Lingma 响应示例
```markdown
✅ **铁律验证通过，开始执行任务**

## 📋 验证清单

- ✅ 铁律 1：入口文件为 .lingma/LINGMA.md
- ✅ 铁律 2：目标路径 .lingma/workflow/guidelines/code-review.md 在允许范围内
- ✅ 铁律 3：已确认 project_guidelines.md 包含完整 7 章

## 🔍 现状分析

基于项目文档确认：
- 当前阶段：M1 阶段（project_status.md）
- 交付标准：project_guidelines.md 第 6 章
- 现有规范：已有基础协作规范

## 💡 执行计划

1. 读取现有 Guidelines 了解术语体系
2. 基于 M1 阶段特点设计代码审查规范
3. 确保与现有文档风格一致
4. 输出可执行的审查清单

开始执行...
```

---

## 场景 1：新功能开发请求

### 用户输入
```
我们需要添加一个新的功能：批量导入订单。用户可以从 Excel 文件上传订单数据，
系统解析后批量创建订单。请帮我设计实现方案。
```

### 技能触发
自动触发（包含"新功能"、"设计实现方案"等关键词）

### Lingma 响应示例

```markdown
## 📋 事实依据

基于项目文档确认：
- 当前阶段：订单管理模块完善期（project_status.md）
- 已有能力：
  - 订单创建 API（service/api/order.ts）
  - Excel 解析工具（packages/utils/src/excel.ts）
  - 文件上传组件（src/components/common/upload.vue）

## 💡 建议方案

### 技术实现路径

1. **前端组件**
   - 复用 upload.vue 组件
   - 新增订单导入结果预览表格
   - 位置：src/views/orders/import-batch.vue

2. **后端接口**
   - POST /api/orders/batch-import
   - 使用现有的 Excel 解析工具
   - 返回导入成功/失败统计

3. **错误处理**
   - 数据验证失败时提供详细错误信息
   - 支持部分导入（跳过无效数据）

### 代码结构

```typescript
// 伪代码示例
interface ImportResult {
  successCount: number;
  failedCount: number;
  errors: ImportError[];
}
```

## ⚠️ 待确认项

1. **业务规则**
   - 是否需要限制单次导入的最大数量？
   - 重复订单的处理策略（跳过/覆盖/报错）？

2. **用户体验**
   - 是否需要导入进度条？
   - 是否需要导入历史记录？

3. **技术规范**
   - 错误日志记录级别
   - 是否需要审计日志

## 📊 进度追踪

- [ ] 已记录到 task_breakdown.md
- [ ] 等待用户确认待确认项
- [ ] 确认后开始详细设计

## ✅ 符合性检查

- ✓ 基于现有组件和工具（不重复造轮子）
- ✓ 符合当前阶段定位（M1 前核心功能）
- ✓ 使用项目标准的技术栈
- ✓ 输出可直接用于开发
```

---

## 场景 2：项目状态咨询

### 用户输入
```
我们现在处于什么阶段？接下来应该优先做什么？
```

### 技能触发
自动触发（包含"阶段"、"优先"等关键词）

### Lingma 响应示例

```markdown
## 📍 当前阶段

根据 project_status.md：
**M1 阶段 - 订单管理核心功能**

预计完成时间：2026-03-31
整体进度：75%

## ✅ 已完成任务

- [x] 订单列表页
- [x] 订单详情页
- [x] 订单创建流程
- [x] 地址解析组件

## 🎯 下一步优先级

### P0（本周必须完成）
1. **订单编辑功能** (task_breakdown.md #T003)
   - 预计工作量：2 天
   - 依赖：无
   - 状态：进行中

2. **订单状态流转** (task_breakdown.md #T004)
   - 预计工作量：1 天
   - 依赖：订单编辑完成
   - 状态：待开始

### P1（下周完成）
3. **订单导出功能** (task_breakdown.md #T005)
   - 预计工作量：1 天

## ⚠️ 风险提示

1. M1 阶段剩余 2 周，需控制范围避免发散
2. 暂不引入新的复杂功能（如自动化规则引擎）

## 📋 建议行动

立即开始：订单编辑功能的开发
```

---

## 场景 3：代码审查请求

### 用户输入
```
帮我审查一下这个组件是否符合项目规范：

[粘贴代码]
```

### 技能触发
自动触发（包含"审查"、"符合项目规范"等关键词）

### Lingma 响应示例

```markdown
## 🔍 合规性评估

### ✅ 符合项

1. **命名规范**
   - ✓ 文件名：order-list-table.vue（kebab-case）
   - ✓ 组件名：OrderListTable（PascalCase）
   - ✓ 变量名：orderList, currentPage（camelCase）

2. **代码结构**
   - ✓ 使用了 Composition API
   - ✓ Props 有完整的类型定义
   - ✓ 使用了项目的 hooks

3. **样式规范**
   - ✓ 使用 SCSS 模块化
   - ✓ 遵循 BEM 命名

### ⚠️ 需要改进

#### Critical（必须修复）
1. **缺少错误处理**
   ```typescript
   // 当前代码
   const data = await fetchOrderList();
   
   // 建议修改
   try {
     const data = await fetchOrderList();
   } catch (error) {
     handleError(error); // 使用项目的错误处理
   }
   ```

2. **未使用缓存**
   ```typescript
   // 应使用项目的 cache 插件
   const cached = cache.get('orderList');
   ```

#### Suggestion（建议优化）
1. 函数 extractOrderInfo 超过 50 行，建议拆分
2. 可以添加 PerfMonitor 性能监控

## 📝 修改建议

[详细的代码修改建议]

## ✅ 检查清单

- [ ] 修复错误处理
- [ ] 添加缓存逻辑
- [ ] 拆分大函数
- [ ] 重新提交审查
```

---

## 场景 4：遵循规范的文档生成

### 用户输入
```
按照项目规范，帮我生成 API 接口文档模板
```

### 技能触发
自动触发（包含"按照项目规范"、"生成"等关键词）

### Lingma 响应示例

```markdown
## 📄 API 文档模板

基于 project_guidelines.md 的交付物标准，生成以下模板：

### 基础信息

```markdown
---
name: order-create
version: 1.0.0
stage: M1
status: draft
---

# 订单创建接口

## 接口定义

POST /api/orders/create

## 请求参数

```typescript
interface CreateOrderRequest {
  // 必填字段
  customerInfo: CustomerInfo;
  items: OrderItem[];
  
  // 选填字段
  remark?: string;
}
```

## 响应格式

```typescript
interface CreateOrderResponse {
  orderId: string;
  createdAt: string;
}
```

## 错误码

| 错误码 | 说明 |
|--------|------|
| 400    | 参数错误 |
| 409    | 订单已存在 |
```

## ✅ 符合性检查

- ✓ 字段命名与现有文档一致
- ✓ 可以明确映射到 M1 阶段
- ✓ 不包含无证据的系统边界
- ✓ 能直接被开发使用
```

---

## 场景 5：手动触发技能

### 用户输入
```
/lingma-workflow 我需要重构地址组件，请按照工作流给出方案
```

### 技能触发
手动触发（使用命令）

### Lingma 响应示例

```markdown
## 📋 工作流执行启动

已加载以下文档：
- ✓ .lingma/LINGMA.md
- ✓ workflow/project_guidelines.md
- ✓ workflow/task_breakdown.md

## 🔍 现状分析

### 已有资产
- src/components/address/base-address-form.vue
- src/components/address/address-parse-modal.vue
- utils/address/ 目录下 5 个工具函数

### 重构原因
[等待用户说明]

## 💡 建议方案

### 方案 A：渐进式重构（推荐）
优点：风险可控，不影响现有功能
步骤：
1. 保留现有组件
2. 新建 v2 版本
3. 逐步迁移使用者

### 方案 B：一次性重构
优点：快速完成
风险：需要完整测试

## ⚠️ 待确认

1. 重构的具体原因和目标？
2. 是否有未满足的新需求？
3. 可接受的改动范围？

## 📊 进度
- [x] 已读取工作流文档
- [x] 已分析现有代码
- [ ] 等待用户确认需求
- [ ] 输出详细方案
```

---

## 反模式示例

### ❌ 不好的提问方式

```
做个订单功能
```

问题：
- 没有说明具体需求
- 没有指定约束条件
- 无法判断是否符合规范

### ✅ 好的提问方式

```
按照项目 M1 阶段的规范，我需要一个订单筛选功能。
具体要求：
- 可以按日期范围筛选
- 可以按订单状态筛选
- 不要引入新的 UI 库

请帮我设计方案。
```

优点：
- 明确了阶段约束（M1）
- 具体的功能需求
- 清晰的技术限制
- 符合技能触发条件

---

## 最佳实践总结

1. **提供上下文**：说明背景、目标、约束
2. **明确阶段**：提及当前项目阶段（M1/M2/M3）
3. **引用规范**：使用“按照项目规范”等表述
4. **具体描述**：避免模糊的需求表达
5. **反馈确认**：及时确认方案是否符合预期

---

## 📚 更多资源

### 指南中心 (.lingma/guide/)

- **[01-entry-file-upgrade-guide.md](../../guide/01-entry-file-upgrade-guide.md)** - 入口文件升级指南
- **[02-implementation-guide.md](../../guide/02-implementation-guide.md)** - 实施指南
- **[05-modular-refactoring-guide.md](../../guide/05-modular-refactoring-guide.md)** - 模块化重构指南
- **[06-document-generator-guide.md](../../guide/06-document-generator-guide.md)** - 文档生成器指南

### 模块文档

- **[modules/README.md](modules/README.md)** - 模块索引
- **[modules/entry-file-handler.md](modules/entry-file-handler.md)** - 入口处理模块详解
