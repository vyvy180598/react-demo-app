import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { deleteUser } from '../../redux/user/actions'

type ModalDeleteUserProps = {
  id: string
  isVisible: boolean
  onCloseModal: () => void
}
export const ModalDeleteUser = ({
  id,
  isVisible,
  onCloseModal
}: ModalDeleteUserProps) => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteUser(id))
    onCloseModal()
  }

  return (
    <>
      <Modal
        title="Delete User"
        visible={isVisible}
        onOk={handleDelete}
        onCancel={onCloseModal}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  )
}
