const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
const PORT = process.env.PORT || 3000
const JSON_SERVER_URL = "http://localhost:3001"

// 中間件
app.use(cors())
app.use(express.json())

// 錯誤處理中間件
const handleError = (res, error) => {
  console.error("Error:", error.message)
  if (error.response) {
    return res.status(error.response.status).json({
      success: false,
      message: error.response.data || message,
      error: error.response.statusText,
    })
  }
  return res.status(500).json({
    success: false,
    message,
    error: error.message,
  })
}

// 成功響應格式化
const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    code: 0,
    data,
  })
}

// ==================== CRUD 接口 ====================

// 1. CREATE - 創建用戶
app.post("/api/:table", async (req, res) => {
  try {
    const { table } = req.params

    // 自動產生最新的id
    const res = await axios.get(`${JSON_SERVER_URL}/${table}`)
    const maxId = res.data.reduce((max, user) => Math.max(max, user.id), 0)
    req.body.id = maxId + 1

    // 發送請求到 JSON Server
    const response = await axios.post(`${JSON_SERVER_URL}/${table}`, req.body)

    successResponse(res, response.data)
  } catch (error) {
    handleError(res, error, "創建用戶失敗")
  }
})

// 2. READ - 獲取所有用戶
app.get("/api/:table", async (req, res) => {
  try {
    const { table } = req.params
    let url = `${JSON_SERVER_URL}/${table}`
    const response = await axios.get(url)
    successResponse(res, response.data)
  } catch (error) {
    handleError(res, error, "獲取用戶列表失敗")
  }
})

// 2.1 READ - 根據ID獲取單個用戶
app.get("/api/:table/:id", async (req, res) => {
  try {
    const { table, id } = req.params

    const response = await axios.get(`${JSON_SERVER_URL}/${table}/${id}`)

    successResponse(res, response.data)
  } catch (error) {
    handleError(res, error)
  }
})

// 3. UPDATE - 更新用戶
app.put("/api/${table}/:id", async (req, res) => {
  try {
    const { table, id } = req.params

    // 先檢查用戶是否存在
    await axios.get(`${JSON_SERVER_URL}/users/${id}`)

    const response = await axios.put(`${JSON_SERVER_URL}/${table}/${id}`, req.body)

    successResponse(res, response.data)
  } catch (error) {
    handleError(res, error, "更新用戶失敗")
  }
})

// 3.1 UPDATE - 部分更新用戶
app.patch("/api/:table/:id", async (req, res) => {
  try {
    const { table, id } = req.params

    const response = await axios.patch(`${JSON_SERVER_URL}/${table}/${id}`, req.body)

    successResponse(res, response.data)
  } catch (error) {
    handleError(res, error)
  }
})

// 4. DELETE - 刪除用戶
app.delete("/api/:table/:id", async (req, res) => {
  try {
    const { table, id } = req.params

    // 先檢查用戶是否存在
    await axios.get(`${JSON_SERVER_URL}/${table}/${id}`)

    // 刪除用戶
    await axios.delete(`${JSON_SERVER_URL}/${table}/${id}`)

    successResponse(res, true)
  } catch (error) {
    handleError(res, error)
  }
})

// 根路由
app.get("/", (req, res) => {
  res.json({
    code: 0,
    data: "ok",
  })
})

// 404 處理
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "接口不存在",
    path: req.originalUrl,
  })
})

// 全局錯誤處理
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err)
  res.status(500).json({
    success: false,
    message: "服務器內部錯誤",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// 啟動服務器
app.listen(PORT, () => {
  console.log(`🚀 Express 服務器運行在 http://localhost:${PORT}`)
  console.log(`📊 請確保 JSON Server 運行在 http://localhost:3001`)
  console.log(`📖 API 文檔: http://localhost:${PORT}`)
})

module.exports = app
