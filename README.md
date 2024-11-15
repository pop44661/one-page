# One page frontend Documentation (React frontend)

## Overview
The frontend application is a React-based tool designed for internal use, primarily focused on tasks such as model training, testing, and image generation. It serves as the user interface for interacting with backend AI systems, streamlining workflows related to model management, evaluation, and deployment. The backend (BE v2 server) is written in Python, hosted on AWS, and handles the heavy lifting of AI processes, allowing users to efficiently manage and monitor their projects through an intuitive web interface.
---
### Frontend Setup Instructions

To build and run the frontend server using Docker, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Derekwan1081546/one-page.git
    cd one-page
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Build Docker Image**:
    ```bash
    docker build -t onepage .
    ```

4. **Run Docker Container**:
    Ensure port `3000` is exposed in your Dockerfile:
    ```dockerfile
    EXPOSE 3000
    ```
    Then, run the container:
    ```bash
    docker run -d -p 3000:3000 --name onepage-container onepage
    ```
5. **Access the Application**:  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
---
### Deployment Overview

The frontend server is now deployed using Amazon ECR (Elastic Container Registry) and ECS (Elastic Container Service). The service can be accessed at the following URL:

- **ECS Deployment URL**: [http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com:3000](http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com:3000)

---

以下為前端本地開發的執行指令參考

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### 開發模式 (`npm start`)

```bash
npm start
```

執行應用程式於開發模式。  
開啟 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看。

修改程式碼後頁面會自動重新載入，  
並且您可能會在控制台中看到任何 lint 錯誤。

### 執行測試 (`npm test`)

```bash
npm test
```

啟動測試執行器，並以互動模式監控變更。  
更多資訊請參閱 [測試文檔](https://facebook.github.io/create-react-app/docs/running-tests)。

### 建立生產環境建置 (`npm run build`)

```bash
npm run build
```

將應用程式打包為生產模式，輸出至 `build` 資料夾。  
它會在生產模式下正確地將 React 應用程式打包，並優化建置以達到最佳效能。

生成的檔案已壓縮，且檔案名稱包含雜湊值，應用程式已準備好部署！  
更多資訊請參閱 [部署指南](https://facebook.github.io/create-react-app/docs/deployment)。

### 彈出配置 (`npm run eject`)

```bash
npm run eject
```

**注意：這是一個不可逆的操作！**  
執行 `eject` 後，無法再返回原本的設定。

若對預設的建置工具和配置不滿意，隨時可以執行 `eject`。  
此命令將會移除單一的建置相依性，並將所有配置文件（如 webpack、Babel、ESLint 等）複製到您的專案中，讓您擁有完全的控制權。  
除 `eject` 以外的其他指令仍可正常運行，但將指向已複製的腳本，以便您可以自行調整配置。  
此操作適合需要更高自由度的使用者。

## Learn More

欲瞭解更多資訊，請參閱 [Create React App 文檔](https://facebook.github.io/create-react-app/docs/getting-started)。  
若要學習 React，請查看 [React 文檔](https://reactjs.org/)。

### 進階功能

- **程式碼分割**  
  [文件連結](https://facebook.github.io/create-react-app/docs/code-splitting)

- **分析 Bundle 大小**  
  [文件連結](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

- **製作 Progressive Web App**  
  [文件連結](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

- **進階配置**  
  [文件連結](https://facebook.github.io/create-react-app/docs/advanced-configuration)

- **部署**  
  [文件連結](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` 無法壓縮

若執行 `npm run build` 時失敗，請參閱 [故障排除指南](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)。
