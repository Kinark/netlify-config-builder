import React from 'react';
import ContentLoader from 'react-content-loader'

export default props => (
   <div className="section padded center">
      <ContentLoader
         style={{ height: '345px', width: '345px' }}
         height={345}
         width={345}
         speed={1}
         primaryColor="#231d33"
         secondaryColor="#2f2745"
         {...props}
      >
         <circle cx="172.12662996263853" cy="170.87662996263853" r="169.11662996263854" />
      </ContentLoader>
   </div>
)
