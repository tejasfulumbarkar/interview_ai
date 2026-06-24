import {createBrowserRouter} from 'react-router'
import Login from './Features/Auth/pages/Login'
import Register from './Features/Auth/pages/Register'



export const router = createBrowserRouter([

    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])