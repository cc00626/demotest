import service from "../server/axios";

//获取文档库列表
export async function getDocumentList(page: number, pageSize: number) {
  const res = await service.get(
    `/api/document?page=${page}&pageSize=${pageSize}`
  );
  return res;
}

//新建文档库
export async function createDocument(
  title: string,
  description: string,
  cover: string
) {
  const res = await service.post("/api/document", {
    title,
    description,
    cover,
  });

  return res;
}

//获取文档
export async function getDocumentItemList(id: number) {
  const res = await service.get(`/api/document/children/${id}`);
  return res.data;
}

export async function saveDocumentContent(content: string) {
  service.patch;
}
