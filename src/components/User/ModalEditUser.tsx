import { Button, Modal, Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { v4 as uuid } from 'uuid'
import { getUser, updateUser } from '../../redux/user/actions'

type ModalEditorUserProps = {
  id: string
  isVisible: boolean
}
export const ModalEditUser = ({ id, isVisible }: ModalEditorUserProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.users.item)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleCloseModal = () => {
    setIsModalVisible(false)
    resetUserForm()
  }
  const resetUserForm = () => {
    setName('')
    setEmail('')
  }
  const handleSubmit = () => {
    // dispatch(
    //   updateUser({ id: uuid(), name: name, email: email, ...user?.songs })
    // )
    console.log({ id: uuid(), name: name, email: email, ...user?.songs })
    handleCloseModal()
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      isVisible && setIsModalVisible(true)
    }
  }, [user])

  useEffect(() => {
    let unmounted = false
    if (!unmounted && id) {
      dispatch(getUser(id))
    }
    setIsModalVisible(isVisible)
    return () => {
      unmounted = true
    }
  }, [isVisible, dispatch])

  return (
    <>
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            form="my-add-user-form"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>
        ]}
      >
        <Form
          id="my-add-user-form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your valid email!'
              }
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
