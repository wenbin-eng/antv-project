import { useState, useEffect } from 'react'
import {
  ConfigProvider,
  App as AntApp,
  theme,
  Space,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Button,
  Input,
  InputNumber,
  Select,
  Cascader,
  TreeSelect,
  DatePicker,
  TimePicker,
  Radio,
  Checkbox,
  Switch,
  Slider,
  Rate,
  Upload,
  Table,
  Tabs,
  Collapse,
  Tag,
  Badge,
  Avatar,
  Alert,
  Progress,
  Spin,
  Steps,
  Pagination,
  Tooltip,
  Popover,
  Empty,
  Result,
  Statistic,
  List,
  Timeline,
  Tree,
  Segmented,
  Mentions,
  ColorPicker,
  Calendar,
  Carousel,
  Drawer,
  Modal,
  Popconfirm,
  Breadcrumb,
  Flex
} from 'antd'
import {
  InboxOutlined,
  UploadOutlined,
  PlusOutlined,
  MinusOutlined,
  InfoCircleOutlined,
  UserOutlined,
  HeartOutlined,
  StarOutlined,
  HomeOutlined,
  SettingOutlined,
  SmileOutlined,
  BellOutlined,
  SearchOutlined
} from '@ant-design/icons'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'

const { Title, Paragraph, Text, Link } = Typography

const { Dragger } = Upload

const tabItems = [
  { key: '1', label: '标签一', children: '标签一的内容：这里是 Tabs 组件。' },
  { key: '2', label: '标签二', children: '标签二的内容：可以切换不同标签页。' },
  { key: '3', label: '标签三', children: '标签三的内容：支持禁用、图标等。' }
]

const collapseItems = [
  { key: '1', label: '面板一', children: <p>这是折叠面板一的内容。</p> },
  { key: '2', label: '面板二', children: <p>这是折叠面板二的内容。</p> },
  { key: '3', label: '面板三', children: <p>这是折叠面板三的内容。</p> }
]

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }] }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京', children: [{ value: 'zhonghuamen', label: '中华门' }] }
    ]
  }
]

const treeData = [
  {
    title: '父节点 1',
    key: '0-0',
    children: [
      { title: '子节点 1-1', key: '0-0-1' },
      { title: '子节点 1-2', key: '0-0-2' }
    ]
  },
  { title: '父节点 2', key: '0-1' }
]

const treeSelectData = [
  {
    value: 'parent 1',
    title: '父节点',
    children: [
      { value: 'parent 1-0', title: '子节点 1' },
      { value: 'parent 1-1', title: '子节点 2' }
    ]
  }
]

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', render: (t) => <a>{t}</a> },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') color = 'volcano'
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: '操作',
    key: 'action',
    render: (_) => (
      <Space size="middle">
        <a>邀请</a>
        <a>删除</a>
      </Space>
    )
  }
]

const tableData = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园 1 号', tags: ['nice', 'developer'] },
  { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园 2 号', tags: ['loser'] },
  { key: '3', name: '韩梅梅', age: 28, address: '拱墅区文晖路 88 号', tags: ['cool', 'teacher'] }
]

const listData = [
  { title: '标题一', desc: '列表项描述一' },
  { title: '标题二', desc: '列表项描述二' },
  { title: '标题三', desc: '列表项描述三' }
]

