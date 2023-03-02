import screenfull from 'screenfull';
export const useFullScreen = (fullscreen: any) => {
  const fullscreenStatus = ref(false); // 判断当前是否全屏
  const renderFullScreen = (): HTMLElement | undefined => {
    return (
      unref(fullscreen) && (
        <div class="g-table-content__right--i" onClick={handleFullScreen}>
          <i className={`iconfont icon-fullscreen${unref(fullscreenStatus) ? '-exit' : ''}`} />
        </div>
      )
    );
  };
  const handleFullScreen = () => {
    nextTick(() => {
      if (screenfull.isEnabled) {
        if (unref(fullscreenStatus)) {
          screenfull.exit();
        } else {
          screenfull.request();
        }
      }
    });
  };
  fullscreen &&
    screenfull.on('change', () => {
      fullscreenStatus.value = !fullscreenStatus.value;
    });
  return {renderFullScreen, fullscreenStatus};
};
