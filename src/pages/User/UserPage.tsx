import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link, Outlet } from 'react-router-dom'

import { Table, Space, Button, Modal, Form, Input } from 'antd'
import { User } from '../../redux/user/types'
import { v4 as uuid } from 'uuid'
import { getUsers, addUser, deleteUser } from '../../redux/user/actions'
import { ModalAddUser } from '../../components/User/ModalAddUser'
import { ModalEditUser } from '../../components/User/ModalEditUser'

export const UserPage = () => {
  const users = useAppSelector((state) => state.users.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const [currentUserId, setCurrentUserId] = useState('')

  const handleEdit = (id: string) => {
    setCurrentUserId(id)
  }

  // delete modal
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)

  const hanldeClickDelete = (id: string) => {
    setCurrentUserId(id)
    showModalConfirmDelete()
  }
  const showModalConfirmDelete = () => {
    setIsModalDeleteVisible(true)
  }

  const handleConfirmDelete = () => {
    dispatch(deleteUser(currentUserId))
    handleCloseDeleteModal()
  }

  const handleCloseDeleteModal = () => {
    setIsModalDeleteVisible(false)
    resetCurrentUserId()
  }

  const resetCurrentUserId = () => {
    setCurrentUserId('')
  }
  // -------------
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'nameCol',
      render: (text: string, record: User) => (
        <Link to={`/users/${record.id}`}>{text}</Link>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'emailCol'
    },
    {
      title: 'Action',
      key: 'actionCol',
      render: (text: string, record: User) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.id)}>Edit</a>

          <a onClick={() => hanldeClickDelete(record.id)}>Delete</a>
        </Space>
      )
    }
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <ModalAddUser />
      </Space>
      <Table
        rowKey={(user) => user.id}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          pageSizeOptions: ['10', '20', '30'],
          showSizeChanger: true,
          position: ['bottomRight']
        }}
        dataSource={users}
      />
      {currentUserId && <ModalEditUser id={currentUserId} />}
      <Modal
        title="Delete User"
        visible={isModalDeleteVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
      <Outlet />
    </>
  )
}
