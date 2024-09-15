import React from 'react';
import { Box } from 'lucide-react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {fetchSalineLevel} from "./_service"

const SalineSystemDashboardInner = ({ pollingInterval = 500 }) => {

  const { data: salineLevel, isLoading, isError } = useQuery({
    queryKey: ['salineLevel',pollingInterval+1],
    queryFn: fetchSalineLevel,
    refetchInterval: pollingInterval,
  });

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Box className="text-green-500" />
            <h1 className="text-xl font-semibold">Saline System</h1>
          </div>
        </header>



        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <h2 className="text-lg mb-2">saline level</h2>
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">Loading...</span>
                </div>
              ) : isError ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl text-red-500">Error fetching data</span>
                </div>
              ) : (
                <>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-700"
                      strokeWidth="5"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-green-500"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${salineLevel * 2.83} 283`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold">{salineLevel} g</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:items-start">
          </div>
        </main>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const SalineSystemDashboard = (props) => (
  <QueryClientProvider client={queryClient}>
    <SalineSystemDashboardInner {...props} />
  </QueryClientProvider>
);

export default SalineSystemDashboard;