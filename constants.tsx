import { 
  Droplets, 
  Flame, 
  Trash2, 
  Factory, 
  Wind, 
  Zap, 
  Leaf, 
  Recycle, 
  FlaskConical,
  Truck
} from 'lucide-react';
import { ProcessStep, ProcessType, ComparisonMetric } from './types';

export const TRADITIONAL_STEPS: ProcessStep[] = [
  {
    id: 't1',
    title: '污泥浓缩',
    description: '重力或机械浓缩，降低含水率至95-97%。',
    icon: Droplets,
    temperature: '常温',
    duration: '12-24小时',
    output: '浓缩污泥',
    details: '污泥浓缩是减少污泥体积的第一步。主要通过重力沉降或机械方式（如带式浓缩机）去除间隙水，使固体含量从1%提升至3-5%。'
  },
  {
    id: 't2',
    title: '机械脱水',
    description: '使用压滤机将含水率降至80%左右。',
    icon: Factory,
    temperature: '常温',
    duration: '2-4小时',
    output: '脱水污泥泥饼',
    details: '添加絮凝剂（PAM）后，通过板框压滤机或离心机进行物理脱水。这是传统工艺中最关键的减量化步骤，但仍残留大量结合水。'
  },
  {
    id: 't3',
    title: '热干化',
    description: '利用热介质将含水率降至40-60%。',
    icon: Wind,
    temperature: '100-200°C',
    duration: '30-60分钟',
    output: '干化污泥',
    details: '消耗大量热能（通常来自天然气或蒸汽），通过对流或传导加热蒸发水分。这是高能耗环节，旨在满足后续处置要求。'
  },
  {
    id: 't4',
    title: '焚烧/填埋',
    description: '终端处置，减量化最彻底但有二次污染风险。',
    icon: Trash2,
    temperature: '850°C+',
    duration: '即时',
    output: '飞灰/炉渣',
    details: '焚烧可最大限度减量，但产生二噁英和重金属飞灰，需严格尾气处理。填埋占用土地资源，且存在渗滤液污染地下水的风险，正逐渐被限制。'
  }
];

export const PYROLYSIS_STEPS: ProcessStep[] = [
  {
    id: 'p1',
    title: '深度脱水',
    description: '调理+高压压滤，含水率降至60%以下。',
    icon: Droplets,
    temperature: '常温',
    duration: '1-2小时',
    output: '半干污泥',
    details: '通过添加骨架构建体（如石灰、铁盐）改变污泥结构，再经高压压滤，直接将含水率降至热解所需的入料标准，无需高能耗的热干化。'
  },
  {
    id: 'p2',
    title: '低温干燥预处理',
    description: '利用余热进一步降低水分至30-40%。',
    icon: Wind,
    temperature: '80-120°C',
    duration: '20-40分钟',
    output: '干燥颗粒',
    details: '利用热解产生的余热烟气对物料进行预干燥。这是一个能量回收利用环节，显著降低系统外部能耗。'
  },
  {
    id: 'p3',
    title: '热解碳化',
    description: '缺氧条件下高温裂解有机物。',
    icon: Flame,
    temperature: '450-650°C',
    duration: '30-60分钟',
    output: '生物炭, 热解气',
    details: '核心工艺。在无氧或缺氧环境中加热，有机物裂解为可燃气体（热解气）、液态油（焦油）和固态炭（生物炭）。此过程重金属被固化在炭中，二噁英生成条件受限。'
  },
  {
    id: 'p4',
    title: '油气分离与净化',
    description: '分离焦油与不凝气，净化后回用。',
    icon: FlaskConical,
    temperature: '冷却',
    duration: '连续',
    output: '清洁合成气',
    details: '热解气经冷凝分离出焦油（可作为化工原料或燃料）。不凝气（H2, CO, CH4）经脱硫脱酸处理后，直接回用于热解炉燃烧供热，实现能源自给。'
  },
  {
    id: 'p5',
    title: '资源化产物',
    description: '生物炭收集利用（土壤改良/吸附剂）。',
    icon: Leaf,
    temperature: '常温',
    duration: '存储',
    output: '生物炭基肥',
    details: '产物生物炭具有丰富孔隙结构，可用作土壤改良剂、园林绿化基质或吸附材料。实现了碳封存和资源循环利用。'
  }
];

export const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    name: '碳排放',
    traditional: 85,
    pyrolysis: 30,
    unit: 'kg CO2/吨',
    description: '热解通过生物炭固碳及能源自给，大幅降低净碳排放。'
  },
  {
    name: '能源回收率',
    traditional: 20,
    pyrolysis: 75,
    unit: '%',
    description: '热解气回用供热效率远高于焚烧发电的转化效率。'
  },
  {
    name: '最终残渣量',
    traditional: 15,
    pyrolysis: 10,
    unit: '% 原体积',
    description: '热解后的生物炭体积仅为原污泥的10%左右。'
  },
  {
    name: '处理成本',
    traditional: 320,
    pyrolysis: 280,
    unit: '元/吨',
    description: '虽然热解设备初期投资高，但运行能耗低且有产物收益。'
  }
];