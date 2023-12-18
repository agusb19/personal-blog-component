import { BlogCards } from './components/BlogCards'
import { BlogSections } from './components/BlogSections'
import { GlobalProvider } from './context/GlobalProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '/blog-posts',
      element: <BlogCards/>
    },
    {
      path: '/blog-posts/:article',
      element: <BlogSections/>
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider api_key='09f5621d01bad9cf9c10b8b2d6e209fc' >
        <RouterProvider router={router}/>
      </GlobalProvider>
    </QueryClientProvider>
  )
}

export default App