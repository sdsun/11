import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/pagination/style/css';
import 'element-plus/es/components/loading/style/css';
import 'element-plus/es/components/dropdown/style/css';
import 'element-plus/es/components/dropdown-item/style/css';
import 'element-plus/es/components/divider/style/css';
import 'element-plus/es/components/checkbox-group/style/css';
import 'element-plus/es/components/checkbox/style/css';
import '../css/index.css';
import {
  ref,
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
import {
  ElPagination,
  ElTable,
  ElTableColumn,
  ElInput,
  ElDropdown,
  ElDropdownItem,
  ElDivider,
  ElCheckboxGroup,
  ElCheckbox,
} from 'element-plus';
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
    // columns列表中filterType不为false的数量
    const valueList = reactive(new Array(unref(columns).filter((item) => item.filterType).length).fill(''));
    // 增加内部用于计数的方法__valueIdx
    const addInnerApi = (): void => {
      let count = 0;
      unref(columns).forEach((item: any) => {
        if (item.filterType) {
          item.__valueIdx = count;
          if (item.filterType === 'checkbox') {
            valueList[count] = [];
          }
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
      for (let i = 0; i < valueList.length; i++) {
        valueList[i] = '';
      }
      emit('reset');
    };
    unref(countable) &&
      unref(columns).unshift({
        width: 60,
        headerRenderer(params: any) {
          return countable ? (
            <div class="g-table-search">
              {/* <a href="javascript:void(0)">
                <i onClick={handleSearch} class="iconfont icon-search"></i>
              </a>
              <a href="javascript:void(0)">
                <i onClick={handleReset} class="iconfont icon-reset"></i>
              </a> */}
              No.
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
      // 新增filterType
      const {
        cellRenderer,
        slot,
        headerRenderer,
        hide,
        children,
        prop,
        filterType,
        filterOpts,
        filterOptKeys,
        ...args
      } = column;
      const renderFilterColumn = (index: number, scope: any) => {
        let valueIdx = unref(columns)[index].__valueIdx as number;
        // dropdown列表的Confirm是否可点击
        const confirmDisabled = filterType === 'checkbox' && valueList[valueIdx] && valueList[valueIdx].length === 0;
        const renderDropdownItem = () => {
          switch (filterType) {
            case 'select':
              return unref(filterOpts).map((item: any) => (
                <>
                  <ElDropdownItem class={valueList[valueIdx] === item ? 'is-active' : ''} command={item}>
                    <div>{item[filterOptKeys[0]]}</div>
                  </ElDropdownItem>
                </>
              ));
            case 'checkbox':
              return (
                <ElCheckboxGroup v-model={valueList[valueIdx]} class="g-table-popper__checkbox">
                  {unref(filterOpts).map((item: any) => (
                    <div>
                      <ElCheckbox label={item[filterOptKeys[1]]}>{item[filterOptKeys[0]]}</ElCheckbox>
                    </div>
                  ))}
                </ElCheckboxGroup>
              );
            case 'date':
            default:
              return;
          }
        };
        const handleDropdown = (cmd: any) => {
          valueList[valueIdx] = cmd;
        };
        const handleResetFilter = () => {
          if (filterType === 'checkbox') {
            valueList[valueIdx].splice(0);
          } else {
            valueList[valueIdx] = undefined;
          }
        };
        const handleConfirm = () => {
          if (confirmDisabled) {
            return;
          }
        };
        const renderConfirmBtn = () => {
          if (filterType === 'checkbox') {
            return (
              <a
                href="javascript:void(0)"
                onClick={handleConfirm}
                className={confirmDisabled ? 'g-table-popper__disabled' : ''}
              >
                Confirm
              </a>
            );
          }
        };
        const renderFilterIcon = () => {
          if (filterType === 'checkbox') {
            return `iconfont icon-filter${valueList[valueIdx].length ? '-fill g-table-filter__fill' : ''}`;
          } else {
            return `iconfont icon-filter${valueList[valueIdx] ? '-fill g-table-filter__fill' : ''}`;
          }
        };
        return (
          <ElDropdown popper-class="g-table-popper" trigger="click" onCommand={handleDropdown}>
            {{
              default: () => <i class="iconfont" className={renderFilterIcon()}></i>,
              dropdown: () =>
                filterOpts && filterOpts.length > 0 ? (
                  <>
                    {renderDropdownItem()}
                    <ElDivider />
                    <div class="g-table-popper__btn">
                      {renderConfirmBtn()}
                      <a href="javascript:void(0)" onClick={handleResetFilter}>
                        Reset
                      </a>
                    </div>
                  </>
                ) : (
                  <div>No Data</div>
                ),
            }}
          </ElDropdown>
        );
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
                  <div class="g-table-header__item">
                    <span>{args.label}</span>
                    {renderFilterColumn(index, scope)}
                  </div>
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
          <ElTable
            class="g-table"
            {...props}
            {...attrs}
            headerRowClassName={`g-table-header${props.headerRowClassName ? ' ' + props.headerRowClassName : ''}`}
            ref={`TableRef${props.key}`}
          >
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
