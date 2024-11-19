import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors } from '../../actions/productActions.js'
import { deleteUser, getAllUsers } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userContants'
import MetaData from '../layout/MetaData'
import DashboardLayout from './DashboardLayout/DashboardLayout'
import './ProductList.css'

const UserList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.authToken)

    const { error, users } = useSelector((state) => state.allUsers)
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id, token))
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError)

            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success(message)

            navigate('/admin/users')
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers())
    }, [dispatch, error, deleteError, navigate, isDeleted, message, token])

    const columns = [
        {
            field: 'id',
            headerName: 'User ID',
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: 'name',
            headerName: 'Name',
            // type: "number",
            minWidth: 100,
            flex: 0.45,
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 100,
            flex: 0.25,
            cellClassName: (params) => {
                return params.row.role === 'admin' ? 'greenColor' : 'redColor'
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            sortable: false,
            flex: 0.25,
            renderCell: (params) => (
                <>
                    <Link to={`/admin/user/${params?.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={(e) => deleteUserHandler(params.id)}>
                        <DeleteIcon />
                    </Button>
                </>
            ),
        },
    ]

    const rows = []

    users &&
        users.forEach((user) => {
            rows.push({
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            })
        })

    return (
        <>
            <MetaData title={'All Users - Admin'} />
            <DashboardLayout title='Manage Users'>
                <div className="dashboard">

                    <div className="productListContainer">

                        <div >
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={'5'}
                                pagination
                                disableRowSelectionOnClick
                                autoHeight

                            />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default UserList
