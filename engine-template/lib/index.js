import Image from './Image/index';
import Line from './Line/index';
import Rect from './Rect/index';
import Text from './Text/index';
import Audio from './Audio/index';
import Button from './Button/index';
import Input from './Input/index';
import Video from './Video/index';
import Iframe from './Iframe/index';
import Qrcode from './Qrcode/index';

const component = [
  Image,
  Line,
  Rect,
  Text,
  Audio,
  Button,
  Iframe,
  Input,
  Video,
  Qrcode
];
const freeDesignComponent = {};
component.forEach(item => {
  freeDesignComponent[item.name] = item;
});

export default freeDesignComponent;
