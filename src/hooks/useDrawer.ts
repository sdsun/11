import { ref } from "vue";

export default function useDrawer() {
  const visible = ref(false);
  const loading = ref(false);
  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);
  const openLoading = () => (loading.value = true);
  const closeLoading = () => (loading.value = false);
  return {
    visible,
    loading,
    openDrawer,
    closeDrawer,
    openLoading,
    closeLoading
  };
}
