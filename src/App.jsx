import { useState, useEffect, useRef } from 'react'
import {
  ConfigProvider,
  App as AntApp,
  theme,
  Card,
  Avatar,
  Typography,
  Space,
  Flex,
  Divider,
  Button,
  Tag,
  Badge,
  Carousel,
  Collapse,
  Segmented,
  Timeline,
  Tree,
  Table,
  Checkbox,
  Radio,
  DatePicker,
  TimePicker,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Slider,
  Switch,
  Rate,
  Breadcrumb,
  Dropdown,
  Tabs,
  Steps,
  Pagination,
  Menu,
  Progress,
  Modal,
  Popover,
  Tooltip,
  Affix,
  Drawer,
  Form,
  Cascader
} from 'antd'
import {
  SearchOutlined,
  RightOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  DownOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  SettingOutlined,
  HomeOutlined,
  FileOutlined,
  FolderOutlined,
  BarChartOutlined,
  TeamOutlined,
  UserOutlined,
  BellOutlined,
  SendOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  BookOutlined,
  MonitorOutlined,
  LayoutOutlined,
  PlusOutlined
} from '@ant-design/icons'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'

const { Title, Text, Paragraph } = Typography

/* ============================================================ 展示数据 ============================================================ */
const tableData = [
  { key: '1', name: '张三', age: 28, department: '研发部', position: '前端工程师', status: '在职', email: 'zhangsan@example.com', phone: '13800001111', joinDate: '2020-03-15', salary: '25000' },
  { key: '2', name: '李四', age: 32, department: '市场部', position: '产品经理', status: '在职', email: 'lisi@example.com', phone: '13800002222', joinDate: '2018-07-01', salary: '30000' },
  { key: '3', name: '王五', age: 26, department: '设计部', position: 'UI设计师', status: '休假', email: 'wangwu@example.com', phone: '13800003333', joinDate: '2022-01-10', salary: '20000' },
  { key: '4', name: '赵六', age: 35, department: '研发部', position: '后端工程师', status: '在职', email: 'zhaoliu@example.com', phone: '13800004444', joinDate: '2017-09-20', salary: '28000' },
  { key: '5', name: '孙七', age: 29, department: '运营部', position: '运营主管', status: '在职', email: 'sunqi@example.com', phone: '13800005555', joinDate: '2019-11-05', salary: '26000' }
]

const sortFilterData = [
  { key: 'sf1', name: '张三', age: 28, department: '研发部', position: '前端工程师', salary: 25000, status: '在职' },
  { key: 'sf2', name: '李四', age: 32, department: '市场部', position: '产品经理', salary: 30000, status: '在职' },
  { key: 'sf3', name: '王五', age: 26, department: '设计部', position: 'UI设计师', salary: 20000, status: '休假' },
  { key: 'sf4', name: '赵六', age: 35, department: '研发部', position: '后端工程师', salary: 28000, status: '在职' },
  { key: 'sf5', name: '孙七', age: 29, department: '运营部', position: '运营主管', salary: 26000, status: '离职' },
  { key: 'sf6', name: '周八', age: 24, department: '市场部', position: '市场专员', salary: 18000, status: '在职' },
  { key: 'sf7', name: '吴九', age: 38, department: '研发部', position: '架构师', salary: 35000, status: '在职' }
]

const treeData = [
  {
    title: '总部', key: 'hq', icon: <HomeOutlined />, children: [
      {
        title: '研发部', key: 'rd', icon: <SettingOutlined />, children: [
          { title: '前端组', key: 'fe', icon: <LayoutOutlined /> },
          { title: '后端组', key: 'be', icon: <LayoutOutlined /> }
        ]
      },
      {
        title: '市场部', key: 'mkt', icon: <TeamOutlined />, children: [
          { title: '品牌组', key: 'brand', icon: <TeamOutlined /> }
        ]
      }
    ]
  }
]

const treeCheckableData = [
  {
    title: '全部权限', key: 'all', children: [
      {
        title: '用户管理', key: 'user', children: [
          { title: '查看用户', key: 'user-view' },
          { title: '编辑用户', key: 'user-edit' }
        ]
      },
      {
        title: '系统设置', key: 'sys', children: [
          { title: '基本设置', key: 'sys-basic' },
          { title: '安全设置', key: 'sys-security' }
        ]
      }
    ]
  }
]

const treeSelectData = [
  { title: '总部', value: 'hq', children: [
    { title: '研发部', value: 'rd', children: [
      { title: '前端组', value: 'fe' },
      { title: '后端组', value: 'be' }
    ]},
    { title: '市场部', value: 'mkt', children: [
      { title: '品牌组', value: 'brand' }
    ]}
  ]}
]

const treeSelectIconData = [
  { title: '总部', value: 'hq', icon: <HomeOutlined />, children: [
    { title: '研发部', value: 'rd', icon: <SettingOutlined />, children: [
      { title: '前端组', value: 'fe', icon: <LayoutOutlined /> },
      { title: '后端组', value: 'be', icon: <LayoutOutlined /> }
    ]},
    { title: '市场部', value: 'mkt', icon: <TeamOutlined />, children: [
      { title: '品牌组', value: 'brand', icon: <FolderOutlined /> }
    ]}
  ]}
]

/* ============================================================ 辅助组件 ============================================================ */
const ShowCard = ({ title, children }) => (
  <Card title={<Text strong style={{ fontSize: 18 }}>{title}</Text>} style={{ marginBottom: 24 }}>
    {children}
  </Card>
)

const Row = ({ label, children }) => (
  <div style={{ marginBottom: 20 }}>
    <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>{label}</Text>
    <Flex wrap="wrap" gap={12} align="center">
      {children}
    </Flex>
  </div>
)

