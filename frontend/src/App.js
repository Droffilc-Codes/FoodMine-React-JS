import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import Header from "./Components/Header/Header";
import Loading from "./Components/Loading/Loading";
import { useLoading } from "./Hooks/useLoading";
import { setLoadingInterceptor } from './Interceptor/loadingInterceptors'

function App() {
  const { showLoading, hideLoading } = useLoading()

  useEffect(()=>{
    setLoadingInterceptor({ showLoading, hideLoading})
  }, [])



  return (
    <>
        <Loading />
        <Header/>
        <AppRoutes/>
    </>
  );
}

export default App;
