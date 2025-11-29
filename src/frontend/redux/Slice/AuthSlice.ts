import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, UserState } from "./UserSlice";

interface ISecondUserStep {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  gender: string;
  address: string;
}

interface ISecondShopStep {
  name: string;
  description: string;
  phoneNumber: number;
  hotline: number;
}

interface IThirdShopStep {
  avatar: unknown;
  location: string;
  workingHours: string;
}

interface IFourthStep {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthState {
  active: "login" | "register";
  selectedType: "user" | "eventOrganizer" | "shop";
  loading: boolean;
  error: string | null;

  step2Data: ISecondUserStep | ISecondShopStep;
  step3Data: IThirdShopStep;
  step4Data: IFourthStep;

  /** NEW — validation for each step */
  stepsValidation: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };
}

const initialState: AuthState = {
  active: "login",
  selectedType: "user",
  loading: false,
  error: null,
  step2Data: {} as ISecondUserStep,
  step3Data: {} as IThirdShopStep,
  step4Data: {} as IFourthStep,

  stepsValidation: {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  },
};

// Real Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...credentials,
          loginType: "customer", // Default to customer, can be enhanced later
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Assuming the API returns { success: true, data: { token: "...", user: { ... } } }
      // Adjust based on actual API response structure from mappers.ts
      const userData = data.data.user;
      
      // You might want to store the token in localStorage here or in a middleware
      localStorage.setItem("token", data.data.token);

      dispatch(setUser({ ...userData, isLoggedIn: true }));
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Real Register Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registrationData: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }

      const userData = data.data.user;
      localStorage.setItem("token", data.data.token);

      dispatch(setUser({ ...userData, isLoggedIn: true }));
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

type StepKey = "step1" | "step2" | "step3" | "step4";

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthView(state) {
      state.active = state.active === "login" ? "register" : "login";
    },
    selectTypeAction(state, action) {
      state.selectedType = action.payload;
    },

    saveStep2Data(state, action) {
      state.step2Data = action.payload;
      state.stepsValidation.step2 = true; // VALID
    },

    saveStep3Data(state, action) {
      state.step3Data = action.payload;
      state.stepsValidation.step3 = true;
    },

    saveStep4Data(state, action) {
      state.step4Data = action.payload;
      state.stepsValidation.step4 = true;
    },

    setStepValid(state, action) {
      const { step, valid } = action.payload;

      const key = `step${step}` as StepKey;

      state.stepsValidation[key] = valid;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  toggleAuthView,
  selectTypeAction,
  saveStep2Data,
  saveStep3Data,
  saveStep4Data,
  setStepValid,
} = AuthSlice.actions;

export default AuthSlice.reducer;
