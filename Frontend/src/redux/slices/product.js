import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../service/product.service";




const initialState = {
  products: [],
  filteredProducts:[],
  isLoading: false,
  errorMessage: '',
}

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({pageNumber, pageSize}) => {
    const response = await ProductService.fetchProducts(pageNumber, pageSize);
    return response;
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    const response = await ProductService.createProduct(data);
    return response;
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }) => {
    const response = await ProductService.updateProduct(id, data);
    return response;
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await ProductService.deleteProduct(id);
    return id; // Trả về productId sau khi đã xóa
  }
);
export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async ({pageNumber,pageSize,searchTerm}) => {
    const response = await ProductService.searchProducts(pageNumber,pageSize,searchTerm);
    return response;
  }
);

export const sortProducts = createAsyncThunk(
  "product/sortProducts",
  async ({pageNumber,pageSize,order}) => {
    const response = await ProductService.sortProductsByPrice(pageNumber,pageSize,order);
    return response;
  }
);


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    logout: (state) => {
      state.products = null;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
        
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Xóa sản phẩm khỏi state.products sau khi xóa thành công
        const deletedProductId = action.payload;
        state.products = state.products.filter((product) => product.id !== deletedProductId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products  = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sortProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(sortProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
          
  },
});

const { reducer } = productSlice;
export default reducer;