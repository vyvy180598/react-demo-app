import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Table, Space, Button, Input } from 'antd'
import { User } from '../../redux/user/types'
import { getUsers } from '../../redux/user/actions'
import { ModalAddUser } from '../../components/User/ModalAddUser'
import { ModalEditUser } from '../../components/User/ModalEditUser'
import { ModalDeleteUser } from '../../components/User/ModalDeleteUser'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'

const { Search } = Input

export const UserPage = () => {
  const users = useAppSelector((state) => state.users.value)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  // ------- router
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  let paramsPage: any = searchParams.get('page')
  paramsPage = paramsPage ? parseInt(paramsPage) : 1
  let paramsLimit: any = searchParams.get('limit')
  paramsLimit = paramsLimit ? parseInt(paramsLimit) : 5
  let paramsSearch = searchParams.get('s')
  paramsSearch = paramsSearch || ''

  // -------
  const [page, setPage] = useState<number>(paramsPage)
  const [limit, setLimit] = useState<number>(paramsLimit)
  const [search, setSearch] = useState(paramsSearch)

  useEffect(() => {
    replaceRoute(page, limit, search)
    dispatch(getUsers(page, limit, search))
  }, [])

  const replaceRoute = (page: number, limit: number, search: string) => {
    const query = `?page=${page}&limit=${limit}&s=${search}`
    navigate({ pathname: location.pathname, search: query }, { replace: true })
  }

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
  const handleClickDelete = (id: string) => {
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
  const handleChangePagination = (currentPage: number, pageSize: number) => {
    setPage(currentPage)
    setLimit(pageSize)

    replaceRoute(currentPage, pageSize, search)
    dispatch(getUsers(currentPage, pageSize, search))
  }
  // -------------
  // -------Search
  const debounceSearch = useCallback(
    debounce((value) => dispatch(getUsers(page, limit, value)), 2000),
    []
  )
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    replaceRoute(page, limit, e.target.value)
    debounceSearch(e.target.value)
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

          <a onClick={() => handleClickDelete(record.id)}>{t('delete')}</a>
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
          onChange={handleSearch}
        />
      </Space>
      <Table
        rowKey={(user) => user.id}
        columns={columns}
        pagination={{
          defaultCurrent: page,
          defaultPageSize: limit,
          pageSizeOptions: ['5', '10'],
          showSizeChanger: true,
          position: ['bottomRight'],
          total: 15,
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
