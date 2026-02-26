const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');
const crypto = require("crypto");

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 綁定資料庫以便 auth 模組存取 users
app.db = router.db;

// 啟用 CORS (允許前端跨網域請求)
app.use(cors()); // 解決跨域問題
app.use(middlewares);

// 設定規則 (例如：/api/* 對應到 /)
app.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

// ✅ 加上權限規則（重要）
const rules = auth.rewriter({
  // users 只有自己能讀寫（避免整包 users 被看到）
  users: 600,

  // products 允許所有人讀，登入才能寫
  products: 644,

  // orders 需要登入才可用（你之後做購物流程會用到）
  orders: 660
});

// 啟用登入驗證 Middleware
app.use(rules);
app.use(auth);










app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`

));

