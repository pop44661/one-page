# One-Page Frontend Documentation (React Frontend)

## 📝 **Overview**

The frontend application is a **React-based tool** designed for **internal use**, primarily focused on tasks such as **model training**, **testing**, and **image generation**. It serves as the **user interface** for interacting with backend AI systems, streamlining workflows related to **model management**, **evaluation**, and **deployment**.

The backend (**BE v2 server**) is implemented in **Python**, hosted on **AWS**, and handles the **heavy lifting** of AI processes, allowing users to efficiently manage and monitor their projects through an **intuitive web interface**.

---
## ⚙️ **Frontend Setup Instructions**

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
   Open your browser and navigate to:  
   [http://localhost:3000](http://localhost:3000)
---
## 🌐 **Deployment Overview**

The frontend server is now deployed using **Amazon ECR** (Elastic Container Registry) and **ECS** (Elastic Container Service). The service can be accessed at the following URL:

- **ECS Deployment URL**:  
  [http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com:3000](http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com:3000)

> ⚠️ **Note**: Ensure that your AWS security groups allow inbound traffic on port `3000` for the URL to be accessible externally.

---

## 🛠️ **Getting Started with Create React App**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## ⚙️ **Available Scripts**

In the project directory, you can run the following scripts:

### 🚀 **Development Mode (`npm start`)**
```bash
npm start
```

- Launches the app in development mode.  
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will **auto-reload** if you make edits,  
and you may also see **lint errors** in the console.

### 🧪 **Running Tests (`npm test`)**

```bash
npm test
```

- Starts the test runner in interactive watch mode.  
- For more information, refer to the [testing documentation](https://facebook.github.io/create-react-app/docs/running-tests).

### 📦 **Building for Production (`npm run build`)**

```bash
npm run build
```

- Bundles the app for production into the `build` folder.  
- It correctly bundles React in **production mode** and optimizes the build for best performance.

The build is **minified**, and the filenames include **hashes**.  
Your app is ready for **deployment**!  
For more details, see the [deployment guide](https://facebook.github.io/create-react-app/docs/deployment).

### 🔧 **Ejecting Configuration (`npm run eject`)**

```bash
npm run eject
```

> ⚠️ **Warning**: This is a **one-way operation**.  
Once you `eject`, you **cannot go back** to the previous setup.

- Use this if you're **not satisfied** with the default build tools and configurations.  
- This command will **remove** the single build dependency and copy all configuration files (like `webpack`, `Babel`, `ESLint`, etc.) into your project, giving you full control.  
- All commands except `eject` will still work, but they will now point to the copied scripts, allowing for custom adjustments.  
- Suitable for users needing **higher flexibility**.

---

## 📚 **Learn More**

To learn more, refer to:

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)  
- [React Documentation](https://reactjs.org/)

---

### 🚀 **Advanced Features**

- **Code Splitting**: [Documentation](https://facebook.github.io/create-react-app/docs/code-splitting)
- **Analyzing Bundle Size**: [Documentation](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- **Progressive Web App (PWA)**: [Documentation](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- **Advanced Configuration**: [Documentation](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- **Deployment**: [Documentation](https://facebook.github.io/create-react-app/docs/deployment)

### 🛠️ **Troubleshooting Build Issues**

If `npm run build` fails to minify, refer to the [troubleshooting guide](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).
