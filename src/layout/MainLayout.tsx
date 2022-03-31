import { useEffect, useState } from 'react'

import { Link, Outlet } from 'react-router-dom'
import { ConfigProvider, Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useStoreContext } from '../auth/AuthContext'

import { useTranslation } from 'react-i18next'
import enUS from 'antd/lib/locale/en_US'
import zhCN from 'antd/lib/locale/zh_CN'
import { Locale } from 'antd/lib/locale-provider'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

type Languages = {
  en: {
    nativeName: string
  }
  zh: {
    nativeName: string
  }
}
const languages: Languages = {
  en: { nativeName: 'English' },
  zh: { nativeName: 'Chinese' }
}

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [state, dispatch] = useStoreContext()

  const { t, i18n } = useTranslation()
  const [locale, setLocale] = useState<Locale>()

  useEffect(() => {
    i18n.language === 'en' ? setLocale(enUS) : setLocale(zhCN)
  }, [i18n.language])

  return (
    <ConfigProvider locale={locale}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/">{t('dashboard')}</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/users">{t('user')}</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<SettingOutlined />}
              title={t('settings')}
            >
              <SubMenu key="sub2" title="Languages">
                {Object.keys(languages).map((lng) => (
                  <Menu.Item
                    key={lng}
                    style={{
                      fontWeight:
                        i18n.resolvedLanguage === lng ? 'bold' : 'normal'
                    }}
                    onClick={() => i18n.changeLanguage(lng)}
                  >
                    {languages[lng as keyof Languages].nativeName}
                  </Menu.Item>
                ))}
              </SubMenu>
              <Menu.Item key="5" onClick={() => dispatch({ type: 'LOGOUT' })}>
                {t('logout')}
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
