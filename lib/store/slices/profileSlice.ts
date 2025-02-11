import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  studentId: string;
  major: string;
  year: number;
  gpa: number;
  courses: string[];
}

const initialState: ProfileState = {
  studentId: '',
  major: '',
  year: 1,
  gpa: 0.0,
  courses: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    resetProfile: () => initialState,
  },
});

export const { updateProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;