import { useRef } from 'react'
import { TChildrenProps } from 'common/types.common';
import LinearProgress from '@mui/material/LinearProgress';

import './style.css'

interface IInfiniteLoader {
  children: TChildrenProps;
  cb: Function
  loading: boolean
}

const InfiniteLoader = ({
    children,
    cb,
    loading
}: IInfiniteLoader) =>  {
  const listInnerRef = useRef<HTMLDivElement | null>(null)
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) cb();
    }
  };

  return (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      className="infinite-loader__container"
      data-testid="infinite__loader__rm"
    >
      {children}
      {loading && <LinearProgress sx={{ marginTop: '10px', width: '100%', height: '5px' }} /> }
    </div>
  )
}

export default InfiniteLoader 