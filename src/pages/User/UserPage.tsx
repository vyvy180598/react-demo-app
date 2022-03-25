import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link, Outlet } from 'react-router-dom'

import { Table, Space } from 'antd'
import { User } from '../../redux/user/types'
import { getUsers } from '../../redux/user/actions'
import { ModalAddUser } from '../../components/User/ModalAddUser'
import { ModalEditUser } from '../../components/User/ModalEditUser'
import { ModalDeleteUser } from '../../components/User/ModalDeleteUser'

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
  const [isModalEditVisible, setIsModalEditVisible] = useState(false)

  const handleClickEdit = (id: string) => {
    setCurrentUserId(id)
    setIsModalEditVisible(true)
  }
  const hanldeClickDelete = (id: string) => {
    setCurrentUserId(id)
    setIsModalDeleteVisible(true)
  }
  const handleCloseModal = useCallback(() => {
    setIsModalDeleteVisible(false)
    resetCurrentUserId()
  }, [isModalDeleteVisible])

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
          <a onClick={() => handleClickEdit(record.id)}>Edit</a>

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
          pageSizeOptions: ['5', '10', '20'],
          showSizeChanger: true,
          position: ['bottomRight']
        }}
        dataSource={users}
      />
      {currentUserId && (
        <ModalEditUser id={currentUserId} isVisible={isModalEditVisible} />
      )}
      {currentUserId && (
        <ModalDeleteUser
          id={currentUserId}
          isVisible={isModalDeleteVisible}
          onClose={handleCloseModal}
        />
      )}
      <Outlet />
    </>
  )
}
