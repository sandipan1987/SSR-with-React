import React from 'react';
import Title from './title';

const CardRight = ({ app }) => (
  <div className="col-right">
    <div className="app-meta">
      <Title name={app.name} publisher={app.publisher} />
      <span className="app-lic">{app.price}</span>
    </div>
    <div className="app-intro" dangerouslySetInnerHTML={{ __html: app.desc }} />
    <hr />
  </div>
)


export default CardRight;
