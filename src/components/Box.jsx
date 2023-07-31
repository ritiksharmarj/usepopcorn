import { useState } from 'react';

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='12'
            fill='#ffffff'
            viewBox='0 0 256 256'
          >
            <path d='M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z'></path>
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='12'
            fill='#ffffff'
            viewBox='0 0 256 256'
          >
            <path d='M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z'></path>
          </svg>
        )}
      </button>

      {isOpen && children}
    </div>
  );
};

export default Box;
