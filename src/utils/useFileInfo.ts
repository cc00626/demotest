import { computed } from "vue";

export function useFileInfo(props: { size?: number; uploadTime?: string }) {
  // 计算文件大小
  const size = computed(() => {
    if (!props.size) return "0 B";
    const bytes = props.size;
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    if (bytes < 1024 * 1024 * 1024)
      return (bytes / 1024 / 1024).toFixed(2) + " MB";
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
  });

  // 格式化上传时间
  const uploadTime = computed(() => {
    if (!props.uploadTime) return "";
    return new Date(props.uploadTime).toLocaleString("zh-CN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // 12小时制显示 上午/下午
    });
  });

  return {
    size,
    uploadTime,
  };
}
