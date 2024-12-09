import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { InitialStatePositionType, Position, CreatePositionType, UpdatePositionType } from "@/Types/Users/Members/PositionsType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStatePositionType = {
    dataPosition: [],
    status: "idle",
    error: null,
    isOpenModalCreatePosition: false,
    isOpenModalEditPosition: false,
    isOpenModalDeletePosition: false,
    selectedPosition: null,
};

const transformPosition = (positions: Position[]): Position[] => {
    return positions.map(position => {
        if (position.id === undefined) {
            throw new Error("Position must have an id");
        }
        return {
            ...position,
            image: position.image || "programs/types/typePosition.png",
        };
    });
};

export const fetchPositions = createAsyncThunk(
    "positions/fetchPositions",
    async () => {
        const response = await axiosInstance.get<{ data: Position[] }>(`${apiBaseUrl}/positions/`);
        const data = response.data.data;
        const transformedPositionData = transformPosition(data);
        return { data: transformedPositionData };
    }
);

export const createPosition = createAsyncThunk(
    "positions/createPosition",
    async (newPosition: CreatePositionType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: Position }>(`${apiBaseUrl}/positions/`, newPosition);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updatePosition = createAsyncThunk(
    "positions/updatePosition",
    async (updatedPosition: UpdatePositionType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: Position }>(
                `${apiBaseUrl}/positions/${updatedPosition.id}`,
                updatedPosition
            );
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deletePosition = createAsyncThunk(
    "positions/deletePosition",
    async (positionId: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/positions/${positionId}`);
            return positionId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const PositionSlice = createSlice({
    name: "positions",
    initialState,
    reducers: {
        setModalCreatePosition: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreatePosition = action.payload.isOpen;
        },
        setModalEditPosition: (state, action: PayloadAction<{ isOpen: boolean; position: Position | null }>) => {
            state.isOpenModalEditPosition = action.payload.isOpen;
            state.selectedPosition = action.payload.position;
        },
        setModalDeletePosition: (state, action: PayloadAction<{ isOpen: boolean; position: Position | null }>) => {
            state.isOpenModalDeletePosition = action.payload.isOpen;
            state.selectedPosition = action.payload.position;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPositions.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPositions.fulfilled, (state, action: PayloadAction<{ data: Position[] }>) => {
                state.status = "succeeded";
                state.dataPosition = action.payload.data;
            })
            .addCase(fetchPositions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(createPosition.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createPosition.fulfilled, (state, action: PayloadAction<Position>) => {
                state.status = "succeeded";
                state.dataPosition.push(action.payload);
            })
            .addCase(createPosition.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(updatePosition.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updatePosition.fulfilled, (state, action: PayloadAction<Position>) => {
                state.status = "succeeded";
                const index = state.dataPosition.findIndex((position) => position.id === action.payload.id);
                if (index !== -1) {
                    state.dataPosition[index] = {
                        ...action.payload,
                        image: "programs/types/typePosition.png",
                    };
                }
            })
            .addCase(updatePosition.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(deletePosition.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deletePosition.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.dataPosition = state.dataPosition.filter((position) => position.id !== action.payload);
            })
            .addCase(deletePosition.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const { setModalCreatePosition, setModalEditPosition, setModalDeletePosition } = PositionSlice.actions;

export default PositionSlice.reducer;
