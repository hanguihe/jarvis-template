import React from 'react';
import classNames from 'classnames';
import style from './index.less';

const Loading = () => (
  <div className={style.loading}>
    <div className={style.cube} />
    <div className={classNames(style.cube2, style.cube)} />
    <div className={classNames(style.cube3, style.cube)} />
    <div className={classNames(style.cube4, style.cube)} />
  </div>
);

export default Loading;
