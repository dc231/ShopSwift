import moment from 'moment'
import './ItemSummary.css'

const ItemSummary = ({ items = [] }) => {
  return (

    <div className="orders_container-table">
      <div className="table-row">
        <div id='order_id' className='heading'>Item Summary</div>
        <div id='order_date' className='heading'>QTY</div>
        <div id='order_amount' className='heading'>Price</div>
        <div id='order_status' className='heading'>Sub Total</div>
      </div>

      <div className="orders">
        {items.length > 0 ?
          (items?.map(order => <div key={order?._id} className="table-row">
            <div id='order_id' className='order'>{order?._id}</div>
            <div id='order_date' className='order'>{moment(order.createAt).format('L')}</div>
            <div id='order_amount' className='order'>{order?.totalPrice}</div>
            <div id='order_status' className='order'>{order?.orderStatus}</div>

          </div>)
          )
          :
          (
            <p style={{ height: "25%", display: 'flex', alignItems: "center", justifyContent: "center" }}>No Orders Found!!</p>
          )
        }


      </div>

    </div>

  )
}

export default ItemSummary