/* ============================================================ App ============================================================ */
function App() {
  const { message } = AntApp.useApp()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  /* —— Table —— */
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const baseColumns = [
    { title: '姓名', dataIndex: 'name', fixed: 'left', width: 120, render: (t) => (
      <Space size={8}>
        <Avatar size={24} style={{ backgroundColor: 'var(--brand-50)', fontSize: 12 }}>{t[0]}</Avatar>
        {t}
      </Space>
    ) },
    { title: '年龄', dataIndex: 'age', width: 80 },
    { title: '部门', dataIndex: 'department' },
    { title: '职位', dataIndex: 'position' },
    { title: '邮箱', dataIndex: 'email', render: (t) => <Text copyable={{ text: t }}>{t}</Text> },
    { title: '电话', dataIndex: 'phone' },
    { title: '入职日期', dataIndex: 'joinDate' },
    { title: '薪资', dataIndex: 'salary', render: (t) => <Progress percent={Math.round(Number(t) / 35000 * 100)} size="small" style={{ maxWidth: 120 }} /> },
    { title: '状态', dataIndex: 'status', fixed: 'right', width: 100, render: (t) => <Tag color={t === '在职' ? 'success' : t === '休假' ? 'warning' : 'default'}>{t}</Tag> }
  ]

  const expandableColumns = [
    { title: '姓名', dataIndex: 'name', width: 100 },
    { title: '年龄', dataIndex: 'age' },
    { title: '部门', dataIndex: 'department' },
    { title: '职位', dataIndex: 'position' },
    { title: '状态', dataIndex: 'status', render: (t) => <Tag>{t}</Tag> }
  ]

  const sortFilterColumns = [
    { title: '姓名', dataIndex: 'name', width: 100 },
    { title: '年龄', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
    { title: '部门', dataIndex: 'department', filters: [{ text: '研发部', value: '研发部' }, { text: '市场部', value: '市场部' }, { text: '设计部', value: '设计部' }, { text: '运营部', value: '运营部' }], onFilter: (v, r) => r.department.includes(v) },
    { title: '职位', dataIndex: 'position' },
    { title: '薪资', dataIndex: 'salary', sorter: (a, b) => a.salary - b.salary, filters: [{ text: '≥2.5万', value: 'high' }, { text: '<2.5万', value: 'low' }], onFilter: (v, r) => v === 'high' ? Number(r.salary) >= 25000 : Number(r.salary) < 25000 },
    { title: '状态', dataIndex: 'status', filters: [{ text: '在职', value: '在职' }, { text: '休假', value: '休假' }, { text: '离职', value: '离职' }], onFilter: (v, r) => r.status.includes(v), render: (t) => <Tag color={t === '在职' ? 'success' : t === '休假' ? 'warning' : 'default'}>{t}</Tag> }
  ]

  /* —— Tabs —— */
  const tabItems = [
    { key: 'tab1', label: <span><HomeOutlined /> 概述</span>, children: <Paragraph>这是概述页面的内容，包含项目的整体介绍和关键信息摘要。</Paragraph> },
    { key: 'tab2', label: <span><FileOutlined /> 详情</span>, children: <Paragraph>这是详情页面的内容，包含项目的详细说明和技术规格参数。</Paragraph> },
    { key: 'tab3', label: <span><SettingOutlined /> 设置</span>, children: <Paragraph>这是设置页面的内容，包含各项配置选项。</Paragraph> }
  ]
  const tabItemsClosable = tabItems.map((i) => ({ ...i, closable: true }))
  const tabItemsCard = [
    { key: 't1', label: '基础信息', children: <Paragraph>基础信息内容区域</Paragraph> },
    { key: 't2', label: '扩展信息', disabled: true, children: <Paragraph>扩展信息内容区域</Paragraph> },
    { key: 't3', label: '历史记录', children: <Paragraph>历史记录内容区域</Paragraph> }
  ]
  const tabItemsOverflow = Array.from({ length: 6 }, (_, i) => ({
    key: `ot${i + 1}`,
    label: `标签${['一', '二', '三', '四', '五', '六'][i]}`,
    children: <Paragraph>标签{['一', '二', '三', '四', '五', '六'][i]}的内容</Paragraph>
  }))

  /* —— Steps —— */
  const stepItems = [
    { title: '提交申请', description: '填写申请表单' },
    { title: '部门审核', description: '主管审批中' },
    { title: '财务确认', description: '等待处理' },
    { title: '完成', description: '流程结束' }
  ]

  /* —— Steps panel —— */
  const [panelStep, setPanelStep] = useState(0)
  const panelStepItems = [
    { title: '填写信息', content: '填写申请表单', panel: <Paragraph>请填写申请人的基本信息，包括姓名、部门、申请事由等。</Paragraph> },
    { title: '确认信息', content: '确认信息无误', panel: <Paragraph>请确认填写的信息无误，提交后将进入审核流程，无法修改。</Paragraph> },
    { title: '审核中', content: '等待主管审批', status: 'error', panel: <Paragraph>您的申请已提交，正在等待主管审批，请耐心等待审核结果。</Paragraph> },
    { title: '完成', content: '流程已完成', panel: <Paragraph>申请流程已完成，结果已通知您。如有疑问请联系系统管理员。</Paragraph> }
  ]
  const panelNext = () => setPanelStep((p) => Math.min(p + 1, panelStepItems.length - 1))
  const panelPrev = () => setPanelStep((p) => Math.max(p - 1, 0))

  /* —— Menu —— */
  const menuItems = [
    { key: 'home', label: '首页', icon: <HomeOutlined /> },
    {
      key: 'system', label: '系统管理', icon: <SettingOutlined />, children: [
        {
          key: 'user', label: '用户管理', children: [
            { key: 'userList', label: '用户列表' },
            { key: 'userAudit', label: '用户审核' }
          ]
        },
        {
          key: 'role', label: '角色管理', children: [
            { key: 'roleConfig', label: '角色配置' },
            { key: 'roleAssign', label: '角色分配' }
          ]
        },
        { key: 'permission', label: '权限管理' }
      ]
    },
    {
      key: 'content', label: '内容管理', icon: <FileTextOutlined />, children: [
        {
          key: 'article', label: '文章管理', children: [
            { key: 'articlePublish', label: '文章发布' },
            { key: 'articleAudit', label: '文章审核' }
          ]
        },
        { key: 'category', label: '分类管理' }
      ]
    },
    { key: 'monitor', label: '系统监控', icon: <MonitorOutlined /> },
    { key: 'log', label: '日志管理', icon: <BookOutlined /> }
  ]
  const menuHorizontalItems = [
    { key: 'dashboard', label: '工作台', icon: <LayoutOutlined /> },
    { key: 'project', label: '项目管理', icon: <FolderOutlined /> },
    { key: 'team', label: '团队协作', icon: <TeamOutlined /> },
    { key: 'analytics', label: '数据分析', icon: <BarChartOutlined /> },
    { key: 'settings', label: '设置', icon: <SettingOutlined /> }
  ]
  const menuCollapsedItems = [
    { key: 'home', label: '首页', icon: <HomeOutlined /> },
    { key: 'users', label: '用户', icon: <TeamOutlined /> },
    { key: 'settings', label: '设置', icon: <SettingOutlined /> },
    { key: 'help', label: '帮助', icon: <BellOutlined /> }
  ]

  /* —— Dropdown —— */
  const dropdownMenuClick = [
    { key: 'edit', label: '编辑', icon: <EditOutlined /> },
    { key: 'copy', label: '复制', icon: <CopyOutlined /> },
    { key: 'delete', label: '删除', icon: <DeleteOutlined /> }
  ]
  const dropdownMenuHover = [
    { key: 'view', label: '查看', icon: <EyeOutlined /> },
    { key: 'export', label: '导出', icon: <DownloadOutlined /> },
    { key: 'settings', label: '设置', icon: <SettingOutlined /> }
  ]

  /* —— Modal —— */
  const [modalBasicOpen, setModalBasicOpen] = useState(false)
  const [modalFooterOpen, setModalFooterOpen] = useState(false)

  /* —— Drawer —— */
  const [drawerOpen, setDrawerOpen] = useState(false)

  /* —— Tabs editable —— */
  const [editableTabs, setEditableTabs] = useState([
    { key: 'et1', label: '首页', children: <Paragraph>首页内容区域，展示项目整体概况。</Paragraph>, closable: false },
    { key: 'et2', label: '用户管理', children: <Paragraph>用户管理内容区域。</Paragraph> },
    { key: 'et3', label: '系统设置', children: <Paragraph>系统设置内容区域。</Paragraph> },
    { key: 'et4', label: '日志监控', children: <Paragraph>日志监控内容区域。</Paragraph> }
  ])
  const [editableTabKey, setEditableTabKey] = useState('et1')
  const editableTabIndex = useRef(4)

  const onEditableTabEdit = (targetKey, action) => {
    if (action === 'add') {
      editableTabIndex.current += 1
      const newKey = `et${editableTabIndex.current}`
      setEditableTabs((prev) => [...prev, { key: newKey, label: `新标签${editableTabIndex.current}`, children: <Paragraph>这是动态新增的标签{editableTabIndex.current}的内容。</Paragraph> }])
      setEditableTabKey(newKey)
    } else if (action === 'remove') {
      setEditableTabs((prev) => {
        const newTabs = prev.filter((t) => t.key !== targetKey)
        if (editableTabKey === targetKey) {
          setEditableTabKey(newTabs[newTabs.length - 1]?.key)
        }
        return newTabs
      })
    }
  }

  /* —— Segmented —— */
  const [segValue, setSegValue] = useState('list')

  /* —— Switch states —— */
  const [switchOn, setSwitchOn] = useState(true)
  const [switchText, setSwitchText] = useState(true)

  /* —— Slider —— */
  const [sliderValue, setSliderValue] = useState(36)
  const [sliderRange, setSliderRange] = useState([20, 80])
  const [sliderInput, setSliderInput] = useState(45)
  const sliderMarks = { 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }

  /* —— Rate —— */
  const [rateVal, setRateVal] = useState(3)

  /* —— Form —— */
  const [form] = Form.useForm()
  const onFinish = (values) => {
    message.success('提交成功：' + JSON.stringify(values))
  }
  const onFinishFailed = () => {
    message.error('表单校验未通过，请检查必填项')
  }
  const cascaderOptions = [
    { value: 'zhejiang', label: '浙江', children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波' }
    ]},
    { value: 'jiangsu', label: '江苏', children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' }
    ]}
  ]

  /* —— Tree —— */
  const [treeExpanded, setTreeExpanded] = useState(['hq', 'rd'])
  const [treeChecked, setTreeChecked] = useState(['user-view', 'sys-basic'])

  return (
    <ConfigProvider
      locale={zhCN}
      cssVar
      hashed={false}
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { colorPrimary: '#0067D1', borderRadius: 6, fontFamily: 'var(--font-family)' }
      }}
    >
      <AntApp>
        <div style={{ margin: '0 auto', padding: '32px 24px' }}>
          {/* 标题 */}
          <Flex justify="space-between" align="center" wrap="wrap" gap={16} style={{ marginBottom: 8 }}>
            <Title level={2} style={{ margin: 0 }}>Ant Design 组件展示</Title>
            <Affix offsetTop={40}>
              <Space align="center">
                <Text type="secondary">暗色</Text>
                <Switch checked={dark} onChange={setDark} />
              </Space>
            </Affix>
          </Flex>
          <Paragraph type="secondary">参考 componentShowcase.json，按 5 大类别展示常用组件的各种形态。</Paragraph>

          {/* ============================================================ 通用组件 ============================================================ */}
          <Title level={3} style={{ borderBottom: '1px solid var(--color-border-separator)', paddingBottom: 12, marginTop: 40 }}>通用组件 (General)</Title>

          <ShowCard title="Button 按钮">
            <Row label="颜色变体">
              <Button>默认按钮</Button>
              <Button type="primary">主要按钮</Button>
              <Button type="primary" danger>危险按钮</Button>
              <Button type="link">链接按钮</Button>
            </Row>
            <Row label="尺寸变体">
              <Button type="primary" size="large">大按钮</Button>
              <Button type="primary">中按钮</Button>
              <Button type="primary" size="small">小按钮</Button>
            </Row>
            <Row label="类型变体">
              <Button type="primary">默认类型</Button>
              <Button type="link">链接类型</Button>
            </Row>
            <Row label="图标按钮">
              <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
              <Button type="primary" icon={<RightOutlined />} iconPlacement="end">下一步</Button>
              <Button icon={<SearchOutlined />} />
              <Button shape="circle" size="small" icon={<SearchOutlined />} />
            </Row>
            <Row label="禁用状态">
              <Button type="primary" icon={<SearchOutlined />} disabled>搜索</Button>
            </Row>
          </ShowCard>

          {/* ============================================================ 数据展示 ============================================================ */}
          <Title level={3} style={{ borderBottom: '1px solid var(--color-border-separator)', paddingBottom: 12, marginTop: 40 }}>数据展示组件 (DataDisplay)</Title>

          <ShowCard title="Tag 标签">
            <Row label="默认标签">
              <Tag >默认</Tag>
            </Row>
            <Row label="图标与可关闭">
              <Tag icon={<CheckCircleOutlined />}>在线</Tag>
              <Tag icon={<CheckCircleOutlined />} closable>可关闭</Tag>
              <Tag disabled={true} icon={<CheckCircleOutlined />} closable>disabled</Tag>
            </Row>
            <Row label="solid 状态色（bordered=false）">
              <Tag variant="filled" color="processing">info</Tag>
              <Tag variant="filled" color="error">error</Tag>
              <Tag variant="filled" color="warning">alert</Tag>
              <Tag variant="filled" color="gold">warning</Tag>
              <Tag variant="filled" color="success">success</Tag>
            </Row>
            <Row label="filled 状态色">
              <Tag color="processing">info</Tag>
              <Tag color="error">error</Tag>
              <Tag color="warning">alert</Tag>
              <Tag color="gold">warning</Tag>
              <Tag color="success">success</Tag>
              <Tag color="default" disabled={true}>disabled</Tag>
            </Row>
            <Row label="filled 彩色标签">
              <Tag color="green">green</Tag>
              <Tag color="magenta">magenta</Tag>
              <Tag color="pink">pink</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="geekblue">indigo</Tag>
              <Tag color="cyan">cyan</Tag>
            </Row>
          </ShowCard>

          <ShowCard title="Badge 徽标">
            <Row label="计数徽标">
              <Badge count={12}><div style={{ width: 32, height: 32, background: '#f2f2f2', borderRadius: 4 }} /></Badge>
              <Badge count={108} overflowCount={99}><div style={{ width: 32, height: 32, background: '#f2f2f2', borderRadius: 4 }} /></Badge>
              <Badge count={0} showZero><div style={{ width: 32, height: 32, background: '#f2f2f2', borderRadius: 4 }} /></Badge>
            </Row>
            <Row label="点状徽标">
              <Badge dot><div style={{ width: 32, height: 32, background: '#f2f2f2', borderRadius: 4 }} /></Badge>
            </Row>
            <Row label="状态徽标">
              <Badge status="success" text="成功" />
              <Badge status="processing" text="处理中" />
              <Badge status="error" text="错误" />
              <Badge status="warning" text="警告" />
              <Badge status="default" text="默认" />
            </Row>
          </ShowCard>

          <ShowCard title="Carousel 走马灯">
            <Row label="默认样式">
              <div style={{ width: '100%' }}>
                <Carousel autoplay style={{ borderRadius: 8, overflow: 'hidden' }}>
                  <div><div style={{ height: 200, lineHeight: '200px', textAlign: 'center', background: '#0067D1', color: '#fff', fontSize: 20, fontWeight: 700 }}>幻灯片 1</div></div>
                  <div><div style={{ height: 200, lineHeight: '200px', textAlign: 'center', background: '#09AA71', color: '#fff', fontSize: 20, fontWeight: 700 }}>幻灯片 2</div></div>
                  <div><div style={{ height: 200, lineHeight: '200px', textAlign: 'center', background: '#FCC800', color: '#fff', fontSize: 20, fontWeight: 700 }}>幻灯片 3</div></div>
                </Carousel>
              </div>
            </Row>
          </ShowCard>

          <ShowCard title="Collapse 折叠面板">
            <Row label="默认展开面板">
              <Collapse defaultActiveKey={['panel1']} style={{ width: '100%' }} items={[
                { key: 'panel1', label: '基础信息', children: <p>姓名：张三，年龄：28岁，部门：研发部。</p> },
                { key: 'panel2', label: '工作经历', children: <p>2020年至今，就职于ABC科技有限公司，担任高级前端工程师。</p> },
                { key: 'panel3', label: '教育背景', children: <p>2016-2020年，北京大学，计算机科学与技术专业。</p> }
              ]} />
            </Row>
            <Row label="展开图标在左侧">
              <Collapse defaultActiveKey={['iconPanel1']} expandIconPlacement="start" style={{ width: '100%' }} items={[
                { key: 'iconPanel1', label: '基础信息', children: <p>姓名：李四，年龄：32岁，部门：产品部。</p> },
                { key: 'iconPanel2', label: '工作经历', children: <p>2018年至今，就职于XYZ互联网公司，担任产品经理。</p> },
                { key: 'iconPanel3', label: '教育背景', children: <p>2014-2018年，清华大学，工业设计专业。</p> }
              ]} />
            </Row>
          </ShowCard>

          <ShowCard title="Divider 分割线">
            <Row label="实线"><Divider /></Row>
            <Row label="虚线"><Divider dashed /></Row>
            <Row label="点线"><Divider style={{ borderStyle: 'dotted' }} /></Row>
            <Row label="带文字">
              <Divider>居中文字</Divider>
              <Divider titlePlacement="left">左侧文字</Divider>
              <Divider titlePlacement="right">右侧文字</Divider>
            </Row>
          </ShowCard>

          <ShowCard title="Segmented 分段控制器">
            <Row label="尺寸变体">
              <Segmented options={['选项一', '选项二', '选项三']} defaultValue="选项一" />
            </Row>
            <Row label="文字带图标">
              <Segmented value={segValue} onChange={setSegValue} options={[
                { label: '列表', value: 'list', icon: <LayoutOutlined /> },
                { label: '卡片', value: 'card', icon: <FolderOutlined /> },
                { label: '表格', value: 'table', icon: <BarChartOutlined /> }
              ]} />
            </Row>
            <Row label="纯图标">
              <Segmented options={[
                { value: 'list', icon: <LayoutOutlined /> },
                { value: 'card', icon: <FolderOutlined /> },
                { value: 'table', icon: <BarChartOutlined /> }
              ]} />
            </Row>
            <Row label="块级模式">
              <Segmented block options={['选项一', '选项二', '选项三']} defaultValue="选项一" />
            </Row>
            <Row label="禁用状态">
              <Segmented disabled options={['列表', '卡片', '表格']} defaultValue="列表" />
            </Row>
          </ShowCard>

          <ShowCard title="Timeline 时间轴">
            <Row label="默认左侧对齐">
              <Timeline mode="start" style={{ width: '100%' }} items={[
                { color: 'green', icon: <CheckCircleOutlined />, content: <div><Text strong>需求评审</Text><br /><Text type="secondary">完成产品需求文档评审</Text></div> },
                { color: 'blue', icon: <FileOutlined />, content: <div><Text strong>设计阶段</Text><br /><Text type="secondary">UI/UX设计稿输出</Text></div> },
                { color: 'yellow', icon: <SettingOutlined />, content: <div><Text strong>开发中</Text><br /><Text type="secondary">前端与后端并行开发</Text></div> },
                { color: 'gray', content: <div><Text strong>测试阶段</Text><br /><Text type="secondary">待进行功能与性能测试</Text></div> }
              ]} />
            </Row>
            <Row label="交替模式">
              <Timeline mode="alternate" style={{ width: '100%' }} items={[
                { color: 'blue', content: <div><Text strong>创建项目</Text><br /><Text type="secondary">初始化项目仓库和基础框架</Text></div> },
                { color: 'green', content: <div><Text strong>功能开发</Text><br /><Text type="secondary">完成核心功能模块开发</Text></div> },
                { color: 'yellow', content: <div><Text strong>部署上线</Text><br /><Text type="secondary">生产环境部署与验证</Text></div> }
              ]} />
            </Row>
          </ShowCard>

          <ShowCard title="Tree 树形控件">
            <Row label="默认展开">
              <Tree treeData={treeData} defaultExpandedKeys={['hq', 'rd']} style={{ width: '100%' }} />
            </Row>
            <Row label="可勾选">
              <Tree checkable treeData={treeCheckableData} defaultExpandedKeys={['all', 'user', 'sys']} defaultCheckedKeys={treeChecked} onCheck={setTreeChecked} style={{ width: '100%' }} />
            </Row>
          </ShowCard>

          <ShowCard title="Table 表格">
            <Row label="尺寸变体">
              <Text type="secondary" style={{ fontSize: 13, width: '100%' }}>大尺寸（large，默认）</Text>
              <Table
                size="large"
                rowKey="key"
                columns={baseColumns}
                dataSource={tableData}
                rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: setSelectedRowKeys }}
                scroll={{ x: 1300 }}
                pagination={{ pageSize: 5 }}
                style={{ width: '100%' }}
              />
              <Text type="secondary" style={{ fontSize: 13, width: '100%' }}>中尺寸（middle）</Text>
              <Table
                size="middle"
                rowKey="key"
                columns={baseColumns}
                dataSource={tableData}
                rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: setSelectedRowKeys }}
                scroll={{ x: 1300 }}
                pagination={{ pageSize: 5 }}
                style={{ width: '100%' }}
              />
              <Text type="secondary" style={{ fontSize: 13, width: '100%' }}>小尺寸（small）</Text>
              <Table
                size="small"
                rowKey="key"
                columns={baseColumns}
                dataSource={tableData}
                rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: setSelectedRowKeys }}
                scroll={{ x: 1300 }}
                pagination={{ pageSize: 5 }}
                style={{ width: '100%' }}
              />
            </Row>
            <Row label="展开行">
              <Table
                rowKey="key"
                columns={expandableColumns}
                dataSource={tableData.slice(0, 3)}
                expandable={{ expandedRowRender: (r) => <div style={{ padding: 16 }}><Text strong>个人简介</Text><br /><Text type="secondary">{r.name}，{r.joinDate}加入公司，担任{r.position}。</Text></div> }}
                pagination={false}
                style={{ width: '100%' }}
              />
            </Row>
            <Row label="排序与筛选">
              <Table
                rowKey="key"
                columns={sortFilterColumns}
                dataSource={sortFilterData}
                pagination={false}
                style={{ width: '100%' }}
              />
            </Row>
          </ShowCard>

          {/* ============================================================ 数据录入 ============================================================ */}
          <Title level={3} style={{ borderBottom: '1px solid var(--color-border-separator)', paddingBottom: 12, marginTop: 40 }}>数据录入组件 (DataEntry)</Title>

          <ShowCard title="Checkbox 复选框">
            <Row label="基础用法">
              <Checkbox>未选中</Checkbox>
              <Checkbox defaultChecked>已选中</Checkbox>
            </Row>
            <Row label="禁用状态">
              <Checkbox disabled>禁用-未选中</Checkbox>
              <Checkbox disabled checked>禁用-已选中</Checkbox>
            </Row>
            <Row label="半选状态">
              <Checkbox indeterminate>半选</Checkbox>
              <Checkbox indeterminate disabled>半选-禁用</Checkbox>
            </Row>
          </ShowCard>

          <ShowCard title="CheckboxGroup 复选框组">
            <Row label="默认选中状态">
              <Checkbox.Group defaultValue={['option1', 'option3']} options={[{ label: '选项一', value: 'option1' }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }]} />
            </Row>
            <Row label="禁用状态">
              <Checkbox.Group disabled defaultValue={['option1']} options={[{ label: '选项一', value: 'option1' }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }]} />
            </Row>
            <Row label="半选状态">
              <Checkbox indeterminate>半选</Checkbox>
            </Row>
          </ShowCard>

          <ShowCard title="RadioGroup 单选框组">
            <Row label="默认样式（水平）">
              <Radio.Group defaultValue="apple" options={[{ label: '苹果', value: 'apple' }, { label: '橙子', value: 'orange' }, { label: '葡萄', value: 'grape' }]} />
            </Row>
            <Row label="垂直布局">
              <Radio.Group defaultValue="apple" options={[{ label: '苹果', value: 'apple' }, { label: '橙子', value: 'orange' }, { label: '葡萄', value: 'grape' }]} style={{ display: 'flex', flexDirection: 'column', gap: 8 }} />
            </Row>
            <Row label="禁用状态">
              <Radio.Group disabled defaultValue="apple" options={[{ label: '苹果', value: 'apple' }, { label: '橙子', value: 'orange' }, { label: '葡萄', value: 'grape' }]} />
            </Row>
          </ShowCard>

          <ShowCard title="DatePicker 日期选择器">
            <Row label="单日期选择">
              <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" />
            </Row>
            <Row label="日期范围">
              <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} />
            </Row>
            <Row label="尺寸变体">
              <DatePicker size="large" defaultValue={dayjs('2026-06-23')} placeholder="大尺寸" />
              <DatePicker defaultValue={dayjs('2026-06-23')} placeholder="中尺寸" />
              <DatePicker size="small" defaultValue={dayjs('2026-06-23')} placeholder="小尺寸" />
            </Row>
            <Row label="禁用状态">
              <DatePicker defaultValue={dayjs('2026-06-23')} format="YYYY-MM-DD" disabled />
            </Row>
          </ShowCard>

          <ShowCard title="Input 输入框">
            <Row label="默认输入框">
              <Input defaultValue="默认输入内容" placeholder="请输入内容" style={{ width: 200 }} />
            </Row>
            <Row label="禁用输入框">
              <Input defaultValue="禁用输入框" placeholder="请输入内容" style={{ width: 200 }} disabled />
            </Row>
            <Row label="错误输入框">
              <Input status="error" defaultValue="错误输入框" placeholder="请输入内容" style={{ width: 200 }} />
            </Row>
            <Row label="带前缀/后缀图标">
              <Input prefix={<SearchOutlined />} placeholder="搜索..." style={{ width: 200 }} />
              <Input suffix={<RightOutlined />} defaultValue="www.example.com" style={{ width: 200 }} />
              <Input suffix="RMB" style={{ width: 200 }} />
            </Row>
            <Row label="密码输入框">
              <Input.Password defaultValue="mypassword123" placeholder="请输入密码" style={{ width: 200 }} />
            </Row>
            <Row label="尺寸变体">
              <Input size="large" defaultValue="大尺寸" style={{ width: 150 }} />
              <Input defaultValue="中尺寸" style={{ width: 150 }} />
              <Input size="small" defaultValue="小尺寸" style={{ width: 150 }} />
            </Row>
          </ShowCard>

          <ShowCard title="TextArea 文本域">
            <Row label="默认文本域">
              <Input.TextArea defaultValue="这是一个多行文本输入框的示例内容，可以输入较长的文本。" maxLength={1000} showCount style={{ width: '100%' }} />
            </Row>
            <Row label="自适应高度">
              <Input.TextArea defaultValue="自适应高度的文本域，会根据内容自动调整高度。" autoSize style={{ width: '100%' }} />
            </Row>
          </ShowCard>

          <ShowCard title="InputNumber 数字输入框">
            <Row label="默认数字输入框">
              <InputNumber defaultValue={42} placeholder="请输入数字" mode="spinner" />
            </Row>
          </ShowCard>

          <ShowCard title="TimePicker 时间选择器">
            <Row label="默认时间选择">
              <TimePicker placeholder="请选择时间" />
            </Row>
            <Row label="时间范围">
              <TimePicker.RangePicker placeholder={['开始时间', '结束时间']} />
            </Row>
            <Row label="禁用状态">
              <TimePicker placeholder="请选择时间" disabled />
            </Row>
          </ShowCard>

          <ShowCard title="Select 选择器">
            <Row label="默认选择器">
              <Select placeholder="请选择" style={{ width: 200 }} options={[{ label: '选项一', value: 'option1' }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }, { label: '选项四', value: 'option4' }]} />
            </Row>
            <Row label="多选模式">
              <Select mode="multiple" defaultValue={['option1', 'option3']} style={{ width: 300 }} placeholder="请选择多个选项" options={[{ label: '选项一', value: 'option1' }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }, { label: '选项四', value: 'option4' }]} />
            </Row>
            <Row label="尺寸变体">
              <Select size="large" defaultValue="option1" style={{ width: 120 }} options={[{ label: '选项一', value: 'option1' }, { label: '选项二', value: 'option2' }]} />
              <Select defaultValue="option1" style={{ width: 120 }} options={[{ label: '选项一', value: 'option1' }, { label: '选项二', value: 'option2' }]} />
              <Select size="small" defaultValue="option1" style={{ width: 120 }} options={[{ label: '选项一', value: 'option1' }, { label: '选项二', value: 'option2' }]} />
            </Row>
            <Row label="单选单项禁用">
              <Select placeholder="请选择" style={{ width: 200 }} options={[{ label: '选项一', value: 'option1', disabled: true }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }, { label: '选项四', value: 'option4' }]} />
            </Row>
            <Row label="多选单项禁用">
              <Select mode="multiple" placeholder="请选择" style={{ width: 200 }} options={[{ label: '选项一', value: 'option1', disabled: true }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }, { label: '选项四', value: 'option4' }]} />
            </Row>
            <Row label="单选禁用态">
              <Select disabled defaultValue={'option1'} placeholder="请选择" style={{ width: 200 }} options={[{ label: '选项一', value: 'option1', }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }, { label: '选项四', value: 'option4' }]} />
            </Row>
            <Row label="多选禁用态">
              <Select mode="multiple" disabled placeholder="请选择" defaultValue={['option1']} style={{ width: 200 }} options={[{ label: '选项一', value: 'option1', }, { label: '选项二', value: 'option2' }, { label: '选项三', value: 'option3' }, { label: '选项四', value: 'option4' }]} />
            </Row>
          </ShowCard>

          <ShowCard title="TreeSelect 树选择">
            <Row label="单选">
              <TreeSelect placeholder="请选择" style={{ width: 200 }} treeData={treeSelectData} />
            </Row>
            <Row label="多选（可勾选）">
              <TreeSelect treeCheckable placeholder="请选择" style={{ width: 280 }} treeData={treeSelectData} />
            </Row>
            <Row label="带图标">
              <TreeSelect treeIcon placeholder="请选择" style={{ width: 200 }} treeData={treeSelectIconData} />
              <TreeSelect treeCheckable treeIcon placeholder="请选择" style={{ width: 280 }} treeData={treeSelectIconData} />
            </Row>
            <Row label="尺寸变体">
              <TreeSelect size="large" defaultValue="fe" style={{ width: 140 }} treeData={treeSelectData} />
              <TreeSelect defaultValue="fe" style={{ width: 140 }} treeData={treeSelectData} />
              <TreeSelect size="small" defaultValue="fe" style={{ width: 140 }} treeData={treeSelectData} />
            </Row>
            <Row label="禁用状态">
              <TreeSelect disabled defaultValue="fe" style={{ width: 200 }} treeData={treeSelectData} />
              <TreeSelect treeCheckable disabled defaultValue={['fe', 'be']} style={{ width: 280 }} treeData={treeSelectData} />
            </Row>
            <Row label="校验状态">
              <TreeSelect status="error" defaultValue="fe" style={{ width: 200 }} treeData={treeSelectData} />
              <TreeSelect status="warning" defaultValue="fe" style={{ width: 200 }} treeData={treeSelectData} />
            </Row>
          </ShowCard>

          <ShowCard title="Slider 滑动输入条">
            <Row label="基础滑块">
              <Slider value={sliderValue} onChange={setSliderValue} style={{ width: 300 }} />
            </Row>
            <Row label="范围滑块">
              <Slider range value={sliderRange} onChange={setSliderRange} style={{ width: 300 }} />
            </Row>
            <Row label="带刻度标记">
              <Slider defaultValue={50} marks={sliderMarks} style={{ width: 400 }} />
            </Row>
            <Row label="带数字输入框">
              <Flex gap={16} align="center">
                <Slider value={sliderInput} onChange={setSliderInput} style={{ width: 200 }} />
                <InputNumber value={sliderInput} onChange={setSliderInput} min={0} max={100} />
              </Flex>
            </Row>
          </ShowCard>

          <ShowCard title="Switch 开关">
            <Row label="开/关状态">
              <Switch checked={switchOn} onChange={setSwitchOn} />
              <Switch checked={!switchOn} onChange={(v) => setSwitchOn(!v)} />
            </Row>
            <Row label="带文字描述">
              <Switch checkedChildren="开" unCheckedChildren="关" checked={switchText} onChange={setSwitchText} />
            </Row>
            <Row label="带图标">
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
            </Row>
            <Row label="禁用状态">
              <Switch checked disabled />
              <Switch disabled />
            </Row>
          </ShowCard>

          <ShowCard title="Rate 评分">
            <Row label="基础样式">
              <Rate count={5} value={rateVal} onChange={setRateVal} allowHalf />
            </Row>
            <Row label="尺寸变体">
              <Rate count={5} defaultValue={3} style={{ fontSize: 28 }} />
              <Rate count={5} defaultValue={3} />
              <Rate count={5} defaultValue={3} style={{ fontSize: 12 }} />
            </Row>
          </ShowCard>

          <ShowCard title="Form 表单">
            <Row label="基础表单（含校验）">
              <Form
                form={form}
                layout="vertical"
                style={{ width: '100%', maxWidth: 480 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                  <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式不正确' }]}>
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item label="所在地" name="region" rules={[{ required: true, message: '请选择所在地' }]}>
                  <Cascader options={cascaderOptions} placeholder="请选择省市" />
                </Form.Item>
              </Form>
            </Row>
            <Row label="水平表单（label 左右对齐）">
              <Form
                layout="horizontal"
                labelAlign="left"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                style={{ width: '100%', maxWidth: 560 }}
                initialValues={{ notify: true }}
                onFinish={(v) => message.success('提交成功：' + JSON.stringify(v))}
              >
                <Form.Item label="项目名称" name="projectName" rules={[{ required: true, message: '请输入项目名称' }]}>
                  <Input placeholder="请输入项目名称" />
                </Form.Item>
                <Form.Item label="负责人" name="owner" rules={[{ required: true, message: '请选择负责人' }]}>
                  <Select placeholder="请选择" options={[{ label: '张三', value: 'zhangsan' }, { label: '李四', value: 'lisi' }, { label: '王五', value: 'wangwu' }]} />
                </Form.Item>
                <Form.Item label="项目类型" name="type" rules={[{ required: true, message: '请选择项目类型' }]}>
                  <Select placeholder="请选择" options={[{ label: 'Web 应用', value: 'web' }, { label: '移动端', value: 'mobile' }, { label: '桌面端', value: 'desktop' }]} />
                </Form.Item>
                <Form.Item label="开启通知" name="notify" valuePropName="checked">
                  <Switch checkedChildren="开" unCheckedChildren="关" />
                </Form.Item>
              </Form>
            </Row>
          </ShowCard>

          {/* ============================================================ 导航组件 ============================================================ */}
          <Title level={3} style={{ borderBottom: '1px solid var(--color-border-separator)', paddingBottom: 12, marginTop: 40 }}>导航组件 (Navigation)</Title>

          <ShowCard title="Breadcrumb 面包屑">
            <Row label="默认分隔符">
              <Breadcrumb items={[{ title: '首页' }, { title: '产品中心' }, { title: '详情页' }]} />
            </Row>
            <Row label="自定义分隔符">
              <Breadcrumb separator=">" items={[{ title: '系统管理' }, { title: '用户管理' }, { title: '用户详情' }]} />
            </Row>
          </ShowCard>

          <ShowCard title="Dropdown 下拉菜单">
            <Row label="点击触发">
              <Dropdown menu={{ items: dropdownMenuClick }} trigger={['click']}>
                <Button>点击展开 <DownOutlined /></Button>
              </Dropdown>
            </Row>
            <Row label="悬停触发">
              <Dropdown menu={{ items: dropdownMenuHover }} trigger={['hover']}>
                <Button>悬停展开 <DownOutlined /></Button>
              </Dropdown>
            </Row>
          </ShowCard>

          <ShowCard title="Tabs 标签页">
            <Row label="线条样式">
              <Tabs defaultActiveKey="tab1" type="line" items={tabItems} style={{ width: '100%' }} />
            </Row>
            <Row label="删除形态（可关闭）">
              <Tabs defaultActiveKey="tab1" type="line" items={tabItemsClosable} style={{ width: '100%' }} />
            </Row>
            <Row label="分割线样式（card variant）">
              <Tabs defaultActiveKey="t1" type="card" items={tabItemsCard} style={{ width: '100%' }} />
            </Row>
            <Row label="卡片样式">
              <Tabs defaultActiveKey="t1" type="card" items={tabItemsCard} style={{ width: '100%' }} />
            </Row>
            <Row label="可编辑卡片样式">
              <Tabs defaultActiveKey="t1" type="card" items={tabItemsCard.map((i) => ({ ...i, closable: true }))} style={{ width: '100%' }} />
            </Row>
            <Row label="可增删页签（动态增删）">
              <Tabs
                type="editable-card"
                activeKey={editableTabKey}
                onChange={setEditableTabKey}
                onEdit={onEditableTabEdit}
                items={editableTabs}
                style={{ width: '100%' }}
              />
            </Row>
            <Row label="尺寸变体 - line">
              <Space orientation="vertical" style={{ width: '100%' }}>
                <Tabs defaultActiveKey="tab1" type="line" size="large" items={tabItems} />
                <Tabs defaultActiveKey="tab1" type="line" items={tabItems} />
                <Tabs defaultActiveKey="tab1" type="line" size="small" items={tabItems} />
              </Space>
            </Row>
            <Row label="尺寸变体 - card">
              <Space orientation="vertical" style={{ width: '100%' }}>
                <Tabs defaultActiveKey="t1" type="card" size="large" items={tabItemsCard} />
                <Tabs defaultActiveKey="t1" type="card" items={tabItemsCard} />
                <Tabs defaultActiveKey="t1" type="card" size="small" items={tabItemsCard} />
              </Space>
            </Row>
            <Row label="禁用状态">
              <Tabs defaultActiveKey="tab1" type="line" items={[
                { key: 'tab1', label: '可用', children: <Paragraph>这是可用的标签页内容。</Paragraph> },
                { key: 'tab2', label: '禁用', disabled: true, children: <Paragraph>这是禁用的标签页内容。</Paragraph> },
                { key: 'tab3', label: '可用', children: <Paragraph>这是另一个可用的标签页内容。</Paragraph> }
              ]} style={{ width: '100%' }} />
            </Row>
            <Row label="溢出更多">
              <Tabs defaultActiveKey="ot1" items={tabItemsOverflow} style={{ width: 500 }} />
            </Row>
          </ShowCard>

          <ShowCard title="Steps 步骤条">
            <Row label="自定义节点步骤条">
              <Steps current={1} style={{ width: '100%' }} items={stepItems} />
              <Steps current={2} style={{ width: '100%' }} items={stepItems} size="small" />
              <Steps current={1} style={{ width: '100%' }} labelPlacement="vertical" items={stepItems} />
              <Steps current={2} style={{ width: '100%' }} labelPlacement="vertical" size="small" items={stepItems} />
            </Row>
            <Row label="点状步骤条">
              <Steps progressDot current={1} style={{ width: '100%' }} items={[
                { title: '已下单', status: 'finish' },
                { title: '配送中', status: 'process' },
                { title: '已签收', status: 'wait' }
              ]} />
            </Row>
            <Row label="垂直步骤条">
              <Steps current={1} direction="vertical" style={{ width: 300 }} items={[
                { title: '创建项目', description: '初始化项目配置', status: 'finish' },
                { title: '开发阶段', description: '前后端并行开发', status: 'process' },
                { title: '部署上线', description: '生产环境发布', status: 'wait' }
              ]} />
            </Row>
            {/* <Row label="面板步骤条（带描述）">
              <Steps current={1} style={{ width: '100%' }} items={[
                { title: '立项', description: '项目立项审批', status: 'finish' },
                { title: '开发', description: '功能开发阶段', status: 'process' },
                { title: '测试', description: '测试验证阶段', status: 'wait' },
                { title: '上线', description: '正式发布上线', status: 'wait' }
              ]} />
            </Row>
            <Row label="panel 类型步骤条（可交互）">
              <div style={{ width: '100%' }}>
                <Steps
                  type="panel"
                  current={panelStep}
                  onChange={setPanelStep}
                  items={panelStepItems}
                  style={{ width: '100%' }}
                />
                <div style={{ minHeight: 120, padding: '24px 16px', margin: '16px 0', background: 'var(--color-bg-1)', border: '1px solid var(--color-border-separator)', borderRadius: 8 }}>
                  {panelStepItems[panelStep].panel}
                </div>
                <Flex justify="space-between" align="center">
                  <Button disabled={panelStep === 0} onClick={panelPrev}>上一步</Button>
                  <Space>
                    <Text type="secondary">第 {panelStep + 1} / {panelStepItems.length} 步</Text>
                    {panelStep < panelStepItems.length - 1
                      ? <Button type="primary" icon={<RightOutlined />} iconPlacement="end" onClick={panelNext}>下一步</Button>
                      : <Button type="primary" icon={<CheckOutlined />} disabled>已完成</Button>}
                  </Space>
                </Flex>
              </div>
            </Row> */}
          </ShowCard>

          <ShowCard title="Pagination 分页">
            <Row label="显示总数">
              <Pagination defaultCurrent={3} total={85} showTotal={(t) => `共 ${t} 条`} showSizeChanger showQuickJumper />
            </Row>
          </ShowCard>

          <ShowCard title="Menu 导航菜单">
            <Row label="垂直菜单（默认）">
              <Menu mode="inline" defaultSelectedKeys={['userList']} defaultOpenKeys={['system', 'content', 'user']} items={menuItems} style={{ width: 256 }} />
            </Row>
            <Row label="水平菜单">
              <Menu mode="horizontal" defaultSelectedKeys={['dashboard']} items={menuHorizontalItems} style={{ width: '100%' }} />
            </Row>
            <Row label="折叠菜单">
              <Menu mode="inline" inlineCollapsed defaultSelectedKeys={['home']} items={menuCollapsedItems} style={{ width: 80 }} />
            </Row>
          </ShowCard>

          {/* ============================================================ 反馈组件 ============================================================ */}
          <Title level={3} style={{ borderBottom: '1px solid var(--color-border-separator)', paddingBottom: 12, marginTop: 40 }}>反馈组件 (Response)</Title>

          <ShowCard title="Progress 进度条">
            <Row label="默认进度条">
              <Progress percent={65} style={{ width: 400 }} />
              <Progress percent={100} style={{ width: 400 }} />
            </Row>
            <Row label="状态变体">
              <Flex direction="column" gap={12} style={{ width: 400 }}>
                <Progress percent={100} status="success" />
                <Progress percent={30} status="exception" />
                <Progress percent={50} status="active" />
              </Flex>
            </Row>
            <Row label="自定义颜色">
              <Progress percent={75} strokeColor="#722ED1" style={{ width: 400 }} />
            </Row>
            <Row label="尺寸变体">
              <Flex direction="column" gap={12} style={{ width: 600 }}>
                <Progress percent={60} size={['100%', 20]} />
                <Progress percent={60} size="small" />
                <Progress percent={60} />
              </Flex>
            </Row>
            <Row label="环形进度条">
              <Progress type="circle" percent={75} size="small" />
              <Progress type="circle" percent={70} status="exception" />
              <Progress type="circle" percent={100} size="medium" />
            </Row>
          </ShowCard>

          <ShowCard title="Modal 对话框">
            <Row label="基础对话框">
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalBasicOpen(true)}>打开对话框</Button>
            </Row>
            <Row label="自定义底部按钮">
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalFooterOpen(true)}>打开自定义底部</Button>
            </Row>
            <Modal title="基础对话框" open={modalBasicOpen} width={480} onCancel={() => setModalBasicOpen(false)} onOk={() => setModalBasicOpen(false)} okText="确定" cancelText="取消">
              <Paragraph type="secondary">这是一个基础对话框示例。点击遮罩层或右上角关闭按钮、按 ESC 键均可关闭对话框。</Paragraph>
            </Modal>
            <Modal title="自定义底部按钮" open={modalFooterOpen} width={520} onCancel={() => setModalFooterOpen(false)} footer={[
              <Button key="cancel" onClick={() => setModalFooterOpen(false)}>取消</Button>,
              <Button key="ok" type="primary" icon={<CheckOutlined />} onClick={() => { message.success('已确认'); setModalFooterOpen(false) }}>确认</Button>
            ]}>
              <Paragraph type="secondary">该对话框演示了自定义底部按钮区域，底部包含"取消"与"确认"两个按钮，分别用于关闭对话框与提交操作。对话框内容可以放置任意子组件。</Paragraph>
            </Modal>
          </ShowCard>

          <ShowCard title="Popover 气泡卡片">
            <Row label="带标题">
              <Popover title="提示标题" content="气泡卡片正文内容">
                <Button>悬停</Button>
              </Popover>
            </Row>
            <Row label="仅正文">
              <Popover content="无标题的气泡卡片">
                <Button>悬停</Button>
              </Popover>
            </Row>
            <Row label="位置变体">
              <Popover placement="top" content="上"><Button>上</Button></Popover>
              <Popover placement="bottom" content="下"><Button>下</Button></Popover>
              <Popover placement="left" content="左"><Button>左</Button></Popover>
              <Popover placement="right" content="右"><Button>右</Button></Popover>
            </Row>
          </ShowCard>

          <ShowCard title="Tooltip 文字提示">
            <Row label="基础样式">
              <Tooltip title="文字提示"><Button>悬停</Button></Tooltip>
            </Row>
            <Row label="位置变体">
              <Tooltip placement="top" title="上"><Button>上</Button></Tooltip>
              <Tooltip placement="bottom" title="下"><Button>下</Button></Tooltip>
              <Tooltip placement="left" title="左"><Button>左</Button></Tooltip>
              <Tooltip placement="right" title="右"><Button>右</Button></Tooltip>
            </Row>
          </ShowCard>
          
          <ShowCard title="Drawer 抽屉">
            <Row label="右侧抽屉">
              <Button type="primary" icon={<RightOutlined />} onClick={() => setDrawerOpen(true)}>打开抽屉</Button>
            </Row>
            <Drawer title="基础抽屉" open={drawerOpen} onClose={() => setDrawerOpen(false)} width={480}>
              <Paragraph>这是一个右侧抽屉示例。抽屉从屏幕右侧滑入，适合需要更多空间的表单或详情展示。点击遮罩层或右上角关闭按钮均可关闭。</Paragraph>
            </Drawer>
          </ShowCard>

          {/* 页脚 */}
          <Divider style={{ marginTop: 48 }} />
          <Flex justify="space-between" align="center">
            <Text type="secondary">Ant Design v5 组件展示 · 参考 componentShowcase.json</Text>
            <Space>
              <Tag icon={<CheckCircleOutlined />} color="processing">演示</Tag>
              <Tag icon={<BellOutlined />} color="success">在线</Tag>
            </Space>
          </Flex>
        </div>
      </AntApp>
    </ConfigProvider>
  )
}

export default App
