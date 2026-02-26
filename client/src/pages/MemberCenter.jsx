import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Package, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  X,
  ShoppingBag,
  Info
} from 'lucide-react';


const mockAxiosClient = {
  // 模擬取得訂單列表
  getOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      data: {
        orders: [
          {
            id: "c8c3b4f0-7c12-4e9b-a0d1-88c92bdf7d12",
            orderNo: "ZON-20260226-0001",
            merchantOrderNo: "NEWEBPAY1234567890",
            userId: 3,
            amount: 1268,
            status: "PAID",
            createdAt: "2026-02-26T10:00:00.000Z",
            paidAt: "2026-02-26T10:01:00.000Z"
          },
          {
            id: "d9e4c5f1-8d23-5f0c-b1e2-99d03cef8e23",
            orderNo: "ZON-20260226-0002",
            merchantOrderNo: "NEWEBPAY0987654321",
            userId: 3,
            amount: 2500,
            status: "PENDING",
            createdAt: "2026-02-26T11:30:00.000Z",
            paidAt: null
          }
        ]
      }
    };
  },
  // 模擬取得訂單詳細商品資訊
  getOrderItems: async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: {
        orderItems: [
          {
            id: "oi-10001",
            orderId: orderId,
            productId: 101,
            name: "麻辣燙湯底方塊2包-獨家配方",
            price: 899,
            quantity: 1,
            subtotal: 899
          },
          {
            id: "oi-10002",
            orderId: orderId,
            productId: 102,
            name: "寵愛營養配方貓飼料2包-獨家配方",
            price: 369,
            quantity: 1,
            subtotal: 369
          }
        ]
      }
    };
  }
};


