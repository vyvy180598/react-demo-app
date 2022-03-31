import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useLocation, useNavigate } from 'react-router-dom'

import { Table, Space, Button, Input } from 'antd'
import { User } from '../../redux/user/types'
import { getUsers } from '../../redux/user/actions'
import { ModalAddUser } from '../../components/User/ModalAddUser'
import { ModalEditUser } from '../../components/User/ModalEditUser'
import { ModalDeleteUser } from '../../components/User/ModalDeleteUser'
import { useTranslation } from 'react-i18next'

const { Search } = Input

export const UserPage = () => {
  const users = useAppSelector((state) => state.users.value)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  // ------- router
  const navigate = useNavigate()
  const location = useLocation()
  // -------
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [search, setSearch] = useState('')
  useEffect(() => {
    const query = `?page=${page}&limit=${limit}&s=${search}`
    navigate({ pathname: location.pathname, search: query }, { replace: true })
    dispatch(getUsers(page, limit, search))
  }, [dispatch, page, limit, search])

  const [currentUserId, setCurrentUserId] = useState('')
  // ------ Modal
  const [isModalAddVisible, setIsModalAddVisible] = useState(false)
  const [isModalEditVisible, setIsModalEditVisible] = useState(false)
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)

  const handleClickAdd = () => {
    setIsModalAddVisible(true)
  }
  const handleClickEdit = (id: string) => {
    setCurrentUserId(id)
    setIsModalEditVisible(true)
  }
  const hanldeClickDelete = (id: string) => {
    setCurrentUserId(id)
    setIsModalDeleteVisible(true)
  }
  const handleCloseModal = () => {
    setIsModalDeleteVisible(false)
    resetCurrentUserId()
  }
  const resetCurrentUserId = () => {
    setCurrentUserId('')
  }
  // -------------
  // -------Pagination
  const handleChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setLimit(pageSize)
  }
  // -------------
  // -------Search
  const handleSearch = (value: string) => {
    setSearch(value)
  }
  // -------------
  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'nameCol',
      render: (text: string, record: User) => (
        <a onClick={() => navigate(`/users/${record.id}`)}>{text}</a>
      )
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'emailCol'
    },
    {
      title: t('action'),
      key: 'actionCol',
      render: (text: string, record: User) => (
        <Space size="middle">
          <a onClick={() => handleClickEdit(record.id)}>{t('edit')}</a>

          <a onClick={() => hanldeClickDelete(record.id)}>{t('delete')}</a>
        </Space>
      )
    }
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleClickAdd}>
          {t('add_user')}
        </Button>
        <Search
          placeholder={t('input_search')}
          allowClear
          style={{ width: 300 }}
          onSearch={(val, event) => handleSearch(val)}
        />
      </Space>
      <Table
        rowKey={(user) => user.id}
        columns={columns}
        pagination={{
          defaultPageSize: limit,
          pageSizeOptions: ['5', '10'],
          showSizeChanger: true,
          position: ['bottomRight'],
          total: 10,
          onChange: handleChangePagination
        }}
        dataSource={users}
      />
      {isModalAddVisible && (
        <ModalAddUser
          isVisible={isModalAddVisible}
          onCloseModal={() => setIsModalAddVisible(false)}
        />
      )}
      {currentUserId && (
        <ModalEditUser
          id={currentUserId}
          isVisible={isModalEditVisible}
          onCloseModal={() => setIsModalEditVisible(false)}
        />
      )}
      {currentUserId && (
        <ModalDeleteUser
          id={currentUserId}
          isVisible={isModalDeleteVisible}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}
