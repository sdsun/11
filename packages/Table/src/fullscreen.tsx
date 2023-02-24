import screenfull from 'screenfull';
import { ComponentInternalInstance } from 'vue';
export const useFullScreen = (instance: ComponentInternalInstance | null, props: any, fullscreen: any) => {
  const fullscreenStatus = ref(false); // 判断当前是否全屏
  const renderFullScreen = (): HTMLElement | undefined => {
    return (
      unref(fullscreen) && (
        <div class="g-table-fullscreen">
          <a href="javascript:void(0)" onClick={handleFullScreen}>
            <i className={`iconfont icon-fullscreen${unref(fullscreenStatus) ? '-exit' : ''}`}></i>
          </a>
        </div>
      )
    );
  };
  const handleFullScreen = () => {
    nextTick(() => {
      const tableEle: HTMLElement = instance?.proxy?.$refs[`g-table-container__${props.key}`] as HTMLElement;
      if (screenfull.isEnabled && tableEle) {
        if (unref(fullscreenStatus)) {
          screenfull.exit();
        } else {
          screenfull.request(tableEle, { navigationUI: 'hide' });
        }
      }
    });
  };
  fullscreen &&
    screenfull.on('change', () => {
      fullscreenStatus.value = !fullscreenStatus.value;
    });
  return renderFullScreen;
};
