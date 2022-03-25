import { all, call, put, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  IGetUsersAction,
  IGetUserAction,
  ICreateUsersAction,
  IUpdateUserAction,
  IDeleteUserAction
} from '../user/actions'
import {
  setUsers,
  setUser,
  addUser,
  editUser,
  removeUser
} from '../user/reducer'
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser
} from '../../services/user.service'
import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../user/constants'

function* handleGetUsers(action: IGetUsersAction) {
  try {
    const { data } = yield call(fetchUsers)
    yield put(setUsers(data))
  } catch (error) {
    console.error(error)
  }
}

function* handleCreateUsers(action: ICreateUsersAction) {
  try {
    const { data } = yield call(createUser, action.payload.user)
    yield put(addUser(data))
  } catch (error) {
    console.error(error)
  }
}

function* handleGetUser(action: IGetUserAction) {
  try {
    const { data } = yield call(fetchUser, action.payload.id)
    yield put(setUser(data))
  } catch (error) {
    console.error(error)
  }
}

function* handleUpdateUser(action: IUpdateUserAction) {
  try {
    const { data } = yield call(updateUser, action.payload.user)
    yield put(editUser(data))
  } catch (error) {
    console.error(error)
  }
}

function* handleDeleteUser(action: IDeleteUserAction) {
  try {
    yield call(deleteUser, action.payload.id)
    yield put(removeUser(action.payload.id))
  } catch (error) {
    console.error(error)
  }
}

function* watchGetUsersRequest() {
  yield takeLatest(GET_USERS, handleGetUsers)
  yield takeLatest(GET_USER, handleGetUser)
  yield takeEvery(CREATE_USER, handleCreateUsers)
  yield takeLatest(UPDATE_USER, handleUpdateUser)
  yield takeLatest(DELETE_USER, handleDeleteUser)
}

const userSagas = all([fork(watchGetUsersRequest)])

export default userSagas
