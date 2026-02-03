import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { ChatView } from "./views/ChatView";

const queryClient = new QueryClient();

export const App = () => (
  <Provider>
    <QueryClientProvider client={queryClient}>
      <ChatView />
    </QueryClientProvider>
  </Provider>
);