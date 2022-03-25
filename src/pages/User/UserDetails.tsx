import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { Card, Avatar, Divider } from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUser } from '../../redux/user/actions'
import { usersSlice } from '../../redux/user/reducer'

const { Meta } = Card

export const UserDetails = () => {
  const params = useParams()
  const user = useAppSelector((state) => state.users.item)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let unmounted = false
    if (!unmounted && params.userId !== undefined) {
      dispatch(getUser(params.userId))
    }
    return () => {
      unmounted = true
    }
  }, [params.userId, dispatch])

  return (
    <>
      {user && (
        <Card style={{ width: '100%' }} title="User Info">
          <Meta
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" key={user.id} />
            }
            title={user.name}
            description={user.email}
          />
          <Divider />
          <h1>Songs: </h1>
          {user.songs?.map((song, idx) => (
            <p key={idx}>{song}</p>
          ))}
        </Card>
      )}
    </>
  )
}