export default function MemberCenter({ user }) {
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //登入後取得user資訊
    // const isUser = location.state?.user || user;
    // const userName = location.state?.user.username || user.username;
    // const userEmail = location.state?.email || user.email;

    // 詳情視窗狀態
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [detailLoading, setDetailLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //     if (userName) {
    //         console.log(`從登入頁收到Username: ${userName}`);
    //     } else {
    //         console.log('未收到註冊帳號的Username');
    //     }

    //     if (userEmail) {
    //         console.log(`從註冊頁收到email: ${userName}`);
    //     } else {
    //         console.log('未收到註冊帳號的Email');
    //     }
    // }, [userName, userEmail]);

    const userData = {
        username: "Wuguji",
        email: "wuguji@example.com"
    };

    const getOrderData = async () => {
        try {
            setLoading(true);
            const res = await mockAxiosClient.getOrders();
            console.log('成功取得訂單資訊', res.data.orders || []);
            setOrders(res.data.orders);
        } catch (error) {
            console.log(error.response?.data?.message || '無法取得訂單資訊');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrderData();
    }, []);


    // 處理查看詳情點擊
    const handleViewDetails = async (order) => {
        setSelectedOrder(order);
        setShowModal(true);
        setDetailLoading(true);
        try {
        const res = await mockAxiosClient.getOrderItems(order.id);
        setOrderItems(res.data.orderItems || []);
        } catch (err) {
        console.error("無法取得商品資訊");
        } finally {
        setDetailLoading(false);
        }
    };

    // 格式化日期
    const formatDate = (dateString) => {
        if (!dateString) return '---';
        return new Date(dateString).toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
        });
    };

    // 狀態標籤樣式
    const getStatusBadge = (status) => {
        switch (status) {
        case 'PAID':
            return (
            <span className="badge rounded-pill bg-success-subtle text-success border border-success px-3">
                <CheckCircle size={12} className="me-1" /> 已付款
            </span>
            );
        case 'PENDING':
            return (
            <span className="badge rounded-pill bg-danger-subtle text-danger border border-danger px-3">
                <Clock size={12} className="me-1" /> 待付款
            </span>
            );
        default:
            return (
            <span className="badge rounded-pill bg-secondary px-3">
                {status}
            </span>
            );
        }
    };

    return (
        <>
            <div className='h-100 bg-light d-flex justify-content-center align-items-center py-5 py-md-8' style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
                <div className="container">
                    <div className="card pt-0 shadow h-auto">                    
                        <div className="card-header bg-primary d-flex align-items-center fw-bold text-white py-3">
                            <span><User size={24} className="text-white me-2" /></span>
                            <span className='h4 fw-bold'>會員中心</span>
                        </div>

                        <div className="card-body">
                            <h3>歡迎回來, {userData?.username}</h3>
                            <p>Email: {userData?.email}</p>
                            <div className="d-flex align-items-center text-secondary">
                                <div className="bg-primary rounded-circle flex-shrink-0 me-3" style={{ width: '8px', height: '8px' }}></div>
                                <p className="mb-0">這是您的專屬管理頁面，您可以查看所有歷史交易紀錄。</p>
                                </div>
                        </div>
                    </div>

                    {/* 訂單資訊區塊 */}
                    <div className="card h-100 py-0 shadow border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-primary border-bottom py-4 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center text-white">
                            <Package size={20} className="me-2 text-white" />
                            <h5 className="mb-0 h4 fw-semibold">最近訂單資訊</h5>
                            </div>
                            <button 
                            onClick={getOrderData}
                            className="btn btn-link btn-sm text-decoration-none fw-bold"
                            >
                            重新整理
                            </button>
                        </div>

                        <div className="card-body p-0">
                            {loading ? (
                            <div className="py-5 text-center">
                                <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">正在獲取訂單資訊...</p>
                            </div>
                            ) : error ? (
                            <div className="py-5 text-center text-danger">
                                {error}
                            </div>
                            ) : orders.length === 0 ? (
                            <div className="py-5 text-center text-muted fst-italic">
                                目前尚無訂單紀錄。
                            </div>
                            ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                <thead className="bg-gray-50">
                                    <tr>
                                    <th className="ps-4 py-3 text-secondary small fw-bold">訂單編號 / 日期</th>
                                    <th className="py-3 text-secondary small fw-bold">付款方式編號</th>
                                    <th className="py-3 text-secondary small fw-bold text-center">金額</th>
                                    <th className="py-3 text-secondary small fw-bold text-center">狀態</th>
                                    <th className="pe-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="ps-4 py-3">
                                        <div className="fw-bold text-dark">{order.orderNo}</div>
                                        <div className="small text-muted d-flex align-items-center mt-1">
                                            <Calendar size={12} className="me-1" />
                                            {formatDate(order.createdAt)}
                                        </div>
                                        </td>
                                        <td className="py-3">
                                        <code className="bg-gray-50 text-primary-900 px-2 py-1 rounded small border-0">
                                            {order.merchantOrderNo}
                                        </code>
                                        </td>
                                        <td className="py-3 text-end">
                                        <div className="fw-bold text-primary d-flex align-items-center justify-content-center">
                                            <CreditCard size={14} className="me-1" />
                                            ${order.amount.toLocaleString()}
                                        </div>
                                        </td>
                                        <td className="py-3 text-center">
                                        {getStatusBadge(order.status)}
                                        </td>
                                        <td className="pe-4 py-3 text-end">
                                                <button
                                                    onClick={() => handleViewDetails(order)}
                                                    className="btn btn-sm btn-primary border-0 text-white"
                                                >
                                            <ChevronRight size={18} />
                                        </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            )}
                        </div>
                    
                        <div className="card-footer bg-gray-50 py-3 text-center text-muted small border-0">
                            僅顯示最近 10 筆訂單，若需查看完整報表請聯絡客服。
                        </div>
                    </div>

                    {/* 訂單詳情彈窗 (Bootstrap Modal) */}
                    {showModal && selectedOrder && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content border-0 shadow-lg rounded-4">
                                    <div className="modal-header bg-primary-100 border-0 py-3 px-4">
                                    <h5 className="modal-title text-primary-800 fw-bold d-flex align-items-center">
                                        <Info size={20} className="me-2 text-primary" />
                                        訂單詳細資訊
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    
                                    <div className="modal-body p-4">
                                    {/* 訂單摘要 */}
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-6">
                                            <div className="p-3 bg-gray-50 rounded-3 h-100">
                                                <small className="text-muted d-block mb-1">訂單編號</small>
                                                <span className="fw-bold text-dark">{selectedOrder.orderNo}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-3 bg-gray-50 rounded-3 h-100">
                                                <small className="text-muted d-block mb-1">交易序號 (藍新)</small>
                                                <code className="text-dark">{selectedOrder.merchantOrderNo}</code>
                                            </div>
                                        </div>
                                        <div className="col-md-4 pt-md-2">
                                            <small className="text-muted d-block px-2">建立時間</small>
                                            <div className="small px-2">{formatDate(selectedOrder.createdAt)}</div>
                                        </div>
                                        <div className="col-md-4 pt-md-2">
                                            <small className="text-muted d-block px-2">付款時間</small>
                                            <div className="small px-2">{formatDate(selectedOrder.paidAt)}</div>
                                        </div>
                                        <div className="col-md-4 pt-md-2">
                                            <small className="text-muted d-block px-2 mb-1">訂單狀態</small>
                                            <div className='px-2'>{getStatusBadge(selectedOrder.status)}</div>
                                        </div>
                                    </div>

                                    {/* 商品清單 */}
                                    <div className="border rounded-3 overflow-hidden">
                                        <div className="bg-gray-50 px-3 py-4 border-bottom d-flex align-items-center">
                                            <ShoppingBag size={16} className="me-2 text-primary" />
                                            <span className="fw-bold small">購買商品清單</span>
                                        </div>
                                        
                                        {detailLoading ? (
                                            <div className="p-5 text-center">
                                                <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                            </div>
                                            ) : (
                                            <div className="table-responsive">
                                                <table className="table table-sm mb-0 align-middle">
                                                <thead className="bg-white">
                                                    <tr className="small text-secondary">
                                                    <th className="ps-3 py-2">商品名稱</th>
                                                    <th className="py-2 text-center">單價</th>
                                                    <th className="py-2 text-center">數量</th>
                                                    <th className="pe-3 py-2 text-end">小計</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="ps-3 py-3">
                                                            <div className="small fw-bold">{item.name}</div>
                                                            <div className="text-muted" style={{ fontSize: '10px' }}>ID: {item.productId}</div>
                                                        </td>
                                                        <td className="py-3 text-center small">${item.price.toLocaleString()}</td>
                                                        <td className="py-3 text-center small">{item.quantity}</td>
                                                        <td className="pe-3 py-3 text-end fw-bold text-dark">${item.subtotal.toLocaleString()}</td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot className="table-secondary">
                                                    <tr>
                                                        <td colSpan="3" className="ps-3 fw-bold text-end">總計金額</td>
                                                        <td className="pe-3 text-end fw-bold text-primary h5 py-2 mb-0">${selectedOrder.amount.toLocaleString()}</td>
                                                    </tr>
                                                </tfoot>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                    </div>

                                    <div className="modal-footer border-0 p-4 pt-0">
                                    <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setShowModal(false)}>關閉</button>
                                    {selectedOrder.status === 'PAID' && (
                                        <button type="button" className="btn btn-primary px-4 rounded-pill">下載發票</button>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
        </>
    )
}