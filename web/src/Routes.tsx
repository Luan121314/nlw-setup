import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";


export function Routes(){
 

    const routes = createBrowserRouter([
        {
            path: '/home',
            element: <Home/>
        },
        {
            index:true,
            path: '/auth',
            element: <Auth/>
        },{
            path: '/',
            loader:  () => redirect('/auth')
        }
    ])
    return <RouterProvider router={routes}  />
}