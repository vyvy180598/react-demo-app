import { Button, Checkbox, Form, Input } from 'antd'
import { useState } from 'react'
import loginImage from '../../assets/img/login-img.jpg'
import { useStoreContext } from '../../auth/AuthContext'

export const LoginPage = () => {
  const [state, dispatch] = useStoreContext()
  const [loading, setLoading] = useState(false)
  const onFinish = (values: any) => {
    console.log('Success:', values)
    setLoading(true)
    setTimeout(() => {
      dispatch({ type: 'LOGIN' })
    }, 1500)
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={loginImage} alt="Login Image" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h1 className="login-title">Welcome</h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
