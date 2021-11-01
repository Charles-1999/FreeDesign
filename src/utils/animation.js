/**
 * 执行动画
 * @param el 元素节点
 * @param animation 动画
 * @param prefix 动画前缀
 * @return {Promise}
 */
export const animateCSS = (el, animation, prefix = 'animate__') => {
  return new Promise((resolve, reject) => {
    const { name, duration, delay } = animation;
    // 动画名称
    const animationName = `${prefix}${name}`;

    el.classList.add(`${prefix}animated`, animationName);
    el.style.setProperty('animation-duration', `${duration}s`);
    el.style.setProperty('animation-delay', `${delay}s`);

    // 当动画结束，清掉动画的类
    function handleAnimationEnd(event) {
      event.stopPropagation();
      el.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    el.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
};

export default {
  animateCSS
};
