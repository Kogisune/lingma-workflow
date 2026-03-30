# Modules Index - 模块化组件索引

**用途**: 管理 `lingma-workflow` 技能的所有模块化组件

---

## 模块列表

### 1. Entry File Handler（入口文件处理器）

**文件**: [`entry-file-handler.md`](./entry-file-handler.md)
**版本**: 1.0
**状态**: 已完成

**职责**: 处理所有入口文件相关的检测、创建和验证逻辑

**核心功能**:
- 智能入口检测（标准入口 + 替代入口）
- 自举流程（自动创建引导）
- 模板生成和管理
- 入口文件验证

**相关工具**: [`bootstrap-entry.js`](../bootstrap-entry.js)

---

### 2. Workflow Generator（工作流生成器）

**文件**: [`workflow-generator-module.md`](./workflow-generator-module.md)
**版本**: 1.0
**状态**: 已完成

**职责**: 封装工作流文档生成逻辑，提供标准化的模板体系

**核心功能**:
- 模板管理（加载、版本控制、组合）
- 变量替换（简单变量、条件块、列表）
- 文档生成（基于模板生成完整文档）
- 质量检查（完整性验证、链接检查）

**相关配置**:
- [`templates/README.md`](../templates/README.md) - 模板索引
- [`templates/config/project-config.yaml.example`](../templates/config/project-config.yaml.example) - 配置示例
- [`templates/config/variables-validation.yaml`](../templates/config/variables-validation.yaml) - 变量验证规则

---

## 模块状态总览

| 模块名称 | 版本 | 状态 | 最后更新 |
|---------|------|------|----------|
| entry-file-handler | 1.0 | 已完成 | 2026-03-18 |
| workflow-generator | 1.0 | 已完成 | 2026-03-19 |

---

## 模块开发规范

每个模块应包含：模块职责、版本、概述、核心功能、使用方式、详细实现、相关文档。

**版本控制**:
- 主版本号 (X.y.z): 不兼容 API 变更
- 次版本号 (x.Y.z): 向后兼容功能新增
- 修订号 (x.y.Z): 问题修复

---

## 相关文档

- **主技能文件**: [`SKILL.md`](../SKILL.md)
- **指南中心**: [guide/](../../guide/README.md)
