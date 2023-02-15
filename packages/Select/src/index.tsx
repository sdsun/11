import 'element-plus/es/components/select/style/css';
import { defineComponent } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import { GSelectOpt } from '../types';
export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    // 选项列表
    options: {
      type: Array,
      default: () => [],
    },
    // 选项列表对应text/value字段
    optionKeys: {
      type: Array,
      default: () => ['text', 'value'],
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, attrs, slots }) {
    const { options, optionKeys } = toRefs(props) as unknown as GSelectOpt;
    const renderOptions = () => {
      if (slots.default) {
        return slots.default();
      } else {
        return unref(options).map((item: any) => {
          return (
            <ElOption
              key={item[unref(optionKeys)[1]]}
              value={item[unref(optionKeys)[1]]}
              label={item[unref(optionKeys)[0]]}
            ></ElOption>
          );
        });
      }
    };
    const handleChange = (val: any) => {
      emit('update:modelValue', val);
      emit('change', val);
    };
    return () => (
      <ElSelect modelValue={props.modelValue} onChange={handleChange} {...attrs}>
        {renderOptions()}
      </ElSelect>
    );
  },
});
