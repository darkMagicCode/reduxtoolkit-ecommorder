import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {


      const response = await fetch(
        'https://test-reduux-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://test-reduux-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};






// using createAsyncThunk to dispatch asynchronous actions ..
// 0 upvotes
// // redux.js



// export const sendCartData = createAsyncThunk(
//     'send data to real-time database',
//     async function sendCartData(cartItem, thunkAPI) {
//         try {
//             thunkAPI.dispatch(toggleCartActions.showNotification({
//                 status: 'pending',
//                 title: 'PENDING ...',
//                 message: 'Sending Cart Data'
//             }))
 
//             const response = await fetch('https://reacthttp-d29f6-default-rtdb.firebaseio.com/cart.json',
//                 {
//                     method: 'PUT',
//                     body: JSON.stringify(cartItem)
//                 })
 
//             if (!response.ok)
//                 throw new Error(response.status);
 
//             thunkAPI.dispatch(toggleCartActions.showNotification({
//                 status: 'success',
//                 title: 'SUCCESS',
//                 message: 'Data sent to sever ...'
//             }))
//         }
//         catch (error) {
//             console.log(error.message);
//             thunkAPI.dispatch(toggleCartActions.showNotification({
//                 status: 'error',
//                 title: 'ERROR !!',
//                 message: 'Failed to Fetch ... !!!'
//             }))
//         }
//     }
// )


// // App.js



// let renderedOnce = false;
 
//  useEffect(() => {
//     if (renderedOnce) {
//       dispatch(sendCartData(cartItem))
//     } else if (!renderedOnce) {
//       renderedOnce = true
//     }
//   }, [cartItem, dispatch])