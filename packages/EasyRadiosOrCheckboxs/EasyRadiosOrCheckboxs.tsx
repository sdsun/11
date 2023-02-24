import 'element-plus/es/components/radio-group/style/css';
import 'element-plus/es/components/radio/style/css';
import 'element-plus/es/components/checkbox-group/style/css';
import 'element-plus/es/components/checkbox/style/css';
import 'element-plus/es/components/tooltip/style/css';

import { defineComponent, PropType } from 'vue';

const easyRadiosOrCheckboxs = defineComponent({
  props: {
    type: {
      type: String as PropType<'radio' | 'checkbox'>,
      default: 'checkbox',
    },
    lists: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    label: {
      type: [String, Function] as PropType<string | ((item: any) => string)>,
      default: 'label',
    },
    value: {
      type: [String, Function] as PropType<string | ((item: any) => string)>,
      default: 'value',
    },
    tooltip: {
      type: [String, Function] as PropType<string | ((item: any) => string)>,
    },
  },
  setup(props, { attrs }) {
    const group = resolveComponent(`el-${props.type}-group`);
    const groupItem = resolveComponent(`el-${props.type}`);

    function renderText(item: any, type: 'label' | 'value' | 'tooltip') {
      let text = props[type];
      let isString = typeof text === 'string';
      return isString ? item[text as string] : (text as Function)?.(item);
    }
    function renderToolTip(item: any) {
      return (
        <el-tooltip effect="dark" placement="bottom" content={renderText(item, 'tooltip')}>
          <span class="g-form-tooltip">i</span>
        </el-tooltip>
      );
    }
    function renderItem() {
      return props.lists.map((item: any) => {
        return (
          <>
            <groupItem label={renderText(item, 'value')}>
              {renderText(item, 'label')}
              {props.tooltip && renderToolTip(item)}
            </groupItem>
            ;
          </>
        );
      });
    }
    return () => {
      return (
        <group {...attrs} class="g-easy-radios">
          {renderItem()}
        </group>
      );
    };
  },
});

export default easyRadiosOrCheckboxs;
