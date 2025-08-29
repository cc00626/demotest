import { defineStore } from "pinia";
import { ref } from "vue";
import { getFileList } from "@/api/file";
const useEditStore = defineStore("edit", () => {
  //获取文件列表的信息
  const fileList = ref<any>([]);
  //选中的id,默认为第一个
  const selectedId = ref<string>("");
  //获取文件列表
  async function getFileListToStore() {
    try {
      const res = await getFileList(); // 调用 API
      fileList.value = res; // 更新 store
      // 默认选中第一个文件
      if (res.length > 0) {
        selectedId.value = res[0].id;
      } else {
        selectedId.value = ""; // 没有文件时置空
      }
      return res; // 返回结果，方便链式调用
    } catch (error) {
      console.error("获取文件列表失败:", error);
      throw error; // 保持 promise reject，让调用方捕获
    }
  }

  //获取当前选中的item
  function getSelectedItem() {
    return fileList.value.find((item: any) => item.id === selectedId.value);
  }

  return { fileList, getFileListToStore, selectedId, getSelectedItem };
});

export default useEditStore;
