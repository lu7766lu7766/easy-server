# Express + JSON Server CRUD API

這是一個使用 Express.js 和 JSON Server 構建的後端 API 範例，提供完整的 CRUD（創建、讀取、更新、刪除）操作。

## 功能特點

- ✅ 完整的 CRUD 操作
- ✅ RESTful API 設計
- ✅ 錯誤處理和驗證
- ✅ 分頁支持
- ✅ 搜索功能
- ✅ 統一的響應格式
- ✅ 健康檢查接口

## 技術棧

- **Express.js** - Web 框架
- **JSON Server** - 模擬數據庫
- **Axios** - HTTP 客戶端
- **CORS** - 跨域支持

## 安裝和運行

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動 JSON Server（數據庫）

```bash
npm run json-server
```

JSON Server 將運行在 `http://localhost:3001`

### 3. 啟動 Express 服務器

在新的終端窗口中：

```bash
npm start
```

或者使用開發模式（自動重啟）：

```bash
npm run dev
```

Express 服務器將運行在 `http://localhost:3000`

## API 接口

### 基礎信息

- **基礎 URL**: `http://localhost:3000`
- **數據格式**: JSON
- **響應格式**: 統一的成功/錯誤響應格式

### 響應格式

#### 成功響應
```json
{
  "success": true,
  "message": "操作成功",
  "data": { ... }
}
```

#### 錯誤響應
```json
{
  "success": false,
  "message": "錯誤信息",
  "error": "詳細錯誤"
}
```

### 接口列表

#### 1. 健康檢查
```
GET /health
```

#### 2. 獲取所有用戶 (READ)
```
GET /api/users
```

**查詢參數:**
- `page`: 頁碼（默認: 1）
- `limit`: 每頁數量（默認: 10）
- `search`: 搜索關鍵詞

**示例:**
```
GET /api/users?page=1&limit=5&search=張
```

#### 3. 根據ID獲取用戶 (READ)
```
GET /api/users/:id
```

**示例:**
```
GET /api/users/1
```

#### 4. 創建用戶 (CREATE)
```
POST /api/users
```

**請求體:**
```json
{
  "name": "新用戶",
  "email": "newuser@example.com",
  "age": 25
}
```

#### 5. 完整更新用戶 (UPDATE)
```
PUT /api/users/:id
```

**請求體:**
```json
{
  "name": "更新的姓名",
  "email": "updated@example.com",
  "age": 30
}
```

#### 6. 部分更新用戶 (UPDATE)
```
PATCH /api/users/:id
```

**請求體:**
```json
{
  "age": 35
}
```

#### 7. 刪除用戶 (DELETE)
```
DELETE /api/users/:id
```

## 使用示例

### 使用 curl 測試

#### 創建用戶
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "測試用戶",
    "email": "test@example.com",
    "age": 25
  }'
```

#### 獲取所有用戶
```bash
curl http://localhost:3000/api/users
```

#### 獲取特定用戶
```bash
curl http://localhost:3000/api/users/1
```

#### 更新用戶
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "更新的姓名",
    "email": "updated@example.com",
    "age": 30
  }'
```

#### 刪除用戶
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### 使用 JavaScript fetch

```javascript
// 創建用戶
const createUser = async () => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '新用戶',
      email: 'newuser@example.com',
      age: 25
    })
  });
  const data = await response.json();
  console.log(data);
};

// 獲取用戶列表
const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  console.log(data);
};
```

## 數據結構

### 用戶對象
```json
{
  "id": 1,
  "name": "張三",
  "email": "zhangsan@example.com",
  "age": 25,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 開發說明

### 項目結構
```
├── package.json          # 項目配置
├── server.js             # Express 服務器主文件
├── db.json              # JSON Server 數據庫文件
└── README.md            # 項目說明
```

### 環境變量
- `PORT`: Express 服務器端口（默認: 3000）
- `NODE_ENV`: 運行環境（development/production）

### 注意事項

1. **JSON Server 必須先啟動**: Express 服務器依賴 JSON Server 提供數據服務
2. **端口配置**: 確保 3000 和 3001 端口未被占用
3. **數據持久化**: JSON Server 會將數據保存在 `db.json` 文件中
4. **CORS**: 已配置 CORS 支持跨域請求

## 擴展建議

1. **身份驗證**: 添加 JWT 或 Session 認證
2. **數據驗證**: 使用 Joi 或 express-validator 進行更嚴格的數據驗證
3. **日誌記錄**: 添加 Winston 或 Morgan 進行日誌記錄
4. **測試**: 添加 Jest 或 Mocha 進行單元測試
5. **文檔**: 使用 Swagger 生成 API 文檔
6. **真實數據庫**: 替換為 MongoDB、PostgreSQL 等真實數據庫

## 故障排除

### 常見問題

1. **端口被占用**
   ```bash
   # 查看端口使用情況
   lsof -i :3000
   lsof -i :3001
   ```

2. **JSON Server 連接失敗**
   - 確保 JSON Server 正在運行
   - 檢查 `db.json` 文件是否存在

3. **CORS 錯誤**
   - 已配置 CORS 中間件，如仍有問題請檢查前端請求配置

## 許可證

MIT License