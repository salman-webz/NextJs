import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  profilePicture: string;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Salman Muhammad',
    email: 'salman@gmail.com',
    phone: '+81 965-431-3024',
    position: 'admin',
    profilePicture: "https://dummyjson.com/icon/emilys/128"
  },
  {
    id: '2',
    name: 'Muhammad Salman',
    email: 'muhammad@gmail.com',
    phone: '+81 965-431-3024',
    position: 'admin',
    profilePicture: "https://dummyjson.com/icon/emilys/127"
  }
];

const initialState: EmployeeState = {
  employees: initialEmployees,
  loading: false,
  error: null
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { getState }) => {
    const state = getState() as { employees: EmployeeState };
    return state.employees.employees;
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employee: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9)
    };
    return newEmployee;
  }
);

export const editEmployee = createAsyncThunk(
  'employees/editEmployee',
  async (employee: Employee) => {
    return employee;
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: string) => {
    return id;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = [...state.employees, action.payload];
        state.error = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add employee';
      })
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to edit employee';
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete employee';
      });
  }
});

export default employeeSlice.reducer; 