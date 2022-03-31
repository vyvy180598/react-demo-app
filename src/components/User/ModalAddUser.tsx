import { Button, Modal, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'

import { v4 as uuid } from 'uuid'
import { addUser } from '../../redux/user/actions'

type ModalAddUserProps = {
  isVisible: boolean
  onCloseModal: () => void
}
export const ModalAddUser = ({
  isVisible,
  onCloseModal
}: ModalAddUserProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [songs, setSongs] = useState('')

  const dispatch = useAppDispatch()

  const resetUserForm = () => {
    setName('')
    setEmail('')
    setSongs('')
  }
  const handleSubmit = () => {
    const newUser = songs
      ? { id: uuid(), name: name, email: email, songs: [songs] }
      : { id: uuid(), name: name, email: email }
    dispatch(addUser(newUser))
    onCloseModal()
  }

  useEffect(() => {
    isVisible && resetUserForm()
  }, [isVisible])

  return (
    <>
      <Modal
        title="Add User"
        visible={isVisible}
        onCancel={onCloseModal}
        footer={[
          <Button key="back" onClick={onCloseModal}>
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
          <Form.Item label="Songs" name="songs">
            <Input value={songs} onChange={(e) => setSongs(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
