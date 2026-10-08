import {
  Typography,
  Flex,
  Segmented,
  Switch,
  DatePicker,
  TimePicker,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Slider,
  Checkbox,
  Radio,
  Rate,
  Cascader
} from 'antd'

const { Title, Text, Paragraph } = Typography

const selectOptions = [
  { label: '选项一', value: 'opt1' },
  { label: '选项二', value: 'opt2' },
  { label: '选项三', value: 'opt3' }
]

const cascaderOptions = [
  { value: 'zhejiang', label: '浙江省', children: [
    { value: 'hangzhou', label: '杭州市' },
    { value: 'ningbo', label: '宁波市' }
  ] },
  { value: 'jiangsu', label: '江苏省', children: [{ value: 'nanjing', label: '南京市' }] }
]

const treeOptions = [
  { title: '研发部', value: 'rd', children: [
    { title: '前端组', value: 'fe' },
    { title: '后端组', value: 'be' }
  ] },
  { title: '市场部', value: 'mkt' }
]

const pageOptions = [
  { label: '组件展示', value: 'showcase' },
  { label: '表单尺寸对比', value: 'form-size' }
]

const Cell = ({ label, width = 160, children }) => (
  <Flex vertical gap={4}>
    <Text type="secondary" style={{ fontSize: 12 }}>{label}</Text>
    <div style={{ width }}>{children}</div>
  </Flex>
)

function SizeRow({ title, size }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: 12 }}>{title}</Title>
      <Flex gap={16} align="flex-start">
        <Cell label="Input 输入框">
          <Input size={size} placeholder="请输入内容" />
        </Cell>
        <Cell label="InputNumber 数字输入">
          <InputNumber size={size} placeholder="请输入数字" style={{ width: '100%' }} />
        </Cell>
        <Cell label="Select 选择器">
          <Select size={size} placeholder="请选择" style={{ width: '100%' }} options={selectOptions} />
        </Cell>
        <Cell label="DatePicker 日期选择">
          <DatePicker size={size} placeholder="请选择日期" style={{ width: '100%' }} />
        </Cell>
        <Cell label="RangePicker 日期范围" width={260}>
          <DatePicker.RangePicker size={size} placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
        </Cell>
        <Cell label="TimePicker 时间选择">
          <TimePicker size={size} placeholder="请选择时间" style={{ width: '100%' }} />
        </Cell>
        <Cell label="Cascader 级联选择">
          <Cascader size={size} placeholder="请选择地区" style={{ width: '100%' }} options={cascaderOptions} />
        </Cell>
        <Cell label="TreeSelect 树选择">
          <TreeSelect size={size} placeholder="请选择部门" style={{ width: '100%' }} treeData={treeOptions} />
        </Cell>
        <Cell label="Switch 开关" width={80}>
          <Switch defaultChecked />
        </Cell>
        <Cell label="Checkbox 复选框" width={110}>
          <Checkbox defaultChecked>选项</Checkbox>
        </Cell>
        <Cell label="Radio 单选框" width={100}>
          <Radio defaultChecked>选项</Radio>
        </Cell>
        <Cell label="Rate 评分" width={150}>
          <Rate defaultValue={3} />
        </Cell>
        <Cell label="Slider 滑动条" width={180}>
          <Slider defaultValue={30} />
        </Cell>
      </Flex>
    </div>
  )
}

export default function FormSizeCompare({ dark, onToggleDark, page, onPageChange }) {
  return (
    <div style={{ margin: '0 auto', padding: '32px 24px', width: 'fit-content', minWidth: '100%' }}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={16} style={{ marginBottom: 8 }}>
        <Title level={2} style={{ margin: 0 }}>表单元素尺寸对比</Title>
        <Flex align="center" gap={16}>
          <Segmented value={page} onChange={(v) => onPageChange(v)} options={pageOptions} />
          <Flex align="center" gap={8}>
            <Text type="secondary">暗色</Text>
            <Switch checked={dark} onChange={onToggleDark} />
          </Flex>
        </Flex>
      </Flex>
      <Paragraph type="secondary">所有表单元素按 大 / 中（默认）/ 小 三种尺寸并排对比；Switch、Checkbox、Radio、Rate、Slider 本身不随 size 属性变化，作为参照一并列出。</Paragraph>

      <SizeRow title="大尺寸（large）" size="large" />
      <SizeRow title="中尺寸（middle，默认）" size="middle" />
      <SizeRow title="小尺寸（small）" size="small" />
    </div>
  )
}
