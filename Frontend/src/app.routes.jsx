import {createBrowserRouter} from 'react-router'
import login from './Features/Auth/pages/login'
import register from './Features/Auth/pages/register'



export const router = createBrowserRouter([

    {
        path:"/login",
        element:<login/>
    },
    {
        path:"/register",
        element:<register/>
    }
])