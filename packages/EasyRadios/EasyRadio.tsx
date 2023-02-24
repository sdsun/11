import EasyRadiosOrCheckboxs from '../EasyRadiosOrCheckboxs';

export default defineComponent({
  name: 'GEasyRadios',
  components: { EasyRadiosOrCheckboxs },
  setup(props, { attrs }) {
    return () => <EasyRadiosOrCheckboxs type="radio" {...attrs}></EasyRadiosOrCheckboxs>;
  },
});
