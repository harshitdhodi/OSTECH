import { infographicApi } from "@/slice/infographic";
import { ourcapabilityApi } from "@/slice/ourCapabilityService";
import { ourProcessApi } from "@/slice/ourProcess";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // Registering the reducers for both APIs
    [infographicApi.reducerPath]: infographicApi.reducer,
    [ourcapabilityApi.reducerPath]: ourcapabilityApi.reducer,
    [ourProcessApi.reducerPath]:ourProcessApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(infographicApi.middleware)   // Add infographicApi middleware
      .concat(ourcapabilityApi.middleware) // Add ourcapabilityApi middleware
      .concat(ourProcessApi.middleware)
});

export default store;
  