#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COVERAGE_THRESHOLD = 95;
const COVERAGE_FILE = path.join(__dirname, '../coverage/coverage-summary.json');

function checkCoverage() {
  console.log('🔍 Checking test coverage...\n');

  if (!fs.existsSync(COVERAGE_FILE)) {
    console.error('❌ Coverage file not found. Please run: npm run test:coverage');
    process.exit(1);
  }

  const coverageData = JSON.parse(fs.readFileSync(COVERAGE_FILE, 'utf8'));
  const { total } = coverageData;

  const metrics = {
    lines: total.lines.pct,
    functions: total.functions.pct,
    branches: total.branches.pct,
    statements: total.statements.pct,
  };

  console.log('📊 Coverage Report:');
  console.log('┌─────────────┬─────────┬────────┐');
  console.log('│ Metric      │ Current │ Status │');
  console.log('├─────────────┼─────────┼────────┤');

  let allPassed = true;
  const results = {};

  Object.entries(metrics).forEach(([metric, value]) => {
    const passed = value >= COVERAGE_THRESHOLD;
    const status = passed ? '✅ Pass' : '❌ Fail';
    const metricPadding = Math.max(0, 11 - metric.length);
    const padding = ' '.repeat(metricPadding);
    const valuePadding = Math.max(0, 7 - value.toString().length);
    const valueSpacing = ' '.repeat(valuePadding);
    
    console.log(`│ ${metric}${padding}│ ${value}%${valueSpacing}│ ${status} │`);
    
    results[metric] = { value, passed };
    if (!passed) allPassed = false;
  });

  console.log('└─────────────┴─────────┴────────┘\n');

  console.log(`🎯 Minimum Required: ${COVERAGE_THRESHOLD}%`);
  console.log(`📈 Overall Status: ${allPassed ? '✅ PASSED' : '❌ FAILED'}\n`);

  if (!allPassed) {
    console.log('💡 Tips to improve coverage:');
    Object.entries(results).forEach(([metric, { value, passed }]) => {
      if (!passed) {
        const needed = COVERAGE_THRESHOLD - value;
        console.log(`   - ${metric}: need +${needed.toFixed(1)}% more coverage`);
      }
    });
    console.log('\n🔧 Run tests in watch mode: npm run test:watch');
    console.log('📝 Add more test cases to increase coverage\n');
    
    process.exit(1);
  }

  console.log('🎉 All coverage thresholds met! Ready to deploy 🚀\n');
  process.exit(0);
}

checkCoverage();
