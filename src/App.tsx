import { BlogCards } from './components/BlogCards'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BlogCards api_key='09f5621d01bad9cf9c10b8b2d6e209fc' />
    </QueryClientProvider>
  )
}

export default App