function App() {
  const { message: messageApi } = AntApp.useApp()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [radioVal, setRadioVal] = useState('a')
  const [checkVal, setCheckVal] = useState(['a'])
  const [switchOn, setSwitchOn] = useState(true)
  const [sliderVal, setSliderVal] = useState(30)
  const [rateVal, setRateVal] = useState(4)
  const [inputVal, setInputVal] = useState('输入框')
  const [numberVal, setNumberVal] = useState(5)
  const [selectVal, setSelectVal] = useState('hangzhou')
  const [cascaderVal, setCascaderVal] = useState([])
  const [treeSelectVal, setTreeSelectVal] = useState('')
  const [dateVal, setDateVal] = useState(null)
  const [rangeVal, setRangeVal] = useState(null)
  const [timeVal, setTimeVal] = useState(null)
  const [activeTab, setActiveTab] = useState('1')
  const [segmented, setSegmented] = useState('列表')
  const [color, setColor] = useState('#1677ff')
  const [expandedKeys, setExpandedKeys] = useState(['0-0'])
  const [checkedKeys, setCheckedKeys] = useState(['0-0-1'])
  const [current, setCurrent] = useState(1)
  const [page, setPage] = useState(1)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark)
  }, [dark])

  const Section = ({ title, children, extra }) => (
    <Card title={title} extra={extra} style={{ height: '100%' }}>
      {children}
    </Card>
  )

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { colorPrimary: '#0067D1', borderRadius: 6 }
      }}
    >
      <AntApp>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px' }}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
            <Title level={2} style={{ margin: 0 }}>Ant Design 组件展示</Title>
            <Space align="center">
              <Text type="secondary">暗色</Text>
              <Switch checked={dark} onChange={setDark} />
            </Space>
          </Flex>
          <Paragraph type="secondary">
            这里展示了常用组件的各种形态。共计数十种组件，覆盖按钮、表单、数据展示、反馈、布局等类别。
          </Paragraph>
          <Divider />

          <Row gutter={[16, 16]}>
            {/* 按钮 */}
            <Col xs={24} lg={24}>
              <Section title="Button 按钮">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space wrap>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="text">Text</Button>
                    <Button type="link">Link</Button>
                  </Space>
                  <Space wrap>
                    <Button type="primary" danger>Danger</Button>
                    <Button danger>Danger Default</Button>
                    <Button type="dashed" danger>Danger Dashed</Button>
                    <Button type="text" danger>Danger Text</Button>
                    <Button type="link" danger>Danger Link</Button>
                  </Space>
                  <Space wrap>
                    <Button type="primary" size="large">大</Button>
                    <Button type="primary">中</Button>
                    <Button type="primary" size="small">小</Button>
                    <Button type="primary" icon={<PlusOutlined />} />
                    <Button type="primary" loading>加载中</Button>
                    <Button type="primary" disabled>禁用</Button>
                    <Button type="primary" icon={<SearchOutlined />} shape="circle" />
                  </Space>
                </Space>
              </Section>
            </Col>

            {/* 输入 */}
            <Col xs={24} lg={24}>
              <Section title="Input 输入框">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="基本输入" />
                  <Input prefix={<UserOutlined />} suffix={<InfoCircleOutlined />} placeholder="带前后缀" />
                  <Input.Password placeholder="密码输入" />
                  <Input.Search placeholder="搜索输入" enterButton="搜索" onSearch={(v) => messageApi.success(`搜索：${v}`)} />
                  <InputNumber value={numberVal} onChange={setNumberVal} min={0} max={10} style={{ width: '100%' }} addonBefore="数量" addonAfter="个" />
                  <Input.TextArea rows={2} placeholder="多行文本" />
                  <Mentions placeholder="提及 @某人" options={[{ value: 'antd', label: 'Ant Design' }, { value: 'react', label: 'React' }]} />
                </Space>
              </Section>
            </Col>

            {/* 选择器 */}
            <Col xs={24} lg={24}>
              <Section title="Select / Cascader / TreeSelect">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Select
                    value={selectVal}
                    onChange={setSelectVal}
                    style={{ width: '100%' }}
                    options={[
                      { value: 'hangzhou', label: '杭州' },
                      { value: 'shanghai', label: '上海' },
                      { value: 'beijing', label: '北京' }
                    ]}
                  />
                  <Select
                    mode="tags"
                    placeholder="多选标签"
                    style={{ width: '100%' }}
                    defaultValue={['react']}
                    options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]}
                  />
                  <Cascader
                    value={cascaderVal}
                    onChange={setCascaderVal}
                    style={{ width: '100%' }}
                    options={cascaderOptions}
                    placeholder="级联选择"
                  />
                  <TreeSelect
                    value={treeSelectVal}
                    onChange={setTreeSelectVal}
                    style={{ width: '100%' }}
                    treeData={treeSelectData}
                    placeholder="树选择"
                    treeDefaultExpandAll
                  />
                </Space>
              </Section>
            </Col>

            {/* 日期时间 */}
            <Col xs={24} lg={24}>
              <Section title="DatePicker / TimePicker / Calendar">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Space wrap>
                    <DatePicker value={dateVal} onChange={setDateVal} placeholder="选择日期" />
                    <DatePicker.RangePicker value={rangeVal} onChange={setRangeVal} />
                    <TimePicker value={timeVal} onChange={setTimeVal} placeholder="时间" />
                  </Space>
                  <ColorPicker value={color} onChange={(c) => setColor(c.toHexString())} showText />
                  <div style={{ border: '1px solid #f0f0f0', borderRadius: 6, overflow: 'hidden' }}>
                    <Calendar fullscreen={false} />
                  </div>
                </Space>
              </Section>
            </Col>

            {/* 单选 多选 开关 */}
            <Col xs={24} lg={24}>
              <Section title="Radio / Checkbox / Switch / Slider / Rate">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Radio.Group value={radioVal} onChange={(e) => setRadioVal(e.target.value)}>
                    <Radio value="a">A</Radio>
                    <Radio value="b">B</Radio>
                    <Radio value="c">C</Radio>
                  </Radio.Group>
                  <Radio.Group value={radioVal} onChange={(e) => setRadioVal(e.target.value)} optionType="button" buttonStyle="solid">
                    <Radio.Button value="a">A</Radio.Button>
                    <Radio.Button value="b">B</Radio.Button>
                    <Radio.Button value="c">C</Radio.Button>
                  </Radio.Group>
                  <Checkbox.Group value={checkVal} onChange={setCheckVal}>
                    <Checkbox value="a">A</Checkbox>
                    <Checkbox value="b">B</Checkbox>
                    <Checkbox value="c">C</Checkbox>
                  </Checkbox.Group>
                  <Space wrap>
                    <Switch checked={switchOn} onChange={setSwitchOn} />
                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                    <Switch loading defaultChecked />
                  </Space>
                  <Slider value={sliderVal} onChange={setSliderVal} />
                  <Rate value={rateVal} onChange={setRateVal} character={<HeartOutlined />} />
                </Space>
              </Section>
            </Col>

            {/* 上传 */}
            <Col xs={24} lg={24}>
              <Section title="Upload 上传">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Upload.Dragger
                    multiple
                    listType="picture"
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                    <p className="ant-upload-hint">支持单次或批量上传</p>
                  </Upload.Dragger>
                  <Upload listType="picture-card" beforeUpload={() => false}>
                    <div><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>
                  </Upload>
                </Space>
              </Section>
            </Col>

            {/* 标签 徽标 头像 */}
            <Col xs={24} lg={24}>
              <Section title="Tag / Badge / Avatar">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Space wrap>
                    <Tag color="magenta">magenta</Tag>
                    <Tag color="red">red</Tag>
                    <Tag color="volcano">volcano</Tag>
                    <Tag color="orange">orange</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="lime">lime</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                  </Space>
                  <Space wrap>
                    <Badge count={5}><Avatar shape="square" size="large" /></Badge>
                    <Badge count={0} showZero><Avatar shape="square" size="large" /></Badge>
                    <Badge dot><Avatar shape="square" size="large" /></Badge>
                    <Badge count={<PlusOutlined style={{ color: '#fff' }} />}><Avatar shape="square" size="large" /></Badge>
                  </Space>
                  <Space wrap>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <Avatar size="large" icon={<UserOutlined />} />
                    <Avatar icon={<UserOutlined />} />
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                    <Avatar style={{ backgroundColor: '#f56a00' }}>U</Avatar>
                  </Space>
                </Space>
              </Section>
            </Col>

            {/* 反馈 */}
            <Col xs={24} lg={24}>
              <Section title="Alert / Progress / Spin / Result / Empty">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Alert message="成功提示" type="success" showIcon />
                  <Alert message="信息提示" type="info" showIcon />
                  <Alert message="警告提示" type="warning" showIcon />
                  <Alert message="错误提示" type="error" showIcon />
                  <Progress percent={70} status="active" />
                  <Progress percent={100} status="success" />
                  <Progress percent={50} status="exception" />
                  <Spin />
                </Space>
              </Section>
            </Col>

            {/* Steps 分页 */}
            <Col xs={24} lg={24}>
              <Section title="Steps / Pagination / Segmented">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Steps
                    current={current}
                    onChange={setCurrent}
                    items={[
                      { title: '已完成', description: '步骤一' },
                      { title: '进行中', description: '步骤二' },
                      { title: '待办', description: '步骤三' },
                      { title: '待办', description: '步骤四' }
                    ]}
                  />
                  <Pagination current={page} onChange={setPage} total={50} showSizeChanger showQuickJumper />
                  <Segmented value={segmented} onChange={setSegmented} options={['列表', '卡片', '表格']} />
                </Space>
              </Section>
            </Col>

            {/* 数据展示 */}
            <Col xs={24} lg={24}>
              <Section title="Statistic / Timeline / List">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Row gutter={16}>
                    <Col span={12}><Statistic title="活跃用户" value={112893} /></Col>
                    <Col span={12}><Statistic title="余额" value={112893} precision={2} prefix="¥" /></Col>
                  </Row>
                  <Timeline
                    items={[
                      { color: 'green', children: '创建项目' },
                      { color: 'blue', children: '开发功能' },
                      { color: 'red', children: '修复 Bug' },
                      { color: 'gray', children: '发布上线' }
                    ]}
                  />
                  <List
                    size="small"
                    dataSource={listData}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta title={item.title} description={item.desc} avatar={<Avatar icon={<UserOutlined />} />} />
                      </List.Item>
                    )}
                  />
                </Space>
              </Section>
            </Col>

            {/* 树 */}
            <Col xs={24} lg={24}>
              <Section title="Tree 树形控件">
                <Tree
                  checkable
                  treeData={treeData}
                  expandedKeys={expandedKeys}
                  onExpand={setExpandedKeys}
                  checkedKeys={checkedKeys}
                  onCheck={setCheckedKeys}
                />
              </Section>
            </Col>

            {/* Tabs Collapse */}
            <Col xs={24} lg={24}>
              <Section title="Tabs / Collapse">
                <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
                <Collapse items={collapseItems} accordion />
              </Section>
            </Col>

            {/* 走马灯 */}
            <Col xs={24} lg={24}>
              <Section title="Carousel 走马灯">
                <Carousel autoplay>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i}>
                      <div style={{ height: 160, color: '#fff', lineHeight: '160px', textAlign: 'center', background: '#1677ff' }}>
                        幻灯片 {i + 1}
                      </div>
                    </div>
                  ))}
                </Carousel>
              </Section>
            </Col>

            {/* 表格 */}
            <Col xs={24} lg={24}>
              <Section title="Table 表格">
                <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
              </Section>
            </Col>

            {/* 弹层抽屉 */}
            <Col xs={24} lg={24}>
              <Section title="弹层与抽屉 Modal / Drawer / Popconfirm / Tooltip / Popover">
                <Space wrap>
                  <Button type="primary" onClick={() => setModalOpen(true)}>打开 Modal</Button>
                  <Button type="primary" onClick={() => setDrawerOpen(true)}>打开 Drawer</Button>
                  <Popconfirm title="确定删除吗？" onConfirm={() => messageApi.success('已删除')} okText="确定" cancelText="取消">
                    <Button danger>Popconfirm 删除</Button>
                  </Popconfirm>
                  <Tooltip title="提示文字">
                    <Button>Tooltip 悬停</Button>
                  </Tooltip>
                  <Popover content="弹出内容" title="标题">
                    <Button>Popover 弹出</Button>
                  </Popover>
                </Space>
                <Modal title="Modal 对话框" open={modalOpen} onOk={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} okText="确定" cancelText="取消">
                  <p>这是一个对话框，用于重要信息的确认或表单填写。</p>
                </Modal>
                <Drawer title="Drawer 抽屉" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                  <p>抽屉从侧边滑出，适合放置详情或表单。</p>
                </Drawer>
              </Section>
            </Col>

            {/* 结果 空状态 */}
            <Col xs={24} lg={24}>
              <Section title="Result / Empty">
                <Result
                  status="success"
                  title="操作成功"
                  subTitle="订单号：2026091300001，预计 2 分钟内完成"
                  extra={[<Button type="primary" key="go">前往查看</Button>, <Button key="buy">再买一次</Button>]}
                />
                <Empty description="暂无数据" />
              </Section>
            </Col>

            {/* 面包屑 + 通知 */}
            <Col xs={24} lg={24}>
              <Section title="Breadcrumb / 通知">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Breadcrumb
                    items={[
                      { title: <><HomeOutlined /><span>首页</span></> },
                      { title: '应用中心' },
                      { title: '应用列表' },
                      { title: '某应用' }
                    ]}
                  />
                  <Space wrap>
                    <Button onClick={() => messageApi.success('这是一条成功消息')}>成功消息</Button>
                    <Button onClick={() => messageApi.info('这是一条普通消息')}>普通消息</Button>
                    <Button onClick={() => messageApi.warning('这是一条警告消息')}>警告消息</Button>
                    <Button onClick={() => messageApi.error('这是一条错误消息')}>错误消息</Button>
                    <Button onClick={() => messageApi.loading('加载中', 1.5)}>加载消息</Button>
                  </Space>
                </Space>
              </Section>
            </Col>
          </Row>

          <Divider />
          <Flex justify="space-between" align="center">
            <Text type="secondary">Ant Design v5 组件展示 · 基于 React {`18`} + Vite</Text>
            <Space>
              <Tag icon={<SmileOutlined />} color="processing">演示</Tag>
              <Tag icon={<BellOutlined />} color="success">在线</Tag>
            </Space>
          </Flex>
        </div>
      </AntApp>
    </ConfigProvider>
  )
}

export default App

