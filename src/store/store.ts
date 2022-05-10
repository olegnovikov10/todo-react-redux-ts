import {configureStore} from '@reduxjs/toolkit';
import {todoSlice} from './reducers/TodoSlice'

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer
    },
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
//     RootState,
//     unknown,
//     Action<string>>;
