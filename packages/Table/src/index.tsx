import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/pagination/style/css';
import 'element-plus/es/components/loading/style/css';
import '../css/index.css';
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
import { GSelect } from 'packages/Select';
import { ElPagination, ElTable, ElTableColumn, ElInput } from 'element-plus';
import { GTableProps } from '../types';
import { useFullScreen } from './fullscreen';

export default defineComponent({
  name: 'GTable',
  props,
  emits: ['page-size-change', 'page-current-change', 'pageCurrentChange', 'pageSizeChange', 'search', 'reset'],
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
    const {
      fullscreen,
      countable,
      columns,
      loading,
      loadingConfig,
      alignWhole,
      headerAlign,
      showOverflowTooltip,
      pagination,
    } = toRefs(props) as unknown as GTableProps;
    // columns列表中searchType不为false的数量
    const valueList = ref(new Array(unref(columns).filter((item) => item.searchType).length).fill(''));
    // 增加内部用于计数的方法__valueIdx
    const addInnerApi = (): void => {
      let count = 0;
      unref(columns).forEach((item: any) => {
        if (item.searchType) {
          item.__valueIdx = count;
          count++;
        }
      });
      count = 0;
    };
    addInnerApi();
    const handleSearch = () => {
      emit('search', unref(valueList));
    };
    const handleReset = () => {
      for (let i = 0; i < valueList.value.length; i++) {
        valueList.value[i] = '';
      }
      emit('reset');
    };
    unref(countable) &&
      unref(columns).unshift({
        width: 60,
        headerRenderer(params: any) {
          return countable ? (
            <div class="g-table-search">
              <a href="javascript:void(0)">
                <i onClick={handleSearch} class="iconfont icon-search"></i>
              </a>
              <a href="javascript:void(0)">
                <i onClick={handleReset} class="iconfont icon-reset"></i>
              </a>
            </div>
          ) : (
            <div></div>
          );
        },
        cellRenderer({ index }) {
          return <div>{index + 1}</div>;
        },
      });
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

    const renderColumns = (column: Record<string, any>, index: number) => {
      // 新增searchType
      const {
        cellRenderer,
        slot,
        headerRenderer,
        hide,
        children,
        prop,
        searchType,
        searchOpts,
        searchOptKeys,
        ...args
      } = column;
      const renderSearchColumn = (index: number, scope: any) => {
        let valueIdx = unref(columns)[index].__valueIdx as number;
        switch (searchType) {
          case 'input':
            return <ElInput clearable v-model={valueList.value[valueIdx]} size="small"></ElInput>;
          case 'select':
            return (
              <GSelect
                clearable
                v-model={valueList.value[valueIdx]}
                options={searchOpts}
                option-keys={searchOptKeys}
                size="small"
                style="width: 100%"
              ></GSelect>
            );
          default:
            return;
        }
      };

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
        : {
            // 新增
            header: (scope: any) => {
              return (
                <div>
                  <div>{args.label}</div>
                  {renderSearchColumn(index, scope)}
                </div>
              );
            },
            ...defaultSlots,
          };

      if (hide && hide(attrs)) {
        return hide(attrs);
      }

      if (children?.length > 0) {
        scopedSlots = children.map(renderColumns);
      }
      const initHeaderCellClass = (index: number) => {
        if (index === 0 && countable) {
          return column.labelClassName || '';
        }
        return `g-table-header__top${column.labelClassName ? ' ' + column.labelClassName : ''}`;
      };
      return (
        <ElTableColumn
          key={index}
          {...args}
          prop={typeof prop === 'function' && prop(index) ? prop(index) : prop}
          align={column?.align ? column.align : unref(alignWhole)}
          headerAlign={column?.headerAlign ? column.headerAlign : unref(headerAlign)}
          labelClassName={initHeaderCellClass(index)}
          showOverflowTooltip={column?.showOverflowTooltip ? column.showOverflowTooltip : unref(showOverflowTooltip)}
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
          <ElTable class="g-table" {...props} {...attrs} ref={`TableRef${props.key}`}>
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
    const renderFullScreen = useFullScreen(instance, props, fullscreen);
    return () => (
      <div
        ref={`g-table-container__${props.key}`}
        class="g-table-container"
        style="width:100%"
        v-loading={unref(loading)}
        {...unref(loadingBackground)}
        {...unref(convertLoadingConfig)}
      >
        {renderFullScreen()}
        {renderTable()}
      </div>
    );
  },
});
