#!/usr/bin/env node

/**
 * 入口文件自举脚本
 * 
 * 用途：自动检测、创建或修复工作流入口文件
 * 
 * 使用方法：
 *   node bootstrap-entry.js              # 交互式引导
 *   node bootstrap-entry.js --auto       # 自动模式（使用默认模板）
 *   node bootstrap-entry.js --scan       # 仅扫描替代入口
 *   node bootstrap-entry.js --template=basic|complete|smart
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// ES Module 兼容性处理
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI 颜色代码
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// 工具函数
const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  detail: (msg) => console.log(`   ${colors.cyan}${msg}${colors.reset}`),
  step: (msg) => console.log(`\n${colors.magenta}🔧 ${msg}${colors.reset}`)
};

class EntryBootstrapper {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
    this.autoMode = options.autoMode || false;
    this.templateType = options.templateType || 'basic';
    
    // 标准入口路径
    this.standardEntry = path.join(this.projectRoot, '.lingma/LINGMA.md');
    
    // 可能的替代入口
    this.alternativeEntries = [
      {
        path: path.join(this.projectRoot, '.lingma/workflow/README.md'),
        confidence: 0.8,
        name: '工作流说明文档'
      },
      {
        path: path.join(this.projectRoot, 'LINGMA.md'),
        confidence: 0.7,
        name: '根目录入口（历史遗留）'
      },
      {
        path: path.join(this.projectRoot, '.lingma/workflow/index.md'),
        confidence: 0.6,
        name: '索引文件'
      }
    ];
    
    // 模板定义
    this.templates = {
      basic: this.getBasicTemplate(),
      complete: this.getCompleteTemplate(),
      smart: null  // 智能生成需要分析项目
    };
  }
  
  /**
   * 获取基础模板
   */
  getBasicTemplate() {
    const projectName = this.extractProjectName();
    const date = new Date().toISOString().split('T')[0];
    
    return `# Lingma Workflow Entry

## Project Info
- **Name**: ${projectName}
- **Stage**: M1 - 核心功能开发
- **Last Updated**: ${date}

## Quick Start
使用 \`/lingma-workflow\` 命令启动标准化工作流。

## Key Documents
- \`.lingma/workflow/project_guidelines.md\` - 协作规范
- \`.lingma/workflow/WORKFLOW.md\` - 执行流程
- \`.lingma/workflow/task_breakdown.md\` - 任务分解

## Current Status
- ✅ 工作流已初始化
- 🔄 正在开发核心功能
- 📋 详细进度见 task_breakdown.md

---

*此文件由 lingma-workflow 技能自动生成，最后更新：${date}*
`;
  }
  
  /**
   * 获取完整模板
   */
  getCompleteTemplate() {
    const projectName = this.extractProjectName();
    const date = new Date().toISOString().split('T')[0];
    
    return `# Lingma Workflow Entry

## 1. Project Overview

### 基本信息
- **项目名称**: ${projectName}
- **技术栈**: Vue 3 + TypeScript + Vite
- **当前阶段**: M1 - 核心功能开发
- **启动日期**: ${date}

### 项目简介
${this.generateProjectDescription()}

## 2. Current Stage

**阶段**: M1 - 核心功能开发

**主要目标**:
- ✅ 建立基础项目结构
- ✅ 实现核心业务逻辑
- 🔄 完善工作流文档
- ⏳ 准备 M2 阶段

**时间线**:
- Start: ${date}
- Target End: ${this.addMonths(3)}

## 3. Workflow Structure

### 核心文档
| 文档 | 路径 | 状态 |
|------|------|------|
| 入口文件 | \`.lingma/LINGMA.md\` | ✅ 已创建 |
| 协作规范 | \`.lingma/workflow/project_guidelines.md\` | 🔄 进行中 |
| 执行流程 | \`.lingma/workflow/WORKFLOW.md\` | ⏳ 待完善 |
| 任务分解 | \`.lingma/workflow/task_breakdown.md\` | ⏳ 待完善 |

### 技能配置
- **主技能**: \`lingma-workflow\`
- **配置文件**: \`.lingma/skills/lingma-workflow/laws.yaml\`

## 4. Quick Commands

### 常用命令
\`\`\`bash
# 启动工作流
/lingma-workflow

# 重新生成入口文件
node .lingma/skills/lingma-workflow/bootstrap-entry.js
\`\`\`

## 5. Team Info

### 角色分工
- **Tech Lead**: TBD
- **PM**: TBD
- **Dev Team**: TBD

### 沟通渠道
- 每日站会：待定
- 周会：待定
- 文档：\`.lingma/workflow/\`

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
- v1.0 (${date}) - 初始版本，基础入口文件

### 相关链接
- [.lingma/workflow/](.lingma/workflow/) - 工作流文档目录

---

*此文件由 lingma-workflow 技能智能生成，最后更新：${date}*
`;
  }
  
  /**
   * 提取项目名称
   */
  extractProjectName() {
    try {
      const packageJson = path.join(this.projectRoot, 'package.json');
      if (fs.existsSync(packageJson)) {
        const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
        return pkg.name || 'Unknown Project';
      }
    } catch (e) {
      // 忽略错误
    }
    
    // 从目录名推断
    const dirName = path.basename(this.projectRoot);
    return dirName.replace(/[-_]oms[-_]?/i, ' OMS ').replace(/-/g, ' ');
  }
  
  /**
   * 生成项目描述
   */
  generateProjectDescription() {
    // 简单分析项目结构
    const hasSrc = fs.existsSync(path.join(this.projectRoot, 'src'));
    const hasComponents = fs.existsSync(path.join(this.projectRoot, 'src/components'));
    const hasViews = fs.existsSync(path.join(this.projectRoot, 'src/views'));
    
    let description = '这是一个基于现代技术栈的前端项目。\n\n';

    if (hasSrc) {
      description += '**主要特点**:\n';
      description += '- 使用组件化开发模式\n';

      if (hasComponents) {
        description += '- 包含丰富的可复用组件\n';
      }

      if (hasViews) {
        description += '- 多视图架构支持\n';
      }
    }

    description += '\n项目采用 Lingma 工作流进行标准化管理。';
    return description;
  }
  
  /**
   * 添加月份
   */
  addMonths(months) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  }
  
  /**
   * 扫描替代入口
   */
  scanAlternatives() {
    log.step('扫描可能的替代入口...');
    
    const found = [];
    
    for (const alt of this.alternativeEntries) {
      if (fs.existsSync(alt.path)) {
        const stat = fs.statSync(alt.path);
        const content = fs.readFileSync(alt.path, 'utf8');
        
        // 简单的内容质量检查
        const hasKeywords = /工作流|workflow|Lingma/i.test(content);
        const minSize = content.length > 100;
        
        if (hasKeywords && minSize) {
          found.push({
            ...alt,
            size: content.length,
            lastModified: stat.mtime,
            quality: 'good'
          });
          
          log.success(`发现替代入口：${alt.name}`);
          log.detail(`路径：${path.relative(this.projectRoot, alt.path)}`);
          log.detail(`大小：${content.length} 字符`);
          log.detail(`置信度：${alt.confidence}`);
        } else {
          log.warning(`找到文件但质量不足：${alt.name}`);
        }
      }
    }
    
    if (found.length === 0) {
      log.warning('未发现任何可用的替代入口');
    }
    
    return found;
  }
  
  /**
   * 创建入口文件
   */
  createEntryFile(templateType = this.templateType) {
    log.step(`使用 ${templateType} 模板创建入口文件...`);
    
    let content;
    if (templateType === 'smart') {
      content = this.generateSmartTemplate();
    } else {
      content = this.templates[templateType];
    }
    
    // 确保目录存在
    const entryDir = path.dirname(this.standardEntry);
    if (!fs.existsSync(entryDir)) {
      fs.mkdirSync(entryDir, { recursive: true });
      log.info(`创建目录：${entryDir}`);
    }
    
    // 备份已存在的文件
    if (fs.existsSync(this.standardEntry)) {
      const backupPath = `${this.standardEntry}.backup.${Date.now()}`;
      fs.copyFileSync(this.standardEntry, backupPath);
      log.warning(`已备份原文件到：${path.relative(this.projectRoot, backupPath)}`);
    }
    
    // 写入新文件
    fs.writeFileSync(this.standardEntry, content, 'utf8');
    log.success(`入口文件已创建：${path.relative(this.projectRoot, this.standardEntry)}`);
    
    // 记录日志
    this.logBootstrap('create', templateType);
    
    return true;
  }
  
  /**
   * 智能生成模板
   */
  generateSmartTemplate() {
    log.info('分析项目结构以生成智能模板...');
    
    // 简单的项目分析
    const analysis = {
      hasPackage: fs.existsSync(path.join(this.projectRoot, 'package.json')),
      hasSrc: fs.existsSync(path.join(this.projectRoot, 'src')),
      hasWorkflow: fs.existsSync(path.join(this.projectRoot, '.lingma/workflow')),
      hasGuidelines: fs.existsSync(path.join(this.projectRoot, '.lingma/workflow/project_guidelines.md'))
    };
    
    // 根据分析结果选择模板
    if (analysis.hasPackage && analysis.hasSrc) {
      return this.getCompleteTemplate();
    } else {
      return this.getBasicTemplate();
    }
  }
  
  /**
   * 记录自举日志
   */
  logBootstrap(action, template) {
    const logFile = path.join(this.projectRoot, '.lingma/workflow/bootstrap.log');
    const timestamp = new Date().toISOString();
    
    const logEntry = `[${timestamp}] ${action}: 使用 ${template} 模板创建入口文件\\n`;
    
    if (!fs.existsSync(path.dirname(logFile))) {
      fs.mkdirSync(path.dirname(logFile), { recursive: true });
    }
    
    fs.appendFileSync(logFile, logEntry);
  }
  
  /**
   * 交互式引导
   */
  async interactiveBootstrap() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const question = (query) => new Promise((resolve) => {
      rl.question(query, resolve);
    });
    
    console.log('\\n' + '='.repeat(60));
    console.log('🔧 Lingma 入口文件自举向导');
    console.log('='.repeat(60) + '\\n');
    
    // 检查标准入口
    if (fs.existsSync(this.standardEntry)) {
      log.success('标准入口文件已存在');
      log.detail(this.standardEntry);
      
      const answer = await question('\\n是否要重新生成？[y/N]: ');
      if (answer.toLowerCase() !== 'y') {
        log.info('已取消操作');
        rl.close();
        return;
      }
    }
    
    // 扫描替代入口
    const alternatives = this.scanAlternatives();
    
    if (alternatives.length > 0) {
      console.log('\\n发现以下替代入口：');
      alternatives.forEach((alt, i) => {
        console.log(`  ${i + 1}. ${alt.name} (${alt.confidence * 100}% 置信度)`);
      });
      
      const useAlt = await question('\\n是否使用其中一个作为临时入口？[y/N]: ');
      if (useAlt.toLowerCase() === 'y') {
        // TODO: 实现替代入口使用逻辑
        log.info('此功能开发中...');
      }
    }
    
    // 选择模板
    console.log('\\n请选择模板类型：');
    console.log('  1. 基础模板（最小化配置，推荐新手）');
    console.log('  2. 完整模板（包含所有推荐章节）');
    console.log('  3. 智能生成（分析项目后定制）');
    
    const templateChoice = await question('\\n选择 [1-3]: ');
    
    let template = 'basic';
    switch (templateChoice.trim()) {
      case '1':
        template = 'basic';
        break;
      case '2':
        template = 'complete';
        break;
      case '3':
        template = 'smart';
        break;
      default:
        template = 'basic';
    }
    
    // 创建文件
    this.createEntryFile(template);
    
    console.log('\\n' + '='.repeat(60));
    log.success('入口文件创建完成！');
    console.log('='.repeat(60) + '\\n');
    
    log.info('下一步建议：');
    console.log('  1. 编辑 .lingma/LINGMA.md 补充项目信息');
    console.log('  2. 运行 node validate.js 验证工作流');
    console.log('  3. 使用 /lingma-workflow 开始工作');
    
    rl.close();
  }
  
  /**
   * 运行
   */
  async run() {
    if (this.autoMode) {
      // 自动模式
      log.step('自动模式：使用基础模板创建入口文件...');
      this.createEntryFile(this.templateType);
      log.success('完成！');
    } else {
      // 交互模式
      await this.interactiveBootstrap();
    }
  }
}

// CLI 参数解析
const args = process.argv.slice(2);
const options = {
  autoMode: args.includes('--auto'),
  templateType: 'basic'
};

// 解析模板类型
const templateArg = args.find(arg => arg.startsWith('--template='));
if (templateArg) {
  const type = templateArg.split('=')[1];
  if (['basic', 'complete', 'smart'].includes(type)) {
    options.templateType = type;
  }
}

// 主函数
(async function main() {
  try {
    const bootstrapper = new EntryBootstrapper(options);
    await bootstrapper.run();
  } catch (error) {
    log.error(`自举过程出错：${error.message}`);
    process.exit(1);
  }
})();
