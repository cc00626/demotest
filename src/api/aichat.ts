import service from "../server/axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";
//获取接受的文本内容
export function getAichatStream(prompt: any, options: any) {
  const controller = new AbortController(); // 创建控制器
  const { messages, sessionId } = prompt;
  const url = "/api/chat";
  fetchEventSource(url, {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      // 如果有认证token，加在这里
      // Authorization: `Bearer ${token}`,
    },
    //请求体
    body: JSON.stringify({
      messages,
      sessionId,
    }),
    onmessage(event) {
      // console.log(event);
      // event.data 是服务器推送的文本数据

      if (event.data === "[DONE]") {
        options.onClose && options.onClose();
        return;
      }
      let obj = JSON.parse(event.data);
      // if (typeof obj === "string") {
      //   // 再解析一层
      //   obj = JSON.parse(obj);
      // }
      // console.log(typeof obj);
      options.onMessage(obj.choices[0].delta.content);
    },
    onerror(err) {
      options.onError && options.onError(err);
    },
    onclose() {
      options.onClose && options.onClose();
    },
    // 可选：自动重连时间，默认 3000ms
    // openWhenHidden: true,
  });

  return controller;
}

//获取历史消息
export async function getHistoryList() {
  const res = await service.get("/api/chat/history");
  return res.data;
}
