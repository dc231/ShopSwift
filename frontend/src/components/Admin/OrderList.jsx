import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './ProductList.css';

import { clearErrors, deleteOrder, getAllOrders } from '../../actions/newOrderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';
import DashboardLayout from './DashboardLayout/DashboardLayout';


const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { error, orders } = useSelector(state => state.allOrders)
    const { error: deleteError, isDeleted } = useSelector(state => state.order)
    const { token } = useSelector(state => state.authToken)
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id, token))
    }
    useEffect(() => {
        if (error) {

            dispatch(clearErrors())
        }

        if (deleteError) {

            dispatch(clearErrors())
        }

        if (isDeleted) {

            navigate('/admin/orders')
            dispatch({ type: DELETE_ORDER_RESET })
        }
        dispatch(getAllOrders(token))

    }, [dispatch, error, deleteError, navigate, isDeleted, token])

    const columns = [
        {
            field: "id", headerName: "Order ID", minWidth: 100, flex: 0.5
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: .4,
            cellClassName: (params) => {
                return (params.row.status === "Delivered" ? "greenColor" : "redColor")
            }


        },
        {
            field: 'itemQty',
            headerName: "Items Qty",
            minWidth: 100,
            flex: .25
            ,

        },
        {
            field: "amount",
            headerName: "Amount",
            minWidth: 100,
            flex: 0.25
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.2,
            sortable: false,

            renderCell: (params) =>

                <>
                    <Link to={`/dashboard/orders/${params.row.id}`}><EditIcon /></Link>
                    <Button onClick={e => deleteOrderHandler(params.row.id)}>
                        <DeleteIcon />
                    </Button>

                </>

        }
    ]

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus
            })
        })


    return (
        <>

            <MetaData title={"All Orders - Admin"} />
            <DashboardLayout title='All Orders'>
                <div className="dashboard">

                    <div className="productListContainer">
                        <div >
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={6}
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

export default OrderList