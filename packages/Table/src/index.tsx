import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/pagination/style/css';
import 'element-plus/es/components/loading/style/css';
import {
  unref,
  toRefs,
  computed,
  nextTick,
  onMounted,
  defineComponent,
  getCurrentInstance,
  type CSSProperties,
} from 'vue';
import props from './props';
import Renderer from '../renderer';
import { ElPagination, ElTable, ElTableColumn } from 'element-plus';
import { GTableProps } from '../types';

export default defineComponent({
  name: 'GTable',
  props,
  emits: ['page-size-change', 'page-current-change', 'pageCurrentChange', 'pageSizeChange'],
  setup(props, { slots, attrs, emit, expose }) {
    const instance = getCurrentInstance()!;

    function getTableRef() {
      return instance?.proxy?.$refs[`TableRef${props.key}`];
    }

    function getTableDoms() {
      return (getTableRef() as any).$refs;
    }

    onMounted(() => {
      nextTick(() => {
        if (!props.rowHoverBgColor) return;
        getTableDoms().tableWrapper.style.setProperty(
          '--el-table-row-hover-bg-color',
          props.rowHoverBgColor,
          'important',
        );
      });
    });

    const { columns, loading, loadingConfig, alignWhole, headerAlign, showOverflowTooltip, pagination } = toRefs(
      props,
    ) as unknown as GTableProps;

    let convertLoadingConfig = computed(() => {
      if (!loadingConfig || !unref(loadingConfig)) return;
      let { text, spinner, svg, viewBox } = unref(loadingConfig);
      return {
        'element-loading-text': text,
        'element-loading-spinner': spinner,
        'element-loading-svg': svg,
        'element-loading-svg-view-box': viewBox,
      };
    });

    const loadingBackground = computed(() => {
      if (!unref(loading)) return;
      return {
        'element-loading-background': 'rgba(0, 0, 0, 0.45)',
      };
    });

    const handleSizeChange = (val: any) => {
      if (!pagination) return;
      unref(pagination).pageSize = val;
      emit('pageSizeChange', val);
    };

    const handleCurrentChange = (val: any) => {
      if (!pagination) return;
      unref(pagination).currentPage = val;
      emit('pageCurrentChange', val);
    };

    const getStyle = computed((): CSSProperties => {
      if (!pagination) return {};
      return {
        width: '100%',
        margin: '16px 0',
        display: 'flex',
        justifyContent:
          unref(pagination).align === 'left'
            ? 'flex-start'
            : unref(pagination).align === 'center'
            ? 'center'
            : 'flex-end',
        ...(unref(pagination).style ?? {}),
      };
    });

    let conditions = pagination && unref(pagination) && unref(pagination).currentPage && unref(pagination).pageSize;

    const renderColumns = (columns: Record<string, any>, index: number) => {
      const { cellRenderer, slot, headerRenderer, hide, children, prop, ...args } = columns;

      const defaultSlots = {
        default: (scope: any) => {
          if (cellRenderer) {
            return (
              <Renderer
                render={cellRenderer}
                params={Object.assign(scope, {
                  index: scope.$index,
                  props,
                  attrs,
                })}
              ></Renderer>
            );
          } else if (slot) {
            return slots?.[slot]?.(
              Object.assign(scope, {
                index: scope.$index,
                props,
                attrs,
              }),
            );
          }
        },
      };

      let scopedSlots = headerRenderer
        ? {
            header: (scope: any) => {
              return (
                <Renderer
                  render={headerRenderer}
                  params={Object.assign(scope, {
                    index: scope.$index,
                    props,
                    attrs,
                  })}
                ></Renderer>
              );
            },
            ...defaultSlots,
          }
        : defaultSlots;

      if (hide && hide(attrs)) {
        return hide(attrs);
      }

      if (children?.length > 0) {
        scopedSlots = children.map(renderColumns);
      }

      return (
        <ElTableColumn
          key={index}
          {...args}
          prop={typeof prop === 'function' && prop(index) ? prop(index) : prop}
          align={columns?.align ? columns.align : unref(alignWhole)}
          headerAlign={columns?.headerAlign ? columns.headerAlign : unref(headerAlign)}
          showOverflowTooltip={columns?.showOverflowTooltip ? columns.showOverflowTooltip : unref(showOverflowTooltip)}
        >
          {scopedSlots}
        </ElTableColumn>
      );
    };

    expose({
      /** @description Get Table Instance */
      getTableRef,
      /** @description Get Table Doms */
      getTableDoms,
    });

    let renderTable = () => {
      return (
        <>
          <ElTable {...props} {...attrs} ref={`TableRef${props.key}`}>
            {{
              default: () => unref(columns).map(renderColumns),
              append: () => slots.append && slots.append(),
              empty: () => slots.empty && slots.empty(),
            }}
          </ElTable>
          {conditions ? (
            <ElPagination
              {...attrs}
              style={unref(getStyle)}
              {...unref(pagination)}
              small={
                props?.paginationSmall
                  ? props?.paginationSmall
                  : pagination && unref(pagination).small
                  ? pagination && unref(pagination).small
                  : false
              }
              layout={(pagination && unref(pagination).layout) ?? 'total, sizes, prev, pager, next, jumper'}
              pageSizes={(pagination && unref(pagination).pageSizes) ?? [5, 10, 15, 20]}
              onSizeChange={(val: any) => handleSizeChange(val)}
              onCurrentChange={(val: any) => handleCurrentChange(val)}
            ></ElPagination>
          ) : null}
        </>
      );
    };

    return () => (
      <div style="width:100%" v-loading={unref(loading)} {...unref(loadingBackground)} {...unref(convertLoadingConfig)}>
        {renderTable()}
      </div>
    );
  },
});
