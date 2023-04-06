import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={687}
    height={88}
    viewBox="0 0 687 88"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="170" y="2" rx="16" ry="16" width="510" height="40" />
    <rect x="172" y="54" rx="15" ry="15" width="510" height="20" />
    <rect x="2" y="-2" rx="0" ry="0" width="157" height="88" />
  </ContentLoader>
);
