import service from "@/server/axios";

//获取文件列表
export async function getFileList() {
  const res = await service.get("/api/files");
  return res;
}
