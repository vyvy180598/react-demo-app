import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { deleteUser } from '../../redux/user/actions'

type ModalDeleteUserProps = {
  id: string
  isVisible: boolean
  onClose: any
}
export const ModalDeleteUser = ({
  id,
  isVisible,
  onClose
}: ModalDeleteUserProps) => {
  const dispatch = useAppDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleDelete = () => {
    dispatch(deleteUser(id))
    setIsModalVisible(false)
  }

  useEffect(() => {
    setIsModalVisible(isVisible)
    isVisible && setIsModalVisible(true)
  }, [isVisible])
  return (
    <>
      <Modal
        title="Delete User"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={onClose}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  )
}
