import Image from './Image/index';
import Line from './Line/index';
import Rect from './Rect/index';
import Text from './Text/index';

const component = [
  Image,
  Line,
  Rect,
  Text
];
const freeDesignComponent = {};
component.forEach(item => {
  freeDesignComponent[item.name] = item;
});

export default freeDesignComponent;
