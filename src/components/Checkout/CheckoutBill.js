import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import useReciept from '../../hooks/useReceipt';
import { ItemContext } from '../../store/ItemContext';

const defaultProps = {
  navigate: () => {},
};

const propTypes = {
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func,
};

const CheckoutBill = ({ state, navigate }) => {
  console.log(navigate);
  const { addDaily } = useReciept();
  const { dispatch } = useContext(ItemContext);
  const [paid, setPaid] = useState('0');
  const [change, setChange] = useState('0');
  const [open, setOpen] = useState(false);

  const handlePaid = e => {
    const num = e.target.value;
    setPaid(prevState => {
      if (prevState === '0') return num;
      return prevState + num;
    });
  };

  const clearOne = () => {
    const lastIndex = paid.length - 1;
    setPaid(prevState => {
      return prevState.slice(0, lastIndex);
    });
  };

  const handleSubmit = () => {
    const result = parseInt(paid, 0) - state.totalPrice;
    setChange(result);
    setOpen(prevState => {
      return !prevState;
    });
  };

  const handleConfirm = () => {
    const confirm = {
      date: new Date(),
      cart: state.cart,
      bill: state.totalPrice,
      paid: Number(paid),
      change,
    };
    addDaily(confirm);
    setPaid('0');
    setChange('0');
    setOpen(prevState => {
      return !prevState;
    });
    dispatch({ type: 'CLEAR_ALL' });
    navigate('/');
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        bill={state.totalPrice}
        paid={Number(paid)}
        change={Number(change)}
        handleConfirm={handleConfirm}
      />
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 sm:h-full sm:w-1/3">
        <div className="mb-5 text-2xl border-b border-black">Checkout</div>
        <div className="w-9/12 text-xl">
          <div className="flex justify-between">
            <div>Bill</div>
            <div>$ {state.totalPrice}</div>
          </div>
          <div className="flex justify-between">
            <div>Paid</div>
            <div>$ {paid}</div>
          </div>
          <div className="flex justify-between">
            <div>Change</div>
            <div>$ {change}</div>
          </div>
        </div>
        <div className="mt-5 text-xl font-hairline">
          <div className="flex">
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="7"
              onClick={handlePaid}
            >
              7
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="8"
              onClick={handlePaid}
            >
              8
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="9"
              onClick={handlePaid}
            >
              9
            </button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="4"
              onClick={handlePaid}
            >
              4
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="5"
              onClick={handlePaid}
            >
              5
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="6"
              onClick={handlePaid}
            >
              6
            </button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="1"
              onClick={handlePaid}
            >
              1
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="2"
              onClick={handlePaid}
            >
              2
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="3"
              onClick={handlePaid}
            >
              3
            </button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="0"
              onClick={handlePaid}
            >
              0
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
              value="00"
              onClick={handlePaid}
            >
              00
            </button>
            <button
              type="button"
              className="w-20 h-16 bg-red-400 border hover:bg-red-600 focus:outline-none"
              onClick={clearOne}
            >
              C
            </button>
          </div>
          {paid === '0' ? (
            <button
              type="button"
              className="w-full p-2 mt-2 text-white bg-green-600"
              disabled
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="w-full p-2 mt-2 text-white bg-green-400 hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

CheckoutBill.defaultProps = defaultProps;
CheckoutBill.propTypes = propTypes;

export default CheckoutBill;