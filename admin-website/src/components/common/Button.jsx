import React from 'react';
import classNames from 'classnames';

function Button({children, className, ...rest}) {

  const finalclassName = classNames("px-4 py-2 w-full border",className)
  return (
    <div className='flex justify-center px-3 py-2'>
        <button className={finalclassName} {...rest}>{children}</button>
    </div>
  )
}

export default Button;