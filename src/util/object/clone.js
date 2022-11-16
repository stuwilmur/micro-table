import {compose} from '../function';

export const clone = compose(JSON.parse, JSON.stringify);
