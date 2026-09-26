import React from 'react';
import { DinoGame } from '../ui/DinoGame';

export const NotFoundPage: React.FC = () => {
  return <DinoGame is404={true} />;
};

export default NotFoundPage;
