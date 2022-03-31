import { Button, Modal, Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { getUser, updateUser } from '../../redux/user/actions'

type ModalEditorUserProps = {
  id: string
  isVisible: boolean
  onCloseModal: () => void
}
export const ModalEditUser = ({
  id,
  isVisible,
  onCloseModal
}: ModalEditorUserProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.users.item)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleCloseModal = () => {
    onCloseModal && onCloseModal()
    resetUserForm()
  }
  const resetUserForm = () => {
    setName('')
    setEmail('')
  }
  const handleSubmit = () => {
    user?.songs
      ? dispatch(
          updateUser({ id: id, name: name, email: email, songs: user?.songs })
        )
      : dispatch(updateUser({ id: id, name: name, email: email }))
    handleCloseModal()
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  useEffect(() => {
    if (isVisible) {
      setName('')
      setEmail('')
      dispatch(getUser(id))
    }
  }, [isVisible, dispatch])

  return (
    <>
      <Modal
        title="Edit User"
        visible={isVisible}
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
        {name && email && (
          <Form
            id="my-add-user-form"
            name="Edit User"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={handleSubmit}
            initialValues={{ name: name, email: email }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name'
                }
              ]}
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
        )}
      </Modal>
    </>
  )
}
