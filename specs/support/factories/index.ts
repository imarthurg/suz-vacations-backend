import { FactoryBot } from 'factory-bot-ts';

import { UserFactoryProps } from './user.factory';
import { CompanyFactoryProps } from './company.factory';

const factoriesProps = [UserFactoryProps, CompanyFactoryProps];

// eslint-disable-next-line prefer-spread
factoriesProps.forEach((props) => FactoryBot.define.apply(FactoryBot, props));

export { FactoryBot };
