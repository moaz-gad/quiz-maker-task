import Footer from "./components/Footer"
import Header from "./components/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="page-content">
        <Header />
        <Home />
      </div>

      <Footer />
    </QueryClientProvider>
  )
}
export default App
