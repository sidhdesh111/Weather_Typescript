import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/Theme_Provider";
const City_page = lazy(() => import("./Pages/City_page"));
const Weather_Dashboard = lazy(() => import("./Pages/Weather_Dashboard"));
const Layout = lazy(() => import("./components/Layout"));
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner";
import LoadingSkeleton from "./components/LoadingSkeleton";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <BrowserRouter>
      <Toaster />
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path="/" element={<Weather_Dashboard />} />
                <Route path="/city/:cityname" element={<City_page />} />
              </Routes>
            </Suspense>
          </Layout>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
