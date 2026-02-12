# 購物車 API 整合指南

## 已完成的整合

### 1. **後端資料庫結構** (`db.json`)
- 新增 `carts` 表，存儲購物車數據
- 每個購物車包含：
  - `items`: 有效商品列表
  - `invalidItems`: 失效商品列表
  - `userId`: 用戶 ID

### 2. **API 服務層** (`src/api/cartApi.js`)
新建獨立的購物車 API 服務，包含以下函數：
- `getCart(userId)` - 取得購物車
- `updateQuantity(cartId, itemId, newQuantity)` - 更新商品數量
- `removeCartItem(cartId, itemId)` - 移除商品
- `addToCart(cartId, product)` - 加入推薦商品
- `clearInvalidItems(cartId)` - 清除失效商品
- `toggleItemSelection(cartId, itemId, selected)` - 選中/取消選中商品
- `checkout(cartId, orderData)` - 結帳

### 3. **前端頁面更新** (`src/pages/CartPage.jsx`)
- ✅ 導入購物車 API 服務
- ✅ 使用 `useEffect` 加載初始購物車數據
- ✅ 所有操作都連動 API：
  - 變更數量 → `updateQuantity`
  - 刪除商品 → `removeCartItem`
  - 加入推薦商品 → `addToCart`
  - 清除失效商品 → `clearInvalidItems`
  - 選中商品 → `toggleItemSelection`
  - 結帳 → `handleCheckout`
- ✅ 添加加載和錯誤狀態提示

### 4. **環境變數設置** (`.env`)
```
VITE_API_URL=http://localhost:3000/api
```

## 使用方法

### 前置條件
1. 後端服務運行在 `http://localhost:3000`
2. 前端開發服務運行在 `http://localhost:5173`

### 啟動流程

#### 1. 啟動後端服務
```bash
cd server
npm install
npm start
```

#### 2. 啟動前端開發服務
```bash
cd client
npm install
npm run dev
```

#### 3. 訪問購物車頁面
```
http://localhost:5173/#/cart
```

## API 調用流程

```
CartPage.jsx
    ↓
cartApi.js (API 服務層)
    ↓
axiosClient.js (Axios 實例，自動添加 token)
    ↓
http://localhost:3000/api/* (後端 JSON Server)
    ↓
db.json (資料庫)
```

## 功能說明

### 頁面首次加載
1. 調用 `getCart(1)` 獲取 ID 為 1 的購物車
2. 綁定 `cartItems` 和 `invalidItems` 到頁面
3. 顯示加載狀態

### 變更商品數量
1. 用戶點擊 `+` / `-` 按鈕
2. 調用 `updateQuantity` API
3. 更新本地 state
4. 頁面自動重新渲染

### 刪除商品
1. 用戶點擊刪除按鈕
2. 調用 `removeCartItem` API
3. 從購物車移除商品
4. 頁面實時更新

### 加入推薦商品
1. 用戶點擊推薦商品的「加入購物車」
2. 調用 `addToCart` API
3. 如果商品已存在則增加數量，否則新增
4. 顯示成功提示

### 結帳
1. 用戶點擊「結帳」按鈕
2. 驗證是否有選中商品
3. 準備訂單數據
4. 可以擴展為調用 `checkout` API
5. 跳轉到結帳頁面

## 後續擴展建議

### 1. 用戶認證集成
- 從認證系統取得真實的 `userId`
- 替換硬編碼的 `userId: 1`

### 2. 訂單表創建
在 `db.json` 中添加：
```json
"orders": [
  {
    "id": 1,
    "userId": 1,
    "items": [...],
    "total": 2000,
    "status": "pending",
    "createdAt": "2026-02-12T..."
  }
]
```

### 3. 完整結帳流程
- 實現 `POST /api/orders` 端點
- 記錄訂單到資料庫
- 清空購物車（可選）

### 4. 庫存管理
添加產品庫存檢查：
```json
"products": [
  {
    "id": 1,
    "name": "商品名",
    "price": 100,
    "stock": 50
  }
]
```

### 5. 優惠券系統
- 創建 `coupons` 表
- 在結帳時驗證優惠券
- 自動計算折扣

## 常見問題

### Q: 如何修改用戶 ID？
A: 在 `CartPage.jsx` 中修改：
```jsx
const cartData = await getCart(1); // 改為你的用戶 ID
```

### Q: API 請求超時怎麼辦？
A: 確認後端服務正在運行，並檢查 `.env` 中的 `VITE_API_URL` 是否正確。

### Q: 如何測試 API？
A: 使用 Postman 或類似工具訪問 `http://localhost:3000/api/carts?userId=1`

## 文件結構
```
client/
├── .env                          (新增)
├── src/
│   ├── api/
│   │   ├── axiosClient.js        (已有)
│   │   └── cartApi.js            (新增)
│   └── pages/
│       └── CartPage.jsx          (已更新)
server/
└── db.json                       (已更新)
```
